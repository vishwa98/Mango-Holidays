import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Content from "./Content";
import { displayCartProducts, removeItem } from "./cartLocalStorage";
import Pay from "./Payment";
import CartUI from "./CartUI";
import PayTotal from "./cartSum";


const Cart = () => {
  const [cartProducts, setcartProducts] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setcartProducts(displayCartProducts());
  }, [run]);

  const displayShoppingCart = (cartProducts) => {
    return (
      <div>
        <h2>Your cart has {`${cartProducts.length}`} items</h2>
        <hr />
        {cartProducts.map((product, i) => (
          <CartUI
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

  const emptyCart = () => (
    <h2>
      Cart is Empty. <br /> <Link to="/shop">Shop</Link>
    </h2>
  );

  return (
    <Content>
      {/* Page Preloder */}
      <div id="preloder">
        <div className="loader" />
      </div>
      {/* Page info */}
      <div className="page-top-info">
        <div className="container">
          <h4>Your cart</h4>
          <div className="site-pagination">
            <h6>Shopping cart</h6>
          </div>
        </div>
      </div>
      {/* Page info end */}
      {/* cart section end */}
      <section className="cart-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-table">
                <div className="cart-table-warp">
                  {cartProducts.length > 0
                    ? displayShoppingCart(cartProducts)
                    : emptyCart()}
                </div>
                <div className="total-cost">
                  <h6>
                    Total{" "}
                    <span>
                      <PayTotal products={cartProducts} />
                    </span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 card-right">
              <Pay products={cartProducts} />
            </div>
          </div>
        </div>
      </section>
      {/* cart section end */}
      {/* Related product section */}
     
      {/* Related product section end */}
    </Content>
  );
};

export default Cart;
