import React from 'react';
import './style/main.css'
import {Link} from "react-router-dom";
import black_vector from '../image/black_vector.svg';

export default function CategorySection({category, changeCategoryModal}) {
    return (
        <>
            {category.map(item => {
                return (
                    <div key={item.id} className={'every_category'}>
                        <Link to={`/category/${item.id}`}
                              onClick={() => changeCategoryModal}
                              className={'category_name'}>{item.name}</Link>
                        {item.subcategories.map(items => {
                            return (
                                <div key={items.id} className={'every_pre_category'}>
                                    <Link to={`/category/${item.id}/pre_category/${items.id}`}
                                          onClick={() => changeCategoryModal}>
                                        {items.name}
                                    </Link>
                                </div>
                            )
                        })}
                        <Link to={`/category/${item.id}`} className={'link_to_category'}>
                            Усі в категорії
                            <img src={black_vector} alt=""/>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}
