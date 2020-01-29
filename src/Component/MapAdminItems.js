import React from 'react';
import './style/items.css';
import AdminItem from './AdminItem'

export default function MapAdminItems({items}) {
    return (
        <div className={'map_every_items'}>
            {items.map(item => {
                return <AdminItem items={item} key={item.id}/>
            })}
        </div>
    )
}
