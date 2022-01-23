import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ProductImage from "./ProductImage";

const CartPay = ({ product, setRun = (f) => f, run = undefined }) => {
  const [showCartPage, setshowCartPage] = useState(false);
  const [wishListPage, setwishListPage] = useState(false);

  //Redirecting to shopping cart page

  const redirectToCart = (showCartPage) => {
    if (showCartPage) {
      return <Redirect to="/cart" />;
    }
  };

  //Redirecting to Wish list page

  const redirectToWishList = (wishListPage) => {
    if (wishListPage) {
      return <Redirect to="/reservations" />;
    }
  };

  return (
    <div>
      {redirectToCart(showCartPage)}

      {redirectToWishList(wishListPage)}

      <ul className="product-list">
        <li>
          <div className="pl-thumb">
            <ProductImage pro={product} url="product"></ProductImage>
          </div>
          <h6>{product.name}</h6>
        </li>
      </ul>
    </div>
  );
};

export default CartPay;
