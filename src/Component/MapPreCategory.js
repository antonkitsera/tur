import React from 'react'
import {Link} from "react-router-dom";
import pre_category_image from '../image/pre_category_image.png'

export default function MapPreCategory({pre_category, activeCategory}) {
    return (
        <div className={'wrapper_pre_category_links'}>
            <Link to={`/category/${activeCategory}/all_in_category`}
                  className={'first_pre_category'}>
                <span className={'title'}>Усі розділи</span>
            </Link>
            {pre_category !== undefined && pre_category !== null
                ? pre_category.map(elem => {
                    return <Link to={`/category/${activeCategory}/pre_category/${elem.id}`}
                                 className={'every_pre_category'}
                                 key={elem.id}>
                        <img src={pre_category_image} alt="pre_category_image"/>
                        <span className={'title'}>{elem.name}</span>
                    </Link>
                }): null
            }
        </div>
    )
}
