import React, { useState, useEffect } from 'react';
import API from "../adminAPI";
import BookImage from "./BookImage"
import BookSelect from "./BookSelect"
import BookSelectSearch from "./BookSelectSearch"
import BookSelectMultipleSearch from "./BookSelectMultipleSearch"

import "../adminComponents/style/goods.scss"
import DeleteIcon from "../assets/g-icon-delete_gray.svg"

const BookItem = props => {

    const [subcatData, setSubcatData] = useState([]);

    const InitialItem = {
        covers: [],
        name: "",
        author: [],
        ph: {
            id: null,
            name: ""
        },
        category: {
            id: null,
            name: ""
        },
        subcategory: {
            id: null,
            name: ""
        },
        price: {
            price: undefined,
            discount_price: undefined
        },
        sp_tag: {
            id: null,
            name: ""
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

    const staticValues = {
        authorList: [],
    }

    const [bookItem, setBookItem] = useState(InitialItem);

    const [bookItemStatic, setBookItemStatic] = useState(staticValues);

    const [templateImage, setTemplateImage] = useState(true);
 
    useEffect(() => {
        if(props.editMode) {
            handleEdit();
        }

        API.get("/admin/sp-categories")
        .then(res => {
            setBookItemStatic(prevState => ({ ...prevState, sp_tagList: Object.values(res.data)[0]}))
        });
    }, []);

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

    const changeImageFunction = (id, name) => {
        setBookItem(prevState => ({ ...prevState, covers: [...prevState.covers, {
            id: id,
            name: name
        }]}));
    }

    const editImageFunction = (id, name) => {
        const editedState = bookItem.covers.map(item => item.id === id ? { ...item, name: name } : item);

        setBookItem(prevState => ({
            ...prevState, covers: editedState
        }))
    }

    const deleteImageFunction = id => {
        const imageArr = bookItem.covers.filter(item => item.id !== id);

        setBookItem(prevState => ({
            ...prevState, covers: imageArr
        }))
    }

    const changeImageTemplate = status => {
        setTemplateImage(status);
    }

    const setCoversIfNull = () => {
        if(bookItem.covers === null) {
            setBookItem(prevState => ({
                ...prevState, covers: []
            }));
        }
    }

    const handleSearchTerm = (subject, term) => {
        switch(subject) {
            case "author":
                if(term) {
                    API.get(`/admin/${subject}`, { params: { search_admin: term } })
                    .then(res => {
                        setBookItemStatic(prevState => ({...prevState, authorList: res.data.Authors}))
                    });
                } else {
                    setBookItemStatic(prevState => ({...prevState, authorList: []}))
                }
                break;
            default:
                break;
        }
    }

    const handleRemoveItem = (subject, id, name) => {
        switch(subject) {
            case "author":    
                setBookItem(prevState => ({...prevState, author: bookItem.author.filter(item => item.id !== id)}));
                break;
            default:
                break;
        }
    }

    const changeFunctionSelect = (subject, value) => {
        let valueArr = value.split("/");

        switch(subject) {
            case "author":
                setBookItem(prevState => ({...prevState, author: [...prevState.author, {
                    id: +valueArr[0],
                    name: valueArr[1]
                }]}))
                break;
            case "ph":
                setBookItem(prevState => ({ ...prevState, ph: {
                    id: +valueArr[0],
                    name: valueArr[1]
                }}));
                break;
            case "category":
                API.get("/admin/categories", { params: { category_id: valueArr[0] }})
                .then(res => {
                    setSubcatData(res.data.subcategories);
                    setBookItem(prevState => ({ ...prevState, subcategory: {
                        id: null,
                        name: ""
                    }}))
                });

                setBookItem(prevState => ({ ...prevState, category: {
                    id: +valueArr[0],
                    name: valueArr[1]
                }}));
                break;
            case "subcategory":
                setBookItem(prevState => ({ ...prevState, subcategory: {
                    id: +valueArr[0],
                    name: valueArr[1]
                }}));
                break;
            case "sp-categories":
                setBookItem(prevState => ({...prevState, sp_tag: {
                    id: +valueArr[0],
                    name: valueArr[1]
                }}))

                break;
            case "gender":
                setBookItem(prevState => ({ ...prevState, info: {
                    ...prevState.info, gender: {
                        id: +valueArr[0],
                        name: valueArr[1]
                    }
                }}));
                break;
            case "language":
                setBookItem(prevState => ({ ...prevState, language: {
                    id: +valueArr[0],
                    name: valueArr[1]
                }}))
                break;
            case "cover_type":
                setBookItem(prevState => ({ ...prevState, cover_type: {
                    id: +valueArr[0],
                    name: valueArr[1]
                }}))
                break;
            case "paper":
                setBookItem(prevState => ({ ...prevState, info: {
                    ...prevState.info, paper: {
                        id: +valueArr[0],
                        name: valueArr[1]
                    }
                }}));
                break;
            case "illustration":
                setBookItem(prevState => ({ ...prevState, illustration: valueArr[1] === "З ілюстраціями" ? true : valueArr[1] === "Без ілюстрацій" ? false : null}))
                break;

            default:
                break;
        }
    }
    
    const removeSelectedOption = (subject, id) => {
        switch(subject) {
            case "author":
                setBookItemStatic(prevState => ({ ...prevState, authorList: bookItemStatic.authorList.filter(item => item.id !== id)}));
                break;
            default:
                break;
        }
    }

    const submitAdd = (e, type) => {
        e.preventDefault();
        if (!bookItem.name || !bookItem.price.discount_price) return;

        API.post(`/admin/book`, {
            name: bookItem.name ? bookItem.name : "",
            author: bookItem.author.length > 0 ? [...bookItem.author.map(({ id }) => `${id}`)].join(",") : "",
            ph: bookItem.ph ? bookItem.ph.id ? +bookItem.ph.id : "" : "",
            category: bookItem.category ? bookItem.category.id ? +bookItem.category.id : "" : "",
            subcategory: bookItem.subcategory ? bookItem.subcategory.id ? +bookItem.subcategory.id : "" : "",
            price: bookItem.price ? bookItem.price.price ? +bookItem.price.price : "" : "",
            discount_price: bookItem.price ? bookItem.price.discount_price ? +bookItem.price.discount_price : "" : "",
            sp_tag: bookItem.sp_tag ? bookItem.sp_tag.id ? +bookItem.sp_tag.id : "" : "",
            gender: bookItem.info ? bookItem.info.gender ? bookItem.info.gender.id ? +bookItem.info.gender.id : "" : "" : "",
            paper: bookItem.info ? bookItem.info.paper ? bookItem.info.paper.id ? +bookItem.info.paper.id : "" : "" : "",
            year: bookItem.year ? bookItem.year : "",
            cover_type: bookItem.cover_type ? bookItem.cover_type.id ? +bookItem.cover_type.id : "" : "",
            language: bookItem.language ? bookItem.language.id ? +bookItem.language.id : "" : "",
            code: bookItem.code ? +bookItem.code : "",
            illustration: bookItem.illustration !== null ? bookItem.illustration ? "true" : "false" : "",
            description: bookItem.description ? bookItem.description : "",
            img: bookItem.covers.length > 0 ? bookItem.covers.map(({ name }) => `${name}`) : ""
        })
        .then(res => {
            props.changeFunction(false);
            props.updateData();

            if(type === "view") {
                const url = `../../item/${res.data}`;
                window.open(url, '_blank');
            }
        }) 
    }

    const handleEdit = () => {
        API.get("/admin/book", {params: { id: props.id }})
        .then(res => {
            setBookItem(res.data)
        });
    }

    const reg = /(data:image)/;

    const submitEdit = (e, type) => {
        e.preventDefault();
        if (!bookItem.name || !props.id || !bookItem.price.discount_price) return;

        API.patch(`/admin/book`, {
            id: props.id ? props.id : "",
            name: bookItem.name ? bookItem.name : "",
            author: bookItem.author.length > 0 ? [...bookItem.author.map(({ id }) => `${id}`)].join(",") : "",
            ph: bookItem.ph ? bookItem.ph.id ? +bookItem.ph.id : "" : "",
            category: bookItem.category ? bookItem.category.id ? +bookItem.category.id : "" : "",
            subcategory: bookItem.subcategory ? bookItem.subcategory.id ? +bookItem.subcategory.id : "" : "",
            price: bookItem.price ? bookItem.price.price ? +bookItem.price.price : "" : "",
            discount_price: bookItem.price ? bookItem.price.discount_price ? +bookItem.price.discount_price : "" : "",
            sp_tag: bookItem.sp_tag ? bookItem.sp_tag.id ? +bookItem.sp_tag.id : "" : "",
            gender: bookItem.info ? bookItem.info.gender ? bookItem.info.gender.id ? +bookItem.info.gender.id : "" : "" : "",
            paper: bookItem.info ? bookItem.info.paper ? bookItem.info.paper.id ? +bookItem.info.paper.id : "" : "" : "",
            year: bookItem.year ? bookItem.year : "",
            cover_type: bookItem.cover_type ? bookItem.cover_type.id ? +bookItem.cover_type.id : "" : "",
            language: bookItem.language ? bookItem.language.id ? +bookItem.language.id : "" : "",
            code: bookItem.code ? +bookItem.code : "",
            illustration: bookItem.illustration !== null ? bookItem.illustration ? "true" : "false" : "",
            description: bookItem.description ? bookItem.description : "",
            img: bookItem.covers.length > 0 ? bookItem.covers.filter(({name}) => name.match(reg)).map(({ name }) => `${name}`).length > 0 ? bookItem.covers.filter(({name}) => name.match(reg)).map(({ name }) => `${name}`) : "" : ""
        })
        .then(res => {
            props.changeFunction(false);
            props.updateData();

            if(type === "view") {
                const url = `../../item/${res.data}`;
                window.open(url, '_blank');
            }
        })
    }

    const submitDelete = id => {
        API.delete("admin/book", { params: { id: id}})
        .then(res => {
            props.changeFunction(false);
            props.updateData();
        })
    }

    return (
        <div className="book">
            <h2 className="book__title">{props.editMode ?`Змінити` : `Додати`} товар</h2>

            <h3 className="book__subtitle">Інформація про товар</h3>

            <BookImage images={bookItem.covers} templateImage={templateImage} changeImageTemplate={changeImageTemplate} changeImageFunction={changeImageFunction} editImageFunction={editImageFunction} deleteImageFunction={deleteImageFunction} addMode={props.addMode} editMode={props.editMode} setCoversIfNull={setCoversIfNull}/>
            
            <div className="book__block">
                <div className="book-label book_grid">
                    <span className="book__span">Назва</span>
                    <input className="book-label__input" type="text" name="name" placeholder="Назва" value={bookItem.name} onChange={handleInputChange}/>
                </div>

                <BookSelectMultipleSearch subject="author" data={bookItemStatic.authorList} selectedData={bookItem.author} changeFunctionSelect={changeFunctionSelect}
                handleSearchTerm={handleSearchTerm}
                removeSelectedOption={removeSelectedOption} handleRemoveItem={handleRemoveItem}/>

                <BookSelectSearch subject="ph" title={bookItem.ph ? bookItem.ph.name : ""} changeFunctionSelect={changeFunctionSelect}/>

                <BookSelect subject="category" title={bookItem.category ? bookItem.category.name : ""} changeFunctionSelect={changeFunctionSelect}/>

                <BookSelect subject="subcategory" title={bookItem.subcategory ? bookItem.subcategory.name : ""} subcatData={subcatData} changeFunctionSelect={changeFunctionSelect}/>

                <label className="book-label">
                    <h3 className="book__subtitle">Попередня ціна, грн</h3>
                    <input className="book-label__input" type="number" value={bookItem.price.price} name="price" placeholder="Попередня ціна" onChange={handlePriceChange}/>
                </label>

                <label className="book-label">
                    <h3 className="book__subtitle">Ціна, грн</h3>
                    <input className="book-label__input" type="number" value={bookItem.price.discount_price} name="discount_price" placeholder="Ціна" onChange={handlePriceChange}/>
                </label>

                <BookSelect subject="sp-categories" title={bookItem.sp_tag ? bookItem.sp_tag.name : ""} changeFunctionSelect={changeFunctionSelect}/>

                <BookSelect subject="gender" title={bookItem.info.gender ? bookItem.info.gender.name : ""} changeFunctionSelect={changeFunctionSelect}/>

                <h3 className="book__subtitle book__subtitle_grid">Властивості</h3>

                <BookSelect subject="language" title={bookItem.language ? bookItem.language.name : ""} changeFunctionSelect={changeFunctionSelect}/>

                <div className="book-label">
                    <span className="book__span">Рік</span>
                    <input className="book-label__input" type="number" name="year" value={bookItem.year ? bookItem.year : ""} placeholder="Напишіть рік" onChange={handleInputChange} max={9999}/>
                </div>

                <BookSelect subject="cover_type" title={bookItem.cover_type ? bookItem.cover_type.name : ""} changeFunctionSelect={changeFunctionSelect}/>

                <BookSelect subject="paper" title={bookItem.info.paper ? bookItem.info.paper.name : ""} changeFunctionSelect={changeFunctionSelect}/>

                <BookSelect subject="illustration" title={bookItem.illustration} changeFunctionSelect={changeFunctionSelect}/>

                <label className="book-label">
                    <span className="book__span">Код товару</span>
                    <input className="book-label__input" type="number" value={bookItem.code} name="code" placeholder="Код товару" onChange={handleInputChange}/>
                </label>
            </div>
    

            <h3 className="book__subtitle">Про книгу</h3>

            <textarea className="book__textarea" name="description" value={bookItem.description} placeholder="Опишіть книгу" onChange={handleInputChange}></textarea>

            
            <div className={`book_flex${props.editMode ? " book_editMode" : props.addMode ? " book_addMode" : ""}`}>
                {props.editMode ? <button className="book__delete" onClick={() => submitDelete(props.id)}>
                    <img src={DeleteIcon} alt="Видалити"/>
                </button> : null}
                
                <button className="g-add g-add_margin" onClick={handleCancel}>
                    Скасувати
                </button>

                <button className="g-add g-add_margin" type="submit" onClick={props.addMode ? submitAdd : props.editMode ? submitEdit : ""}>
                    Зберегти
                </button>

                <button className="g-add" onClick={(e) => {
                    props.addMode ? submitAdd(e, "view") : submitEdit(e, "view");
                }}>Зберегти та переглянути</button>
            </div>

        </div>
    );
};

export default BookItem;