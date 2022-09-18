import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Input from '../../components/UI/Button/Button';

class Au extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
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
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                     required: true,
                     minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input 
            />
        ));
        return (
            <div>
                <form>

                </form>
            </div>
        );
    }
}

export default Au;