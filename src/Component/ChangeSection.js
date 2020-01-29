import React from 'react';

export default function ChangeSection({radio_value, handleChange, sp_categories}) {
    return (
        <div className={'change_section'}>
            {sp_categories.map(category => {
                return (
                    <React.Fragment key={category.id}>
                        <input type="radio"
                               value={category.id}
                               checked={radio_value === category.id}
                               onChange={handleChange}
                               id={category.name}/>
                        <label htmlFor={category.name}
                               className={radio_value === category.id ? 'active_radio' : null}>
                            {category.name}
                        </label>
                    </React.Fragment>
                )
            })}
        </div>
    )
}
