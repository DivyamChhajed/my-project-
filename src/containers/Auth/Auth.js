import React, {useState} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {auth} from '../../Store/index';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom'; 

const authh = props => {
    const navigate = useNavigate();
    const [authForm, setAuthForm] = useState ({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                     required: true,
                     isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                     required: true,
                     minLength: 6
                },
                valid: false,
                touched: false
            }
    })
     const [isSignup, setIsSignup] = useState(true);  

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
    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        };
        setAuthForm(updatedControls);
    }

    const submitHandler = (event) => {
        let authRedirect = null;
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
        if (props.isAuthenticated) {
            authRedirect = navigate('/')
       }
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

        const formElementsArray = [];
        for (let key in authForm) {
            formElementsArray.push({
                id:key,
                config: authForm[key]
            });
        }    

        const form = formElementsArray.map(formElement => (
            <Input key={formElement.id} 
            elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                     value={formElement.config.value}
                     invalid={!formElement.config.valid}
                     shouldValidate={formElement.config.validation}
                     touched={formElement.config.touched}
                     changed={(event) => inputChangedHandler(event, formElement.id)}
                    />
        ));
        //let authRedirect = null;
       // if (props.isAuthenticated) {
         //    authRedirect = navigate('/')

        return (
            <div className={classes.Auth}>
                <form onSubmit = {submitHandler}>
                    {form}
                    <Button btnType = "Success">Submit</Button>
                </form>
                <Button clicked = {switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>
            </div>
        );
}

const mapStateToProps = state => {
    return {
     isAuthenticated: state.redu.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(authh);