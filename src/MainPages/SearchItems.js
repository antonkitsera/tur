import React, {Component} from 'react'
import Title from '../Component/Title'
import MapAdminItems from '../Component/MapAdminItems'
import '../global_main.css'
import API from "../API";

export default class SearchItems extends Component {
    state = {
        activeURL: null,
        active_category: 'book',
        items: null,
        loading: false,
    };

    componentWillMount() {
        let url = this.encode_utf8(window.location.href);
        this.setState({
            activeURL: url,
        }, () => {
            this.getBooks(url);
        })
    }

    encode_utf8 = new_url => {
        let url = new_url.split('/').pop();
        return decodeURI(url);
    };

    componentDidUpdate(prevProps, prevState) {
        let url = this.encode_utf8(window.location.href);
        if (prevState.activeURL !== url) {
            this.setState({
                activeURL: url,
                loading: true
            })
        }
    }

    handleChange = e => {
        this.setState({
            active_category: e.target.value
        }, () => {
            let url = this.state.activeURL;
            API.get(`/search_books?category=${this.state.active_category}&name=${url}`)
                .then(res => this.setState({items: res.data.book}))
        })
    };

    getBooks = url => {
        API.get(`/search_books?name=${url}`)
            .then(res => {
                console.log(res);
                this.setState({
                    items: res.data.book,
                }, () => this.setState({loading: true}))
            })
    };

    render() {
        const {activeURL, active_category, items, loading} = this.state;
        console.log(items);
        return (
            <div className={'search_items_wrapper'}>
                <div className={'title_wrapper'}>
                    {items !== null && loading
                        ? <Title title={`Результати пошуку для "${activeURL}"`}/>
                        : loading ?
                            <Title title={`По запиту "${activeURL}" нічого не знайдено, спробуйте змінити запит `}/>
                            : null
                    }
                </div>
                {items !== null
                    ? <>
                        <div className={'select_category_wrapper'}>
                            <div className={'every_select'}>
                                <input type="radio"
                                       onChange={this.handleChange}
                                       id={'item'}
                                       checked={active_category === 'book'}
                                       value={'book'}/>
                                <label htmlFor={'item'}
                                       className={active_category === 'book' ? "active_label" : null}>Товари</label>
                            </div>
                            <div className={'every_select'}>
                                <input type="radio"
                                       onChange={this.handleChange}
                                       id={'author'}
                                       checked={active_category === 'author'}
                                       value={'author'}/>
                                <label className={active_category === 'author' ? "active_label" : null}
                                       htmlFor={'author'}>Автори</label>
                            </div>
                            <div className={'every_select'}>
                                <input type="radio"
                                       onChange={this.handleChange}
                                       id={'edition'}
                                       checked={active_category === 'ph'}
                                       value={'ph'}/>
                                <label htmlFor={'edition'}
                                       className={active_category === 'ph' ? "active_label" : null}>Видавництво</label>
                            </div>
                        </div>
                    </>
                    : null
                }
                {items
                    ? <div className={'wrapper_searching_items'}>
                        <MapAdminItems items={items}/>
                    </div>
                    : null}
            </div>
        )
    }
}
