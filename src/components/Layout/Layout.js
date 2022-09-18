import React, {useState} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/Sidedrawer';
import classes from './Layout.css';
import {connect} from 'react-redux';

const layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const SideDrawerClosedHandler = () => {
       setSideDrawerIsVisible(false);
   } 

  const sideDrawerToggleHandler = () => {
       setSideDrawerIsVisible(!sideDrawerIsVisible);
   }
   
        return (
            <Aux>
               <Toolbar  isAuth = {props.isAuthenticated}
               drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer isAuth = {props.isAuthenticated}
                open={sideDrawerIsVisible} closed={SideDrawerClosedHandler}/>
               <main className={classes.Content}>
                  {props.children}
              </main> 
            </Aux>
        )
    };

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.redu.token !== null
        };
    };
    export default connect(mapStateToProps)(layout);