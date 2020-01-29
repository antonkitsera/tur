import React, {useState} from 'react'
import vector from "../image/vector_down.svg";

function AnotherFilterElement({title, dataArray, addingToActiveArray,nameSwitch}) {
    const [dropWindow, changeDrop] = useState(false);
    let newArr = [];
    dataArray.forEach(item => {
        if (item.check) {
            newArr.push(item.name)
        }
    });
    let titleString = newArr.join();
    return (
        <div className={'another_filter_wrapper'}>
            <div className={'title_wrapper'}>
                <label htmlFor="title"
                       onClick={() => changeDrop(!dropWindow)}>{title}
                </label>
            </div>
            <div className={dropWindow ? 'title_section active_block' : 'title_section'}
                 id={'range'}
                 onClick={() => changeDrop(!dropWindow)}>
                <span className={'title'}>
                    {newArr.length > 0
                        ? titleString.length > 16
                            ? titleString.substring(0, 16) + '...'
                            : titleString
                        : title
                    }
                    </span>
                <img src={vector}
                     className={dropWindow ? 'active_img' : null}
                     alt="vector"/>
            </div>
            {dropWindow
                ? <div className={'every_filters_modal'}>
                    {dataArray.map(item => {
                        return (
                            <div className={'every_filter_blocks'} key={item.id}>
                                <label htmlFor={item.id}>{item.name}</label>
                                <label className="container"
                                       onClick={() => changeDrop(!dropWindow)}>
                                    <input type="checkbox" id={item.id}
                                           data-key={item.id}
                                           checked={item.check}
                                           name={nameSwitch}
                                           value={item.name}
                                           onChange={addingToActiveArray}/>
                                    <span className="checkMark"/>
                                </label>
                            </div>
                        )
                    })}
                </div>
                :
                null
            }
        </div>
    )
}

export default AnotherFilterElement
