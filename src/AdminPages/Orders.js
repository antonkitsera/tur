import React, { useState, useRef, useEffect} from 'react';
import API from "../adminAPI";

import Layout from "../adminComponents/Layout"
import IconExit from "../assets/g-modal-close.svg"

import "../adminComponents/style/orders.scss"

const OrdersPage = () => {

    const [ordersData, setOrdersData] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modal, setModal] = useState(false);
    const [options, setOptions] = useState({
        processed: false,
        per_page: 20
    });

    const [showCount, setShowCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0);
    const [leftCount, setLeftCount] = useState(0);

    const [loading, setLoading] = useState(false);
    
    const ref = useRef();

    const handleModalOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setModal(false);
        }
    }

    useEffect(() => {
        API.get("/admin/orders", { params: {per_page: 20 + showCount}})
        .then(res => {
            
            setTotalCount(res.data.total_orders);
            setLeftCount(res.data.total_orders - res.data.orders.length);
            setLoading(false)
            
            setOrdersData(res.data.orders)
        })

        if(modal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        
        document.addEventListener("mousedown", handleModalOutside);
        return () => document.removeEventListener("mousedown", handleModalOutside);
    }, [modal, showCount]);

    const showMore = () => {
        if(totalCount / leftCount < 1) {
            setShowCount(totalCount)
        } else if(totalCount / leftCount > 1) {
            setShowCount(prevState => prevState + 20)
        }
    }

    const handleTabNew = () => {
        setOptions({...options, processed: false});

        API.get(`/admin/orders`, { params: {per_page: 20 + showCount}})
        .then(res => {
            
            
            setOrdersData([]);
            setOrdersData(res.data.orders)
        })
    }

    const handleTabOld = () => {
        setOptions({...options, processed: true});

        API.get(`/admin/orders`, { params: {processed: true, per_page: 20 + showCount}})
        .then(res => {
            
            
            setOrdersData([]);
            setOrdersData(res.data.orders)
        })
    }

    const addToOld = id => {
        API.post(`/admin/orders`, {id: id})
        .then(res => {
            

            API.get("/admin/orders")
            .then(res => {
                setOrdersData(res.data.orders)
            })
        })
    }

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
        <Layout>
            <section className="orders">
                <div className="orders__wrapper container">

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
                        {ordersData.map((item, index) => 
                            <tr className="orders-table__tr" key={item.order_id}>
                                <td className="orders-table__td">{index}</td>
                                <td className="orders-table__td">{item.date.split(" ")[0]} <span className="orders-table__span">{item.date.split(" ")[1]}</span></td>

                                <td className="orders-table__td">
                                    <button className="g-btn__view" onClick={() => {handleModalData(item.order_id); handleModal();}}>Переглянути</button>
                                </td>

                                <td className="orders-table__td">{item.email}</td>
                                <td className="orders-table__td">{item.sum}</td>
                                <td className="orders-table__td">{item.number}</td>
                                <td className="orders-table__td">{item.comment}</td>
                                <td className="orders-table__td">{item.delivery_type}</td>
                                <td className="orders-table__td">{item.town}</td>
                                <td className="orders-table__td">{item.address}</td>
                                {options.processed === false ? <td className="orders-table__td"><button className="g-btn__archive" onClick={() => addToOld(item.order_id)}>в архів</button></td> : null}
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {leftCount ? <button className="g-add" onClick={!loading ? showMore : null}>Показати ще</button> : null}
                </div>
            </section>
        </Layout>
    );
};

export default OrdersPage