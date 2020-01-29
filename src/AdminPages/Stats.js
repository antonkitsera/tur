import React, { useState, useEffect } from "react";
import Layout from "../adminComponents/Layout"
import API from "../API";

import "../adminComponents/style/stats.scss"

import IconArrowDown from "../assets/g-icon-arrow_down.svg"

const StatsPage = () => {

    const [statsData, setStatsData] = useState([]);
    const [tableState, setTableState] = useState(0);

    useEffect(() => {
        API.get(`/admin/cat-stat`)
        .then(res => {
            console.log(res);
            
            setStatsData(res.data.categories)
        })
    }, []);

    const handleDate = e => {
        let dateArr = e.target.value.split("-");

        API.get(`/admin/cat-stat`, { params: {year: dateArr[0], month: dateArr[1], day: dateArr[2]} })
        .then(res => {
            console.log(res);
            setStatsData([]);
            setStatsData(res.data.categories)
        })

        // [TO-DO] Update Data State
    };

    return (
        <Layout>
            <section className="stats">
                <div className="stats__wrapper container">
                    <div className="stats__headline">
                        <h2 className="g-title">Статистика</h2>

                        <input className="stats__date" type="date" onChange={(e) => handleDate(e)} />
                    </div>

                    {statsData.map(({ id, name, orders, sum, subcategories }) => 
                        <div className={`stats-box${tableState === id ? ` active` : ``}`} key={id}>
                            <div className="stats-box__head" onClick={() => tableState === id ?  setTableState(0) : setTableState(id)}>
                                <div className="stats-box__title">
                                    <img className="stats-box__arrow" src={IconArrowDown} alt="Статистика"/>
                                    {name}
                                </div>
                                <div className="stats-box__title">{orders} замовлень</div>
                                <div className="stats-box__title">&#8372;{sum}</div>
                            </div>

                            {tableState === id ? 
                                subcategories.map(({ id, name, orders, sum }) =>
                                    <div className="stats-box__body" key={id}>
                                        <div className="stats-box__text">{name}</div>
                                        <div className="stats-box__text">{orders} замовлень</div>
                                        <div className="stats-box__text">&#8372;{sum}</div>
                                    </div>
                                ) : null}
                        </div>
                    )}
                    
                </div>
            </section>
        </Layout>
    );
};

export default StatsPage