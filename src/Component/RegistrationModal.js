import React from 'react';
import OrderingFormInputs from "./OrderingFormInputs";
import passwordShow from "../image/passwordShow.svg";
import {withRouter} from 'react-router-dom';
import close_window from '../image/close_modal.svg';

class RegistrationModal extends React.Component {
    state = {
        password: '',
        passwordError: null,
        email: '',
        emailError: null,
        name: '',
        nameError: null,
        surname: '',
        surnameError: null,
        hiddenPassword: false,
        passwordRepeat: '',
        remember_me: false,
        login_registration_value: 0
    };

    handleChange = e => {
        switch (e.target.name) {
            case 'sign':
                this.setState({
                    login_registration_value: Number(e.target.value)
                });
                break;
            case 'remember_me':
                this.setState({
                    remember_me: e.target.checked
                });
                break;
            case 'password':
                this.setState({
                    password: e.target.value,
                    passwordError: null,
                });
                break;
            case 'email':
                console.log(e.target.value);
                this.setState({
                    email: e.target.value,
                    emailError: null,
                });
                break;
            case 'surname':
                this.setState({
                    surname: e.target.value,
                    surnameError: null,
                });
                break;
            case 'name':
                this.setState({
                    name: e.target.value,
                    nameError: null,
                });
                break;
            case 'passwordRepeat':
                this.setState({
                    passwordRepeat: e.target.value,
                    passwordError: null,
                });
                break;
            default:
                return
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.login_registration_value === 0) {
            this.props.sign_up(true);
            localStorage.setItem('userToken', 'hui');
            this.props.history.push('/personal_account');
            this.props.changeRegistrationModal()
        } else {
            if (this.state.passwordRepeat !== this.state.password) {
                this.setState({
                    passwordError: 'error'
                });
                this.props.sign_up(false)
            } else {
                this.props.sign_up(true);
                localStorage.setItem('userToken', 'hui');
                this.props.changeRegistrationModal();
                this.props.history.push('/personal_account');
            }
        }
    };
    hiddenPasswordChange = () => {
        this.setState({hiddenPassword: !this.state.hiddenPassword})
    };

    render() {
        const {
            name, email, nameError, emailError, password,
            passwordError, passwordRepeat, hiddenPassword,
            surname, surnameError, remember_me, login_registration_value
        } = this.state;
        return (
          <div className={'registration_modal_wrapper'}
                 onClick={this.props.eventRegistrationModal}
                 ref={this.props.registration_ref}>
                <form className={'form_content'} onSubmit={this.handleSubmit}>
                    <div className={'login_registration'}>
                        <input type="radio"
                               value={0}
                               checked={login_registration_value === 0}
                               id={'login'}
                               onChange={this.handleChange}
                               name={'sign'}/>
                        <label htmlFor="login"
                               className={login_registration_value === 0 ? 'active_label' : ''}>
                            Вхід</label>
                        <input type="radio"
                               value={1}
                               checked={login_registration_value === 1}
                               onChange={this.handleChange}
                               id={'registration'}
                               name={'sign'}/>
                        <img src={close_window}
                             onClick={this.props.changeRegistrationModal}
                             className={'close_modal'}
                             alt="close"/>
                        <label htmlFor="registration"
                               className={login_registration_value === 1 ? 'active_label' : ''}>
                            Реєстрація</label>
                    </div>
                    {login_registration_value === 0
                        ? <div className={'wrapper_inputs'}>
                            <OrderingFormInputs name_inputs={'E-mail'}
                                                name={'email'}
                                                error={emailError}
                                                values={email}
                                                handleChange={this.handleChange}/>
                            <div className={'every_inputs'}>
                                <label htmlFor="">Пароль</label>
                                <input type={hiddenPassword ? "text" : "password"}
                                       className={passwordError !== null ? 'error' : null}
                                       name={'password'}
                                       value={password}
                                       onChange={this.handleChange}/>
                                <img src={passwordShow} alt="passwordShow"
                                     onClick={this.hiddenPasswordChange}/>
                            </div>
                        </div>
                        : <div className={'wrapper_inputs'}>
                            <OrderingFormInputs name_inputs={"Ім'я"}
                                                name={'name'}
                                                error={nameError}
                                                values={name}
                                                handleChange={this.handleChange}/>
                            <OrderingFormInputs name_inputs={"Прізвище"}
                                                name={'surname'}
                                                error={surnameError}
                                                values={surname}
                                                handleChange={this.handleChange}/>
                            <OrderingFormInputs name_inputs={'E-mail'}
                                                name={'email'}
                                                error={emailError}
                                                values={email}
                                                handleChange={this.handleChange}/>
                            <div className={'every_inputs'}>
                                <label htmlFor="">Пароль</label>
                                <input type={hiddenPassword ? "text" : "password"}
                                       className={passwordError !== null ? 'error' : null}
                                       name={'password'}
                                       value={password}
                                       onChange={this.handleChange}/>
                                <img src={passwordShow} alt="passwordShow"
                                     onClick={this.hiddenPasswordChange}/>
                            </div>
                            <div className={'every_inputs'}>
                                <label htmlFor="">Підтвердження Паролю</label>
                                <input type={this.hiddenPassword ? "text" : "password"}
                                       className={passwordError !== null ? 'error' : null}
                                       name={'passwordRepeat'}
                                       value={passwordRepeat}
                                       onChange={this.handleChange}/>
                                <img src={passwordShow} alt="passwordShow"
                                     onClick={this.hiddenPasswordChange}/>
                            </div>
                        </div>
                    }
                    <div className={'remember_me'}>
                        <input type="checkbox"
                               id={'remember'}
                               value={remember_me}
                               name={'remember_me'}
                               onChange={this.handleChange}/>
                        <label htmlFor="remember">Запам’ятати мене</label>
                    </div>
                    <button>Увійти</button>
                    <div className={'sign_from_google'}>
                        <span>Вхід через:</span>
                        <div className={'google'}>
                            google
                        </div>
                        <div className={'facebook'}>
                            facebook
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};

export default withRouter(RegistrationModal)
