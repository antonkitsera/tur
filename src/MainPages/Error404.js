import React from 'react'
import '../global_main.css';
import {Link} from 'react-router-dom';

const Error404 = props => {
    return (
        <div className={'page_404'}>
            <span className={'title'}>404</span>
            <span className={'desc'}>Упс...Ця сторінка мабуть загубилась :(</span>
            <Link to={'/'}>На головну</Link>
        </div>
    )
};

export default Error404;
