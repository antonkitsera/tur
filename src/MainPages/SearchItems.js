import React, {Component} from 'react'
import Title from '../Component/Title'
import MapAdminItems from '../Component/MapAdminItems'
import '../global_main.css'

const similarItems = [
    {
        id: 1,
        price: {
            new: 100,
            old: 120
        },
        unique_status: 3,
        quantity: 1
    },
    {
        id: 2,
        price: {
            new: 100,
        },
        unique_status: 3,
        quantity: 1
    },
    {
        id: 3,
        price: {
            new: 100,
            old: 120
        },
        unique_status: 2,
        quantity: 1
    },
    {
        id: 4,
        price: {
            new: 100,
            old: 120
        },
        unique_status: 0,
        quantity: 1
    },
    {
        id: 5,
        price: {
            new: 100,
            old: 120
        },
        unique_status: 1,
        quantity: 1
    },
    {
        id: 6,
        price: {
            new: 100,
            old: 120
        },
        unique_status: 2,
        quantity: 1
    },
    {
        id: 7,
        price: {
            new: 100,
            old: 120
        },
        unique_status: 2,
        quantity: 1
    },
    {
        id: 8,
        price: {
            new: 100,
            old: 120
        },
        unique_status: 1,
        quantity: 1
    }
];

export default class SearchItems extends Component {
    state = {activeURL: null, active_category: 1};

    componentDidMount() {
        let url = this.encode_utf8(window.location.href);
        this.setState({
            activeURL: url
        })
    }

    encode_utf8 = new_url => {
        let url = new_url.split('/').pop();
        return decodeURI(url);
    };

    componentDidUpdate(prevProps, prevState) {
        let url = this.encode_utf8(window.location.href);
        if (prevState.activeURL !== url) {
            this.setState({
                activeURL: url
            })
        }
    }

    handleChange = e => {
        this.setState({
            active_category: Number(e.target.value)
        })
        //zapros
    };

    render() {
        const {activeURL, active_category} = this.state;
        return (
            <div className={'search_items_wrapper'}>
                <div className={'title_wrapper'}>
                    {similarItems.length > 0
                        ? <Title title={`Результати пошуку для "${activeURL}"`}/>
                        : <Title title={`По запиту "${activeURL}" нічого не знайдено, спробуйте змінити запит `}/>
                    }
                </div>
                {similarItems.length > 0
                    ? <>
                        <div className={'select_category_wrapper'}>
                            <div className={'every_select'}>
                                <input type="radio"
                                       onChange={this.handleChange}
                                       id={'item'}
                                       checked={active_category === 1}
                                       value={1}/>
                                <label htmlFor={'item'}
                                       className={active_category === 1 ? "active_label" : null}>Товари</label>
                            </div>
                            <div className={'every_select'}>
                                <input type="radio"
                                       onChange={this.handleChange}
                                       id={'author'}
                                       checked={active_category === 2}
                                       value={2}/>
                                <label className={active_category === 2 ? "active_label" : null}
                                       htmlFor={'author'}>Автори</label>
                            </div>
                            <div className={'every_select'}>
                                <input type="radio"
                                       onChange={this.handleChange}
                                       id={'edition'}
                                       checked={active_category === 3}
                                       value={3}/>
                                <label htmlFor={'edition'}
                                       className={active_category === 3 ? "active_label" : null}>Видавництво</label>
                            </div>
                        </div>
                    </>
                    : null
                }
                <div className={'wrapper_searching_items'}>
                    <MapAdminItems items={similarItems}/>
                </div>
            </div>
        )
    }
}
