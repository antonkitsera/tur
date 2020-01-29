import React from 'react';
import './style/header.css'
import search_button from '../image/search_button.svg'
import {withRouter} from 'react-router-dom'
import SearchModal from "./SearchModal";


class SearchForm extends React.Component {
    handleSearchSubmit = e => {
        e.preventDefault();
        this.props.history.push(`/item/search_result/${this.props.search_items}`);
        this.props.deleteSearchList();
    };

    render() {
        return (
            <form className={'search_form_wrapper'} onSubmit={this.handleSearchSubmit}>
                <input type="text"
                       value={this.props.search_items}
                       onChange={this.props.handleChange}
                       className={'search'}
                       placeholder={'Яку книгу шукаєте ?'}/>
                <button className={'search_button'}>
                    <img src={search_button} alt="vector"/>
                </button>
                {this.props.searchItemsArray !== null
                    ? <SearchModal searchItemsArray={this.props.searchItemsArray}
                                   authors={this.props.authors}
                                   quantityItems={this.props.quantityItems}
                                   deleteSearchList={this.props.deleteSearchList}
                                   search_items={this.props.search_items}/>
                    : null}
            </form>
        );
    }
}

export default withRouter(SearchForm);
