import React, { useState, useEffect } from 'react';
import API from "../adminAPI";

import "../adminComponents/style/login.scss"

import Logo from "../assets/thebooks-logo_black.svg"

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(localStorage.getItem('adminToken')) {
            API.get("/admin/language")
            .then(res => {
                if(res.status === 200) {
                    window.location.pathname = "/admin/goods/all"
                }       
            })
        }
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        if(!login || !password) return;

        API.post(`/admin/login`, {login, password})
            .then(res => {
                if(res.data.access_token !== undefined) {
                    localStorage.setItem('adminToken', res.data.access_token);
                    if(localStorage.getItem('adminToken')) {
                        window.location.pathname = "/admin/goods/all"
                    }
                }
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
                        <input className={`login-form__input${login ? " login-form__input_active" : ""}`} type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} required/>
                        
                        <input className={`login-form__input${password ? " login-form__input_active" : ""}`} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        
                        <button className="login-form__submit" type="submit">Увійти</button>
                    </form>
                    
                    <p className="login__text">Made by <a className="login__link" href="https://www.movadex.com/" target="_blank" rel="noopener noreferrer">Movadex</a></p>
                </div>
            </section>
        </main>
    );
};

export default LoginPage