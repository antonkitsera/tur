import React from 'react';
import '../global_main.css'
import './style/main.css'
import AllCategory from '../Component/AllCategory'
import ItemsSlider from "../Component/ItemsSlider";
import Title from '../Component/Title';
import PopularPreCategory from '../Component/PopularPreCategory'
import ChangeSection from '../Component/ChangeSection'
import Subscription from '../Component/Subscription'
import CategorySection from '../Component/CategorySection'
import info_logo from "../image/info_logo.png";
import {background_color_changing} from '../BackgroundKids'
import API from "../API";

export default class Main extends React.Component {
    state = {
        radio_value: 1,
        backgroundColor: null,
        categories: null,
        email: '',
        popular_pre_categories: null,
        sp_categories: null,
        sp_categories_items: null,
        category: null,
        random_child_items: null,
        items_watching: null
    };

    handleChange = event => {
        let value = parseInt(event.target.value);
        this.setState({
            radio_value: value
        }, () => {
            API.get(`/sp-categories?id=${this.state.radio_value}`)
                .then(res => this.setState({
                    sp_categories_items: res.data.books
                }))
        })
    };

    handleSubscriptionEmail = async event => {
        await this.setState({
            email: event.target.value
        })
    };
    handleSubscriptionSubmit = event => {
        event.preventDefault();
    };

    componentDidMount() {
        let color = this.changingColor(0, 7);
        this.setState({
            backgroundColor: background_color_changing[color]
        });
        API.get('/categories')
            .then(res => this.setState({
                categories: res.data.categories
            }));
        API.get('/subcategories')
            .then(res => this.setState({
                category: res.data.categories
            }));
        API.get('/popular')
            .then(res => this.setState({
                popular_pre_categories: res.data.categories
            }));
        API.get('/rand-books')
            .then(res => this.setState({
                random_child_items: res.data.books
            }));
        API.get('/sp-categories')
            .then(res => {
                this.setState({
                    sp_categories: res.data.sp_categories
                })
            });
        API.get(`/sp-categories?id=${this.state.radio_value}`)
            .then(res => this.setState({
                sp_categories_items: res.data.books
            }))
        API.get('/watching')
            .then(res => {
                console.log(res)
                this.setState({
                    items_watching: res.data.categories
                })
            });
    }

    changingColor(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        const {
            radio_value, backgroundColor, email, sp_categories_items,
            categories, popular_pre_categories, sp_categories, category,
            random_child_items, items_watching
        } = this.state;
        console.log(items_watching);
        return (
            <div className={'wrapper_main_page'}>
                {categories ?
                    <AllCategory categories={categories}/>
                    : null}
                {popular_pre_categories !== null
                    ?
                    <div className={'popular_sections_wrapper'}>
                        <Title title={'Популярні розділи'}/>
                        <div className={'popular_sections'}>
                            {popular_pre_categories.map(item => {
                                return <PopularPreCategory item={item}
                                                           key={item.subcategory.id}/>
                            })}
                        </div>
                    </div>
                    : null}
                <div className={'top_news_top_section'}>
                    {sp_categories !== null
                        ? <ChangeSection radio_value={radio_value}
                                         sp_categories={sp_categories}
                                         handleChange={this.handleChange}/>
                        : null
                    }
                    {sp_categories_items !== null
                        ? <ItemsSlider items={sp_categories_items}/>
                        : null}
                </div>
                {random_child_items !== null
                    ? <div className={'books_for_kids'} style={{background: backgroundColor}}>
                        <Title title={'Книги для дітей'}/>
                        <ItemsSlider items={random_child_items}/>
                    </div>
                    : null}
                {category !== null
                    ? <div className={'wrapper_category_section'}>
                        <Title title={'Усі категорії'}/>
                        <div className={'all_category_main_page'}>
                            <CategorySection category={category}/>
                        </div>
                    </div>
                    : null}
                <div className={'info_section'}>
                    <div className={'info_wrapper'}>
                        <div className={'every_items'}>
                            <img src={info_logo} alt=""/>
                            <div className={'content_wrapper'}>
                                <span className={'title'}>Понад 50000 товарів</span>
                                <span className={'desc'}>
                                    Широкий вибір товарів для розвитку дитини в одному сайт
                                </span>
                            </div>
                        </div>
                        <div className={'every_items'}>
                            <img src={info_logo} alt=""/>
                            <div className={'content_wrapper'}>
                                <span className={'title'}>Понад 50000 товарів</span>
                                <span className={'desc'}>
                                    Широкий вибір товарів для розвитку дитини в одному сайт
                                </span>
                            </div>
                        </div>
                        <div className={'every_items'}>
                            <img src={info_logo} alt=""/>
                            <div className={'content_wrapper'}>
                                <span className={'title'}>Понад 50000 товарів</span>
                                <span className={'desc'}>
                                    Широкий вибір товарів для розвитку дитини в одному сайт
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'subscription_wrapper'}>
                        <span className={'title'}>
                            Дізнавайтесь першими про наші новинки та акції
                        </span>
                        <Subscription values={email}
                                      handleChange={this.handleSubscriptionEmail}
                                      handleSubmit={this.handleSubscriptionSubmit}/>
                    </div>
                </div>
                {items_watching !== null
                    ? <div className={'are_now_viewing'}>
                        <Title title={'Зараз переглядають'}/>
                        <ItemsSlider items={items_watching}/>
                    </div>
                    : null}
            </div>
        );
    }
}
