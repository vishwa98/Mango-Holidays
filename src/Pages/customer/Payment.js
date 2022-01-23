import React from "react";
import { Link } from "react-router-dom";
import { IsCustomerLoggedIn } from "./../../Util/index";
import { addProductToCart } from "./cartLocalStorage";
import { cartValueUpdate } from "./cartLocalStorage";

const Pay = ({ room, total, checkInDate, roomId }) => {
  //Adding the product to shopping cart

  const addProductToShoppingCart = () => {
    addProductToCart(room, () => {
      console.log("ADDED");
    });

    cartValueUpdate(roomId, total, checkInDate);
  };

  const productsPayment = () => {
    return room.rentPrice > 0 ? (
      <button className="site-btn">Room not available</button>
    ) : IsCustomerLoggedIn() ? (
      <Link to="/payment">
        <button className="site-btn" onClick={addProductToShoppingCart}>
          Proceed to payment
        </button>
      </Link>
    ) : (
      <Link to="/signin">
        <button className="site-btn">Sign in to proceed</button>
      </Link>
    );
  };

  return <div>{productsPayment()}</div>;
};

export default Pay;
