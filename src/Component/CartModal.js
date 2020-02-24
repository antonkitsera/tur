import React from 'react'
import './style/header.css'
import close_modal from '../image/close_modal.svg'
import {Link} from "react-router-dom";
import item_img from '../image/item_img.png'
import {connect} from 'react-redux'
import {deleteItem, changeQuantity} from '../main-store/actions'

class CartModal extends React.Component {
    state = {price: this.props.price, changeItems: false};

    componentDidUpdate(prevProps, prevState, snapshot) {
        let price = this.state;
        if (price !== prevState.price && this.state.changeItems) {
            let newPrice = 0;
            this.props.cart.map(item => (
                newPrice += item.price.new * item.quantity
            ));
            this.setState({
                price: newPrice,
                changeItems: !this.state.changeItems
            })
        }
    }

    render() {
        const {price} = this.state;
        return (
            <div className={'cart_modal_wrapper'}
                 ref={this.props.cart_ref}
                 onClick={(e) => this.props.eventCartModal(e)}>
                {this.props.cart.length < 1
                    ? <div className={'cart_modal empty_cart_wrapper'}>
                        <div className={'title_cart_modal'}>
                            <span>Корзина</span>
                            <img src={close_modal} alt="close" name={'close'} onClick={this.props.changeCartModal}/>
                        </div>
                        <div className={'empty_cart'}>
                            <span>Ваша корзина пуста</span>
                        </div>
                    </div>
                    : <div className={'cart_modal'}>
                        <div className={'title_cart_modal'}>
                            <span>Корзина</span>
                            <img src={close_modal} alt="close" name={'close'} onClick={this.props.changeCartModal}/>
                        </div>
                        <div className={'cart_modal_content'}>
                            {this.props.cart !== null ? this.props.cart.map(items => {
                                return <div className={'every_items'} key={items.id}>
                                    <Link to={`/item/${items.id}`} onClick={this.props.changeCartModal}>
                                        <img src={item_img} alt=""/>
                                    </Link>
                                    <div className={'items_content_wrapper'}>
                                        <Link to={`/item/${items.id}`}
                                              onClick={this.props.changeCartModal}
                                              className={'title'}>
                                            Бродяги Дхарми
                                        </Link>
                                        <span className={'desc'}>Джек Куреак</span>

                                        <div className={'item_price_wrapper'}>
                                            <span className={'price'}>&#8372;{items.price.new * items.quantity}</span>
                                        </div>
                                        <div className={'counter'}>
                                            <div className={items.quantity <= 1 ?
                                                'decrement_disable decrement'
                                                : 'decrement'} onClick={() => {
                                                this.props.changeQuantity(items.id, 'dec');
                                                this.setState({changeItems: !this.state.changeItems})
                                            }}>
                                                <span>&#8722;</span>
                                            </div>
                                            <span className={'quantity'}>{items.quantity}</span>
                                            <div className={'increment'} onClick={() => {
                                                this.props.changeQuantity(items.id, 'inc');
                                                this.setState({changeItems: !this.state.changeItems})
                                            }}>
                                                <span>&times;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'item_price_wrapper'}>
                                        <span className={'price'}>&#8372;{items.price.new * items.quantity}</span>
                                    </div>
                                    <div className={'delete_items_wrapper'}>
                                        <div className={'delete_items'} onClick={
                                            () => {
                                                this.props.deleteItem(items.id);
                                                this.setState({changeItems: true})
                                            }}>
                                            &times;
                                        </div>
                                    </div>
                                </div>
                            }) : null
                            }
                        </div>
                        {this.props.sale !== null && this.props.sale
                            ? <div className={'go_to_ordering'}>
                                <div className={'price_wrapper'}>
                                    <span className={'price'}>Сума: &#8372;{price}</span>
                                </div>
                                <div className={'ordering'}>
                                    <Link to={'/ordering'} onClick={this.props.changeCartModal}>Перейти до оформлення</Link>
                                </div>
                            </div>
                            : <div className={'go_to_ordering'}>
                                <div className={'price_wrapper'}>
                                    <span className={'price'}>Сума: &#8372;{price}</span>
                                </div>
                                <div className={'ordering'}>
                                    <Link to={'/ordering'} onClick={this.props.changeCartModal}>Перейти до оформлення</Link>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {cart} = state.shop;
    return {
        cart: cart
    }
};

const putStateToState = {
    deleteItem,
    changeQuantity,
};

export default connect(mapStateToProps, putStateToState)(CartModal)
