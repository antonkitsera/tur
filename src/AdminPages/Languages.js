import React, { useState, useEffect } from "react";
import Layout from "../adminComponents/Layout"
import API from "../adminAPI";

import "../adminComponents/style/languages.scss"

import EditIcon from "../assets/g-icon-edit.svg"
import DeleteIcon from "../assets/g-icon-delete.svg"
import AddIcon from "../assets/g-icon-add.svg" 

const LanguagesPage = () => {
    const [addMode, setAddMode] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [bannersData, setBannersData] = useState([]);

    const InitialItem = {
        id: null,
        name: ""
    };

    const [bannerItem, setBannerItem] = useState(InitialItem);

    useEffect(() => {
        API.get(`/admin/language`)
        .then(res => {
            

            setBannersData(res.data.languages);
        })
    }, []);
      
    const handleInputChange = e => {
        const { name, value } = e.target;
        setBannerItem({ ...bannerItem, [name]: value });
    };

    const handleEdit = itemId => {

        API.get(`/admin/language`, { params: { id: itemId }})
        .then(res => {
            

            setBannerItem({
                id: itemId,
                name: res.data.name
            })

            setAddMode(false);
            setEditMode(true);
        })
    }

    const handleCancel = () => {
        setAddMode(true);
        setEditMode(false);
        setBannerItem(InitialItem);
    }

    const handleDelete = itemId => {

        API.delete(`/admin/language`, { params: {id: itemId}})
        .then(res => {
            

            API.get(`/admin/language`)
            .then(res => {
                
    
                setBannerItem(InitialItem);
                setBannersData(res.data.languages);
            })

            if(editMode) {
                setEditMode(false);
            }
        })
    }

    const submitAdd = e => {
        e.preventDefault();
        if (!bannerItem.name) return;

        API.post(`/admin/language`, {name: bannerItem.name})
        .then(res => {
            

            API.get(`/admin/language`)
            .then(res => {
                
    
                setBannerItem(InitialItem);
                setBannersData(res.data.languages);
            })
        })
    }

    const submitEdit = e => {
        e.preventDefault();
        if (!bannerItem.name) return;

        API.patch(`/admin/language`, {id: bannerItem.id, name: bannerItem.name})
        .then(res => {
            

            API.get(`/admin/language`)
            .then(res => {
                
    
                setBannerItem(InitialItem);
                setBannersData(res.data.languages);
            })
        })
    }

    return (
        <Layout>
            <section className="languages">
                <div className="container">
                    <div className="languages-info">
                        <h2 className="languages__title g-title">Додавання мов</h2>

                        <div className="languages-info__head">
                            <p className="languages-info__text">Список мов</p>
                        </div>

                        <ul className="languages-info-list">
                            {bannersData.map(bannerElement =>
                                <li className="languages-info-list__item" key={bannerElement.id}>
                                    
                                    <p className="languages-info-list__text">
                                        {bannerElement.name}
                                    </p>
                                    
                                    <button className="g-button-edit" onClick={() => handleEdit(bannerElement.id)}>
                                        <img className="g-button-edit__icon" src={EditIcon} alt="Edit"/>
                                    </button>
                                    <button className="g-button-delete" onClick={() => handleDelete(bannerElement.id)}>
                                        <img className="g-button-delete__icon" src={DeleteIcon} alt="Delete"/>
                                    </button>
                                </li>
                            )}
                        </ul>

                       
                    </div>

                    <div className="languages-add">
                        <h3 className="languages-add__title">{editMode ?`Редагувати` : `Додати`} мову</h3>

                        <form className="languages-add__form" 
                        onSubmit={addMode ? submitAdd : editMode ? submitEdit : null}>

                            <p className="languages-add__text">Назва мови</p>

                            <input className="g-input" placeholder="Назва мови" 
                            type="text"
                            name="name"
                            value={bannerItem.name}
                            onChange={handleInputChange}/>

                            <div className="languages-add__block">
                                {editMode ?<button className="g-add g-add_margin" type="button" onClick={handleCancel}>
                                    Скасувати
                                </button> : null}

                                <button className="g-add" type="submit">
                                    <img className="g-add__icon" src={AddIcon} alt="Додати"/>
                                    Додати
                                </button>
                            </div>


                        </form>

                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default LanguagesPage