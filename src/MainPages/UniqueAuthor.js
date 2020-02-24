import React from 'react'
import '../global_main.css'
import {Link} from "react-router-dom";
import author_image from '../image/author_image.png'
import Title from '../Component/Title'
import MapAdminItems from "../Component/MapAdminItems";
import MainFilters from "../Component/MainFilters";
import API from "../API";
import {normalizeToLocation} from "react-router-dom/modules/utils/locationUtils";

export default class UniqueAuthor extends React.Component {
    state = {
        currentID: null,
        items: null,
        currentUrlName: null,
        currentAuthorName: '',
        currentAuthorImage: null,
        currentAuthorDesc: '',
        start_range_value: 'Оберіть ціну',
        max_price_range: 5000,
        min_price_range: 0,
        dataAuthorArray: null,
        dataPublishingArray: null,
        dataLanguageArray: null,
        dataCoverArray: null,
        currentFiltersUrl: null
    };
    changeRangeValue = val => {
        if (val.start > val.end) {
            this.setState({
                min_price_range: 5000,
                max_price_range: val.end,
            })
        } else if (val.end < 0 && val.start < 0) {
            this.setState({
                min_price_range: 5000,
                max_price_range: val.end,
            })
        }
    };

    getChangeCheck = (val, array) => {
        array.forEach(item => {
            if (item.id === val) {
                item['check'] = !item['check']
            }
        });
        return array
    };


    addingToActiveArray = event => {
        let activeArrayLanguage = [];
        let activeArrayCover = [];
        let activeArrayAuthor = [];
        let activeArrayPh = [];
        switch (event.target.name) {
            case 'author':
                let currentAuthorId = Number(event.target.getAttribute('data-key'));
                let newAuthorArr = this.state.dataAuthorArray;
                let changeAuthorChecked = this.getChangeCheck(currentAuthorId, newAuthorArr);
                this.setState({
                    dataAuthorArray: changeAuthorChecked
                });
                break;
            case 'publishing':
                let currentPublishingId = Number(event.target.getAttribute('data-key'));
                let newPublishingArr = this.state.dataPublishingArray;
                let changePublishingChecked = this.getChangeCheck(currentPublishingId, newPublishingArr);
                this.setState({
                    dataPublishingArray: changePublishingChecked
                });
                break;
            case 'language':
                let currentLanguageId = Number(event.target.getAttribute('data-key'));
                let newLanguageArr = this.state.dataLanguageArray;
                let changeLanguageChecked = this.getChangeCheck(currentLanguageId, newLanguageArr);
                this.setState({
                    dataLanguageArray: changeLanguageChecked
                });
                break;
            case 'cover':
                let currentCoverId = Number(event.target.getAttribute('data-key'));
                let newCoverArr = this.state.dataCoverArray;
                let changeCoverChecked = this.getChangeCheck(currentCoverId, newCoverArr);
                this.setState({
                    dataCoverArray: changeCoverChecked
                }, () => {
                    changeCoverChecked.forEach(item => {
                        if (item.check) activeArrayCover.push(item.id)
                    });
                    API.get(`${this.state.currentFiltersUrl}&cover=${activeArrayCover}`)
                        .then(res => console.log(res))
                });
                break;
            default:
                return
        }
    };
    createLinks = (array, value) => {
        let changeUrl = this.state.currentFiltersUrl;
        let activeId = [];
        array.forEach(item => {
            if (item.check) activeId.push(item.id)
        });
        if (!changeUrl.includes(`${value}=`)) {
            return changeUrl.concat(`&${value}=${activeId}`);
        } else {
            let sliceURL = changeUrl.split(`${value}=`);
            let concatArray = sliceURL.concat(`&${value}=${activeId}`);
            return concatArray
        }
    };

    componentDidMount() {
        let currentUrl = this.getCurrentUrl();
        let currentUrlName = this.getCurrentName();
        this.setState({
            currentID: currentUrl,
            currentUrlName: currentUrlName,
        }, () => {
            if (currentUrlName === 'author') {
                API.get(`/author?id=${this.state.currentID}`)
                    .then(res => {
                        this.setState({
                            currentAuthorName: res.data.author.name,
                            currentAuthorDesc: res.data.author.description,
                            currentAuthorImage: process.env.REACT_APP_API_URL +"/"+res.data.author.path,
                            currentFiltersUrl: `/author?id=${this.state.currentID}`,
                            items: res.data.books,
                            dataPublishingArray: res.data.ph,
                            dataLanguageArray: res.data.languages,
                            dataCoverArray: res.data.cover_types
                        })
                    })
            } else {
                API.get(`/ph?id=${this.state.currentID}`)
                    .then(res => {
                        this.setState({
                            currentAuthorName: res.data.ph.name,
                            currentAuthorDesc: res.data.ph.description,
                            currentAuthorImage: process.env.REACT_APP_API_URL +"/"+res.data.ph.path,
                            items: res.data.books,
                            currentFiltersUrl: `/ph?id=${this.state.currentID}`,
                            dataAuthorArray: res.data.authors,
                            dataPublishingArray: null,
                            dataLanguageArray: res.data.languages,
                            dataCoverArray: res.data.cover_types
                        })
                    })
            }
        });
    };

    getCurrentName = () => {
        let url = window.location.href;
        if (url.includes('author')) {
            return 'author'
        } else {
            return 'publishing'
        }
    };
    getCurrentUrl = () => {
        let url = window.location.href;
        return url.split('/').pop()
    };

    render() {
        const {
            currentUrlName, currentAuthorName, currentAuthorDesc,
            start_range_value, min_price_range, dataPublishingArray,
            max_price_range, dataAuthorArray, items,
            dataLanguageArray, dataCoverArray, currentAuthorImage
        } = this.state;
        console.log(currentUrlName)
        return (
            <div className={'unique_author_wrapper'}>
                {currentUrlName !== null ?
                    <div className={'section_links'}>
                        <Link to={currentUrlName === 'author' ?
                            '/author' : '/publishing'} className={'category_title'}>
                            {'Каталог авторів'}
                        </Link>
                        <Link to={''}>{currentAuthorName}</Link>
                    </div>
                    : null
                }
                <div className={'unique_author_content'}>
                    <div className={'img_wrapper'}>
                        <img src={currentAuthorImage} alt="" width={"100%"}/>
                    </div>
                    <div className={'desc_wrapper'}>
                        <p>{currentAuthorDesc}</p>
                    </div>
                </div>
                {items ? <MainFilters start_range_value={start_range_value}
                                      dataPublishingArray={currentUrlName !== 'author' ? dataPublishingArray : null}
                                      dataCoverArray={dataCoverArray}
                                      dataAuthorArray={currentUrlName === 'publishing' ? dataAuthorArray : null}
                                      dataLanguageArray={dataLanguageArray}
                                      addingToActiveArray={this.addingToActiveArray}
                                      min_price_range={min_price_range}
                                      max_price_range={max_price_range}
                                      changeRangeValue={this.changeRangeValue}/> : null}
                {items
                    ? <div className={'another_author_items'}>
                        <Title title={'Книги автора'}/>
                        <MapAdminItems items={items}/>
                    </div>
                    : null
                }
            </div>
        )
    }
}
