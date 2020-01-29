import React, {Component} from "react";
import Slider from "react-slick";
import './style/unique_items.css'
import  delete_items_unique from '../image/delete_items_unique.png';

export default class AsNavFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        const settings1 = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            vertical: true,
            draggable: false,
            arrows: false,
            slidesToScroll: false
        };
        const settings2 = {
            slidesToScroll: 1,
            vertical: true,
            slidesToShow: 4,
            swipeToSlide: true,
            focusOnSelect: true,
        };
        return (
            <div className={'vertical_slider'}>
                <Slider style={{display: 'grid'}}
                        asNavFor={this.state.nav1}
                        ref={slider => (this.slider2 = slider)}
                        {...settings2}>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                </Slider>
                <Slider
                    style={{display: 'grid'}}
                    {...settings1}
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                    <div>
                        <img src={delete_items_unique} alt=""/>
                    </div>
                </Slider>
            </div>
        );
    }
}
