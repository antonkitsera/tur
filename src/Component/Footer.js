import React from 'react';
import './style/footer.css'
import Subscription from './Subscription'
import {Link} from 'react-router-dom';
import mastercard from '../image/mastercard_footer.svg'
import visa from '../image/visa_footer.svg'
import logo from '../image/logo.svg'
import ScrollableAnchor from 'react-scrollable-anchor'

export default class Footer extends React.Component {
    state = {phone_number: ''};
    handleChange = async e => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            if (this.state.phone_number.length <= 12) {
                await this.setState({phone_number: e.target.value})
            }
        }
    };
    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        return (
            <div className={'footer_wrapper'}>
                <div className={'another_links_wrapper'}>
                    <Link to={''}>Доставка та оплата</Link>
                    <Link to={''}>Контакти</Link>
                    <Link to={''}>Про ЗеБукс</Link>
                    <Link to={''}>Про особистий кабінет</Link>
                    <Link to={''}>Видавництва</Link>
                    <Link to={''}>Автори</Link>
                </div>
                <div className={'subscription_wrapper'}>
                    <span>Замовте дзвінок</span>
                    <Subscription handleSubmit={this.handleSubmit}
                                  values={this.state.phone_number}
                                  handleChange={this.handleChange}/>
                    <div className={'wrapper_phone'}>
                        <span>068-111-22-33</span>
                        <span className={'right_side'}>Instagram</span>
                        <span>068-111-22-33</span>
                        <span className={'right_side'}>Facebook</span>
                        <span>thebooks@gmail.com</span>
                    </div>
                </div>
                <div className={'work_schedule_wrapper'}>
                    <div className={'work_schedule'}>
                        <span>Понеділок - П’ятниця</span>
                        <span>8:00 - 20:00</span>
                    </div>
                    <div className={'work_schedule'}>
                        <span>Субота - Неділя</span>
                        <span>10:00 - 16:00</span>
                    </div>
                    <div className={'image_wrapper'}>
                        <img src={visa} alt="visa"/>
                        <img src={mastercard} alt="mastercard"/>
                    </div>
                </div>
                <div className={'wrapper_logo_footer'}>
                    <img src={logo} alt="logo"/>
                </div>
                <ScrollableAnchor id={'contacts'}>
                    <div className={'made_in_wrapper'}>
                        <span>2019 thebooks. All rights reserved</span>
                        <span>Публічна оферта</span>
                        <a href={'https://www.movadex.com'}>by Movadex</a>
                    </div>
                </ScrollableAnchor>
            </div>
        )
    }
}
