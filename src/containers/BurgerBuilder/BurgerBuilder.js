import React, { useState } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 10,
    meat: 40,
    bacon: 30
};


const BurgerBuilder = props => {

    const [ igState, setIgState] = useState({
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 10,
        purchasable: false,
        purchasing: false
    });
    

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            setIgState({purchasable: sum > 0})
     }

    const addIngredientHandler = (type) => {
        const oldCount = igState.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...igState.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = igState.totalPrice;
        const newPrice = oldPrice + priceAddition;
        setIgState({totalPrice: newPrice, ingredients: updatedIngredients});
        updatePurchaseState(updatedIngredients);
     }
   const removeIngredientHandler = (type) => {
        const oldCount = igState.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...igState.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = igState.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setIgState({totalPrice: newPrice, ingredients: updatedIngredients});
        updatePurchaseState(updatedIngredients);
     }

    const purchaseHandler = () => {
        setIgState({purchasing: true});
     }

    const purchaseCancelHandler = () => {
        setIgState({purchasing: false});
     }
      
    const purchaseContinueHandler = () => {

        const order = {
            ingredients: igState.ingredients,
            price: igState.totalPrice,
            customer: {
                name: 'divyam',
                country: 'india',
                pincode: '312601'
            },
            paymentMethod: 'cod'
        }
        axios.post('/orders.json',order)
        .then(response => console.log(response))
        .catch(error => console.log(error));
     
   //  this.props.history.push('/checkout');
  //const xyz = navigate('/Checkout');
     }
    
    const disabledInfo = () => {
     const disInfo = {
            ...igState.ingredients
        };
        for (let key in disInfo) {
            disInfo[key] = disInfo[key] <= 0 
        }
    }  
        return(
             <Aux>
                <Modal show={igState.purchasing} modalClosed = {purchaseCancelHandler}>
                    <OrderSummary  ingredients = {igState.ingredients}
                    price={igState.totalPrice}
                    purchaseCancelled = {purchaseCancelHandler}
                    purchaseContinued = {purchaseContinueHandler}>
                    
                   </OrderSummary>
                  
                   
                </Modal>
                <Burger ingredients = {igState.ingredients} />
                <BuildControls 
                ingredientAdded = {addIngredientHandler}
                ingredientRemoved = {removeIngredientHandler} 
                disabled = {disabledInfo}
                purchasable = {igState.purchasable}
                ordered={purchaseHandler}
                price = {igState.totalPrice} />
                 
             </Aux>
        );
}

export default BurgerBuilder;