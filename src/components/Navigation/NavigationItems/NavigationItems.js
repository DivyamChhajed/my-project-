import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
      { props.isAuthenticated ? <NavigationItem link="/burgerbuilder" exact>Burger Builder</NavigationItem>
                               : null }
        <NavigationItem link="/orders" >Orders</NavigationItem>
       { !props.isAuthenticated ? <NavigationItem link="/" >Authenticate </NavigationItem>
                              : <NavigationItem link="/logout" >Logout </NavigationItem> }
    </ul>
);

export default navigationItems;
