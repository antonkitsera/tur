import React, { useState, useEffect } from 'react';
import Layout from '../adminComponents/Layout';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import API from "../adminAPI";


import "../adminComponents/style/users.scss"

import UserItemPage from "../adminComponents/UserItem"

const UsersPage = ({match}) => {

    const [usersData, setUsersData] = useState([]);
    const [usersTotal, setUsersTotal] = useState(0);

    const [userItemStatus, setUserItemStatus] = useState(false);

    useEffect(() => {
        API.get("/admin/users")
        .then(res => {
            setUsersTotal(res.data.total_users)
            setUsersData(res.data.users)
        });
        
        if(match.params.id !== undefined) {
            setUserItemStatus(true);
        } else {
            setUserItemStatus(false);
        }
    }, [match.params.id]);

    const handleUserItem = id => {
        setUserItemStatus(true);
    }

    return (
        <Layout>
            <section className="users">
                <div className="container users__wrapper">
                    {userItemStatus ?
                    <Route path="/admin/users/:id" render={props => <UserItemPage {...props} />}/>
                    :
                    <>
                    <h2 className="users__title">Зареєстрованих користувачів: {usersTotal}</h2>

                    <table className="users-table">
                        <thead className="users-table__head">
                            <tr className="users-table__tr">
                                <th className="users-table__th">#</th>
                                <th className="users-table__th">Дата реєстрації</th>
                                <th className="users-table__th">Ім'я</th>
                                <th className="users-table__th">Витрачено, грн</th>
                                <th className="users-table__th">Знижка</th>
                                <th className="users-table__th">Замовлень</th>
                            </tr>
                        </thead>

                        <tbody className="users-table__body">
                            {usersData.map((item, index) =>
                                <tr key={item.id} className="users-table__tr">
                                    <td className="users-table__td">{index}</td>
                                    <td className="users-table__td">{item.date_registration}</td>
                                    <td className="users-table__td">{item.name} {item.surname}</td>
                                    <td className="users-table__td">{item.amount}</td>
                                    <td className="users-table__td">{item.sale}</td>
                                    <td className="users-table__td">{item.orders}</td>
                                    <td className="users-table__td">
                                    <Link className="users-table__button" to={`/admin/users/${item.id}`} onClick={() => handleUserItem(item.id)}>Детальніше</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </>
                    }
                </div>
            </section>
        </Layout>
    );
}

export default UsersPage;
