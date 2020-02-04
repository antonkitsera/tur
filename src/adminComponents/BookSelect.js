import React, { useState, useEffect } from 'react';
import API from "../API";

import IconArrowDown from "../assets/g-icon-arrow_down.svg"
import BookDeleteIcon from "../assets/book-search-delete.svg"

const BookSelect = props => {

    const [subjectData, setSubjectData] = useState([]);
    const [blockTitle, setBlockTitle] = useState("");
    const [selectTitle, setSelectTitle] = useState("");

    const [listStatus, setListStatus] = useState(false);

    const [search, setSearch] = useState(false);
    const [searchMultiple, setSearchMultiple] = useState(false);

    useEffect(() => {
        if(props.subject === "illustration") {
            setSubjectData([
                {id: 0, name: "З ілюстраціями"}, 
                {id: 1, name: "Без ілюстрацій"}
            ])
        } else if(props.subject === "author" || props.subject === "ph") {
            console.log("author/ph")
        } else {
            API.get(`/admin/${props.subject}`)
            .then(res => {
                setSubjectData(Object.values(res.data)[0]);
            });
        }

        switch(props.subject) {
            case "author":
                setBlockTitle("Автор");
                setSelectTitle("Оберіть автора");
                setSearch(true);
                setSearchMultiple(true);
                break;
            case "ph":
                setBlockTitle("Видавництво");
                setSelectTitle("Оберіть видавництво");
                setSearch(true);
                break;
            case "category":
                setBlockTitle("Категорія");
                setSelectTitle("Виберіть категорію");
                break;
            case "subcategory":
                setBlockTitle("Підкатегорія");
                setSelectTitle("Виберіть підкатегорію");
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
                console.log("no info")
        }

    }, []);

    const handleRequestList = () => {
        if(subjectData.length > 0) {
            setListStatus(!listStatus);
        }
    }

    const handleOption = e => {
        props.changeFunctionSelect(props.subject, e.target.value);
        setListStatus(false)
        console.log(props.subject, e.target.value, props.title)
    }

    const handleSearch = e => {
        
    }

    return (
        <div className="book-select">
            {props.subject === "gender" ? <h3 className="book__subtitle">{blockTitle}</h3> :
            <span className="book__span">{blockTitle}</span>}

            <div data-id="categoryList" className="book-select__header" onClick={handleRequestList}>
                <button data-id="categoryList"  className="book-select__button" onClick={handleRequestList}>
                    {searchMultiple ?
                        <span className="book-search-item">Дж. К. Роулінг <img className="book-search-item__icon" src={BookDeleteIcon} alt=""/></span> 
                        :
                        props.title ? props.title : selectTitle}
                </button>

                {search ? <input className="book-search__search" type="text" placeholder={1 > 0 ? "" : "Введіть автора"}/> : null}

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
