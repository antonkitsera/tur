export const ADDING_TO_CART = 'ADDING_TO_CART';
export const DELETE_ITEMS_FROM_CART = 'DELETE_ITEMS_FROM_CART';
export const CHANGE_QUANTITY_FROM_CART = 'DECREMENT_QUALITY_FROM_CART';
export const CHANGING_PRICE = 'CHANGING_PRICE';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const REGISTRATION_MODAL = 'REGISTRATION_MODAL';
export const CHANGE_UNIQUE_ITEMS = 'CHANGE_UNIQUE_ITEMS';

export const changeCart = text => ({
    type: ADDING_TO_CART,
    payload: text
});

export const deleteItem = text => ({
    type: DELETE_ITEMS_FROM_CART,
    payload: text
});

export const changeQuantity = (text, symbol) => ({
    type: CHANGE_QUANTITY_FROM_CART,
    payload: text,
    symbol: symbol
});

export const changePrice = text => ({
    type: CHANGING_PRICE,
    payload: text,
});

export const sign_up = text => ({
    type: SIGN_UP_USER,
    payload: text,
});

export const openRegistrationModal = text => ({
    type: REGISTRATION_MODAL,
    payload: text,
});
export const changeUniqueItems = text => ({
    type: CHANGE_UNIQUE_ITEMS,
    payload: Number(text),
});
