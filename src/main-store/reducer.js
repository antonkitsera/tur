import {ADDING_TO_CART} from "./actions";
import {DELETE_ITEMS_FROM_CART} from "./actions";
import {CHANGE_QUANTITY_FROM_CART} from "./actions";
import {CHANGING_PRICE} from "./actions";
import {CHANGE_UNIQUE_ITEMS} from "./actions";
import {REGISTRATION_MODAL} from "./actions";
import {SIGN_UP_USER} from "./actions";

const InitialState = {
    cart: (localStorage.getItem('cart') !== null)
        ? JSON.parse(localStorage.getItem('cart')) : [],
    price: 0,
    registration_modal: false,
    active_unique_items: null,
    sign_up: (localStorage.getItem('userToken') !== null
        ? localStorage.getItem('userToken') : false)
};

const filterCart = cart => {
    let newCart = [];
    cart.forEach(item => {
        if (newCart.filter(newItem => (
            newItem.id === item.id
        )).length === 0) {
            newCart.push(item);
        } else {
            newCart = newCart.filter(newItem => {
                if (newItem.id === item.id) {
                    newItem['quantity'] = newItem['quantity'] + 1;
                    return newItem
                } else {
                    return newItem
                }
            });
        }
    });
    return newCart;
};

export const shop = (state = InitialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case ADDING_TO_CART :
            if (state.cart.length > 0) {
                var cart = [...state.cart, action.payload];
                let filteredCart = filterCart(cart);
                localStorage.setItem('cart', JSON.stringify(filteredCart));
                return {...state, cart: filteredCart}
            } else {
                let object = [action.payload];
                localStorage.setItem('cart', JSON.stringify(object));
                return {...state, cart: [action.payload]};
            }
        case DELETE_ITEMS_FROM_CART:
            let filteredItems = state.cart.filter(item => {
                return item.id !== action.payload;
            });
            localStorage.setItem('cart', JSON.stringify(filteredItems));
            return {...state, cart: filteredItems};
        case CHANGE_QUANTITY_FROM_CART:
            let newCart = state.cart;
            newCart.forEach(item => {// being filter
                if (item.id === action.payload) {
                    if (action.symbol === 'inc') {
                        item['quantity'] = item['quantity'] + 1;
                        return item
                    } else if (action.symbol === 'dec') {
                        if (item.quantity > 1) {
                            item['quantity'] = item['quantity'] - 1;
                            return item
                        }
                    }
                }
            });
            localStorage.setItem('cart', JSON.stringify(newCart));
            return {...state, cart: newCart};
        case CHANGING_PRICE:
            let newPrice = state.price;
            state.cart.forEach(item => {
                newPrice += item.price.new + item.quantity
            });
            return {...state, price: newPrice};
        case SIGN_UP_USER:
            return {...state, sign_up: action.payload};
        case REGISTRATION_MODAL:
            return {...state, registration_modal: action.payload};
        case CHANGE_UNIQUE_ITEMS:
            return {...state, active_unique_items: action.payload};
    }
    return state;
};
