import React from 'react';
import './style/footer.css'
import vector from '../image/vector.svg'

export default function SearchForm({values, handleSubmit, handleChange}) {
    return (
        <form className={'search_form_wrapper'} onSubmit={handleSubmit}>
            <input type="text"
                   placeholder={'Введіть ваш номер'}
                   value={values}
                   onChange={handleChange}/>
            <button><img src={vector} alt="submit"/></button>
        </form>
    );
}
