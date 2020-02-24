import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Layout from "../adminComponents/Layout"
import API from "../adminAPI";

import BookItem from "../adminComponents/BookItem"

import "../adminComponents/style/goods.scss"

import AddIcon from "../assets/g-icon-add.svg"
import IconArrowDown from "../assets/g-icon-arrow_down.svg"
import IconArrowRight from "../assets/g-icon-arrow_right.svg"

const GoodsPage = ({match}) => {
    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [booksData, setBooksData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);

    const [requestList, setRequestList] = useState(false);

    const [showCount, setShowCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0);
    const [leftCount, setLeftCount] = useState(0);

    const [loading, setLoading] = useState(false);

    const [bookID, setBookID] = useState(undefined);

    const ref = useRef();

    const checkUrl = useCallback(() => {
        const urlArr = match.url.split("/");

        if(urlArr[3] === "all") {
            setLoading(true);
            API.get("/admin/books", {params: { per_page: 36 + showCount }})
            .then(res => {
                setBooksData(res.data.Books);
                setTotalCount(res.data.items);
                setLeftCount(res.data.items - res.data.Books.length);
                setLoading(false);
            });

        } else if(urlArr[3] !== "all" && urlArr.length === 4) {
            setLoading(true);
            API.get("/admin/books", {params: { category: +urlArr[3], per_page: 36 + showCount }})
            .then(res => {
                setBooksData(res.data.Books);
                setTotalCount(res.data.items);
                setLeftCount(res.data.items - res.data.Books.length);
                setLoading(false);
            });
        } else if(urlArr[3] !== "all" && urlArr.length === 5) {
            setLoading(true);
            API.get("/admin/books", {params: { subcategory: +urlArr[4], per_page: 36 + showCount }})
            .then(res => {
                setBooksData(res.data.Books);
                setTotalCount(res.data.items);
                setLeftCount(res.data.items - res.data.Books.length);
                setLoading(false);
            });
        }
    }, [match.url, showCount])

    const showMore = () => {
        if(totalCount / leftCount < 1) {
            setShowCount(totalCount)
        } else if(totalCount / leftCount > 1) {
            setShowCount(prevState => prevState + 36)
        }
        checkUrl();
    }
 
    useEffect(() => {
        API.get("/admin/category")
        .then(res => {
            setCategoriesData(res.data.categories);
        });

        checkUrl();

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [checkUrl]);

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
        params: { categoryId, subcategoryId }
        } = match;

        const category = data.find(({ id }) => id === +categoryId);

        if(category && subcategoryId !== undefined && category.subcategories) {
            const subcategory = category.subcategories.find(({ id }) => id === +subcategoryId);

            return (
                <h2 className="g-title">{category.name}/{subcategory.name}</h2>
            );
        } else if(category) {
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

    const updateData = () => {
        checkUrl();
        window.scrollTo(0, 0);
    }
    
    return (
        <Layout>
            <section className="goods">
                <div className="container">
                    {addMode || editMode ?
                        <BookItem id={bookID} addMode={addMode} editMode={editMode} changeFunction={changeMode} updateData={updateData}/>
                    :
                    <div className="goods__block">
                        <div className="goods-headline">
                            <div ref={ref} className={`g-select${requestList ? ` g-select__open` : ''}`}>
                                <div className="g-select-header" onClick={handleRequestList}>

                                    <Route path="/admin/goods/:categoryId/:subcategoryId?" render={props => <HandleTitle data={categoriesData} {...props} />}/>

                                    <img className="g-select-header__arrow" src={IconArrowDown} alt="Категорія"/>
                                </div>

                                {requestList ?
                                <div className="g-select_absolute">
                                <ul className="g-select-list">
                                {categoriesData.map((category) => {
                                    return (
                                    <li className="g-select-list__item" key={category.id}>
                                        <Link className="g-select-list__link" to={`/admin/goods/${category.id}`} onClick={handleRequestList}>{category.name}</Link>

                                        <div className="g-select-sub">
                                            {category.subcategories.map(subcategory => <Link className="g-select-sub__link" key={subcategory.id} to={`/admin/goods/${category.id}/${subcategory.id}`} onClick={handleRequestList}>{subcategory.name}</Link>
                                            )}
                                        </div>
                                    </li>
                                    );
                                })}
                                </ul>
                                <Link className="g-select__all" to="/admin/goods/all" onClick={handleRequestList}>Усі розділи
                                <img className="g-select__arrow_right" src={IconArrowRight} alt="" />
                                </Link>
                                </div> : null }
                            </div> 

                            <button className="g-add" onClick={() => setAddMode(true)}>
                                <img className="g-add__icon" src={AddIcon} alt="Додати"/>
                                Додати товар
                            </button>
                        </div>
    
                        <div className="goods__wrapper">
                            {booksData.length > 0 ? booksData.map(item => 
                                <div className="goods-item" key={item.id} onClick={() => {setBookID(item.id); setEditMode(true);}}>
                                    <div className="goods-item__source">
                                        <img className="goods-item__image" src={item.cover ? `${process.env.REACT_APP_API_URL}/${item.cover.path}` : ""} alt=""/>
                                    </div>

                                    <div className="goods-item__block">
                                        <h6 className="goods-item__title">{item.name}</h6>
                                        <p className="goods-item__author">Автор: {item.Author.map(author => 
                                            <span className="goods-item__span" key={author.id}>{author.name}</span>     
                                        )}</p>
                                        <p className="goods-item__publ">В-во: {item.PublishingHouse ? item.PublishingHouse.name : ""}</p>
                                        <p className="goods-item__price">Ціна: ₴{item.Price}</p>
                                    </div>
                                </div>
                            ) : null}

                        </div>

                        {leftCount ? <button className="g-add" onClick={!loading ? showMore : null}>Показати ще</button> : null}
                    </div>}
                </div>
            </section>
        </Layout>
    );
};

export default GoodsPage