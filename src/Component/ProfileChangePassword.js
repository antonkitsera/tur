import React, {useState} from 'react';
import close_modal from '../image/close_modal.svg';
import passwordShow from "../image/passwordShow.svg";
import true_value from "../image/true_value.svg";
import false_value from "../image/false_value.svg";

export default function ProfileChangePassword(props) {
    const [hiddenCurrentPassword, showCurrentPassword] = useState(false);
    const [hiddenOldPassword, showOldPassword] = useState(false);
    return (
        <div className={'passwordChangeModal'}
             ref={props.change_password_ref}
             onClick={props.eventPasswordChange}>
            <div className={'passwordChange'}>
                <img src={close_modal}
                     onClick={props.handleHiddenPasswordModal}
                     alt={"close"}
                     className={'close_window'}/>
                <span className={'modal_title'}>Зміна паролю</span>
                <form className={'passwordChangingWrapper'} onSubmit={props.handleChangePasswordSubmit}>
                    <div className={'every_inputs'}>
                        <label htmlFor="">Старий пароль</label>
                        <input type={hiddenOldPassword ? "text" : "password"}
                               className={props.passwordError !== null ? 'error' : null}
                               name={'old_password'}
                               value={props.oldPassword}
                               onChange={props.handleChange}/>
                        <img src={passwordShow} alt="passwordShow"
                             onClick={() => showOldPassword(!hiddenOldPassword)}/>
                    </div>
                    <div className={'every_inputs'}>
                        <label htmlFor="">Новий пароль</label>
                        <input type={hiddenCurrentPassword ? "text" : "password"}
                               name={'password'}
                               value={props.password}
                               onChange={props.handleChange}/>
                        <img src={passwordShow} alt="passwordShow"
                             onClick={() => showCurrentPassword(!hiddenCurrentPassword)}/>
                    </div>
                    <div className={'every_inputs'}>
                        <label htmlFor="">Підтвердіть новий пароль</label>
                        <input type={'password'}
                               name={'repeatPassword'}
                               value={props.repeatPassword}
                               onChange={props.handleChange}/>
                        <img src={props.password.length < 1
                            ? null : props.repeatPassword !== props.password
                                ? false_value : true_value} alt=""/>
                    </div>
                    <div className={'btn_wrapper'}>
                        <button>Зберегти</button>
                        <div className={'close_window_btn'}
                             onClick={props.handleHiddenPasswordModal}>
                            Закрити
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};
