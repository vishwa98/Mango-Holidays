import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Component/Navigation/Navigation";
import IndexPage from "./Pages/Main/IndexPage";
import LoginPage from "./Pages/Main/LoginPage";
import SignUpPage from "./Pages/Main/SignUpPage";


import Home from "./Pages/customer/Home";
import Shop from "./Pages/customer/Shop";
import Room from "./Pages/customer/Room";
import Cart from "./Pages/customer/Cart";
import Reservation from "./Pages/customer/Reservation";
import PaymentPage from "./Pages/customer/PaymentPage";
import paymentDetails from "./Pages/customer/paymentDetails";


import StoreManagerDashboard from "./Pages/StoreManager/StoreManagerDashboard";
import Forbidden from "./Pages/Main/Forbidden";
import AddNewRoomPage from "./Pages/StoreManager/AddNewRoomPage";
import UpdateRoomPage from "./Pages/StoreManager/UpdateRoomPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={LoginPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/product/:productId" exact component={Room} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/reservations" exact component={Reservation} />
          <Route path="/payment" exact component={paymentDetails} />
     

          <Route path="/storemanager" exact component={StoreManagerDashboard} />
          <Route
            path="/storemanager/create/product"
            exact
            component={AddNewRoomPage}
          />

          <Route
            path="/storemanager/update/product/:id"
            exact
            component={UpdateRoomPage}
          />

          <Route path="/forbidden" exact component={Forbidden} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
