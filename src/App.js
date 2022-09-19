import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'; 
import {connect} from 'react-redux';

const app = props => {
  //const navigate = useNavigate();
  let routes = (
    <Routes>
       <Route path="/" exact element={<Auth />} />
    </Routes>
  );
  if (props.isAuthenticated) {
    routes = (
      <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" Component={Orders} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/burgerbuilder" element={<BurgerBuilder />} />  
            <Route path="/contactdata" element={<ContactData/>} />
      </Routes>
    );
  }

    return (
      <div>
        <Layout>
           {routes}
        </Layout>
      </div>
    );
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.redu.token !== null
    };
  };
export default connect(mapStateToProps)(app);
