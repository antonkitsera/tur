import React from 'react';
import '../global_main.css';
import './style/ordering.css';
import {changeQuantity, changePrice} from "../main-store/actions";
import {
    changeStreet, changeStreetArray, changeStreetRef,
    changeCityArray, changeCity, changeCityRef,
    changeDepartment, changeDepartmentRef, changeDepartmentArray,
    changeApartment, changeHouse
} from "../main-store/deliveryAction";
import {connect} from "react-redux";
import OrderingCart from '../Component/OrderingCart';
import OrderingForm from '../Component/OrderingForm';
import axios from 'axios';

const APIKEY = 'aae57042a6e8bdc7b0007496a9e80e7e';

class OrderBooks extends React.Component {
    state = {
        name: '',
        surname: '',
        email: '',
        phone_number: '',
        houseError: null,
        apartmentError: null,
        description: '',
        cityError: null,
        streetError: null,
        delivery: 0,
        nameError: null,
        departmentError: null,
        surnameError: null,
        emailError: null,
        phone_numberError: null,
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    componentDidMount() {
        axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
            "apiKey": APIKEY,
            "modelName": "Address",
            "calledMethod": "getAreas",
        })
            .then(res => this.setState({regionArray: res.data.data}));
    }

    handleChange = event => {
        switch (event.target.name) {
            case 'description':
                this.setState({description: event.target.value});
                break;
            case 'phone_number':
                this.setState({
                    phone_number: event.target.value,
                    phone_numberError: null
                });
                break;
            case 'apartment':
                this.setState({apartmentError: null});
                this.props.changeApartment(event.target.value);
                break;
            case 'house':
                this.setState({houseError: null});
                this.props.changeHouse(event.target.value);
                break;
            case 'email':
                this.setState({
                    email: event.target.value,
                    emailError: null
                });
                break;
            case 'chooseCity':
                let cityRef = event.target.getAttribute('data-key');
                this.props.changeCityRef(cityRef);
                this.props.changeCityArray(null);
                this.props.changeCity(event.target.value);
                this.setState({cityError: null});
                break;
            case 'chooseDepartment':
                let departmentRef = event.target.getAttribute('data-key');
                this.props.changeDepartmentRef(departmentRef);
                this.props.changeDepartmentArray(null);
                this.props.changeDepartment(event.target.value);
                this.setState({departmentError: null});
                break;
            case 'chooseStreet':
                let streetRef = event.target.getAttribute('data-key');
                this.setState({streetError: null});
                this.props.changeStreetRef(streetRef);
                this.props.changeStreetArray(null);
                this.props.changeStreet(event.target.value);
                break;
            case 'name':
                this.setState({
                    name: event.target.value,
                    nameError: null
                });
                break;
            case 'surname':
                this.setState({
                    surname: event.target.value,
                    surnameError: null
                });
                break;
            case 'city':
                let city = event.target.value.trim();
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
            case 'delivery':
                this.setState({
                    delivery: Number(event.target.value),
                    deliveryError: null
                });
                break;
            case 'street':
                let street_value = event.target.value.toLowerCase();
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
            case 'department':
                let department = event.target.value.trim();
                this.props.changeDepartment(department);
                this.setState({departmentError: null});
                axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
                        "modelName": "AddressGeneral",
                        "calledMethod": "getWarehouses",
                        "methodProperties": {
                            'CityRef': this.props.cityRef,
                            'FindByString': department
                        },
                        "apiKey": APIKEY,
                    }
                ).then(res => {
                    if (this.props.department.length >= 1) {
                        this.props.changeDepartmentArray(res.data.data)
                    }
                });
                break;
            default:
                return
        }
    };

    render() {
        const {
            name, phone_number, description, cityError,
            email, delivery, apartmentError, streetError,
            surname, surnameError, houseError,
            emailError, nameError, phone_numberError,
            departmentError,
        } = this.state;
        return (
            <div className={'wrapper_ordering_books'}>
                <div className={'content_wrapper'}>
                    {this.props.cart.length !== 0
                        ? <>
                            <OrderingForm handleSubmit={this.handleSubmit}
                                          name={name}
                                          cityRef={this.props.cityRef}
                                          surname={surname}
                                          cityError={cityError}
                                          email={email}
                                          departmentArray={this.props.departmentArray}
                                          department={this.props.department}
                                          departmentError={departmentError}
                                          apartmentError={apartmentError}
                                          apartment={this.props.apartment}
                                          streetError={streetError}
                                          streetArray={this.props.streetArray}
                                          house={this.props.house}
                                          houseError={houseError}
                                          emailError={emailError}
                                          surnameError={surnameError}
                                          nameError={nameError}
                                          street={this.props.street}
                                          phone_numberError={phone_numberError}
                                          phone={phone_number}
                                          cityArray={this.props.cityArray}
                                          city={this.props.city}
                                          delivery={delivery}
                                          description={description}
                                          handleChange={this.handleChange}/>
                            <OrderingCart cart={this.props.cart}
                                          price={this.props.price}
                                          changePrice={this.props.changePrice}
                                          changeQuantity={this.props.changeQuantity}
                            />
                        </>
                        : <div className={'empty_cart'}>
                            <span>Щоб оформити замовлення добавте товар в корзину</span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {cart, price} = state.shop;
    const {
        department, departmentRef, departmentArray,
        city, cityRef, cityArray, house,
        apartment, street, streetArray, streetRef
    } = state.delivery;
    return {
        cart: cart,
        house: house,
        price: price,
        department: department,
        departmentRef: departmentRef,
        departmentArray: departmentArray,
        city: city,
        cityRef: cityRef,
        cityArray: cityArray,
        apartment: apartment,
        street: street,
        streetRef: streetRef,
        streetArray: streetArray,
    }
};

const putStateToState = {
    changeQuantity,
    changePrice,
    changeCityArray,
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

export default connect(mapStateToProps, putStateToState)(OrderBooks)
