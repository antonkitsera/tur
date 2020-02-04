import React, { useState, useEffect } from 'react';
import API from "../API";

import IconArrowDown from "../assets/g-icon-arrow_down.svg"

const BookSelect = props => {

    const [subjectValue, setSubjectValue] = useState();
    const [subjectData, setSubjectData] = useState([]);
    const [blockTitle, setBlockTitle] = useState("");
    const [selectTitle, setSelectTitle] = useState("");

    const [listStatus, setListStatus] = useState(false);

    useEffect(() => {
        console.log(props.subject === "gender" ? true : false);
        if(props.subject === "illustration") {
            setSubjectData([
                {id: 0, name: "З ілюстраціями"}, 
                {id: 1, name: "Без ілюстрацій"}
            ])
        } else {
            API.get(`/admin/${props.subject}`)
            .then(res => {
                setSubjectData(Object.values(res.data)[0]);
            });
        }

        switch(props.subject) {
            case "ph":
                setBlockTitle("Видавництво");
                setSelectTitle("Оберіть видавництво");
                break;
            case "subcategory":
                setBlockTitle("Спеціальна категорія");
                setSelectTitle("Оберіть спец-категорію");
                break;

            default:
                console.log("no info")
        }

    }, []);

    const handleRequestListHeader = e => {
        setListStatus(!listStatus);
    }

    const handleRequestList = e => {
        setListStatus(!listStatus);
    }

    const handleOption = e => {
        props.changeFunctionSelect(props.subject, e.target.value);
        setListStatus(false)
        console.log(props.subject, e.target.value, props.title)
    }

    return (
        <div className="book-select">
            {props.subject === "gender" ? <h3 className="book__subtitle">{blockTitle}</h3> :
            <span className="book__span">{blockTitle}</span>}

            <div data-id="categoryList" className="book-select__header" onClick={handleRequestList}>
                <button data-id="categoryList"  className="book-select__button" onClick={handleRequestListHeader}>
                    {props.title ? props.title : selectTitle}
                </button>

                <img className="book-select__arrow" src={IconArrowDown} alt=""/>
            </div>

            {listStatus ? <div className="book-select__content">
                {subjectData.map(item =>    
                    <label className="book-select__label" key={item.id}>
                        <input className="book-select__input" type="radio" name="category" value={`${item.id}/${item.name}`} onChange={handleOption}/>
                        {item.name}
                    </label>
                )}
            </div> : null}
        </div>
    );
}

export default BookSelect;
