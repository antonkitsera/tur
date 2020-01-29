import React from 'react';
import '../global_main.css'
import './style/publishing_page_wrapper.css'
import Title from "../Component/Title";
import ScrollableAnchor from "react-scrollable-anchor";
import {Link} from "react-router-dom";
import API from "../API";

export default class AllPublishing extends React.Component {
    state = {currentID: null, dataArray: null};

    componentDidMount() {
        let currentUrl = this.getCurrentUrl();
        this.setState({
            currentID: currentUrl,
        }, () => {
            if (currentUrl === 'author') {
                API.get('/authors')
                    .then(res => this.setState({
                        dataArray: res.data,
                    }))
            } else {
                API.get('/phs')
                    .then(res => this.setState({
                        dataArray: res.data,
                    }))
            }
        });
    };

    getCurrentUrl = () => {
        let url = window.location.href;
        if (url.includes('author')) {
            return 'author'
        } else {
            return 'publishing'
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        let currentUrl = this.getCurrentUrl();
        if (prevState.currentID !== currentUrl) {
            this.setState({
                currentID: currentUrl
            })
        }
    }

    render() {
        const {dataArray, currentID} = this.state;
        let count = 1;
        console.log(currentID);
        return (
            <div className={'publishing_page_wrapper'}>
                <div className={'title_section'}>
                    <Title title={currentID === 'author'
                        ? 'Каталог авторів'
                        : 'Каталог видавництв'}/>
                </div>
                <div className={'wrapper_anchor'}>
                    {dataArray !== null
                        ? Object.values(dataArray || {}).map(item => {
                            return Object.keys(item || {}).map((keys, index) => {
                                return item[keys].length > 0 && index === 27
                                    ? <a href={`#${keys}`} key={keys} className={'alphabet_header'}>
                                        <br/>
                                        {keys.toUpperCase()}
                                    </a>
                                    : item[keys].length > 0
                                        ? <a href={`#${keys}`} key={keys} className={'alphabet_header'}>
                                            {keys.toUpperCase()}
                                        </a>
                                        : null
                            })
                        })
                        : null
                    }
                </div>
                <div className={'publishing_wrapper'}>
                    {dataArray !== null
                        ? Object.values(dataArray || {}).map(item => (
                            Object.keys(item || {}).map(keys => {
                                return item[keys].length > 0 && count++ ?
                                    <div key={keys} className={count % 2 === 1
                                        ? 'every_word_wrapper grey_bg_block'
                                        : 'every_word_wrapper'}>
                                        <ScrollableAnchor id={keys}>
                                            <div className={'title_section'}>
                                                <span>{keys.toUpperCase()}</span>
                                            </div>
                                        </ScrollableAnchor>
                                        <div className={'publishing_content_wrapper'}>
                                            {item[keys].map(elem => {
                                                return <Link to={`/${currentID}/${elem.id}`} key={elem.id}>
                                                    {elem.name}
                                                </Link>
                                            })}
                                        </div>
                                    </div>
                                    : null
                            })
                        ))
                        : null
                    }
                </div>
            </div>
        )
    }
}
