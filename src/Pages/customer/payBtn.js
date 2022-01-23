import React from "react";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";

const payBtn = ({ products }) => {
  const CartTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const productsPayment = () => {
    return CartTotal() == 0 ? (
      <Link to="/shop">
        <button className="site-btn">Shop for products</button>
      </Link>
    ) : isAuthenticated() ? (
      <Link to="/payment">
        <button className="site-btn">Proceed to payment</button>
      </Link>
    ) : (
      <Link to="/signin">
        <button className="site-btn">Sign in to proceed</button>
      </Link>
    );
  };

  return <div>{productsPayment()}</div>;
};

export default payBtn;
