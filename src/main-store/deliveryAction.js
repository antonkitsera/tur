export const CHANGE_CITY_REF = 'CHANGE_CITY_REF';
export const CHANGE_CITY = 'CHANGE_CITY';
export const CHANGE_DEPARTMENT_REF = 'CHANGE_DEPARTMENT_REF';
export const CHANGE_DEPARTMENT = 'CHANGE_DEPARTMENT';
export const CHANGE_STREET_REF = 'CHANGE_STREET_REF';
export const CHANGE_HOUSE = 'CHANGE_HOUSE';
export const CHANGE_STREET = 'CHANGE_STREET';
export const CHANGE_DEPARTMENT_ARRAY = 'CHANGE_DEPARTMENT_ARRAY';
export const CHANGE_STREET_ARRAY = 'CHANGE_STREET_ARRAY';
export const CHANGE_CITY_ARRAY = 'CHANGE_CITY_ARRAY';
export const CHANGE_APARTMENT = 'CHANGE_APARTMENT';

export const changeDepartmentArray = text => ({
    type: CHANGE_DEPARTMENT_ARRAY,
    payload: text,
});

export const changeStreetArray = text => ({
    type: CHANGE_STREET_ARRAY,
    payload: text,
});

export const changeCityArray = text => ({
    type: CHANGE_CITY_ARRAY,
    payload: text,
});

export const changeDepartmentRef = text => ({
    type: CHANGE_DEPARTMENT_REF,
    payload: text,
});

export const changeDepartment = text => ({
    type: CHANGE_DEPARTMENT,
    payload: text,
});

export const changeCity = text => ({
    type: CHANGE_CITY,
    payload: text,
});

export const changeCityRef = text => ({
    type: CHANGE_CITY_REF,
    payload: text,
});

export const changeStreet = text => ({
    type: CHANGE_STREET,
    payload: text,
});

export const changeStreetRef = text => ({
    type: CHANGE_STREET_REF,
    payload: text,
});

export const changeApartment = text => ({
    type: CHANGE_APARTMENT,
    payload: text,
});

export const changeHouse = text => ({
    type: CHANGE_HOUSE,
    payload: text,
});

