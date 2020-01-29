import React, { useState, useRef, useEffect} from 'react';
import API from "../API";

import Layout from "../adminComponents/Layout"
import IconExit from "../assets/g-modal-close.svg"

import "../adminComponents/style/orders.scss"

const OrdersPage = () => {

    const [ordersData, setOrdersData] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modal, setModal] = useState(false);
    const [options, setOptions] = useState({
        processed: false, 
        page: 8, 
        per_page: 20
    });
    const ref = useRef();

    useEffect(() => {
        API.get(`/admin/orders`, {processed: options.processed, page: options.page, per_page: options.per_page})
        .then(res => {
            console.log(res);
            
            setOrdersData(res.data.orders)
        })
        
        document.addEventListener("mousedown", handleModalOutside);
        return () => document.removeEventListener("mousedown", handleModalOutside);
    }, []);

    const handleTabNew = () => {
        setOptions({...options, processed: false});

        API.get(`/admin/orders`)
        .then(res => {
            console.log(res);
            
            setOrdersData([]);
            setOrdersData(res.data.orders)
        })
    }

    const handleTabOld = () => {
        setOptions({...options, processed: true});

        API.get(`/admin/orders`, { params: {processed: options.processed, per_page: 50}})
        .then(res => {
            console.log(res);
            
            setOrdersData([]);
            setOrdersData(res.data.orders)
        })
    }

    const handleModal = () => {
        setModal(!modal);
    }

    const handleModalOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setModal(false);
        }
    }
    
    return (
        <Layout>
            <section className="orders">
                <div className="orders__wrapper container">

                    {modal ? <div className="orders-modal">
                        <div ref={ref} className="orders-modal__wrapper">
                            <div className="orders-modal__head">
                                <h4 className="orders-modal__title">Замовлення</h4>
                                <img className="orders-modal__icon" src={IconExit} alt="Замовлення" onClick={handleModal}/>
                            </div>

                            {// TO-DO overflow 
                            }
                            <table className="orders-modal-table">
                                <tbody className="orders-modal-table__body">
                                    <tr className="orders-modal-table__tr">
                                        <td className="orders-modal-table__td">1.</td>
                                        <td className="orders-modal-table__td">
                                            <img className="orders-modal-table__book" src="https://marketplace.canva.com/EADajpcXwvU/1/0/501w/canva-rust-orange-lioness-vintage-book-cover-2r7-sbV3ztw.jpg" alt="Книга"/>
                                        </td>
                                        <td className="orders-modal-table__td">
                                            <h5 className="orders-modal-table__title">Бродяги Дхарми</h5>
                                            <h6 className="orders-modal-table__author">Джек Керуак</h6>
                                        </td>
                                        <td className="orders-modal-table__td">1</td>
                                        <td className="orders-modal-table__td">₴205</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="orders-modal__footer">
                                <p className="orders-modal__sum">Сума: ₴205</p>
                                <button className="orders-modal__close g-add"  onClick={handleModal}>Закрити</button>
                            </div>
                        </div>
                    </div> : null}


                    <div className="orders-view">
                        <button className={`orders-view__new${options.processed ? '' : ' active'}`} onClick={handleTabNew}>Нові</button>
                        <button className={`orders-view__old${options.processed ? ' active' : ''}`} onClick={handleTabOld}>Архів</button>
                    </div>

                    <table className="orders-table">
                        <thead className="orders-table__head">
                            <tr className="orders-table__tr">
                                <th className="orders-table__th">#</th>
                                <th className="orders-table__th">Дата</th>
                                <th className="orders-table__th">Замовлення</th>
                                <th className="orders-table__th">E-mail</th>
                                <th className="orders-table__th">Сума, грн</th>
                                <th className="orders-table__th">Номер телефону</th>
                                <th className="orders-table__th">Коментар</th>
                                <th className="orders-table__th">Доставка</th>
                                <th className="orders-table__th">Міста</th>
                                <th className="orders-table__th">Адреса</th>
                            </tr>
                        </thead>

                        <tbody className="orders-table__body">
                        {ordersData.map(item => 
                            <tr className="orders-table__tr" key={item.order_id}>
                                <td className="orders-table__td">{item.order_id}</td>
                                <td className="orders-table__td">{item.date.split(" ")[0]} <span className="orders-table__span">{item.date.split(" ")[1]}</span></td>

                                <td className="orders-table__td">
                                    <button className="g-btn__view" onClick={handleModal}>Переглянути</button>
                                </td>

                                <td className="orders-table__td">{item.email}</td>
                                <td className="orders-table__td">{item.sum}</td>
                                <td className="orders-table__td">{item.number}</td>
                                <td className="orders-table__td">{item.comment}</td>
                                <td className="orders-table__td">{item.delivery_type}</td>
                                <td className="orders-table__td">{item.town}</td>
                                <td className="orders-table__td">{item.address}</td>
                                {options.processed === false ? <td className="orders-table__td"><button className="g-btn__archive" onClick={() => 
                                    API.post(`/admin/orders`, {id: item.order_id})
                                    .then(res => {
                                        console.log(res);
                                    })

                                    // TO-DO fix POST request
                                }>в архів</button></td> : null}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </Layout>
    );
};

export default OrdersPage