import React from 'react';

export default function PersonalAccountInfo(props) {
    return (
        <div className={'personal_account_info'}>
            <span className={'title'}>Ім’я:</span>
            <span className={'info'}>{props.name}</span>
            <span className={'title'}>Прізвище:</span>
            <span className={'info'}>{props.surname}</span>
            <span className={'title'}>E-mail:</span>
            <span className={'info'}>{props.email}</span>
            <span className={'title'}>Телефон:</span>
            <span className={'info'}>{props.phone}</span>
            <span className={'title'}>Місто доставки:</span>
            <span className={'info'}>{props.city}</span>
            <span className={'title'}>Адреса доставки:</span>
            <span className={'info'}>
                {props.streetRef !== null ?<>
                    вул. {props.street} {props.house} кв. {props.house}
                </> : null}
            </span>
            {props.sale !== null
                ? <>
                    <span className={'title'}>Ваша знижка:</span>
                    <span className={'info'}>{props.sale}%</span>
                </>
                : null}
        </div>
    )
}
