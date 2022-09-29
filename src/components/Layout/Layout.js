import React, {useState, Fragment} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/Sidedrawer';
import classes from './Layout.css';
import {connect} from 'react-redux';

const layout = props => {
   
        return (
            <Fragment>
               <Toolbar  isAuth = {props.isAuthenticated}/>
               <main className={classes.Content}>
                  {props.children}
              </main> 
            </Fragment>
        )
    };

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.redu.token !== null
        };
    };
    export default connect(mapStateToProps)(layout);