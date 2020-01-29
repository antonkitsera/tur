import React from 'react';
import Slider from 'react-slick';
import '../MainPages/style/category.css'
import AdminItem from "./AdminItem";

export default function ItemsSlider(props) {
    let settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {props.items.map(item => {
                return <AdminItem items={item} key={item.id}/>
            })}
        </Slider>
    )
}
