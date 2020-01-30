import React from 'react'
import './style/header.css'
import logo from '../image/logo.svg'
import {Link} from 'react-router-dom'
import SearchForm from '../Component/SearchForm'
import HeaderCart from '../Component/HeaderCart'
import {Dropdown} from 'react-bootstrap'
import profile_img from '../image/profile_img.svg'
import {connect} from 'react-redux'
import CartModal from "./CartModal"
import ModalCategory from './ModalCategory';
import RegistrationModal from './RegistrationModal';
import {sign_up} from "../main-store/actions";

function Header(props) {
    let price = 0;
    props.cart.forEach(item => {
        price += item.price.new * item.quantity
    });
    console.log(props);
    return (
        <div className={'header_wrapper'}>
            <Link className={'logo_wrapper'} to={'/'}>
                <img src={logo} alt=""/>
            </Link>
            <div className={'info_container'}>
                <div className={'category_forms'}>
                    <Link to={'/delivery_and_pay'}>Доставка та оплата</Link>
                    <a href={'#contacts'}>Контакти</a>
                    <Link to={'/about_the_books'}>Про ЗеБукс</Link>
                    <Link to={'/about_your_personal_account'}>Особистий кабінет</Link>
                    <Link to={'/publishing'} className={'min_width'}>Видавництва</Link>
                    <Link to={'/author'} className={'min_width'}>Автори</Link>
                </div>
                <div className={'info'}>
                    <div className={'category_wrapper'} onClick={props.changeCategoryModal}>
                        <div className={'burger_menu_wrapper'}>
                            <div className={props.burger ? 'burger_menu_active' : 'burger_menu'}/>
                        </div>
                        <span>Усі розділи</span>
                    </div>
                    <SearchForm handleChange={props.handleChange}
                                quantityItems={props.quantityItems}
                                authors={props.authors}
                                quantityAuthors={props.quantityAuthors}
                                deleteSearchList={props.deleteSearchList}
                                searchItemsArray={props.searchItemsArray}
                                search_items={props.search_items}/>
                </div>
            </div>
            <div className={'info_wrapper'}>
                {/*create without bootstrap*/}
                <Dropdown className={'our_number'}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <span>068-111-22-33</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            <span>068-111-22-33</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className={'wrapper_cart_login'}>
                    <Link to={props.sign_up ? '/personal_account' : '/'}
                          onClick={props.sign_up ? null : props.changeRegistrationModal}>
                        <div className={'profile_img_wrapper'}>
                            <img src={profile_img} alt="you_img"/>
                        </div>
                        <div className={'registration_wrapper'}>
                            <span>{props.sign_up ? 'Мирослав' : 'Вхід/Реєстрація'}</span>
                        </div>
                    </Link>
                    <HeaderCart changeCartModal={props.changeCartModal}
                                price={price}
                                cart={props.cart}/>
                </div>
            </div>
            {props.cart_modal
                ? <CartModal eventCartModal={props.eventCartModal}
                             price={price}
                             cart_ref={props.cart_ref}
                             cart={props.cart}
                             changeCartModal={props.changeCartModal}/>
                : null
            }
            {props.registration_modal
                ? <RegistrationModal eventRegistrationModal={props.eventRegistrationModal}
                                     login_registration_value={props.login_registration_value}
                                     handleChange={props.handleChange}
                                     password={props.password}
                                     sign_up={props.sign_up_func}
                                     passwordError={props.passwordError}
                                     passwordRepeat={props.passwordRepeat}
                                     email={props.email}
                                     emailError={props.emailError}
                                     usernameError={props.usernameError}
                                     name={props.name}
                                     nameError={props.nameError}
                                     surname={props.surname}
                                     surnameError={props.surnameError}
                                     handleSubmit={props.handleSubmit}
                                     changeRegistrationModal={props.changeRegistrationModal}
                                     registration_ref={props.registration_ref}/>
                : null}
            {props.category_modal ? <ModalCategory changeCategoryModal={props.changeCategoryModal}
                                                   eventCategoryModal={props.changeCategoryModal}/> : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        price: state.shop.price,
        cart: state.shop.cart,
        sign_up: state.shop.sign_up
    }
};
const putStateToProps = {
    sign_up_func: sign_up
};
export default connect(mapStateToProps, putStateToProps)(Header);
