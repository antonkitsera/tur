import React, { useState, useRef, useEffect } from 'react';

import BookDeleteIcon from "../assets/book-search-delete.svg"

const BookSelectMultipleSearch = props => {

    const [blockTitle, setBlockTitle] = useState("");
    const [selectTitle, setSelectTitle] = useState("");
    const [listStatus, setListStatus] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const inputRef = useRef();
    const ref = useRef();

    const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            setListStatus(false);
        }
    };

    useEffect(() => {
        switch(props.subject) {
            case "author":
                setBlockTitle("Автор");
                setSelectTitle("Оберіть автора");
                break;
            default:
                break;
        }

        if(props.data.length > 0) {
            setListStatus(true);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [props.subject, props.selectedData, props.data]);

    const handleOption = (e, id) => {
        props.changeFunctionSelect(props.subject, e.target.value);
        props.removeSelectedOption(props.subject, id);
        inputRef.current.value = "";
    }

    const handleRemove = (id, name) => {
        props.handleRemoveItem(props.subject, id, name);
    }

    const handleSearchTerm = e => {
        props.handleSearchTerm(props.subject, e.target.value);
        setSearchTerm(e.target.value);
    }

    return (
        <div className="book-select book-select_multiple">
            {props.subject === "gender" ? <h3 className="book__subtitle">{blockTitle}</h3> :
            <span className="book__span">{blockTitle}</span>}

            <div ref={ref}>
                <label className="book-select__header">
                    <div className="book-multiple_flex">
                    {props.selectedData ? props.selectedData.length > 0 ? 
                    props.selectedData.map(item => 
                        <span className="book-search-item" key={item.id}>
                            <span className="book-multiple__span">{item.name}</span>
                            <img className="book-search-item__icon" src={BookDeleteIcon} alt="Видалити" onClick={e => {
                                setListStatus(true);
                                handleRemove(item.id, item.name);
                            }}/>
                        </span>)
                    : null : null}
                    </div>
    
                    <input ref={inputRef} className={`book-search__search${!searchTerm ? " placeholder" : ""}`} type="text" placeholder={props.selectedData ? props.selectedData.length > 0 ? "" : selectTitle : null} onChange={handleSearchTerm}/>
                </label>
    
                {listStatus ? <div className="book-select__content">
                    {props.selectedData ? props.data.sort((a, b) => a.id - b.id).filter(elem => !props.selectedData.find(({ id }) => elem.id === id)).filter((v, i, a) => a.findIndex( t => (t.id === v.id && t.name === v.name)) === i).map(item =>
                        <label className="book-select__label" key={item.id}>
                            <input className="book-select__input" type="checkbox" name={props.subject} value={`${item.id}/${item.name}`} onChange={e => handleOption(e, item.id)}/>
                            {item.name}
                        </label>
                    ) : null}
                </div> : null}
            </div>
        </div>
    );
}

export default BookSelectMultipleSearch;