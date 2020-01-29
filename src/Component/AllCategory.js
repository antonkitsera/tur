import React from 'react';
import '../global_main.css'
import './style/main.css'
import arrow_right from '../image/arrow_right.svg'
import {Link} from "react-router-dom";

export default function AllCategory({categories}) {
    return (
        <div className={'wrapper_all_category'}>
            {categories.map(item => {
                return <Link className={'every_category'}
                             to={`/category/${item.id}`}
                             key={item.id}>
                    <img src={`${process.env.REACT_APP_API_URL}/${item.path}`}
                         className={'category_img'}
                         alt="category_photo"/>
                    <span>{item.name}
                        <img src={arrow_right} alt=""/>
                    </span>
                </Link>
            })}
            <div className={'all_books'}><Link to={'/all_items'}>Усі книги</Link></div>
        </div>
    );
}
