import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MyBurger from './containers/MyBurger/MyBurger';
import Checkout from './containers/Checkout/Checkout';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'; 
import {connect} from 'react-redux';

const app = props => {
  let routes = (
    <Routes>
       <Route path="/" exact element={<Auth />} />
    </Routes>
  );
  if (props.isAuthenticated) {
    routes = (
      <Routes>
            <Route path="/myburger" element={<MyBurger />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/logout" element={<Logout />} />
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
