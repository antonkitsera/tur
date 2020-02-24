import React, { useState, useRef, useEffect } from 'react';
import API from "../adminAPI";

import IconArrowDown from "../assets/g-icon-arrow_down.svg"

const BookSelect = props => {

    const [subjectData, setSubjectData] = useState([]);
    const [blockTitle, setBlockTitle] = useState("");
    const [selectTitle, setSelectTitle] = useState("");

    const [listStatus, setListStatus] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    
    const ref = useRef();

    const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            setListStatus(false);
        }
    };

    useEffect(() => {
        if(props.subject === "illustration") {
            setSubjectData([
                {id: 0, name: "З ілюстраціями"}, 
                {id: 1, name: "Без ілюстрацій"}
            ])
        } else if(props.subject === "subcategory") {
            setSubjectData(props.subcatData);
        } else {
            API.get(`/admin/${props.subject}`)
            .then(res => {
                setSubjectData(Object.values(res.data)[0]);
            });
        }

        switch(props.subject) {
            case "category":
                setBlockTitle("Категорія");
                setSelectTitle("Виберіть категорію");
                break;
            case "subcategory":
                setBlockTitle("Підкатегорія");
                setSelectTitle("Виберіть підкатегорію");
                break;
            case "sp-categories":
                setBlockTitle("Спеціальна категорія");
                setSelectTitle("Виберіть спец-категорію");
                break;
            case "gender":
                setBlockTitle("Стать");
                setSelectTitle("Виберіть стать");
                break;
            case "language":
                setBlockTitle("Мова");
                setSelectTitle("Виберіть мову");
                break;
            case "cover_type":
                setBlockTitle("Тип обкладинки");
                setSelectTitle("Виберіть тип обкладинки");
                break;
            case "paper":
                setBlockTitle("Папір");
                setSelectTitle("Виберіть папір");
                break;
            case "illustration":
                setBlockTitle("Ілюстрації");
                setSelectTitle("Виберіть ілюстрації");
                break;

            default:
                return ""
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [props.subcatData, props.subject, searchTerm]);

    const handleRequestList = () => {
        setListStatus(!listStatus);
    }

    const handleOption = e => {
        props.changeFunctionSelect(props.subject, e.target.value);
        setListStatus(false);

        if(props.subject === "author" || props.subject === "ph") {
            setSearchTerm("");
        }
    }

    return (
        <div className="book-select">
            {props.subject === "gender" || props.subject === "sp-categories" ? <h3 className="book__subtitle">{blockTitle}</h3> :
            <span className="book__span">{blockTitle}</span>}

            <div ref={ref}>
                <div className="book-select__header" onClick={handleRequestList}>
                    <button className={`book-select__button${
                        props.subject === "illustration" ? 
                        props.title === null ? " placeholder" : "" : !props.title ? " placeholder" : ""}`} onClick={handleRequestList}>
                        {props.subject === "illustration" ? 
                        props.title === null ? selectTitle :
                        props.title ? "З ілюстраціями" :
                        !props.title ? "Без ілюстрацій" : 
                        selectTitle : props.title ? props.title : selectTitle}
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
        </div>
    );
}

export default BookSelect;