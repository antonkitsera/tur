import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Routers from './MainPages/Routers';
import PrivateRoute from "./PrivateRouter";

import ProtectedAdminRoute from "./ProtectedAdminRoute"

import Login from './AdminPages/Login';
import GoodsPage from './AdminPages/Goods';
import LanguagesPage from './AdminPages/Languages';
import BannersPage from './AdminPages/Banners';
import AuthorsPage from "./AdminPages/Authors";
import PublishmentsPage from "./AdminPages/Publishments";
import CategoriesPage from "./AdminPages/Categories";
import OrdersPage from "./AdminPages/Orders";
import SalesPage from "./AdminPages/Sales";
import StatsPage from "./AdminPages/Stats";
import UsersPage from "./AdminPages/Users";
import RequestsPage from "./AdminPages/Requests";


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

            <Route exact path='/admin' component={Login}/>

            <ProtectedAdminRoute exact path='/admin/goods/:id/:id?' component={GoodsPage}/>
            <ProtectedAdminRoute exact path='/admin/languages' component={LanguagesPage}/>
            <ProtectedAdminRoute exact path='/admin/banners' component={BannersPage}/>
            <ProtectedAdminRoute exact path='/admin/authors' component={AuthorsPage}/>
            <ProtectedAdminRoute exact path='/admin/publishments' component={PublishmentsPage}/>
            <ProtectedAdminRoute exact path='/admin/categories/:id' component={CategoriesPage}/>
            <ProtectedAdminRoute exact path='/admin/orders' component={OrdersPage}/>
            <ProtectedAdminRoute exact path='/admin/sales' component={SalesPage}/>
            <ProtectedAdminRoute exact path='/admin/stats' component={StatsPage}/>
            <ProtectedAdminRoute exact path='/admin/users/:id?' component={UsersPage}/>
            <ProtectedAdminRoute exact path='/admin/requests' component={RequestsPage}/>

            <Redirect to='/404'/>
        </Switch>
    </BrowserRouter>
);
export default Router