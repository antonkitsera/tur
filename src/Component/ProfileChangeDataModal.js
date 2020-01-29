import React from 'react';
import close_modal from "../image/close_modal.svg";
import OrderingFormInputs from "./OrderingFormInputs";
import CourierDelivery from "./CouriesDelivery";

export default function ProfileChangeDataModal(props) {
        return (
        <div className={'dataChangeModal'}
             ref={props.change_data_ref}
             onClick={props.eventDataChange}>
            <div className={'dataChange'}>
                <img src={close_modal}
                     onClick={props.handleHiddenDataModal}
                     alt={"close"}
                     className={'close_window'}/>
                <span className={'modal_title'}>Зміна персональних даних</span>
                <form className={'passwordChangingWrapper'} onSubmit={props.handleSubmitDataModal}>
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
                    <OrderingFormInputs name_inputs={'E-mail *'}
                                        name={'email'}
                                        error={props.emailError}
                                        values={props.email}
                                        handleChange={props.handleChange}/>
                    <OrderingFormInputs name_inputs={'Телефон *'}
                                        name={'phone'}
                                        error={props.phoneError}
                                        values={props.phone}
                                        handleChange={props.handleChange}/>
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
                    {props.cityRef !== null
                        ? <CourierDelivery handleChange={props.handleChange}
                                           street={props.street}
                                           apartment={props.apartment}
                                           streetArray={props.streetArray}
                                           streetError={props.streetError}/>
                        : null
                    }
                    <div className={'btn_wrapper'}>
                        <button>Зберегти</button>
                        <div className={'close_window_btn'}
                             onClick={props.handleHiddenDataModal}>
                            Закрити
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};
