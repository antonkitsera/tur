import React from 'react';
import '../global_main.css'
import './style/category.css'
import {Link} from "react-router-dom";
import MapAdminItems from '../Component/MapAdminItems';
import MapPreCategory from '../Component/MapPreCategory';
import MainFilters from '../Component/MainFilters';
import Title from '../Component/Title';
import {background_color_changing} from '../BackgroundKids'
import API from "../API";

export default class CategoryMain extends React.Component {
    state = {
        activeCategory: null,
        backgroundColor: null,
        activePreCategory: null,
        start_range_value: 'Оберіть ціну',
        max_price_range: 5000,
        min_price_range: 0,
        dataPublishingArray: null,
        dataAuthorArray: null,
        dataCoverArray: null,
        dataLanguageArray: null,
        items: null,
        category_name: null,
        pre_category_name: null,
        pre_categories: null
    };

    changeRangeValue = val => {
        console.log(val);
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

    componentDidMount() {
        let pre_category = this.getCurrentUrl();
        if (pre_category > 0) {
            let category = this.getActiveCategory('category');
            let url = window.location.href;
            let ActivePreCategory = url.includes('pre_category');
            if (ActivePreCategory) {
                this.setState({
                    activeCategory: Number(category),
                    activePreCategory: Number(pre_category),
                }, () => {
                    API.get(`/full-search-book?subcategory=${pre_category}`)
                        .then(res => {
                            console.log(res);
                            this.setState({
                                items: res.data.books,
                                pre_category_name: res.data.subcategory.name,
                                category_name: res.data.category.name,
                            })
                        });
                    this.changeColorForKids()
                });
            } else {
                this.setState({
                    activeCategory: Number(category),
                    activePreCategory: null,
                }, () => {
                    API.get(`/${pre_category}/subcategories`)
                        .then(res => this.setState({
                            items: res.data.books,
                            pre_category: res.data.subcategories,
                            category_name: res.data.category.name,
                        }));
                    this.changeColorForKids()
                });
            }
        } else {
            this.setState({
                activePreCategory: pre_category,
                activeCategory: null,
            });
        }
    }

    changingColor(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    changeColorForKids() {
        if (this.state.activeCategory === 2) {
            let color = this.changingColor(0, 7);
            this.setState({
                backgroundColor: background_color_changing[color]
            });
        } else this.setState({backgroundColor: null})
    };

    componentDidUpdate(prevProps, prevState) {
        let category = this.getActiveCategory('category');
        if (category > 0) {
            let pre_category = this.getCurrentUrl();
            let url = window.location.href;
            let preCategoryCheck = url.includes('pre_category');
            if (preCategoryCheck && prevState.activePreCategory !== Number(pre_category)) {
                this.setState({
                    activePreCategory: Number(pre_category),
                    activeCategory: Number(category)
                }, () => {
                    this.changeColorForKids();
                    API.get(`/full-search-book?subcategory=${pre_category}`)
                        .then(res => {
                            console.log(res);
                            this.setState({
                                items: res.data.books,
                                pre_category_name: res.data.subcategory.name,
                                category_name: res.data.category.name,
                            })
                        })
                })
            } else if (!preCategoryCheck && prevState.activeCategory !== Number(category)) {
                this.setState({
                    activePreCategory: null,
                    activeCategory: Number(category)
                }, () => {
                    this.changeColorForKids();
                    API.get(`/${this.state.activeCategory}/subcategories`)
                        .then(res => {
                            API.get(`/${pre_category}/subcategories`)
                                .then(res => this.setState({
                                    items: res.data.books,
                                    pre_category: res.data.subcategories,
                                    category_name: res.data.category.name,
                                }));
                        });
                })
            }
        }
    };

    getActiveCategory(category) {
        let url = window.location.href;
        if (url.includes('/category')) {
            return url.split(`/${category}/`)[1].split('/')[0]
        }
    }

    getCurrentUrl() {
        let url = window.location.href;
        if (url.includes('/pre_category') || url.includes('/category')) {
            return url.split('/').pop();
        } else {
            return null
        }
    }

    handleChangeContext = (e, context) => {
        console.log(e, context)
    };

    render() {
        const {
            activeCategory, activePreCategory, backgroundColor,
            start_range_value, min_price_range, dataPublishingArray,
            max_price_range, dataAuthorArray, items, category_name,
            dataLanguageArray, dataCoverArray, pre_category_name,
            pre_category
        } = this.state;
        console.log(activeCategory, activePreCategory);
        return (
            <div className={'wrapper_category_page'}
                 style={{background: backgroundColor}}>
                <div className={'wrapper_category_title'}>
                    {category_name !== null
                        ? <Link to={`/category/${activeCategory}`} className={'category_title'}>
                            {category_name}
                        </Link>
                        : null}
                    {pre_category_name !== null
                        ? <Link to={`/category/${activeCategory}`} className={'category_title'}>
                            {pre_category_name}
                        </Link>
                        : null}
                </div>
                {activePreCategory !== null
                    ? <MainFilters start_range_value={start_range_value}
                                   dataPublishingArray={dataPublishingArray}
                                   dataCoverArray={dataCoverArray}
                                   dataAuthorArray={dataAuthorArray}
                                   dataLanguageArray={dataLanguageArray}
                                   addingToActiveArray={this.addingToActiveArray}
                                   min_price_range={min_price_range}
                                   max_price_range={max_price_range}
                                   changeRangeValue={this.changeRangeValue}/>
                    : null
                }
                {activeCategory !== null && activePreCategory === null
                    ? <MapPreCategory pre_category={pre_category}
                                      activeCategory={activeCategory}/>
                    : null}
                <div className={'wrapper_mapping_popular_in_category'}>
                    {activeCategory !== null
                    && activePreCategory === null
                    && items !== null
                        ? <Title title={'Популярне в категорії'}/>
                        : null}
                </div>
                {items
                    ? <MapAdminItems items={items}/>
                    : null}
            </div>
        );
    }
}
