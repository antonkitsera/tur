import React from 'react'
import item_img from "../image/item_img.png";
import {Link} from 'react-router-dom'

export default class OrderingCart extends React.Component {
    state = {price: 0, changeItems: false};

    componentDidMount() {
        let newPrice = 0;
        this.props.cart.forEach(item => {
            newPrice += item.price.new * item.quantity;
        });
        this.setState({
            price: newPrice
        });
    }

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
            <div className={'wrapper_order'}>
                {this.props.cart.map(items => {
                    return (
                        <div className={'every_items_in_cart'} key={items.id}>
                            <Link to={`/item/${items.id}`}>
                                <img src={item_img} alt="item"/>
                            </Link>
                            <div className={'items_content_wrapper'}>
                                <Link to={`/item/${items.id}`} className={'title'}>
                                    Бродяги Дхарми
                                </Link>
                                <span className={'desc'}>Джек Куреак</span>
                                <div className={'counter'}>
                                    <div className={items.quantity <= 1 ?
                                        'decrement_disable decrement'
                                        : 'decrement'} onClick={() => {
                                        this.props.changeQuantity(items.id, 'dec');
                                        this.props.changePrice(items);
                                        this.setState({changeItems: !this.state.changeItems})
                                    }}>
                                        <span>&#8722;</span>
                                    </div>
                                    <span className={'quantity'}>{items.quantity}</span>
                                    <div className={'increment'} onClick={() => {
                                        this.props.changeQuantity(items.id, 'inc');
                                        this.props.changePrice(items);
                                        this.setState({changeItems: !this.state.changeItems})
                                    }}>
                                        <span>&times;</span>
                                    </div>
                                </div>
                            </div>
                            <div className={'price_items_wrapper'}>
                                <span className={'price'}>&#8372;{items.price.new * items.quantity}</span>
                            </div>
                        </div>
                    )
                })}
                <div className={'price_wrapper'}>
                    <span className={'price'}>Сума: &#8372;{price}</span>
                </div>
            </div>
        )
    }
}
