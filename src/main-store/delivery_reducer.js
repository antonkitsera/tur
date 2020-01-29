import {
    CHANGE_DEPARTMENT, CHANGE_DEPARTMENT_ARRAY,
    CHANGE_CITY_ARRAY, CHANGE_APARTMENT, CHANGE_HOUSE,
    CHANGE_DEPARTMENT_REF, CHANGE_CITY, CHANGE_CITY_REF,
    CHANGE_STREET, CHANGE_STREET_REF, CHANGE_STREET_ARRAY
} from "./deliveryAction";

const InitialState = {
    cityRef: null,
    city: '',
    department: '',
    street: '',
    apartment: '',
    house: '',
    streetRef: null,
    departmentRef: null,
    cityArray: null,
    streetArray: null,
    departmentArray: null,
};

export const delivery = (state = InitialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case CHANGE_STREET_REF:
            return {...state, streetRef: action.payload};
        case CHANGE_STREET:
            return {...state, street: action.payload};
        case CHANGE_CITY_REF:
            return {...state, cityRef: action.payload};
        case CHANGE_CITY:
            return {...state, city: action.payload};
        case CHANGE_DEPARTMENT:
            return {...state, department: action.payload};
        case CHANGE_DEPARTMENT_REF:
            return {...state, departmentRef: action.payload};
        case CHANGE_CITY_ARRAY:
            return {...state, cityArray: action.payload};
        case CHANGE_APARTMENT:
            return {...state, apartment: action.payload};
        case CHANGE_DEPARTMENT_ARRAY:
            return {...state, departmentArray: action.payload};
        case CHANGE_STREET_ARRAY:
            return {...state, streetArray: action.payload};
        case CHANGE_HOUSE:
            return {...state, house: action.payload};
    }
    return state;
};
