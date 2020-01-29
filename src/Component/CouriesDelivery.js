import React from 'react'
import OrderingFormInputs from "./OrderingFormInputs";

function CourierDelivery(props) {
    return (
        <div className={'every_selected courier_delivery'}>
            <OrderingFormInputs name_inputs={'Вулиця *'}
                                name={'street'}
                                error={props.streetError}
                                values={props.street}
                                handleChange={props.handleChange}/>
            <div className={props.streetArray ?
                'street_select': 'street_select unActiveDropDown'}>
                {props.streetArray !== null ?
                    props.streetArray.map(item => {
                        return (
                            <div className={props.streetArray !== null ?
                                'every_department' : 'every_department unActiveDropDown'}
                                 key={item.Ref}>
                                <input type="radio" id={item.Description}
                                       name={'chooseStreet'}
                                       data-key={item.Ref}
                                       onChange={props.handleChange}
                                       value={item.Description}/>
                                <label key={item.Description} htmlFor={item.Description}>
                                    {item.Description}
                                </label>
                            </div>
                        )
                    }) : null}
            </div>
            <div className={'courier_house'}>
                <OrderingFormInputs name_inputs={'Будинок *'}
                                    name={'house'}
                                    error={props.houseError}
                                    values={props.house}
                                    handleChange={props.handleChange}/>
                <OrderingFormInputs name_inputs={'Кв/Офіс *'}
                                    name={'apartment'}
                                    error={props.apartmentError}
                                    values={props.apartment}
                                    handleChange={props.handleChange}/>
            </div>
        </div>
    )
}

export default CourierDelivery;
