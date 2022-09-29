import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {connect} from 'react-redux';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingss)
        .map(igKey => {
            return [...Array( props.ingss[igKey] )].map((_, i) => {
               return <BurgerIngredient key = {igKey + i} type = {igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!! </p>
    }    
    return (
        <div className = {classes.Burger}>
           <BurgerIngredient type = "bread-top" />
           {transformedIngredients}
           <BurgerIngredient type = "bread-bottom" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingss: state.red.ingredients,
    };
};

export default connect(mapStateToProps)(burger);