import React, { useState, useRef, useEffect } from 'react';
import API from "../adminAPI";

import IconExit from "../assets/g-modal-close.svg"

const UserItem = ({match}) => {

    const [userData, setUserData] = useState([]);
    const [userOrders, setUserOrders] = useState([]);

    const [modalData, setModalData] = useState([]);
    const [modal, setModal] = useState(false);
    
    const ref = useRef();

    const handleModalOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setModal(false);
        }
    }

    useEffect(() => {
        API.get(`/admin/user${"/1"}`)
        .then(res => {
            setUserData(res.data.user)
            setUserOrders(res.data.orders)
        });

        if(modal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        document.addEventListener("mousedown", handleModalOutside);
        return () => document.removeEventListener("mousedown", handleModalOutside);
    }, [modal]);

    const handleModal = () => {
        setModal(!modal);
    }

    const handleModalData = id => {
        API.get("/admin/order", { params: { id: id }})
        .then(res => {
            setModalData(res.data)
        });
    }

    return (
        <>
        {modal ? <div className="g-modal">
            <div ref={ref} className="g-modal__wrapper">
                <div className="g-modal__head">
                    <h4 className="g-modal__title">Замовлення</h4>
                    <img className="g-modal__icon" src={IconExit} alt="Замовлення" onClick={handleModal}/>
                </div>

                <table className="g-modal-table">
                    <tbody className="g-modal-table__body">
                        {modalData ? modalData.books ? modalData.books.map((item, index) =>
                            <tr className="g-modal-table__tr" key={item.id}>
                                <td className="g-modal-table__td">{index + 1}.</td>
                                <td className="g-modal-table__td">
                                    <img className="g-modal-table__book" src={item.cover} alt="Книга"/>
                                </td>
                                <td className="g-modal-table__td">
                                    <h5 className="g-modal-table__title">{item.name}</h5>
                                    <h6 className="g-modal-table__author">{item.authors.map(elem => <span className="g-modal-table__author_span" key={elem.id}>{elem.name}</span>)}</h6>
                                </td>
                                <td className="g-modal-table__td">{item.quantity}</td>
                                <td className="g-modal-table__td">₴{item.price}</td>
                            </tr>
                        ) : null : null}
                    </tbody>
                </table>

                <div className="g-modal__footer">
                    <p className="g-modal__sum">Сума: ₴{modalData.total_price}</p>
                    <button className="g-modal__close g-add"  onClick={handleModal}>Закрити</button>
                </div>
            </div>
        </div> : null}

        <div className="user__headline">
            <h2 className="user__title">{userData.name} {userData.surname}</h2>
            <h4 className="user__date">{userData.date_registration}</h4>
        </div>

        <div className="user-info">
            <div className="user-info__block">
                <p className="user-info__key">Ім'я:</p>
                <p className="user-info__value">{userData.name}</p>
    
                <p className="user-info__key">Прізвище:</p>
                <p className="user-info__value">{userData.surname}</p>
    
                <p className="user-info__key">E-mail:</p>
                <p className="user-info__value">{userData.email}</p>
    
                <p className="user-info__key">Телефон</p>
                <p className="user-info__value">{userData.ph_number}</p>
    
            </div>
    
            <div className="user-info__block">
                <p className="user-info__key">Місто доставки:</p>
                <p className="user-info__value">{userData.town}</p>
    
                <p className="user-info__key">Адреса доставки:</p>
                <p className="user-info__value">{userData.address}</p>
    
                <p className="user-info__key">Знижка:</p>
                <p className="user-info__value">{userData.sale}</p>
    
                <p className="user-info__key">Замовлень</p>
                <p className="user-info__value">{userData.orders}</p>
            </div>
        </div>

        <h3 className="user__subtitle">Замовлення</h3>

        <table className="user-table">
            <thead className="user-table__head">
                <tr className="user-table__tr">
                    <th className="user-table__th">#</th>
                    <th className="user-table__th">Дата замовлення</th>
                    <th className="user-table__th">Позицій</th>
                    <th className="user-table__th">Сума, грн</th>
                    <th className="user-table__th">Знижка</th>
                    <th className="user-table__th">
                    Сума зі знижкою, грн</th>
                    <th className="user-table__th">Замовлення</th>
                </tr>
            </thead>

            <tbody className="user-table__body">
                {userOrders.map((item, index) =>
                    <tr key={item.id} className="user-table__tr">
                        <td className="user-table__td">{index}</td>
                        <td className="user-table__td">{item.date}</td>
                        <td className="user-table__td">{item.quantity}</td>
                        <td className="user-table__td">{item.price}</td>
                        <td className="user-table__td">{item.sale}</td>
                        <td className="user-table__td">{item.discount_price}</td>
                        <td className="user-table__td">
                        <button className="user-table__button" onClick={() => {handleModalData(item.id); handleModal();}}>Переглянути</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    );
}

export default UserItem;
