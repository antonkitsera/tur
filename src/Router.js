import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Routers from './MainPages/Routers';
import Login from './AdminPages/Login';
import PrivateRoute from "./PrivateRouter";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Routers}/>
            <Route path='/category/:id' component={Routers}/>
            <Route path='/item/:id' component={Routers}/>
            <Route path='/ordering' component={Routers}/>
            <Route path='/delivery_and_pay' component={Routers}/>
            <Route path='/about_your_personal_account' component={Routers}/>
            <Route path='/publishing' component={Routers}/>
            <Route path='/author' component={Routers}/>
            <Route path='/author/:id' component={Routers}/>
            <Route path='/publishing/:id' component={Routers}/>
            <Route path='/all_items' component={Routers}/>
            <Route path='/item/search_result/:id' component={Routers}/>
            <Route path='/category/:id/all_in_category' component={Routers}/>
            <Route path='/about_the_books' component={Routers}/>
            <Route path='/category/:id/pre_category/:id' component={Routers}/>
            <Route exact path='/admin' component={Login}/>
            <PrivateRoute path='/personal_account'/>
            <Route path='/404' component={Routers}/>
            <Redirect to='/404'/>
        </Switch>
    </BrowserRouter>
);
export default Router
