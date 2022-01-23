import React, { useState, useEffect } from "react";
import Content from "./Content";
import {
  updateRoomPrice,
  addRoomToUserReservation,
} from "./customerBackEnd";
import { displayCartProducts, clearCart } from "./cartLocalStorage";
import CartPay from "./CartPay";
import PayTotal from "./cartSum";
import { Link } from "react-router-dom";
import { TOKEN, USER_ID } from "../../Util";
import CartCheckInDate from "./cartCheckinDate";

const PaymentPage = ({ products }) => {
  const [cartProducts, setcartProducts] = useState([]);
  const [run, setRun] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem(USER_ID);
  const token = localStorage.getItem(TOKEN);

  useEffect(() => {
    setcartProducts(displayCartProducts());
  }, [run]);

  const displayShoppingCart = (cartProducts) => {
    return (
      <div>
        {cartProducts.map((product, i) => (
          <CartPay
            key={i}
            product={product}
            addToCartBtn={false}
            productQuantity={true}
            removeProductBtn={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const CartTotaal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const CartTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const reservationTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return nextValue.count;
    }, 0);
  };

  const checkInDatePayment = () => {
    return products.reduce((currentValue, nextValue) => {
      return nextValue.checkInDate;
    }, 0);
  };

  const researvationRoomId = () => {
    return products.reduce((currentValue, nextValue) => {
      return nextValue._id;
    }, 0);
  };

  //Empty cart after successful reservation

  const emptyCart = () => (
    <h2>
      Cart is Empty. <br /> <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  const pay = () => {

    if (!CartTotaal() == 0) {
      console.log(CartTotal(products));

      updateRoomPrice(
        token,
        researvationRoomId(),
        reservationTotal(),
        checkInDatePayment()
      )
        .then((response) => {
          clearCart(() => {
            window.alert("Researvation Successful"); //alert the customer after successful payment
          });
        })
        .catch((error) => {
          console.log(error);
        });

      addRoomToUserReservation(userId, token, researvationRoomId());
    } else {
      alert("Add prodcuts to your cart to make any payment");
    }
  };

  return (
    <Content>
      <div>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader" />
        </div>
        {/* Header section */}

        {/* Header section end */}
        {/* Page info */}
        <div className="page-top-info">
          <div className="container">
            <h4>Payment Page</h4>
            <div className="site-pagination">
              <h6>Make your payment here</h6>
            </div>
          </div>
        </div>
        {/* Page info end */}
        {/* checkout section  */}
        <section className="checkout-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 order-2 order-lg-1">
                <form className="checkout-form" onSubmit={pay}>
                  <div className="cf-title">Billing Address</div>
                  <div className="row">
                    <div className="col-md-7">
                      <p>*Billing Information</p>
                    </div>
                  </div>
                  <div className="row address-inputs">
                    <div className="col-md-12">
                      <input type="text" placeholder="Enter Notes" required />
                      <input
                        type="text"
                        placeholder="Enter Parking details"
                        required
                      />
                    </div>
                  </div>
                  <div className="cf-title">Select Payment Method</div>
                  <div className="row shipping-btns">
                    <div className="col-6">
                      <ul className="payment-list">
                        <li>
                          Paypal
                          <a>
                            <img src="img/paypal.png" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <div className="cf-radio-btns">
                        <div className="cfr-item">
                          <input type="radio" name="shipping" id="ship-1" />
                          <label htmlFor="ship-1"></label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <ul className="payment-list">
                        <li>
                          Credit / Debit card
                          <a href="#">
                            <img src="img/mastercart.png" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <div className="cf-radio-btns">
                        <div className="cfr-item">
                          <input type="radio" name="shipping" id="ship-2" />
                          <label htmlFor="ship-2"></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="site-btn submit-order-btn" type="submit">
                    Make Reservation
                  </button>
                </form>
                <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }}
                >
                  {error}
                </div>
              </div>
              <div className="col-lg-4 order-1 order-lg-2">
                <div className="checkout-cart">
                  <h3>Your Booking</h3>
                  {cartProducts.length > 0
                    ? displayShoppingCart(cartProducts)
                    : emptyCart()}
                  <ul className="price-list">
                    <li>
                      Check In
                      <span>
                        <CartCheckInDate products={cartProducts} />
                      </span>
                    </li>
                    <li>
                      Total
                      <span>
                        <PayTotal products={cartProducts} />
                      </span>
                    </li>
                    <li className="total">
                      Total
                      <span>
                        <PayTotal products={cartProducts} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* checkout section end */}
      </div>
    </Content>
  );
};

export default PaymentPage;
