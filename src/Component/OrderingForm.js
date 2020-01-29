import React from 'react';
import Title from "./Title";
import OrderingFormInputs from './OrderingFormInputs';
import DepartmentDelivery from "./DepartmentDelivery";
import CourierDelivery from "./CouriesDelivery";

export default function OrderingForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <Title title={'Оформлення замовлення'}/>
            <div className={'form_content'}>
                <div className={'section_name'}>
                    <span>1. Контактні дані</span>
                </div>
                <div className={'form_content_inputs'}>
                    <OrderingFormInputs name_inputs={'Ім’я *'}
                                        name={'name'}
                                        error={props.nameError}
                                        values={props.name}
                                        handleChange={props.handleChange}/>
                    <OrderingFormInputs name_inputs={'Прізвище *'}
                                        name={'surname'}
                                        error={props.surnameError}
                                        values={props.surname}
                                        handleChange={props.handleChange}/>
                    <OrderingFormInputs name_inputs={'Ваш e-mail *'}
                                        name={'email'}
                                        error={props.emailError}
                                        values={props.email}
                                        handleChange={props.handleChange}/>
                    <OrderingFormInputs name_inputs={'Номер телефону *'}
                                        name={'phone_number'}
                                        values={props.phone}
                                        error={props.phone_numberError}
                                        handleChange={props.handleChange}/>
                    <OrderingFormInputs name_inputs={'Коментар до замовлення'}
                                        name={'description'}
                                        values={props.description}
                                        handleChange={props.handleChange}/>
                </div>
                <div className={'section_name'}>
                    <span>2. Доставка та оплата</span>
                </div>
                <div className={'delivery_and_pay'}>
                    <div className={'change_delivery'}>
                        <div className={'radio_button_wrapper'}>
                            <input type="radio" id={'department'}
                                   value={0}
                                   name={'delivery'}
                                   checked={props.delivery === 0}
                                   onChange={props.handleChange}/>
                            <label htmlFor="department"
                                   className={props.delivery === 0 ? 'active_radio_btn' : null}>
                                Із відділення Нова пошта
                            </label>
                        </div>
                        <div className={'radio_button_wrapper'}>
                            <input type="radio" id={'courier'}
                                   value={1}
                                   name={'delivery'}
                                   checked={props.delivery === 1}
                                   onChange={props.handleChange}/>
                            <label htmlFor="courier"
                                   className={props.delivery === 1 ? 'active_radio_btn' : null}>
                                Доставка кур’єром
                            </label>
                        </div>
                    </div>
                    <div className={'every_selected'}>
                        <OrderingFormInputs name_inputs={'Місто *'}
                                            name={'city'}
                                            error={props.cityError}
                                            values={props.city}
                                            handleChange={props.handleChange}/>
                        <div className={props.cityArray !== null ?
                            'drop_down_city_option' : 'drop_down_city_option unActiveDropDown'}>
                            {props.cityArray !== null ?
                                props.cityArray.map(city => {
                                    return (
                                        <div className={'every_city'} key={city.Ref}>
                                            <input type="radio" id={city.Description}
                                                   name={'chooseCity'}
                                                   data-key={city.Ref}
                                                   onChange={props.handleChange}
                                                   value={city.Description}/>
                                            <label key={city.Description} htmlFor={city.Description}>
                                                {city.Description}
                                            </label>
                                        </div>
                                    )
                                }) : null}
                        </div>
                    </div>
                    {props.delivery === 0 && props.cityRef !== null
                        ? <DepartmentDelivery departmentError={props.departmentError}
                                              department={props.department}
                                              handleChange={props.handleChange}
                                              departmentArray={props.departmentArray}/>
                        : props.delivery === 1 && props.cityRef !== null
                            ? <CourierDelivery handleChange={props.handleChange}
                                               street={props.street}
                                               apartment={props.apartment}
                                               streetArray={props.streetArray}
                                               streetError={props.streetError}/>
                            : null
                    }
                </div>
            </div>
            <button>Перейти до оплати</button>
        </form>
    )
}
