import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { removeCustomerReservation, updateRoomPrice } from "./customerBackEnd";
import { USER_ID, TOKEN } from "../../Util";

const ReservationUI = ({
  product,
  viewRoomBtn = true,
  cancelReservationBtn = true,
  setRun = (f) => f,
  run = undefined,
}) => {

  const viewSingleRoom = (viewRoomBtn) => {
    return (
      viewRoomBtn && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-info">View Room</button>
        </Link>
      )
    );
  };


  const removeReservation = () => {
    const userId = localStorage.getItem(USER_ID);
    const token = localStorage.getItem(TOKEN);

    removeCustomerReservation(userId, token, product._id);

    updateRoomPrice(token, product._id, 0);

    alert("Reservation Cancelled");
  };

  const cancelReservation = (cancelReservationBtn) => {
    return (
      cancelReservationBtn && (
        <button onClick={removeReservation} className="site-btn">
          Cancel Reservation
        </button>
      )
    );
  };

  const emptyReservation = () => (
    <h2>
      You have no reservations. <br />{" "}
      <Link to="/shop">Find your favourite places to reserve here</Link>
    </h2>
  );

  return (
    <div className="card">
      {product == null ? emptyReservation() : console.log("hiiii")}

      <section className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-pic-zoom">
                <ProductImage pro={product} url="product"></ProductImage>
              </div>
            </div>
            <div className="col-lg-6 product-details">
              <h2 className="p-title">{product.name}</h2>
              <h3 className="p-price">${product.price}</h3>

              {cancelReservation(cancelReservationBtn)}

              <div id="accordion" className="accordion-area">
                <div className="panel">
                  <div className="panel-header" id="headingOne">
                    <button
                      className="panel-link active"
                      data-toggle="collapse"
                      data-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                    >
                      information
                    </button>
                  </div>
                  <div
                    id="collapse1"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="panel-body">
                      <p>{product.description}</p>
                      {viewSingleRoom(viewRoomBtn)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="social-sharing">
                <a href>
                  <i className="fa fa-google-plus" />
                </a>
                <a href>
                  <i className="fa fa-pinterest" />
                </a>
                <a href>
                  <i className="fa fa-facebook" />
                </a>
                <a href>
                  <i className="fa fa-twitter" />
                </a>
                <a href>
                  <i className="fa fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReservationUI;
