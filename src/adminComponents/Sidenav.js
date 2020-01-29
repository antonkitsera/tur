import React from "react"
import { NavLink } from 'react-router-dom'

import Logo from "../assets/thebooks-logo_black.svg"

import ItemsIcon from "../assets/sidenav-icon-items.svg"
import AdvIcon from "../assets/sidenav-icon-adv.svg"
import AuthorsIcon from "../assets/sidenav-icon-authors.svg"
import PublIcon from "../assets/sidenav-icon-publ.svg"
import CategIcon from "../assets/sidenav-icon-categories.svg"
import OrdersIcon from "../assets/sidenav-icon-orders.svg"
import SalesIcon from "../assets/sidenav-icon-sales.svg"
import StatsIcon from "../assets/sidenav-icon-stats.svg"
import UsersIcon from "../assets/sidenav-icon-users.svg"
import RequestsIcon from "../assets/sidenav-icon-requests.svg"

import ExitIcon from "../assets/sidenav-icon-exit.svg"

const Sidenav = () => (
    <section className="sidenav">
        <div className="sidenav__wrapper">
            <div className="sidenav-logo">
                <img className="sidenav-logo__source" src={Logo} alt="TheBooks"/>
            </div>

            <ul className="sidenav-list">
                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/goods/all">
                        <img className="sidenav-list__icon" src={ItemsIcon} alt="Товари"/>
                        Товари
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/banners">
                        <img className="sidenav-list__icon" src={AdvIcon} alt="Банери"/>
                        Банери
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/authors">
                        <img className="sidenav-list__icon" src={AuthorsIcon} alt="Автори"/>
                        Автори
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/publishments">
                        <img className="sidenav-list__icon" src={PublIcon} alt="Видавництва"/>
                        Видавництва
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/categories/1">
                        <img className="sidenav-list__icon" src={CategIcon} alt="Категорії"/>
                        Категорії
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/orders">
                        <img className="sidenav-list__icon" src={OrdersIcon} alt="Замовлення"/>
                        Замовлення
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/sales">
                        <img className="sidenav-list__icon" src={SalesIcon} alt="Знижки"/>
                        Знижки
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/stats">
                        <img className="sidenav-list__icon" src={StatsIcon} alt="Статистика"/>
                        Статистика
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/users">
                        <img className="sidenav-list__icon" src={UsersIcon} alt="Користувачі"/>
                        Користувачі
                    </NavLink>
                </li>

                <li className="sidenav-list__item">
                    <NavLink className="sidenav-list__link" activeClassName="active" to="/admin/requests">
                        <img className="sidenav-list__icon" src={RequestsIcon} alt="Заявки"/>
                        Заявки
                    </NavLink>
                </li>
            </ul>
        </div>

        <a className="sidenav-exit" href="/">
            <img className="sidenav-exit__icon" src={ExitIcon} alt="Goods"/>
            Вихід
        </a>
    </section>
);

export default Sidenav;