import React from 'react';
import './style/items.css';
import photo from '../image/photo.png'
import StarRatings from "react-star-ratings";
import {connect} from "react-redux";
import {changeCart, changePrice} from '../main-store/actions'
import {Link} from 'react-router-dom'

function AdminItem({items, changeCart}, props) {
    return (
        <div className={'every_items'}>
            <Link to={`/item/${items.id}`}
                  className={'wrapper_image'}>
                <div className={items.unique_status === 1 ?
                    'unique_status unique_status_top' : items.unique_status === 2 ?
                        'unique_status_sale unique_status' :
                        items.unique_status === 3 ? 'unique_status unique_status_new'
                            : null}>
                    <span>{items.unique_status === 1 ?
                        'TOP' : items.unique_status === 2 ?
                            'SALE' :
                            items.unique_status === 3 ? 'NEW'
                                : null}</span>
                </div>
                <img src={photo} alt={'book_image'}/>
            </Link>
            <div className={'item_content_wrapper'}>
                <Link to={`/item/${items.id}`}
                      className={'title'}>{items.name}</Link>
                <span className={'desc'}>Дейл Карнегі</span>
                <div className={'wrapper_button_review'}>
                    <StarRatings
                        rating={items.id}
                        starRatedColor="#E9C715"
                        numberOfStars={5}
                        name='rating'
                    />
                    <div className={'price'}>
                        {items.price.old !== null
                            ? <s>&#8372;{items.price.old}</s>
                            : null
                        }
                        <span>&#8372;{items.price.new}</span>
                    </div>
                </div>
                <div className={'wrapper_button_price'}>
                    <button className={'buy'} onClick={() => {
                        if (localStorage.getItem('cart') !== null) {
                            changeCart(items);
                            changePrice(items);
                        } else {
                            changeCart(items);
                            changePrice(items);
                        }
                    }}>В корзину
                    </button>
                    <div className={'price'}>
                        {items.price.old !== null
                            ? <s>&#8372;{items.price.old}</s>
                            : null
                        }
                        <span>&#8372;{items.price.new}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const {cart, price} = state.shop;
    return {
        cart: cart,
        price: price
    }
};

const putStateToState = {
    changeCart,
    changePrice
};
export default connect(mapStateToProps, putStateToState)(AdminItem)
