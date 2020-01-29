import React, { useState } from 'react';

import IconArrowDown from "../assets/g-icon-arrow_down.svg"

const BookSelect = props => {

    const handleRequestListHeader = e => {
        const { id } = e.target.dataset;

        props.setRequestList(prevState => ({ ...prevState, [id]: !props.requestList[id] }));
    }

    const handleRequestList = e => {
        const { id } = e.target.dataset;

        props.setRequestList(prevState => ({ ...prevState, [id]: !props.requestList[id] }));
    }

    return (
        <div className="book-select" onClick={() => props.changeFunctionSelect(props.gender)}>
            <span className="book__span">Категорія</span>

            <div data-id="categoryList" className="book-select__header" onClick={handleRequestList}>
                <button data-id="categoryList"  className="book-select__button" onClick={handleRequestListHeader}>
                    TEST
                </button>

                <img className="book-select__arrow" src={IconArrowDown} alt=""/>
            </div>

            {props.requestList.genderList ? <div className="book-select__content">
                {[{id: 1, name: "test"}, {id: 2, name: "test"}].map(category =>    
                    <label className="book-select__label" key={category.id}>
                        <input className="book-select__input" type="radio" name="category" value={category.name}/>

                        {category.name}
                    </label>
                )}
            </div> : null}
        </div>
    );
}

export default BookSelect;
