import React from 'react'
import search_image_delete from '../image/search_image_delete.png';
import vector from '../image/black_vector.svg';
import {Link} from 'react-router-dom';
import {changeUniqueItems} from "../main-store/actions";
import {connect} from "react-redux";

function SearchModal({
                         searchItemsArray, quantityItems, search_items,
                         deleteSearchList, changeUniqueItems, authors,
                         quantityAuthors
                     }) {
    console.log(quantityItems, authors);
    return (
        <div className={'search_modal_wrapper'}>
            <div className={'items_array_length'}>
                <span>Товари ({quantityItems})</span>
            </div>
            {searchItemsArray.map(item => {
                return (
                    <Link to={`/item/${item.id}`}
                          onClick={() => {
                              changeUniqueItems(item.id);
                              deleteSearchList()
                          }}
                          className={'every_item'} key={item.id}>
                        <img src={search_image_delete} alt="item_img"/>
                        <div className={'name_wrapper'}>
                            <div className={'author_name'}>
                                <span className={'title'}>{item.name}</span>
                                <span className={'name'}>{item.surname !== null ? item.surname: null}</span>
                            </div>
                            <div className={'items_price'}>
                                <span className={'price'}>{item.price.new !== null ? item.price.new: null}</span>
                            </div>
                        </div>
                    </Link>
                )
            })}
            <div className={'wrapper_author_length'}>
                <span>Автори ({authors.number_of_authors$})</span>
            </div>
            <div className={'wrapper_author_maps'}>
                {searchItemsArray.author.map(author => {
                    return (
                        <div className={'every_author'} key={author.id}>
                            <span>{author.name}</span>
                        </div>
                    )
                })}
            </div>
            <Link to={`/item/search_result/${search_items}`}
                  onClick={deleteSearchList}
                  className={'all_result'}>
                <span>Усі результати</span>
                <img src={vector} alt=""/>
            </Link>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        active_unique_items: state.shop.active_unique_items
    }
};

const putStateToState = {
    changeUniqueItems
};

export default connect(mapStateToProps, putStateToState)(SearchModal);

