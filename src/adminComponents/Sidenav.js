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

const Sidenav = () => {
    const navObj = [
        {
            id: 1,
            name: "Товари",
            link: "/admin/goods/all",
            icon: ItemsIcon
        },
        {
            id: 2,
            name: "Банери",
            link: "/admin/banners",
            icon: AdvIcon
        },
        {
            id: 3,
            name: "Автори",
            link: "/admin/authors",
            icon: AuthorsIcon
        },
        {
            id: 4,
            name: "Видавництва",
            link: "/admin/publishments",
            icon: PublIcon
        },
        {
            id: 5,
            name: "Категорії",
            link: "/admin/categories/1",
            icon: CategIcon
        },
        {
            id: 6,
            name: "Замовлення",
            link: "/admin/orders",
            icon: OrdersIcon
        },
        {
            id: 7,
            name: "Знижки",
            link: "/admin/sales",
            icon: SalesIcon
        },
        {
            id: 8,
            name: "Статистика",
            link: "/admin/stats",
            icon: StatsIcon
        },
        {
            id: 9,
            name: "Користувачі",
            link: "/admin/users",
            icon: UsersIcon
        },
        {
            id: 10,
            name: "Заявки",
            link: "/admin/requests",
            icon: RequestsIcon
        },
    ]

    return(
    <section className="sidenav">
        <div className="sidenav__wrapper">
            <div className="sidenav-logo">
                <img className="sidenav-logo__source" src={Logo} alt="TheBooks"/>
            </div>

            <ul className="sidenav-list">
                {navObj.map(item =>
                    <li className="sidenav-list__item" key={item.id}>
                        <NavLink className="sidenav-list__link" activeClassName="active" to={item.link}>
                            <img className="sidenav-list__icon" src={item.icon} alt={item.name}/>
                            {item.name}
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>

        <a className="sidenav-exit" href="/">
            <img className="sidenav-exit__icon" src={ExitIcon} alt="Goods"/>
            Вихід
        </a>
    </section>
)};

export default Sidenav;