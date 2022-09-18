import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
//import {Route} from 'react-router-dom';
//import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const checkout = props => {
   const navigate = useNavigate();
   const checkoutCancelledHandler = () => {
       // props.history.goBack();
       navigate('/');
    }
   const checkoutContinuedHandler = () => {
       // props.history.replace('/checkout/contact-data');
       navigate('/contactdata');
    }
        return(
            <div>
                <CheckoutSummary ingredients={props.ings} 
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler} />
            </div>
        );
     };

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
};

export default connect(mapStateToProps)(checkout);