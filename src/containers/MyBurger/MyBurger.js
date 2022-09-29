import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/actions';

const myBurger = (props) => {
   const navigate = useNavigate();        
   const [purchasing, setPurchasing] = useState(false);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0;
     }

    const purchaseHandler = () => {
       setPurchasing(true);
        }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
     }
      
    const purchaseContinueHandler = () => {  
        navigate('/checkout');
     }
    
        const disabledInfo = {
            ...props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        return(
             <Fragment>
                <Modal show={purchasing} modalClosed = {purchaseCancelHandler}>
                    <OrderSummary  ingredients = {props.ings}
                    price={props.price}
                    purchaseCancelled = {purchaseCancelHandler}
                    purchaseContinued = {purchaseContinueHandler} />
                </Modal>
                <Burger ingredients = {props.ings} />
                <BuildControls 
                ingredientAdded = {props.onIngredientAdded}
                ingredientRemoved = {props.onIngredientRemoved} 
                disabled = {disabledInfo}
                purchasable = {updatePurchaseState(props.ings)}
                ordered={purchaseHandler}
                price = {props.price} />
             </Fragment>
        );
};

const mapStateToProps = state => {
    return {
        ings: state.red.ingredients,
        price: state.red.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onIngredientAdded: (ingName) =>dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
       onIngredientRemoved: (ingName) =>dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(myBurger);