import React from 'react';
import shopping_cart from "../image/shopping_cart.svg";


export default function HeaderCart(props) {
    let lengthCart = 0;
    props.cart.map(item => lengthCart += item.quantity);
    return (
        <div className={'cart_wrapper'} onClick={props.changeCartModal}>
            <div className={'cart'}>
                <img src={shopping_cart} alt=""/>
                <div className={'price_in_cart_wrapper'}>
                    <span>{lengthCart}</span>
                </div>
            </div>
            <span className={'price_wrapper'}>&#8372;{props.price}</span>
        </div>
    )
}
