import React, { useState, useRef, useEffect } from 'react';
import API from "../adminAPI";

const BookSelectSearch = props => {

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
        const handleSearch = term => {
            if(searchTerm) {
                API.get(`/admin/${props.subject}`, { params: { search_admin: term } })
                .then(res => {
                    setListStatus(true);
                    setSubjectData(Object.values(res.data)[0]);
                });
            } else {
                setSubjectData([]);
                setListStatus(false);
            }
        }

        switch(props.subject) {
            case "ph":
                setBlockTitle("Видавництво");
                setSelectTitle("Оберіть видавництво");
                handleSearch(searchTerm);
                break;
            default:
                return ""
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [props.subject, searchTerm]);

    const handleOption = e => {
        props.changeFunctionSelect(props.subject, e.target.value);
        setListStatus(false);
        setSearchTerm("");
    }

    const handleSearchTerm = e => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="book-select">
            {props.subject === "gender" ? <h3 className="book__subtitle">{blockTitle}</h3> :
            <span className="book__span">{blockTitle}</span>}

            <div ref={ref}>
                <div className="book-select__header">
                    <input className={`book-search__search${!searchTerm && !props.title ? " placeholder" : ""}`} type="text" value={searchTerm} placeholder={props.title ? props.title : selectTitle} onChange={handleSearchTerm}/>
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

export default BookSelectSearch;