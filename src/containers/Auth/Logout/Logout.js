import React, {useEffect} from 'react';
import * as actions from '../../../Store/index';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

const logout = props => {
    useEffect (() => {
        console.log(props);
        props.onLogout();
    }, []) ;

        return <Navigate to = "/" /> ;
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null,mapDispatchToProps)(logout);