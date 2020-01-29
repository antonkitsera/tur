import React from 'react'
import MapAdminItems from "../Component/MapAdminItems"
import {background_color_changing} from '../BackgroundKids'
import Title from "../Component/Title";
import MainFilters from "../Component/MainFilters";
import API from "../API";

export default class AllInCategory extends React.Component {
    state = {
        start_range_value: 'Оберіть ціну',
        max_price_range: 5000,
        min_price_range: 0,
        backgroundColor: null,
        activeCategory: null,
        dataPublishingArray: null,
        dataAuthorArray: null,
        dataCoverArray: null,
        dataLanguageArray: null,
        category_name: null,
        items: null
    };

    componentDidMount() {
        let category = this.getActiveCategory('category');
        if (category !== null) {
            this.changeColorForKids(category);
            API.get(`/full-search-book?category=${category}`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        items: res.data.books,
                        category_name: res.data.category.name,
                    })
                })
        }else {
            API.get('/books')
                .then(res => console.log(res));
            this.setState({
                category_name: null
            })
        }
    }

    getChangeCheck = (val, array) => {
        array.forEach(item => {
            if (item.id === val) {
                item['check'] = !item['check']
            }
        });
        return array
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
    changeColorForKids = category => {
        if (Number(category) === 2) {
            let color = this.changingColor(0, 7);
            this.setState({
                backgroundColor: background_color_changing[color]
            });
        } else this.setState({backgroundColor: null})
    };

    getActiveCategory(category) {
        let url = window.location.href;
        if (url.includes('/category')) {
            return url.split(`/${category}/`)[1].split('/')[0]
        } else {
            return null
        }
    }

    changingColor(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    addingToActiveArray = event => {
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
                });
                break;
            default:
                return
        }
    };

    render() {
        const {
            backgroundColor, min_price_range, start_range_value,
            dataPublishingArray, dataCoverArray, dataAuthorArray,
            dataLanguageArray, max_price_range, category_name, items
        } = this.state;
        let title = category_name !== null ? category_name : 'Усі книги';
        return (
            <div className={'wrapper_category_page'}
                 style={{background: backgroundColor}}>
                <div className={'title_section_wrapper'}>
                    <Title title={title}/>
                </div>
                <MainFilters start_range_value={start_range_value}
                             dataPublishingArray={dataPublishingArray}
                             dataCoverArray={dataCoverArray}
                             dataAuthorArray={dataAuthorArray}
                             dataLanguageArray={dataLanguageArray}
                             addingToActiveArray={this.addingToActiveArray}
                             min_price_range={min_price_range}
                             max_price_range={max_price_range}
                             changeRangeValue={this.changeRangeValue}/>
                {items !== null ? <MapAdminItems items={items}/> : null}
            </div>
        )
    }
}
