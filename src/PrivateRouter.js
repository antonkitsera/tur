import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Routers from "./MainPages/Routers";

const PrivateRoute = ({component: Component, ...rest}) => {
    let responseComponent;
    const userToken = localStorage.getItem('userToken');

    if (userToken !== null) {
        responseComponent = props => (<Routers {...props} />);
    } else responseComponent = props => (<Redirect to="/"/>);

    return <Route {...rest} render={responseComponent}/>;
};

export default PrivateRoute;
