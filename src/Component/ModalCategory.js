import React from 'react'
import {Link} from "react-router-dom";
import './style/header.css'
import CategorySection from './CategorySection'
import black_vector from '../image/black_vector.svg';
import API from "../API";

export default class ModalCategory extends React.Component {
    state = {category: null};

    componentDidMount() {
        API.get('/subcategories')
            .then(res => this.setState({
                category: res.data.categories
            }));
    }

    render() {
        const {category} = this.state;
        console.log(this.props);
        return (
            <div className={'modal_category_wrapper'}
                 onClick={this.props.eventCategoryModal}
                 ref={this.props.category_ref}>
                <div className={'modal_category'}>
                    <div className={'category_forms'}>
                        <Link to={'/delivery_and_pay'}>Доставка та оплата</Link>
                        <a href={'#contacts'}>Контакти</a>
                        <Link to={'/about_the_books'}>Про ЗеБукс</Link>
                        <Link to={'/about_your_personal_account'}>Особистий кабінет</Link>
                        <Link to={'/publishing'} className={'min_width'}>Видавництва</Link>
                        <Link to={'/author'} className={'min_width'}>Автори</Link>
                    </div>
                    <div className="content_wrapper">
                        {category ? < CategorySection changeCategoryModal={this.props.changeCategoryModal}
                                                      category={category}/> : null}
                    </div>
                    <Link to={`/all_items`}
                          onClick={() => this.props.changeCategoryModal}
                          className={'all_books'}>
                        Усі книги
                        <img src={black_vector} alt=""/>
                    </Link>
                </div>
            </div>
        )
    }
}
