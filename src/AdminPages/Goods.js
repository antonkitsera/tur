import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Layout from "../adminComponents/Layout"
import API from "../API";

import BookItem from "../adminComponents/BookItem"

import "../adminComponents/style/goods.scss"

import EditIcon from "../assets/g-icon-edit.svg"
import DeleteIcon from "../assets/g-icon-delete_gray.svg"
import AddIcon from "../assets/g-icon-add.svg"
import AddIconLarge from "../assets/g-icon-add_large.svg"
import IconArrowDown from "../assets/g-icon-arrow_down.svg"

const GoodsPage = () => {
    const [addMode, setAddMode] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [booksData, setBooksData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);

    const [requestList, setRequestList] = useState(false);

    const ref = useRef();
 
    useEffect(() => {
        API.get("/admin/books")
        .then(res => {
            console.log(res.data);

            setBooksData(res.data.Books)
        });

        API.get("/admin/category")
        .then(res => {
            console.log(res.data)

            setCategoriesData(res.data.categories);
        });

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRequestListHeader = id => {
        setRequestList(false);
    }

    const handleRequestList = () => {
        setRequestList(!requestList);
    }
  
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setRequestList(false);
      }
    };

    const HandleTitle = ({ match, data }) => {
        const {
        params: { categoryId }
        } = match;

        const category = data.find(({ id }) => id ===  +categoryId);

        console.log(data)

        console.log(match)

        if(category) {
            return (
                <h2 className="g-title">{category.name}</h2>
            );
        } else {
            return (
                <h2 className="g-title">Вибрати категорію</h2>
            );
        }
    };

    const changeMode = modeStatus => {
        if(addMode) {
            setAddMode(modeStatus);
        } else {
            setEditMode(modeStatus);
        }
    }
    
    return (
        <Layout>
            <section className="goods">
                <div className="container">
                    {addMode || editMode ?
                        <BookItem addMode={addMode} editMode={editMode} changeFunction={changeMode}/>
                    :
                    <div>
                        <div className="goods-headline">
                            <div ref={ref} className={`g-select${requestList ? ` g-select__open` : ''}`}>
                                <div className="g-select-header" onClick={handleRequestList}>

                                    <Route path="/admin/goods/:categoryId" render={props => <HandleTitle data={categoriesData} {...props} />}/>

                                    <img className="g-select-header__arrow" src={IconArrowDown} alt="Категорія"/>
                                </div>

                                {requestList ? 
                                <ul className="g-select-list">
                                {categoriesData.map((category) => {
                                    return (
                                    <li className="g-select-list__item" key={category.id}>
                                        <Link className="g-select-list__link" to={`/admin/goods/${category.id}`} onClick={() => {handleRequestListHeader(category.id);}}>{category.name}</Link>

                                        <div>
                                            {category.subcategories.map(subcategory => <Link key={subcategory.id} to="">{subcategory.name}</Link>
                                            )}
                                        </div>
                                    </li>
                                    );
                                })}
                                </ul> : null }
                            </div> 

                            <button className="g-add" onClick={() => setAddMode(true)}>
                                <img className="g-add__icon" src={AddIcon} alt="Додати"/>
                                Додати товар
                            </button>
                        </div>
    
                        <div className="goods__wrapper">
                            {booksData.map(item => 
                                <div className="goods-item" key={item.id}>
                                    <div className="goods-item__source">
                                        <img className="goods-item__image" src={item.cover} alt=""/>
                                    </div>

                                    <div className="goods-item__block">
                                        <h6 className="goods-item__title">{item.name}</h6>
                                        <p className="goods-item__author">Автор: {item.Author.map(author => 
                                            <span key={author.id}>{author.name}</span>     
                                        )}</p>
                                        <p className="goods-item__publ">В-во: {item.PublishingHouse.name}</p>
                                        <p className="goods-item__price">Ціна: ₴{item.Price}</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>}
                </div>
            </section>
        </Layout>
    );
};

export default GoodsPage