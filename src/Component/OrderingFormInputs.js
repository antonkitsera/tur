import React from 'react';

export default function OrderingFormInputs({values, handleChange, name_inputs, name, error}) {
    return (
        <div className={'every_inputs'}>
            <label htmlFor=''>{name_inputs}</label>
            <input type="text"
                   className={error !== null && error !== undefined ? 'error' : null}
                   name={name}
                   autoComplete="off"
                   autoCorrect="off"
                   spellCheck="off"
                   value={values}
                   onChange={handleChange}/>
        </div>
    )
}
