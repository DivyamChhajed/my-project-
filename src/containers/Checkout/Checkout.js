import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const checkout = props => {
   const navigate = useNavigate();
   const checkoutCancelledHandler = () => {
       navigate('/myburger');
    }
   const checkoutContinuedHandler = () => {
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