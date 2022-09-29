import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const contactData = props => {
    const Navigate = useNavigate(); 
  const [orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                     required: true
                },
                valid: false,
                touched: false
            },
            Address:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                     required: true
                },
                valid: false,
                touched: false
            },
            Number:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Mobile Number'
                },
                value: '',
                validation: {
                     required: true,
                     minLength: 10,
                     maxLength: 10
                },
                valid: false,
                touched: false
            },
            pincode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pin Code'
                },
                value: '',
                validation: {
                     required: true,
                     minLength: 6,
                     maxLength: 6
                },
                valid: false,
                touched: false
            },
            paymentMethod:  {
                elementType: 'select',
                elementConfig: {
                   options: [{value: 'cash', displayValue: 'Cash'},
                             {value: 'upi', displayValue: 'UPI'} ]
                },
                valid: true
            }
      })
     const [formIsValid, setFormIsValid] = useState(false);

   const orderHandler = (event) => {
         event.preventDefault();
         const formData = {};
         for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
         }
         const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData
        }
        axios.post('/orders.json',order)
        .then(response => {
            alert("Your order is placed and our delivery boy contact you shortly!!");
         Navigate('/myburger'); })
        .catch(error => console.log(error)); 
    }
   const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

   const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...orderForm };
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
             formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id:key,
                config: orderForm[key]
            });
        }
        let form =(
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement =>(
                    <Input key ={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                     value={formElement.config.value}
                     invalid={!formElement.config.valid}
                     shouldValidate={formElement.config.validation}
                     touched={formElement.config.touched}
                     changed={(event) => inputChangedHandler(event, formElement.id)}/>
                ))}
                    <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                </form>
        );
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
}

const mapStateToProps = state => {
    return {
       ings: state.red.ingredients,
       price: state.red.totalPrice
    }
};

export default connect(mapStateToProps)(contactData);