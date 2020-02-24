import React, { useState, useEffect } from "react";
import Layout from "../adminComponents/Layout"
import API from "../adminAPI";

import "../adminComponents/style/banners.scss"

import EditIcon from "../assets/g-icon-edit.svg"
import DeleteIcon from "../assets/g-icon-delete.svg"
import UploadIcon from "../assets/g-icon-upload.svg"
import AddIcon from "../assets/g-icon-add.svg" 

const BannersPage = () => {
    const [addMode, setAddMode] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [imageChanged, setImageChanged] = useState(false);

    const [bannersData, setBannersData] = useState([]);

    const InitialItem = {
        id: null,
        link: "",
        path: ""
    };

    const [bannerItem, setBannerItem] = useState(InitialItem);

    useEffect(() => {
        API.get(`/admin/banner`)
        .then(res => {
            

            setBannersData(res.data.banners);
        })
    }, []);
      
    const handleInputChange = e => {
        const { name, value } = e.target;
        setBannerItem({ ...bannerItem, [name]: value });
    };
  
    const setImage = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            let fileBase64 = reader.result;
            setBannerItem({...bannerItem, path: `${fileBase64}`});
        };

        if(editMode) {
            setImageChanged(true);
        }
    };

    const handleEdit = itemId => {

        if(imageChanged) {
            setImageChanged(false);
        }

        API.get(`/admin/banner`, { params: { id: itemId }})
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

                setBannerItem({
                    id: res.data.id,
                    link: res.data.link,
                    path: `${imageBase64[0]}`
                })
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

        API.delete(`/admin/banner`, { params: {id: itemId}})
        .then(res => {
            

            API.get(`/admin/banner`)
            .then(res => {
                
    
                setBannerItem(InitialItem);
                setBannersData(res.data.banners);
            })

            if(editMode) {
                setEditMode(false);
            }
        })
    }

    const submitAdd = e => {
        e.preventDefault();
        if (!bannerItem.link || !bannerItem.path) return;

        API.post(`/admin/banner`, {link: bannerItem.link, data: bannerItem.path})
        .then(res => {
            

            API.get(`/admin/banner`)
            .then(res => {
                
    
                setBannerItem(InitialItem);
                setBannersData(res.data.banners);
            })
        })
    }

    const submitEdit = e => {
        e.preventDefault();
        if (!bannerItem.link || !bannerItem.path) return;

        API.patch(`/admin/banner`, {id: bannerItem.id, link: bannerItem.link, data: bannerItem.path})
        .then(res => {
            

            API.get(`/admin/banner`)
            .then(res => {
                
    
                setBannerItem(InitialItem);
                setBannersData(res.data.banners);
            })
        })
    }

    return (
        <Layout>
            <section className="banners">
                <div className="container">
                    <div className="banners-info">
                        <h2 className="banners__title g-title">Баннери</h2>

                        <div className="banners-info__head">
                            <p className="banners-info__text">Баннер</p>
                            <p className="banners-info__text">Посилання на товар</p>
                        </div>

                        <ul className="banners-info-list">
                            {bannersData.map(bannerElement =>
                                <li className="banners-info-list__item" key={bannerElement.id}>
                                    <img className="banners-info-list__image" src={`${process.env.REACT_APP_API_URL}/${bannerElement.path}`} alt="Banner"/>

                                    
                                    <p className="banners-info-list__text">
                                        <a className="banners-info-list__link" href={bannerElement.link} target="_blank" rel="noopener noreferrer">{bannerElement.link}</a>
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

                    <div className="banners-add">
                        <h3 className="banners-add__title">{editMode ?`Редагувати` : `Додати`} баннер</h3>

                        <form className="banners-add__form" 
                        onSubmit={addMode ? submitAdd : editMode ? submitEdit : null}>
                            <label className="banners-add__label">
                                {bannerItem.path ? <img className="banners-add__image" src={bannerItem.path} alt="Upload"/> : null}
                                
                                <input className="banners-add__file" type="file" onChange={e => setImage(e)} onClick={e => e.currentTarget.value = null}/>
                                <img className="banners-add__icon" src={UploadIcon} alt=""/>
                                <span className="banners-add__download">Завантажити</span>
                            </label>

                            <p className="banners-add__text">Посилання</p>

                            <input className="g-input" placeholder="Посилання" 
                            type="text"
                            name="link"
                            value={bannerItem.link}
                            onChange={handleInputChange}/>

                            <div className="banners-add__block">
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

export default BannersPage