import React, { useEffect } from 'react';
import API from "../adminAPI";

import AddIcon from "../assets/g-icon-add_square.svg"
import UploadIcon from "../assets/g-icon-upload.svg"
import DeleteItem from "../assets/book-item-delete.svg"
import EditItem from "../assets/book-item-edit.svg"

const BookImage = props => {

    useEffect(() => {
        if(props.images === null) {
            props.setCoversIfNull();
        }
    }, [props]);

    const reg = /(data:image)/;

    const numberForId = 8000000;

    const setImage = (e, id, path) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            let fileBase64 = reader.result;
            
            props.changeImageFunction(props.images ? props.images.length + numberForId : 0 + numberForId, fileBase64);
            props.changeImageTemplate(false);

            if(path) {
                props.editImageFunction(id, fileBase64);
                if(props.templateImage === false) {
                    props.changeImageTemplate(false);
                } else {
                    props.changeImageTemplate(true);
                }
            }
        };
    };

    const deleteImage = (e, id) => {
        e.preventDefault();

        const numberReg = /(8[0-9]{6}|9000000)/;

        if(props.editMode && numberReg.test(id)) {
            props.deleteImageFunction(id);

            if(props.images.length === 0 || props.images.length === 1) {
                addTemplate();
            }
        } else if(props.editMode) {
            API.delete("/admin/book", { params: {cover_id: id} }).then(res => {
                props.deleteImageFunction(id);

                if(props.images.length === 0 || props.images.length === 1) {
                    addTemplate();
                }
            })
        } else if(props.addMode) {
            props.deleteImageFunction(id);

            if(props.images.length === 0 || props.images.length === 1 || props.images === null) {
                addTemplate();
            }
        } 
    }

    const addTemplate = () => {
        props.changeImageTemplate(true)
    }

    return (
        <div className="book-cover">
            {props.images ? props.images.map(item =>
            <div className="book-cover__item" key={item.id}>
                <span className="book__span">Фото</span>
                <label className="book-cover__label">
                    {item.name ? 
                    <>
                    <img className="book-cover__edit" src={EditItem} alt=""/>
                    <img className="book-cover__delete" src={DeleteItem} onClick={e => deleteImage(e, item.id)} alt=""/>
                    </>
                    : null}

                    {item.name ? <img className="book-cover__image" src={reg.test(item.name) ? item.name : `${process.env.REACT_APP_API_URL}/${item.name}`} alt="Upload"/> : null}
                    
                    <input className="book-cover__file" type="file" onChange={e => setImage(e, item.id, item.name)} onClick={e => e.currentTarget.value = null}/>
                    <img className="book-cover__icon" src={UploadIcon} alt=""/>
                </label>
            </div>
            ) : null}

            {props.templateImage ? 
            props.images ? props.images.length < 6 ?
            <div className="book-cover__item">
                <span className="book__span">Фото</span>

                <label className="book-cover__label">
                    <input className="book-cover__file" type="file" onChange={e => setImage(e)} onClick={e => e.currentTarget.value = null}/>
                    
                    <img className="book-cover__icon" src={UploadIcon} alt=""/>
                </label>
            </div> : null : null : null}
            
            {props.images ? props.images.length < 6 ?
            <img className="book-cover__add" src={AddIcon} alt="" onClick={addTemplate}/> : null : null
            }
        </div>
    );
}

export default BookImage;