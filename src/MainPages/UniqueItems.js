import React from 'react';
import '../global_main.css'
import './style/unique_items.css';
import UniqueItemSlider from '../Component/UniqueItemSlider';
import AddingComment from '../Component/AddingComment';
import {Link} from "react-router-dom";
import MapAdminItems from "../Component/MapAdminItems";
import Title from "../Component/Title";
import StarRatings from "react-star-ratings";
import {connect} from "react-redux";
import {changeCart, openRegistrationModal, changeUniqueItems, changePrice} from '../main-store/actions'
// import Pagination from "react-js-zpagination";
import API from '../API'
import {background_color_changing} from "../BackgroundKids";
import AdminItem from "../Component/AdminItem";
import photo from "../image/photo.png";

const getInfoAboutBook = (loading, title, info) => {
    return <>
        <div className={'title_wrapper'}>
            <span className={'title'}>{title}</span>
            <div/>
        </div>
        <span className={'desc'}>{info}</span>
    </>
};

class UniqueItems extends React.Component {
    state = {
        activeItem: null,
        item: null,
        comment: '',
        loading: false,
        activePage: this.props.active_unique_items,
        backgroundColor: null,
    };

    componentDidMount() {
        let currentUrl = this.getCurrentUrl();
        this.props.changeUniqueItems(currentUrl);
        this.getUser(currentUrl)
    }

    getUser = currentUrl => {
        API.get(`/book?id=${Number(currentUrl)}`)
            .then(res => {
                this.setState({
                    item: res.data.book,
                    loading: true,
                    similar_items: res.data.related_books
                }, () => {
                    this.changeColorForKids(this.state.item.category.id)
                })
            });
    };

    changingColor(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    changeColorForKids(category) {
        if (category === 2) {
            let color = this.changingColor(0, 7);
            this.setState({
                backgroundColor: background_color_changing[color]
            });
        } else this.setState({backgroundColor: null})
    };

    getCurrentUrl() {
        let url = window.location.href;
        return url.split('/').pop();
    }

    handleChangeRegistration = () => {
        this.props.openRegistrationModal(!this.props.registration_modal)
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({comment: ''})
    };

    handleChangeComment = e => {
        this.setState({comment: e.target.value})
    };

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    handleChangePage = () => {
        let currentUrl = this.getCurrentUrl();
        this.props.changeUniqueItems(currentUrl);
        this.getUser(currentUrl);
    };

    render() {
        const {item, loading, comment, similar_items, backgroundColor} = this.state;
        let illustration = loading && item.illustration ? "Ні" : "Так";
        return (
            <div className={'wrapper_category_page unique_items_page'}
                 style={{backgroundColor: backgroundColor}}>
                <div className={'wrapper_title_unique_item'}>
                    {loading ?
                        <>
                            <Link to={`/category/${item.category.id}`}>{item.category.name}</Link>
                            <Link to={`/category/${item.category.id}/pre_category/${item.subcategory.id}`}>{item.subcategory.name}</Link>
                        </>
                        : null
                    }
                </div>
                <UniqueItemSlider/>
                <div className={'items_info'}>
                    <span className={'name_items'}>{loading ? item.name : null}</span>
                    {loading ?
                        item.author.map(author => {
                            return (
                                <div className={'author_wrapper'} key={author.id}>
                                    <span className={'author'}>Автори:</span>
                                    <span className={'items_author'}>
                                    {author.name}
                                </span>
                                </div>
                            )
                        }) : null}
                    {loading && item.assessment !== null
                        ? <div className={'start_rating'}>
                            <StarRatings
                                rating={item.assessment}
                                starRatedColor="#E9C715"
                                numberOfStars={5}
                                name='rating'/>
                        </div>
                        : null}
                    <div className={'information_about_items'}>
                        {loading ? getInfoAboutBook(loading, 'Видавництво:', item.ph.name) : null}
                        {loading ? getInfoAboutBook(loading, 'Мова:', item.language.name) : null}
                        {loading ? getInfoAboutBook(loading, 'Рік:', item.year) : null}
                        {loading && item.cover_type ? getInfoAboutBook(loading, 'Тип\xa0обкладинки:', item.cover_type.name) : null}
                        {loading && item.info.paper !== null
                            ? getInfoAboutBook(loading, 'Папір:', item.info.paper.name)
                            : null}
                        {loading && item.illustration !== null
                            ? getInfoAboutBook(loading, "Ілюстрації: ", illustration)
                            : null}
                        {loading ?
                            getInfoAboutBook(loading, 'Код\xa0товару:', item.code)
                            : null}
                        {loading && item.info.gender !== null ?
                            getInfoAboutBook(loading, 'Стать:', item.info.gender.name)
                            : null}
                    </div>
                    <div className={'price_wrapper'}>
                        <div className={'price'}>
                            {loading && item.price.old !== null
                                ? <s>&#8372;298</s> : null}
                            {loading ? <span>&#8372;{item.price.new}</span> : null}
                        </div>
                        <div className={'sale_wrapper'}>
                            <span>Ваша знижка: 10%</span>
                            <span>Ваша ціна: ₴180</span>
                        </div>
                    </div>
                    <div className={'adding_to_cart'} onClick={() => {
                        this.props.changeCart(item)
                    }}>
                        Додати в корзину
                    </div>
                </div>
                <div className={'description_wrapper'}>
                    <span className={'title'}> Про книгу:</ span>
                    <p>{loading ? item.description : null}</p>
                </div>
                {/*<div className={'replies_wrapper'}>*/}
                {/*    <span className={'reply_title'}>Відгуки ({bookReply.length})</span>*/}
                {/*    {bookReply.map(reply => {*/}
                {/*        return (*/}
                {/*            <div className={'every_replies'} key={reply.id}>*/}
                {/*                <div className={'wrapper_title_reply'}>*/}
                {/*                    <span className={'title'}>{reply.name}</span>*/}
                {/*                    <span className={'time'}>{reply.time}</span>*/}
                {/*                </div>*/}
                {/*                <p>{reply.description}</p>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</div>*/}
                {/*<div className={'pagination_wrapper'}>*/}
                {/*    <span className={'title'}>Сторінки</span>*/}
                {/*    <Pagination*/}
                {/*        activePage={activePage}*/}
                {/*        itemsCountPerPage={2}*/}
                {/*        totalItemsCount={bookReply.length}*/}
                {/*        pageRangeDisplayed={5}*/}
                {/*        onChange={pageNumber => this.handlePageChange(pageNumber)}*/}
                {/*    />*/}
                {/*</div>*/}
                {this.props.sign_up
                    ? <AddingComment handleChangeComment={this.handleChangeComment}
                                     handleSubmit={this.handleSubmit}
                                     comment={comment}/>
                    : <div className={'changeRegistrationModal'}>
                        Щоб залишити відгук <span className={'registration'}
                                                  onClick={this.handleChangeRegistration}>
                    Увійдіть</span> або <span
                        className={'registration'}
                        onClick={this.handleChangeRegistration}>Зареєструйтесь</span>
                    </div>
                }
                {similar_items !== null
                    ? <div className={'similar_items'}>
                        <Title title={'Схожі товари'}/>
                        <div className={'map_every_items'}>
                            {similar_items.map(item => {
                                return (
                                    <div className={'every_items'} onClick={this.handleChangePage} key={item.id}>
                                        <Link to={`/item/${item.id}`}
                                              className={'wrapper_image'}>
                                            <div className={item.unique_status === 1 ?
                                                'unique_status unique_status_top' : item.unique_status === 2 ?
                                                    'unique_status_sale unique_status' :
                                                    item.unique_status === 3 ? 'unique_status unique_status_new'
                                                        : null}>
                                                <span>{item.unique_status === 1 ?
                                                    'TOP' : item.unique_status === 2 ?
                                                        'SALE' :
                                                        item.unique_status === 3 ? 'NEW'
                                                            : null}</span>
                                            </div>
                                            <img src={photo} alt={'book_image'}/>
                                        </Link>
                                        <div className={'item_content_wrapper'}>
                                            <Link to={`/item/${item.id}`}
                                                  className={'title'}>{item.name}</Link>
                                            <span className={'desc'}>Дейл Карнегі</span>
                                            <StarRatings
                                                rating={item.id}
                                                starRatedColor="#E9C715"
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                            <div className={'wrapper_button_price'}>
                                                <button className={'buy'} onClick={() => {
                                                    if (localStorage.getItem('cart') !== null) {
                                                        changeCart(item);
                                                        changePrice(item);
                                                    } else {
                                                        changeCart(item);
                                                        changePrice(item);
                                                    }
                                                }}>В корзину
                                                </button>
                                                <div className={'price'}>
                                                    {item.price.old !== null
                                                        ? <s>&#8372;{item.price.old}</s>
                                                        : null
                                                    }
                                                    <span>&#8372;{item.price.new}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.shop.cart,
        registration_modal: state.shop.registration_modal,
        sign_up: state.shop.sign_up,
        active_unique_items: state.shop.active_unique_items
    }
};

const putStateToState = {
    changeCart,
    openRegistrationModal,
    changeUniqueItems
};

export default connect(mapStateToProps, putStateToState)(UniqueItems);
