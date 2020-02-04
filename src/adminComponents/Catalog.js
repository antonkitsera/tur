import React, { useState, useEffect } from "react";
import API from "../API";

import UploadIcon from "../assets/g-icon-upload.svg"
import AddIcon from "../assets/g-icon-add.svg";
import SearchIcon from "../assets/g-icon-search.svg";
import DeleteIcon from "../assets/catalog-icon-delete.svg"

const Catalog = (props) => {
    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editStartMode, setEditStartMode] = useState(false);

    const [imageChanged, setImageChanged] = useState(false);

    const [catalogData, setCatalogData] = useState([]);

    const InitialItem = {
        id: null,
        name: "",
        description: "",
        path: ""
    };

    const [catalogItem, setCatalogItem] = useState(InitialItem);

    const [catalogSearch, setCatalogSearch] = useState("");
    const [catalogSearchData, setCatalogSearchData] = useState([]);
 
    const subjectAuthors = props.subject === "authors";
    const subjectPublishments = props.subject === "publishments";

    useEffect(() => {

        API.get(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`)
        .then(res => {
            console.log(res);

            setCatalogData(res.data);
        })
    }, []);

    const scrollToElem = str => {
        let item = document.getElementById(str);
        item.scrollIntoView({behavior: "smooth"});
    }

    const handleAddMode = () => {
        setAddMode(!addMode);
    }

    const handleEditMode = itemId => {
        console.log(itemId)

        API.get(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`, { params: { id: itemId }})
        .then(res => {
            console.log(res);

            let toDataURL = (url, callback) => {
                if(res.data.path) {
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
            }

            let imageBase64 = [];

            toDataURL(`${process.env.REACT_APP_API_URL}/${res.data.path}`, (dataUrl) => {
                imageBase64.push(dataUrl);

                setCatalogItem({
                    id: itemId,
                    name: res.data.name,
                    description: res.data.description,
                    path: `${imageBase64[0]}`
                })

            })
        })

        setEditMode(!editMode);
        setEditStartMode(!editStartMode);
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCatalogItem({ ...catalogItem, [name]: value });
    };
  
    const setImage = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            let fileBase64 = reader.result;
            setCatalogItem({...catalogItem, path: `${fileBase64}`});
        };

        if(editMode) {
            setImageChanged(true);
            setEditStartMode(false);
        } else if(addMode) {
            setEditStartMode(true)
        }

        setEditStartMode(false)
    };

    const handleCancel = () => {
        setCatalogItem(InitialItem);

        if(addMode) {
            handleAddMode();
        } else if(editMode) {
            handleEditMode();
            setEditStartMode(!editStartMode);
        }
    }

    const handleDelete = () => {

        console.log(catalogItem.id);

        API.delete(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`, { params: {id: catalogItem.id}})
        .then(res => {
            console.log(res);

            API.get(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`)
            .then(res => {
                console.log(res);
    
                setCatalogItem(InitialItem);
                handleEditMode();
                setCatalogData(res.data);
            })
        })

    }

    const handleSearch = e => {
        e.preventDefault();
        setCatalogSearch(e.target.value);

        if(e.target.value.length > 0) {

            API.get(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`, { params: {search_admin: e.target.value}})
            .then(res => {
                setCatalogSearchData(subjectAuthors ? res.data.Authors : subjectPublishments ? res.data.PH : null);
                console.log(res.data)
            })
        } else {
            setCatalogSearchData([])
        }
    }

    const submitAdd = e => {
        e.preventDefault();
        if (!catalogItem.name || !catalogItem.description || !catalogItem.path) return;


        console.log({name: catalogItem.name, description: catalogItem.description, path: catalogItem.path})

        API.post(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`, {name: catalogItem.name, description: catalogItem.description, data: catalogItem.path})
        .then(res => {
            console.log(res);

            API.get(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`)
            .then(res => {
                console.log(res);
    
                setCatalogData(res.data);
            })
        })

        setCatalogItem(InitialItem);
        handleAddMode();
    }

    const submitEdit = e => {
        e.preventDefault();
        if (!catalogItem.id || !catalogItem.name || !catalogItem.description || !catalogItem.path) return;

        API.patch(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`, {id: catalogItem.id, name: catalogItem.name, description: catalogItem.description, data: catalogItem.path})
        .then(res => {
            console.log(res);

            editMode ? setImageChanged(true) : setImageChanged(false);

            API.get(`/admin/${subjectAuthors ? 'author' : subjectPublishments ? 'ph' : ''}`)
            .then(res => {
                console.log(res);
    
                setCatalogData(res.data);
            })
        })

        setCatalogItem(InitialItem);
        handleEditMode();
    }

    return (
        <div className="catalog">
            {addMode || editMode ? 
            <div className="catalog-add container">
                <h2 className="catalog-add__title">Інформація про {subjectAuthors ? 'автора' : subjectPublishments ? 'видавництво' : ''}</h2>
                
                <form className="catalog-add__form" onSubmit={addMode ? submitAdd : editMode ? submitEdit : null}>
                    <h6 className="catalog-add__subtitle">{subjectAuthors ? 'Фото автора' : subjectPublishments ? 'Логотип видавництва' : ''}</h6>

                    <label className="g-file__label">
                        {catalogItem.path ? <img className="g-file__image" 
                        src={catalogItem.path} alt="Upload"/> : null}

                        <input className="g-file__file" type="file" onClick={e => e.currentTarget.value = null} onChange={e => setImage(e)}/>
                        <img className="g-file__icon" src={UploadIcon} alt=""/>
                        <span className="g-file__download">Завантажити</span>
                    </label>

                    <h6 className="catalog-add__subtitle">{subjectAuthors ? "Ім'я автора" : subjectPublishments ? 'Назва видавництва' : ''}</h6>

                    <input className="catalog-add__input" placeholder={subjectAuthors ? "Ім'я" : subjectPublishments ? 'Назва' : ''} type="text" name="name" value={catalogItem.name} onChange={handleInputChange}/>

                    <h6 className="catalog-add__subtitle">Про {subjectAuthors ? 'автора' : subjectPublishments ? 'видавництво' : ''}</h6>

                    <textarea className="catalog-add__textarea" placeholder="Інформація" name="description" value={catalogItem.description} onChange={handleInputChange}></textarea>

                    <div className="catalog-add__footer">
                        {editMode ? <button className="catalog-add__delete" onClick={handleDelete}>
                            <img className="catalog-add__delete_svg" src={DeleteIcon} alt="Видалити"/>
                        </button> : null}
                        <button type="button" className="catalog-add__button" onClick={handleCancel}>Скасувати</button>
                        <button className="catalog-add__button" type="submit">Зберегти</button>
                    </div>
                </form>
            </div> 
            :
            <div className="catalog__wrapper">
                <div className="catalog-headline">
                    <form className="g-search">
                        <input type="search" className="g-search__input" placeholder="Пошук" value={catalogSearch} onChange={handleSearch}/>
                            
                        <button className="g-search__button">
                            <img className="g-search__icon" src={SearchIcon} alt="Пошук"/>
                        </button>

                        {catalogSearchData.length > 0 ? <ul className="g-search-list">
                        {catalogSearchData.map(item => 
                            <li className="g-search-list__item" key={item.id} onClick={() => {setCatalogSearchData([]); setCatalogSearch(""); scrollToElem(item.name);}}>{item.name}</li>
                        )}
                        </ul> : null}
                    </form>

                    <button className="g-add" onClick={handleAddMode}>
                        <img className="g-add__icon" src={AddIcon} alt="Додати"/>
                        Додати {subjectAuthors ? "автора" : subjectPublishments ? "видавництво" : ""}
                    </button>
                </div>

                <div className="catalog-char">
                    <ul className="catalog-char__list">
                        {Object.entries(catalogData).map(arr =>
                            arr[1].length > 0 ? (<li className="catalog-char__item" key={arr[0]} onClick={() => scrollToElem(arr[0])}>
                                {arr[0].toUpperCase()}
                            </li>) : null
                        )}
                    </ul>
                </div>
                
                <table className="catalog-table">
                    <tbody className="catalog-table__tbody">
                        {Object.entries(catalogData).map((char, index) =>
                            char[1].length > 0 ? (
                            <tr className="catalog-table__tr" key={index}>
                                <td className="catalog-table__td">
                                    <span id={char[0]} className="catalog-table__span">{char[0].toUpperCase()}</span>
                                </td>

                                <td className="catalog-table__td">
                                    {char[1].map(arr => 
                                        <p id={arr.name} className="catalog-table__text" key={arr.id} onClick={() => handleEditMode(arr.id)}>{arr.name}</p>
                                    )}
                                </td>
                            </tr>) : null
                        )}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
};

export default Catalog