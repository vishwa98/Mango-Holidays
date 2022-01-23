import React from "react";
import { Link } from "react-router-dom";
import { IsCustomerLoggedIn } from "./../../Util/index";

const bookingPayment = ({ products }) => {
  const roomPayment = () => {
    return IsCustomerLoggedIn() ? (
      <Link to="/payment">
        <button className="site-btn">Proceed to payment</button>
      </Link>
    ) : (
      <Link to="/signin">
        <button className="site-btn">Sign in to proceed</button>
      </Link>
    );
  };

  return <div>{roomPayment()}</div>;
};

export default bookingPayment;
