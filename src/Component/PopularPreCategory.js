import React from 'react'
import '../MainPages/style/main.css'
import {Link} from 'react-router-dom';

export default function PopularPreCategory({item}) {
    return (
        <Link className={'every_pre_categories'}
              to={`/category/${item.category.id}/pre_category/${item.subcategory.id}`}>
            <span className={'title'}>{item.subcategory.name}</span>
            <span className={'desc'}>{item.category.name}</span>
        </Link>
    )
}
