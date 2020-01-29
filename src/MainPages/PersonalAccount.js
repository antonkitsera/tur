import React, {Component} from 'react'
import '../global_main.css'
import './style/personal_account.css';
import Title from '../Component/Title';
import Subscription from "../Component/Subscription";
import PersonalAccountInfo from '../Component/PersonalAccountInfo';
import ProfileChangeDataModal from "../Component/ProfileChangeDataModal";
import ProfileChangePassword from "../Component/ProfileChangePassword";
import RedirectToStart from "../Component/RedirectToStart";
import {
    changeApartment,
    changeCity,
    changeCityArray,
    changeCityRef,
    changeDepartment,
    changeDepartmentArray,
    changeDepartmentRef, changeHouse, changeStreet, changeStreetArray,
    changeStreetRef
} from "../main-store/deliveryAction";
import {sign_up} from '../main-store/actions';
import {connect} from "react-redux";
import axios from "axios";

const APIKEY = 'aae57042a6e8bdc7b0007496a9e80e7e';

class PersonalAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHistory: null,
            subscribe: '',
            password: '',
            passwordError: null,
            repeatPassword: '',
            oldPassword: '',
            name: 'Мирослав',
            surname: 'Каграманян',
            email: 'stochkomira@gmail.cdwaadwom',
            phone: '+380981317369',
            sale: null,
            password_modal: false,
            data_modal: false,
        };
        this.change_password_ref = React.createRef();
        this.change_data_ref = React.createRef();
    }

    eventPasswordChange = e => {
        if (this.change_password_ref.current === e.target) {
            this.setState(state => ({
                password_modal: !state.password_modal,
            }))
        }
    };

    handleHiddenPasswordModal = () => {
        this.setState(state => ({
            password_modal: !state.password_modal,
        }))
    };

    handleHiddenDataModal = () => {
        this.setState(state => ({
            data_modal: !state.data_modal,
        }))
    };
    handleChangePasswordSubmit = e => {
        e.preventDefault();
        this.setState({password_modal: !this.state.password_modal})
    };
    handleSubmitDataModal = e => {
        e.preventDefault();
        this.setState({data_modal: !this.state.data_modal})
    };

    handleChange = e => {
        switch (e.target.name) {
            case "name" :
                this.setState({name: e.target.value});
                break;
            case "surname" :
                this.setState({surname: e.target.value});
                break;
            case "email" :
                this.setState({email: e.target.value});
                break;
            case "phone" :
                this.setState({
                    phone: e.target.value
                });
                break;
            case 'chooseCity':
                let cityRef = e.target.getAttribute('data-key');
                this.props.changeCityRef(cityRef);
                this.props.changeCityArray(null);
                this.props.changeCity(e.target.value);
                this.setState({cityError: null});
                break;
            case 'apartment':
                this.setState({apartmentError: null});
                this.props.changeApartment(e.target.value);
                break;
            case 'house':
                this.setState({houseError: null});
                this.props.changeHouse(e.target.value);
                break;
            case 'chooseStreet':
                let streetRef = e.target.getAttribute('data-key');
                this.setState({streetError: null});
                this.props.changeStreetRef(streetRef);
                this.props.changeStreetArray(null);
                this.props.changeStreet(e.target.value);
                break;
            case 'street':
                let street_value = e.target.value.toLowerCase();
                this.props.changeStreet(street_value);
                this.setState({streetError: null});
                axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    "modelName": "Address",
                    "calledMethod": "getStreet",
                    "methodProperties": {
                        "CityRef": this.props.cityRef,
                        'FindByString': street_value,
                        'Page': 1
                    },
                    "apiKey": APIKEY
                })
                    .then(res => {
                        if (this.props.street.length > 1) {
                            this.props.changeStreetArray(res.data.data);
                        }
                    });
                break;
            case 'city':
                let city = e.target.value.trim();
                this.props.changeCity(city);
                this.setState({cityError: null});
                axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
                    "modelName": "AddressGeneral",
                    "calledMethod": "getCities",
                    "methodProperties": {
                        "FindByString": city
                    },
                    "apiKey": APIKEY,
                }).then(res => {
                    if (this.props.city.length > 1) {
                        this.props.changeCityArray(res.data.data);
                    }
                });
                break;
            case "old_password" :
                this.setState({
                    oldPassword: e.target.value
                });
                break;
            case "password" :
                this.setState({
                    password: e.target.value
                });
                break;
            case "repeatPassword" :
                this.setState({
                    repeatPassword: e.target.value
                });
                break;
            default :
                return
        }
    };

    eventDataChange = e => {
        if (this.change_data_ref.current === e.target) {
            this.setState(state => ({
                data_modal: !state.data_modal,
            }))
        }
    };

    handleShowHistory = id => {
        if (id === this.state.showHistory) {
            this.setState({
                showHistory: null
            })
        } else {
            this.setState({
                showHistory: Number(id)
            })
        }
    };

    handleEmailSubscribing = e => {
        this.setState({
            subscribe: e.target.value
        })
    };

    handleSubscriptionSubmit = e => {
        e.preventDefault();
    };


    render() {
        const {
            email, phone, sale,
            surname, name, password_modal, data_modal,
            showHistory, subscribe, password, passwordError,
            repeatPassword, oldPassword,
        } = this.state;
        return (
            <div className={'personal_account_wrapper'}>
                <Title title={'Особистий кабінет'}/>
                <div className={'personal_account'}>
                    <div className={'personal_data_wrapper'}>
                        <div className={'personal_data'}>
                            <div className={'section_title'}>
                                <span>Персональні дані</span>
                            </div>
                            <RedirectToStart sign_up={this.props.sign_up} />
                            <div className={'personal_account_info_wrapper'}>
                                <PersonalAccountInfo email={email}
                                                     phone={phone}
                                                     city={this.props.city}
                                                     street={this.props.street}
                                                     streetRef={this.props.streetRef}
                                                     house={this.props.house}
                                                     apartment={this.props.apartment}
                                                     sale={sale}
                                                     surname={surname}
                                                     name={name}/>
                                <div className={'change_button_info'}>
                                    <button className={'change_data'}
                                            onClick={() => this.setState({data_modal: !data_modal})}>
                                        Змінити дані
                                    </button>
                                    <button className={'change_password'}
                                            onClick={() => this.setState({password_modal: !password_modal})}>
                                        Змінити пароль
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={'subscription_wrapper'}>
                        <span className={'title'}>
                            Дізнавайтесь першими про наші новинки та акції
                        </span>
                            <Subscription values={subscribe}
                                          handleChange={this.handleEmailSubscribing}
                                          handleSubmit={this.handleSubscriptionSubmit}/>
                        </div>
                    </div>
                    <div className={'shopping_history_wrapper'}>
                        <span className={'section_title'}>Історія покупок</span>
                        <div className={'accordion'}>
                            <div className={'every_card'}>
                                <div className={showHistory === 1 ? 'cart active_cart' : 'cart'}
                                     onClick={() => this.handleShowHistory(1)}>
                                    <div className={'close_window'}/>
                                    <span className={'date'}>22.11.2018</span>
                                    <span className={'items_length'}>1 позиція</span>
                                    <span className={'price'}>&#8372;2103</span>
                                </div>
                                <div className={showHistory === 1 ? 'content show' : 'content'}>
                                    <div className={'wrapper_name'}>
                                        <span className={'title'}>Бродяги Дхарми</span>
                                        <span className={'desc'}>Джек Керуак</span>
                                    </div>
                                    <span className={'items_length'}>1</span>
                                    <span className={'price'}>&#8372;2103</span>
                                </div>
                            </div>
                            <div className={'every_card'}>
                                <div className={showHistory === 2 ? 'cart active_cart' : 'cart'}
                                     onClick={() => this.handleShowHistory(2)}>
                                    <div className={'close_window'}/>
                                    <span className={'date'}>22.11.2018</span>
                                    <span className={'items_length'}>1 позиція</span>
                                    <span className={'price'}>&#8372;2103</span>
                                </div>
                                <div className={showHistory === 2 ? 'content show' : 'content'}>
                                    <div className={'wrapper_name'}>
                                        <span className={'title'}>Бродяги Дхарми</span>
                                        <span className={'desc'}>Джек Керуак</span>
                                    </div>
                                    <span className={'items_length'}>1</span>
                                    <span className={'price'}>&#8372;2103</span>
                                </div>
                            </div>
                            <div className={'every_card'}>
                                <div className={showHistory === 3 ? 'cart active_cart' : 'cart'}
                                     onClick={() => this.handleShowHistory(3)}>
                                    <div className={'close_window'}/>
                                    <span className={'date'}>22.11.2018</span>
                                    <span className={'items_length'}>1 позиція</span>
                                    <span className={'price'}>&#8372;2103</span>
                                </div>
                                <div className={showHistory === 3 ? 'content show' : 'content'}>
                                    <div className={'wrapper_name'}>
                                        <span className={'title'}>Бродяги Дхарми</span>
                                        <span className={'desc'}>Джек Керуак</span>
                                    </div>
                                    <span className={'items_length'}>1</span>
                                    <span className={'price'}>&#8372;2103</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {data_modal
                    ? <ProfileChangeDataModal
                        eventDataChange={this.eventDataChange}
                        change_data_ref={this.change_data_ref}
                        name={name}
                        cityRef={this.props.cityRef}
                        surname={surname}
                        email={email}
                        handleSubmitDataModal={this.handleSubmitDataModal}
                        phone={phone}
                        city={this.props.city}
                        cityArray={this.props.cityArray}
                        handleChange={this.handleChange}
                        street={this.props.street}
                        streetArray={this.props.streetArray}
                        streetError={this.props.streetError}
                        address={this.props.address}
                        house={this.props.house}
                        apartment={this.props.apartment}
                        handleHiddenDataModal={this.handleHiddenDataModal}/>
                    : null}
                {password_modal
                    ? <ProfileChangePassword
                        handleChangePasswordSubmit={this.handleChangePasswordSubmit}
                        password={password}
                        repeatPassword={repeatPassword}
                        oldPassword={oldPassword}
                        passwordError={passwordError}
                        handleChange={this.handleChange}
                        eventPasswordChange={this.eventPasswordChange}
                        handleHiddenPasswordModal={this.handleHiddenPasswordModal}
                        change_password_ref={this.change_password_ref}/>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        house: state.delivery.house,
        department: state.delivery.department,
        departmentRef: state.delivery.departmentRef,
        departmentArray: state.delivery.departmentArray,
        city: state.delivery.city,
        cityRef: state.delivery.cityRef,
        cityArray: state.delivery.cityArray,
        apartment: state.delivery.apartment,
        street: state.delivery.street,
        streetRef: state.delivery.streetRef,
        streetArray: state.delivery.streetArray,
    }
};

const putStateToState = {
    changeCityArray,
    sign_up,
    changeCity,
    changeCityRef,
    changeDepartment,
    changeDepartmentRef,
    changeDepartmentArray,
    changeStreetRef,
    changeApartment,
    changeStreetArray,
    changeStreet,
    changeHouse
};
export default connect(mapStateToProps, putStateToState)(PersonalAccount)
