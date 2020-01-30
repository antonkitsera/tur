import React, {useState} from 'react';
import './style/filters.css';
import vector from '../image/vector_down.svg';
import AnotherFilterElement from '../Component/AnotherFilterElement'
import {ReactiveBase, RangeInput} from '@appbaseio/reactivesearch';


export default function MainFilters(props) {
    const [rangeModal, changeRange] = useState(false);
    return (
        <div className={'filters_section_wrapper'}>
            <div className={'range_wrapper'}>
                <div className={'title_wrapper'}>
                    <label htmlFor="range"
                           onClick={() => changeRange(!rangeModal)}>Ціна</label>
                </div>
                <div className={rangeModal ? 'range active_block' : 'range'}
                     id={'range'}
                     onClick={() => changeRange(!rangeModal)}>
                    <span className={'title'}>{props.start_range_value}</span>
                    <img src={vector}
                         className={rangeModal ? 'active_img' : null}
                         alt="vector"/>
                </div>
                {rangeModal
                    ? <div className={'every_filters_modal'}>
                        <div className={'price_range_slider'}>
                            <div className={'range_wrapper'}>
                                <ReactiveBase app="good-books-ds" credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d">
                                    <div className="row">
                                        <div className="col">
                                            <RangeInput
                                                dataField="ratings_count"
                                                componentId="BookSensor"
                                                range={{
                                                    start: 0,
                                                    end: 5000,
                                                }}
                                                defaultValue={{
                                                    start: props.min_price_range,
                                                    end: props.max_price_range,
                                                }}
                                                onValueChange={props.changeRangeValue}
                                            />
                                        </div>
                                    </div>
                                </ReactiveBase>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
            {props.dataPublishingArray !== null ?
                <AnotherFilterElement title={'Видавництво'}
                                      nameSwitch={'publishing'}
                                      addingToActiveArray={props.addingToActiveArray}
                                      dataArray={props.dataPublishingArray}/>
                : null}
            {props.dataAuthorArray !== null ?
                <AnotherFilterElement title={'Автор'}
                                      addingToActiveArray={props.addingToActiveArray}
                                      nameSwitch={'author'}
                                      dataArray={props.dataAuthorArray}/>
                : null}
            {props.dataLanguageArray !== null ?
                <AnotherFilterElement title={'Мова'}
                                      nameSwitch={'language'}
                                      addingToActiveArray={props.addingToActiveArray}
                                      dataArray={props.dataLanguageArray}/>
                : null}
            {props.dataCoverArray !== null
                ? <AnotherFilterElement title={'Обкладинка'}
                                        nameSwitch={'cover'}
                                        addingToActiveArray={props.addingToActiveArray}
                                        dataArray={props.dataCoverArray}/>
                : null}
        </div>
    )
}
