import React, {useEffect} from 'react';
import * as actions from '../../../Store/index';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';

const logout = props => {
    const Navigate = useNavigate(); 
    useEffect (() => {
        props.onLogout();
    }, []) ;

        return (Navigate('/auth')) ;
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null,mapDispatchToProps)(logout);