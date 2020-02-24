import React, { useState, useEffect } from 'react';
import API from "../adminAPI";

import Layout from "../adminComponents/Layout"

import "../adminComponents/style/orders.scss"

import "../adminComponents/style/requests.scss"

const OrdersPage = () => {

    const [requestsData, setRequestsData] = useState([]);
    const [options, setOptions] = useState({
        processed: false,
        per_page: 20
    });

    const [showCount, setShowCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0);
    const [leftCount, setLeftCount] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        API.get(`/admin/contacts`, {params: {per_page: 20 + showCount}})
        .then(res => {
            
            setTotalCount(res.data.total_contacts);
            setLeftCount(res.data.total_contacts - res.data.contacts.length);
            setLoading(false)
            
            setRequestsData(res.data.contacts)
        })
    }, [showCount]);

    const showMore = () => {
        if(totalCount / leftCount < 1) {
            setShowCount(totalCount)
        } else if(totalCount / leftCount > 1) {
            setShowCount(prevState => prevState + 20)
        }
    }

    const handleTabNew = () => {
        setOptions({...options, processed: false});

        API.get(`/admin/contacts`, { params: { per_page: 20 + showCount }})
        .then(res => {
            
            
            setRequestsData([]);
            setRequestsData(res.data.contacts)
        })
    }

    const handleTabOld = () => {
        setOptions({...options, processed: true});

        API.get(`/admin/contacts`, { params: {processed: true, per_page: 20 + showCount}})
        .then(res => {
            
            
            setRequestsData([]);
            setRequestsData(res.data.contacts)
        })
    }

    const addToOld = (itemId) => {
        API.post(`/admin/contacts`, {id: itemId})
        .then(res => {
            

            API.get(`/admin/contacts`)
            .then(res => {
                setRequestsData(res.data.contacts)
            })
        })
    }
    
    return (
        <Layout>
            <section className="g-sheets requests">
                <div className="g-sheets__wrapper container">

                    <div className="g-sheets-view">
                        <button className={`g-sheets-view__new${options.processed ? '' : ' active'}`} onClick={handleTabNew}>Нові</button>
                        <button className={`g-sheets-view__old${options.processed ? ' active' : ''}`} onClick={handleTabOld}>Архів</button>
                    </div>

                    <table className="g-sheets-table">
                        <thead className="g-sheets-table__head">
                            <tr className="g-sheets-table__tr">
                                <th className="g-sheets-table__th">#</th>
                                <th className="g-sheets-table__th">Дата</th>
                                <th className="g-sheets-table__th">Номер телефону</th>
                                <th className="g-sheets-table__th">Ім'я</th>
                            </tr>
                        </thead>

                        <tbody className="g-sheets-table__body">
                        {requestsData.map((item, index) => 
                            <tr className="g-sheets-table__tr" key={item.contact_id}>
                                <td className="g-sheets-table__td">{index}</td>
                                <td className="g-sheets-table__td">{item.date.split(" ")[0]} <span className="g-sheets-table__span">{item.date.split(" ")[1]}</span></td>

                                <td className="g-sheets-table__td">{item.number}</td>
                                <td className="g-sheets-table__td">{item.name}</td>
                                {options.processed === false ? <td className="g-sheets-table__td"><button className="g-btn__archive" onClick={() => addToOld(item.contact_id)
                                }>в архів</button></td> : null}
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