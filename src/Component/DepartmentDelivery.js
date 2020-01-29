import React from 'react'
import OrderingFormInputs from "./OrderingFormInputs";

function DepartmentDelivery({departmentError, department, handleChange, departmentArray}) {
    return (
        <div className={'every_selected'}>
            <OrderingFormInputs name_inputs={'Оберіть відділення *'}
                                name={'department'}
                                error={departmentError}
                                values={department}
                                handleChange={handleChange}/>
            <div className={departmentArray !== null ?
                'department_select' : 'department_select unActiveDropDown'}>
                {departmentArray !== null ?
                    departmentArray.map(item => {
                        return (
                            <div className={departmentArray.streetArray !== null ?
                                'every_department' : 'every_department unActiveDropDown'} key={item.Ref}>
                                <input type="radio" id={item.Description}
                                       name={'chooseDepartment'}
                                       data-key={item.Ref}
                                       onChange={handleChange}
                                       value={item.Description}/>
                                <label key={item.Description} htmlFor={item.Description}>
                                    {item.Description}
                                </label>
                            </div>
                        )
                    }) : null}
            </div>
        </div>
    )
}

export default DepartmentDelivery;
