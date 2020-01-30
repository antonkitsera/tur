import React from 'react'
import '../global_main.css'
import {Link} from "react-router-dom";
import author_image from '../image/author_image.png'
import Title from '../Component/Title'
import MapAdminItems from "../Component/MapAdminItems";
import MainFilters from "../Component/MainFilters";

const items = [
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

export default class UniqueAuthor extends React.Component {
    state = {
        currentID: null,
        items: null,
        currentUrlName: null,
        currentAuthorName: 'Айзек Азімов',
        currentAuthorImage: null,
        currentAuthorDesc: 'Айзек Азімов народився в Смоленській області 1920 року в єврейській сім\'ї. В 3 роки разом з батьками переїздить до Брукліна. В 15 років розпочинає навчання в коледжі. А потім в Колумбійському Університеті Нью-Йорка, який в 1941 році закінчує. Вже в 11 років почав писати оповідання. Про роботів вперше написав в 1939 році. Започаткував роботехніку як науку, сформувавши три її закони. Збірка "Я. робот" принесла Азімову шалений успіх. Його роботи це миролюбиві істоти, які є помічниками людей. Також з великим успіхом писав науково-фантастичні детективи. Найвідомішим є роман "Сталеві печери". Помер Айзек Азімов коли йому було 72 роки.',
        start_range_value: 'Оберіть ціну',
        max_price_range: 5000,
        min_price_range: 0,
        dataAuthorArray: [
            {
                name: "Українська",
                id: 3,
                check: false
            },
            {
                name: "Польська",
                id: 4,
                check: false
            },
        ],
        dataPublishingArray: [
            {
                name: "Українська",
                id: 3,
                check: false
            },
            {
                name: "Польська",
                id: 4,
                check: false
            },
        ],
        dataLanguageArray: [
            {
                name: "Українська",
                id: 3,
                check: false
            },
            {
                name: "Польська",
                id: 4,
                check: false
            },
        ],
        dataCoverArray: [
            {
                name: "Українська",
                id: 3,
                check: false
            },
            {
                name: "Польська",
                id: 4,
                check: false
            },
        ],
    };
    changeRangeValue = val => {
        if (val.start > val.end) {
            this.setState({
                min_price_range: 5000,
                max_price_range: val.end,
            })
        } else if (val.end < 0 && val.start < 0) {
            this.setState({
                min_price_range: 5000,
                max_price_range: val.end,
            })
        }
    };

    getChangeCheck = (val, array) => {
        array.forEach(item => {
            if (item.id === val) {
                item['check'] = !item['check']
            }
        });
        return array
    };


    addingToActiveArray = event => {
        switch (event.target.name) {
            case 'author':
                let currentAuthorId = Number(event.target.getAttribute('data-key'));
                let newAuthorArr = this.state.dataAuthorArray;
                let changeAuthorChecked = this.getChangeCheck(currentAuthorId, newAuthorArr);
                this.setState({
                    dataAuthorArray: changeAuthorChecked
                });
                break;
            case 'publishing':
                let currentPublishingId = Number(event.target.getAttribute('data-key'));
                let newPublishingArr = this.state.dataPublishingArray;
                let changePublishingChecked = this.getChangeCheck(currentPublishingId, newPublishingArr);
                this.setState({
                    dataPublishingArray: changePublishingChecked
                });
                break;
            case 'language':
                let currentLanguageId = Number(event.target.getAttribute('data-key'));
                let newLanguageArr = this.state.dataLanguageArray;
                let changeLanguageChecked = this.getChangeCheck(currentLanguageId, newLanguageArr);
                this.setState({
                    dataLanguageArray: changeLanguageChecked
                });
                break;
            case 'cover':
                let currentCoverId = Number(event.target.getAttribute('data-key'));
                let newCoverArr = this.state.dataCoverArray;
                let changeCoverChecked = this.getChangeCheck(currentCoverId, newCoverArr);
                this.setState({
                    dataCoverArray: changeCoverChecked
                });
                break;
            default:
                return
        }
    };

    componentDidMount() {
        let currentUrl = this.getCurrentUrl();
        let currentUrlName = this.getCurrentName();
        this.setState({
            currentID: currentUrl,
            currentUrlName: currentUrlName,
        }, () => {

        });
    };

    getCurrentName = () => {
        let url = window.location.href;
        if (url.includes('author')) {
            return 'author'
        } else {
            return 'publishing'
        }
    };
    getCurrentUrl = () => {
        let url = window.location.href;
        return url.split('').pop()
    };

    render() {
        const {
            currentUrlName, currentAuthorName, currentAuthorDesc,
            start_range_value, min_price_range, dataPublishingArray,
            max_price_range, dataAuthorArray,
            dataLanguageArray, dataCoverArray
        } = this.state;
        return (
            <div className={'unique_author_wrapper'}>
                {currentUrlName !== null ?
                    <div className={'section_links'}>
                        <Link to={currentUrlName === 'author' ?
                            '/author' : '/publishing'} className={'category_title'}>
                            {'Каталог авторів'}
                        </Link>
                        <Link to={''}>{currentAuthorName}</Link>
                    </div>
                    : null
                }
                <div className={'unique_author_content'}>
                    <div className={'img_wrapper'}>
                        <img src={author_image} alt=""/>
                    </div>
                    <div className={'desc_wrapper'}>
                        <p>{currentAuthorDesc}</p>
                    </div>
                </div>
                <MainFilters start_range_value={start_range_value}
                             dataPublishingArray={currentUrlName !== 'author' ? dataPublishingArray : null}
                             dataCoverArray={dataCoverArray}
                             dataAuthorArray={currentUrlName === 'author' ? dataAuthorArray : null}
                             dataLanguageArray={dataLanguageArray}
                             addingToActiveArray={this.addingToActiveArray}
                             min_price_range={min_price_range}
                             max_price_range={max_price_range}
                             changeRangeValue={this.changeRangeValue}/>
                <div className={'another_author_items'}>
                    <Title title={'Книги автора'}/>
                    <MapAdminItems items={items}/>
                </div>
            </div>
        )
    }
}
