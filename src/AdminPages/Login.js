import React, { useState, useEffect } from 'react';
import API from "../API";

import "../adminComponents/style/login.scss"

import Logo from "../assets/thebooks-logo_black.svg"

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        API.post(`/admin/login`, {login, password})
            .then(res => {
                console.log(res);
                localStorage.setItem('adminToken', res.data.access_token)
                console.log(localStorage)
            })
    }

    return (
        <main>
            <section className="login">
                <div className="login__wrapper">
                    <div className="login__logo">
                        <img className="login__source" src={Logo} alt="TheBooks" />
                    </div>
                    
                    <form className="login-form" onSubmit={(event) => handleSubmit(event)}>
                        <input className="login-form__input" type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} required/>
                        
                        <input className="login-form__input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        
                        <button className="login-form__submit" type="submit">Увійти</button>
                    </form>
                    
                    <p className="login__text">Made by <a className="login__link" href="https://www.movadex.com/" target="_blank" rel="noopener noreferrer">Movadex</a></p>
                </div>
            </section>
        </main>
    );
};

export default LoginPage