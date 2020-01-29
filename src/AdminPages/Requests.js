import React, { useState, useEffect} from 'react';
import API from "../API";

import Layout from "../adminComponents/Layout"

import "../adminComponents/style/orders.scss"

import "../adminComponents/style/requests.scss"

const OrdersPage = () => {

    const [requestsData, setRequestsData] = useState([]);
    const [options, setOptions] = useState({
        processed: false, 
        page: 8, 
        per_page: 20
    });

    useEffect(() => {
        API.get(`/admin/contacts`, {processed: options.processed, page: options.page, per_page: options.per_page})
        .then(res => {
            console.log(res);
            
            setRequestsData(res.data.contacts)
        })
    }, []);

    const handleTabNew = () => {
        setOptions({...options, processed: false});

        API.get(`/admin/contacts`)
        .then(res => {
            console.log(res);
            
            setRequestsData([]);
            setRequestsData(res.data.contacts)
        })
    }

    const handleTabOld = () => {
        setOptions({...options, processed: true});

        API.get(`/admin/contacts`, { params: {processed: options.processed, per_page: 50}})
        .then(res => {
            console.log(res);
            
            setRequestsData([]);
            setRequestsData(res.data.contacts)
        })
    }

    const addToOld = (itemId) => {
        API.post(`/admin/contacts`, {id: itemId})
        .then(res => {
            console.log(res);

            API.get(`/admin/contacts`, {processed: options.processed, page: options.page, per_page: options.per_page})
            .then(res => {
                console.log(res);
                
                setRequestsData(res.data.contacts)
            })
        })
    }
    
    return (
        <Layout>
            <section className="g-sheets">
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
                        {requestsData.map(item => 
                            <tr className="g-sheets-table__tr" key={item.contact_id}>
                                <td className="g-sheets-table__td">{item.contact_id}</td>
                                <td className="g-sheets-table__td">{item.date.split(" ")[0]} <span className="g-sheets-table__span">{item.date.split(" ")[1]}</span></td>

                                <td className="g-sheets-table__td">{item.number}</td>
                                <td className="g-sheets-table__td">{item.name}</td>
                                {options.processed === false ? <td className="g-sheets-table__td"><button className="g-btn__archive" onClick={() => addToOld(item.contact_id)
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