import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Layout from "../adminComponents/Layout"
import API from "../adminAPI";

import "../adminComponents/style/categories.scss"

import EditIcon from "../assets/g-icon-edit.svg"
import DeleteIcon from "../assets/g-icon-delete.svg"
import AddIcon from "../assets/g-icon-add.svg"
import AddIconLarge from "../assets/g-icon-add_large.svg"
import IconArrowDown from "../assets/g-icon-arrow_down.svg"

const CategoriesPage = ({ match }) => {

    const [requestList, setRequestList] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);

    const [addMode, setAddMode] = useState(true);
    const [editMode, setEditMode] = useState(false);
    
    const InitialItem = {
        id: null,
        name: "",
        path: ""
    };

    const [subcategoryItem, setSubcategoryItem] = useState(InitialItem);
    const [categoryId, setCategoryId] = useState(null);

    const ref = useRef();

    const handleRequestListHeader = id => {
        setRequestList(false);
        setCategoryId(id);
    }

    const handleRequestList = () => {
        setRequestList(!requestList);
    }
  
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setRequestList(false);
      }
    };
  
    useEffect(() => {
        API.get(`/admin/category`)
        .then(res => {
            

            setCategoriesData(res.data.categories);
            setCategoryId(match.params.id);
        })

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    
    const HandleTitle = ({ match, data }) => {
        const {
        params: { categoryId }
        } = match;

        const category = data.find(({ id }) => id ===  +categoryId);

        if(category) {
            return (
                <h2 className="categories__title g-title">{category.name}</h2>
            );
        } else {
            return (
                <h2 className="categories__title g-title"> </h2>
            );
        }
    };
    
    const UserPage = ({ match, data }) => {
        const {
        params: { categoryId }
        } = match;
        
        const category = data.find(({ id }) => id ===  +categoryId);
    
        if(category) {
            return (
                <ul className="categories-info-list">
                    {category.subcategories.map(subcategory => {
                    return (
                        <li className="categories-info-list__item" key={subcategory.id}>
                            <p className="categories-info-list__text">{subcategory.name}</p>

                            <img className="categories-info-list__image" src={`${process.env.REACT_APP_API_URL}/${subcategory.path}`}  alt="Banner"/>
                            
                            <button className="g-button-edit" onClick={() => handleEdit(subcategory.id)}>
                                <img className="g-button-edit__icon" src={EditIcon} alt="Edit"/>
                            </button>
                            <button className="g-button-delete" onClick={() => handleDelete(subcategory.id)}>
                                <img className="g-button-delete__icon" src={DeleteIcon} alt="Delete"/>
                            </button>
                        </li>
                    );
                    })}
                </ul>
            );
        } else {
            return (
                <ul className="categories-info-list"></ul>
            )
        }

    };
      
    const handleInputChange = e => {
        const { name, value } = e.target;
        setSubcategoryItem({ ...subcategoryItem, [name]: value });
    };
  
    const setImage = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            let fileBase64 = reader.result;
            setSubcategoryItem({...subcategoryItem, path: `${fileBase64}`});
        };
    };

    const handleEdit = id => {

        API.get(`/admin/category`, { params: { subcategory_id: id }})
        .then(res => {
            

            let toDataURL = (url, callback) => {
                let xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                    callback(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.send();
            }

            let imageBase64 = [];

            toDataURL(`${process.env.REACT_APP_API_URL}/${res.data.path}`, (dataUrl) => {
                imageBase64.push(dataUrl);

                setSubcategoryItem({
                    id: res.data.id,
                    name: res.data.name,
                    path: `${imageBase64[0]}`
                })
            })

            setAddMode(false);
            setEditMode(true);
        })
    }

    const handleDelete = id => {
        API.delete(`/admin/category`, { params: {id: id}})
        .then(res => {
            

            API.get(`/admin/category`)
            .then(res => {
                
    
                setSubcategoryItem(InitialItem);
                setCategoriesData(res.data.categories);
            })

            if(editMode) {
                setEditMode(false);
            }
        })
    }

    const handleCancel = () => {
        setAddMode(true);
        setEditMode(false);
        setSubcategoryItem(InitialItem);
    }

    const submitAdd = e => {
        e.preventDefault();
        if (!categoryId || !subcategoryItem.name || !subcategoryItem.path) return;

        API.post(`/admin/category`, {category_id: categoryId, subcategory: subcategoryItem.name, data: subcategoryItem.path})
        .then(res => {
            

            API.get(`/admin/category`)
            .then(res => {
                
    
                setSubcategoryItem(InitialItem);
                setCategoriesData(res.data.categories);
            })
        })
    }

    const submitEdit = e => {
        e.preventDefault();
        if (!subcategoryItem.id || !subcategoryItem.name || !subcategoryItem.path) return;
        
        API.patch(`/admin/category`, {id: subcategoryItem.id, name: subcategoryItem.name, data: subcategoryItem.path})
        .then(res => {
            

            API.get(`/admin/category`)
            .then(res => {
                
    
                setSubcategoryItem(InitialItem);
                setCategoriesData(res.data.categories);
            })

            setEditMode(false);
            setAddMode(true);
        })
    }

    return (
        <Layout>
            <section className="categories">
                <div className="container">
                    <div className="categories-info">

                        <div ref={ref} className={`g-select${requestList ? ` g-select__open` : ''}`}>
                            <div className="g-select-header" onClick={handleRequestList}>

                                <Route path="/admin/categories/:categoryId" render={props => <HandleTitle data={categoriesData} {...props} />}/>

                                <img className="g-select-header__arrow" src={IconArrowDown} alt="Категорія"/>
                            </div>
                            
                            {requestList ? <ul className="g-select-list">
                            {categoriesData.map((category) => {
                                return (
                                <li className="g-select-list__item" key={category.id}>
                                    <Link className="g-select-list__link" to={`/admin/categories/${category.id}`} onClick={() => {handleRequestListHeader(category.id); handleCancel()}}>{category.name}</Link>
                                </li>
                                );
                            })}
                            </ul> : null }
                        </div> 

                        <div className="categories-info__head">
                            <p className="categories-info__text">Назва підкатегорії</p>
                            <p className="categories-info__text">Фото</p>
                        </div>

                        <Route path="/admin/categories/:categoryId" render={props => <UserPage data={categoriesData} {...props} />}/>
                    </div>

                    <div className="categories-add">
                        <h3 className="categories-add__title">{editMode ?`Редагувати` : `Додати`} підкатегорію</h3>

                        <form className="categories-add__form"
                        onSubmit={addMode ? submitAdd : editMode ? submitEdit : null}>
                            <div className="categories-add__block">
                                <p className="categories-add__text">Фото підкатегорії</p>

                                <label className="categories-add__label">
                                    {subcategoryItem.path ? <img className="categories-add__image" src={subcategoryItem.path} alt="Upload"/> : null}

                                    <input className="categories-add__file" type="file" onChange={e => setImage(e)} onClick={e => e.currentTarget.value = null}/>

                                    <img src={AddIconLarge} alt=""/>
                                </label>
                            </div>

                            <div className="categories-add__block">
                                <p className="categories-add__text">Назва підкатегорії</p>

                                <input className="g-input" type="text" placeholder="Назва" name="name" value={subcategoryItem.name} onChange={handleInputChange}/>

                                <div className="categories-add_flex">
                                    {editMode ?<button className="g-add g-add_margin" type="button" onClick={handleCancel}>
                                        Скасувати
                                    </button> : null}

                                    <button className="g-add" type="submit">
                                        <img className="g-add__icon" src={AddIcon} alt="Додати"/>
                                        Додати
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CategoriesPage