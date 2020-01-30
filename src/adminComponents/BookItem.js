import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Layout from "../adminComponents/Layout"
import API from "../API";
import BookSelect from "./BookSelect"

import "../adminComponents/style/goods.scss"

import EditIcon from "../assets/g-icon-edit.svg"
import DeleteIcon from "../assets/g-icon-delete_gray.svg"
import AddIcon from "../assets/g-icon-add_square.svg"
import UploadIcon from "../assets/g-icon-upload.svg"
import IconArrowDown from "../assets/g-icon-arrow_down.svg"
import BookDeleteIcon from "../assets/book-search-delete.svg"

const BookItem = props => {

    const [authorsData, setAuthorsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);

    const InitialItem = {
        id: null,
        covers: [
            {
                id: 0,
                path: ""
            }
        ],
        name: "",
        author: [],
        ph: {},
        category: {
            id: null,
            name: ""
        },
        subcategory: {
            id: null,
            name: ""
        },
        price: {
            price: 0,
            discount_price: 0
        },
        info: {
            gender: {
                id: null,
                name: ""
            },
            paper: {
                id: null,
                name: ""
            }
        },
        language: {
            id: null,
            name: ""
        },
        year: "",
        cover_type: {
            id: null,
            name: ""
        },
        description: "",
        illustration: null,
        code: null
    };

    const [bookItem, setBookItem] = useState(InitialItem);

    const InitialRequestList = {
        authorList: false,
        phList: false,
        categoryList: false,
        subcategoryList: false,
        spcategoryList: false,
        genderList: false,
        languageList: false,
        covertypeList: false,
        paperList: false,
        illustrationList: false
    }

    const [requestList, setRequestList] = useState(InitialRequestList);

    const ref = useRef();
 
    useEffect(() => {
        API.get("/admin/category")
        .then(res => {
            console.log(res.data)

            setCategoriesData(res.data.categories);
        });

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRequestListHeader = e => {
        const { id } = e.target.dataset;

        setRequestList(prevState => ({ ...prevState, [id]: !requestList[id] }));
    }

    const handleRequestList = e => {
        const { id } = e.target.dataset;

        setRequestList(prevState => ({ ...prevState, [id]: !requestList[id] }));
    }
  
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setRequestList(false);
      }
    };

    const setImage = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            let fileBase64 = reader.result;
            console.log(fileBase64)
        };
    };

    const handleInputChange = e => {   
        const { name, value } = e.target;
        setBookItem(prevState => ({ ...prevState, [name]: value }));
    }

    const handlePriceChange = e => {
        const { name, value } = e.target;
        setBookItem(prevState => ({ ...prevState, price: {...prevState.price, [name]: value } }));
    }

    const handleCancel = () => {
        props.changeFunction(false);
        setBookItem(InitialItem);
    }

    const changeFunctionSelect = (subject, value) => {
        let valueArr = value.split("/");

        switch(subject) {
            case "gender":
                setBookItem(prevState => ({ ...prevState, info: {
                    ...prevState.info, gender: {
                        id: valueArr[0],
                        name: valueArr[1]
                    }
                }}));
                break;
            case "language":
                setBookItem(prevState => ({ ...prevState, language: {
                    id: valueArr[0],
                    name: valueArr[1]
                }}))
                break;
            case "cover_type":
                setBookItem(prevState => ({ ...prevState, cover_type: {
                    id: valueArr[0],
                    name: valueArr[1]
                }}))
                break;
            case "paper":
                setBookItem(prevState => ({ ...prevState, info: {
                    ...prevState.info, paper: {
                        id: valueArr[0],
                        name: valueArr[1]
                    }
                }}));
                break;
            case "illustration":
                
                break;

            default:
                console.log("no info")
        }
    }
    
    return (
        <div className="book">
            <h2 className="book__title">{props.editMode ?`Змінити` : `Додати`} товар</h2>

            <h3 className="book__subtitle">Інформація про товар</h3>

            {
            //cover
            <div className="book-cover">
                <div className="book-cover__item">
                    <span className="book__span">Фото 1</span>

                    <label className="book-cover__label">
                        {bookItem.path ? <img className="book-cover__image" src={bookItem.path} alt="Upload"/> : null}
                        
                        <input className="book-cover__file" type="file" onChange={e => setImage(e)} onClick={e => e.currentTarget.value = null}/>
                        <img className="book-cover__icon" src={UploadIcon} alt=""/>
                    </label>
                </div>

                <img className="book-cover__add" src={AddIcon} alt="" />
            </div>
            }
            
            <div className="book__block">
                <div className="book-label book_grid">
                    <span className="book__span">Назва</span>
                    <input className="book-label__input" type="text" name="book-name" placeholder="Назва" />
                </div>

                {
                // author 
                <div className="book-search">
                    <span className="book__span">Автор</span>

                    <div data-id="authorList" className="book-search__header" onClick={handleRequestList}>
                        <div className="book-search_flex">
                            <button data-id="authorList"  className="book-search__button" onClick={handleRequestListHeader}> 
                                <span className="book-search-item">Дж. К. Роулінг <img className="book-search-item__icon" src={BookDeleteIcon} alt=""/></span>
                            </button>

                            <input className="book-search__search" type="text" placeholder={bookItem.author.length > 0 ? "" : "Введіть автора"}/>
                        </div>

                        <img className="book-search__arrow" src={IconArrowDown} alt=""/>
                    </div>

                    {requestList.authorList ? <div className="book-search__content">
                        {categoriesData.map(category =>    
                            <label className="book-search__label" key={category.id}>
                                <input className="book-search__input" type="radio" name="category" value={category.name}/>

                                {category.name}
                            </label>
                        )}
                    </div> : null}
                </div>
                }

                {
                // ph
                <div className="book-select">
                    <span className="book__span">Видавництво</span>

                    <div className="book-select-header">

                    </div>

                    <div></div>
                </div>
                }

                <div className="book-select">
                    <span className="book__span">Категорія</span>

                    <div data-id="categoryList" className="book-select__header" onClick={handleRequestList}>
                        <button data-id="categoryList"  className="book-select__button" onClick={handleRequestListHeader}>    {bookItem.category.name ? bookItem.category.name : "Виберіть категорію"}
                        </button>

                        <img className="book-select__arrow" src={IconArrowDown} alt=""/>
                    </div>

                    {requestList.categoryList ? <div className="book-select__content">
                        {categoriesData.map(category =>    
                            <label className="book-select__label" key={category.id}>
                                <input className="book-select__input" type="radio" name="category" value={category.name}/>

                                {category.name}
                            </label>
                        )}
                    </div> : null}
                </div>

                <div className="book-select">
                    <span className="book__span">Підкатегорія</span>

                    <div data-id="subcategoryList" className="book-select__header" onClick={handleRequestList}>
                        <button data-id="subcategoryList"  className="book-select__button">{bookItem.subcategory.name ? bookItem.subcategory.name : "Виберіть підкатегорію"}</button>

                        <img className="book-select__arrow" src={IconArrowDown} alt=""/>
                    </div>

                    {requestList.subcategoryList ? <div className="book-select__content">
                        {categoriesData.map(category =>    
                            <label className="book-select__label" key={category.id}>
                                <input className="book-select__input" type="radio" name="category" value={category.name}/>

                                {category.name}
                            </label>
                        )}
                    </div> : null}
                </div>

                <label className="book-label">
                    <h3 className="book__subtitle">Попередня ціна, грн</h3>
                    <input className="book-label__input" type="number" value={bookItem.price.price} name="price" placeholder="Попередня ціна" onChange={handlePriceChange}/>
                </label>

                <label className="book-label">
                    <h3 className="book__subtitle">Ціна, грн</h3>
                    <input className="book-label__input" type="number" value={bookItem.price.discount_price} name="discount_price" placeholder="Ціна" onChange={handlePriceChange}/>
                </label>

                {
                // special category
                <div></div>
                }

                {
                // gender
                <BookSelect subject="gender" title={bookItem.info.gender.name} requestList={requestList} changeFunctionSelect={changeFunctionSelect}/>
                }

                {
                // language
                <BookSelect subject="language" title={bookItem.language.name} requestList={requestList} changeFunctionSelect={changeFunctionSelect}/>
                }

                <div className="book-label">
                    <span className="book__span">Рік</span>
                    <input className="book-label__input" type="number" name="year" value={bookItem.year} placeholder="Напишіть рік" onChange={handleInputChange} max={9999}/>
                </div>

                {
                // cover type
                <BookSelect subject="cover_type" title={bookItem.cover_type.name} requestList={requestList} changeFunctionSelect={changeFunctionSelect}/>
                }

                {
                // paper
                <BookSelect subject="paper" title={bookItem.info.paper.name} requestList={requestList} changeFunctionSelect={changeFunctionSelect}/>
                }

                {
                // illustation
                <BookSelect subject="illustration" title={bookItem.illustration} requestList={requestList} changeFunctionSelect={changeFunctionSelect}/>
                }
            </div>
    

            <h3 className="book__subtitle">Про книгу</h3>

            <textarea className="book__textarea"></textarea>

            
            <div className="book_flex">
                {props.editMode ? <button className="book__delete">
                    <img src={DeleteIcon} alt="Видалити"/>
                </button> : null}
                
                <button className="g-add g-add_margin" onClick={handleCancel}>
                    Скасувати
                </button>

                <button className="g-add" type="submit">
                    Зберегти
                </button>
            </div>

        </div>
    );
};

export default BookItem