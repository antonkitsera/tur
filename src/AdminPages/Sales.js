import React, { useState, useEffect } from "react";
import Layout from "../adminComponents/Layout"
import API from "../adminAPI";

import "../adminComponents/style/sales.scss"

const SalesPage = () => {

    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        API.get(`/admin/sale`)
        .then(res => {
            

            setSalesData(res.data.sales)
        })
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        API.post(`/admin/sale`, {"sales": salesData})
        .then(res => {
            
            alert(res.status === 200 ? 'success' : 'error')
        })
    }

    return (
        <Layout>
            <section className="sales">
                <div className="sales__wrapper container">
                    <h2 className="g-title">Знижки для зареєстрованих користувачів</h2>

                    <form className="sales__form" onSubmit={handleSubmit}>    
                        {salesData.map(({id, amount, sale}) => 
                        <div className="sales__item" key={id}>
                            <label className="g-number">
                                <span className="g-number__text">Накопичена сума, грн</span> 
                                <input className="g-number__input" type="number" placeholder="Введіть суму" value={(amount)} required
                                onChange={e => {
                                    setSalesData([...salesData].map(object => {
                                      if(object.id === id) {

                                        return {
                                          ...object,
                                          amount: e.target.value
                                        }
                                      }
                                      else return object;
                                    }))
                                  }}
                                />
                            </label>

                            <label className="g-number">
                                <span className="g-number__text">Знижка, %</span> 
                                <input className="g-number__input" type="number" value={sale} min="0" max="100" placeholder="Введіть знижку" required
                                onChange={e => {
                                    setSalesData([...salesData].map(object => {
                                      if(object.id === id) {

                                        return {
                                          ...object,
                                          sale: e.target.value
                                        }
                                      }
                                      else return object;
                                    }))
                                  }}
                                />
                            </label>
                        </div>
                        )}
                        
                        <button className="g-save">Зберегти</button>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default SalesPage