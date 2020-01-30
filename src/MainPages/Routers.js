import React from 'react';
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import CategoryMain from './CategoryMain'
import UniqueItems from './UniqueItems'
import OrderBooks from './OrderBooks'
import Main from './Main'
import {BrowserRouter as Router, Route} from "react-router-dom";
import '../global_main.css'
import AboutTheBooks from "./AboutTheBooks";
import UniqueAuthor from "./UniqueAuthor";
import Delivery from "./Delivery";
import AboutYourPersonalAccount from "./AboutYourPersonalAccount";
import AllPublishing from "./AllPublishing";
import SearchItems from "./SearchItems";
import AllInCategory from "./AllInCategory";
import PersonalAccount from "./PersonalAccount";
import Error404 from "./Error404";
import {openRegistrationModal} from '../main-store/actions'
import {connect} from "react-redux";
import API from "../API";

const itemARRAY = {
    items:
        [
            {
                id: 1,
                name: 132231,
                surname: 321132231,
                price: {
                    new: 12
                }
            }, {
            id: 2,
            name: 132231,
            surname: 321132231,
            price: {
                new: 12
            }
        }, {
            id: 3,
            name: 132231,
            surname: 321132231,
            price: {
                new: 12
            }
        }, {
            id: 4,
            name: 132231,
            surname: 321132231,
            price: {
                new: 12
            }
        }],
    author: [
        {
            id: 1,
            name: 'hui'
        },
        {
            id: 2,
            name: 'hui'
        },
    ]
};
const routes = [
    {
        pathname: "/",
        exact: true,
        main: () => <Main/>,
    },
    {
        exact: true,
        pathname: "/category/:id",
        main: () => <CategoryMain/>,
    },
    {
        exact: true,
        pathname: "/item/:id",
        main: () => <UniqueItems/>,
    },
    {
        exact: true,
        pathname: "/publishing",
        main: () => <AllPublishing/>,
    },
    {
        exact: true,
        pathname: "/author",
        main: () => <AllPublishing/>,
    },
    {
        exact: true,
        pathname: "/publishing/:id",
        main: () => <UniqueAuthor/>,
    },
    {
        exact: true,
        pathname: "/author/:id",
        main: () => <UniqueAuthor/>,
    },
    {
        exact: true,
        pathname: "/category/:id/pre_category/:id",
        main: () => <CategoryMain/>,
    },
    {
        pathname: "/ordering",
        main: () => <OrderBooks/>,
    },
    {
        pathname: "/about_the_books",
        main: () => <AboutTheBooks/>,
    },
    {
        pathname: "/delivery_and_pay",
        main: () => <Delivery/>,
    },
    {
        pathname: "/about_your_personal_account",
        main: () => <AboutYourPersonalAccount/>,
    },
    {
        pathname: "/category/:id/all_in_category",
        main: () => <AllInCategory/>,
    },
    {
        pathname: "/all_items",
        main: () => <AllInCategory/>,
    },
    {
        pathname: "/personal_account",
        main: () => <PersonalAccount/>,
    },
    {
        pathname: "/item/search_result/:id",
        main: () => <SearchItems/>,
    },
    {
        pathname: '/404',
        main: () => <Error404/>,
    }
];

class Routers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_modal: false,
            category_modal: false,
            searchItemsArray: null,
            search_items: ''
        };
        this.cart_ref = React.createRef();

        this.category_ref = React.createRef()
    }

    deleteSearchList = () => {
        this.setState({
            searchItemsArray: null
        })
    };
    changeCartModal = () => {
        this.setState(state => ({
            cart_modal: !state.cart_modal,
            category_modal: false,
        }));
        this.props.openRegistrationModal(false);
    };

    changeRegistrationModal = () => {
        this.props.openRegistrationModal(!this.props.registration_modal);
        this.setState({
            cart_modal: false,
            category_modal: false,
        })
    };

    changeCategoryModal = () => {
        this.setState(state => ({
            category_modal: !state.category_modal,
            cart_modal: false,
            searchItemsArray: null,
        }));
        this.props.openRegistrationModal(false);
    };

    eventCartModal = e => {
        if (this.cart_ref.current === e.target) {
            this.setState(state => ({
                cart_modal: !state.cart_modal,
                category_modal: false,
            }))
        }
    };

    eventRegistrationModal = e => {
        if (this.registration_ref.current === e.target) {
            this.props.openRegistrationModal(!this.props.registration_modal);
            this.setState({
                cart_modal: false,
                category_modal: false,
            })
        }
    };

    eventCategoryModal = e => {
        if (this.category_ref.current === e.target) {
            this.setState(state => ({
                category_modal: !state.category_modal,
                cart_modal: false,
            }));
            this.props.openRegistrationModal(false);
        }
    };
    handleChange = e => {
        this.setState({
            search_items: e.target.value
        }, () => {
            if (this.state.search_items.length > 1) {
                API.get(`/search_books?name=${this.state.search_items}`)
                    .then(res => {
                        console.log(res.data);
                        this.setState({
                            searchItemsArray: res.data.book,
                            quantityItems: res.data.quantity,
                            authors: res.data.authors,
                        });
                        console.log(this.state)
                    });
            } else this.setState({
                searchItemsArray: null,
                category_modal: false
            })
        });
    };

    render() {
        const {cart_modal, category_modal, search_items,
            quantityItems, authors,
            searchItemsArray} = this.state;
        return (
            <div className={'app-container'}>
                <Router>
                    <Header cart_modal={cart_modal}
                            cart_ref={this.cart_ref}
                            deleteSearchList={this.deleteSearchList}
                            category_ref={this.category_ref}
                            eventCategoryModal={this.eventCategoryModal}
                            changeCategoryModal={this.changeCategoryModal}
                            category_modal={category_modal}
                            registration_ref={this.registration_ref}
                            search_items={search_items}
                            authors={authors}
                            handleChange={this.handleChange}
                            quantityItems={quantityItems}
                            searchItemsArray={searchItemsArray}
                            eventRegistrationModal={this.eventRegistrationModal}
                            changeRegistrationModal={this.changeRegistrationModal}
                            registration_modal={this.props.registration_modal}
                            eventCartModal={this.eventCartModal}
                            changeCartModal={this.changeCartModal}/>
                    {routes.map(route => (
                        <div key={route.pathname} className={'main_content_wrapper'}>
                            <Route path={route.pathname} exact={route.exact} component={route.main}/>
                        </div>
                    ))}
                </Router>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        registration_modal: state.shop.registration_modal,
    }
};

const putStateToState = {
    openRegistrationModal
};
export default connect(mapStateToProps, putStateToState)(Routers)
