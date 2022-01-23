import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProductImage from "./ProductImage";
import { radioButtonBookingTypeValues } from "./radioButtonBookingTypeValues";
import { radioButtonGuestTypeValues } from "./radioButtonGuestTypeValues";
import Pay from "./Payment";

const RoomUI = ({ room, roomId, setRun = (f) => f, run = undefined }) => {
  const [showCartPage, setshowCartPage] = useState(false);

  const [nights, setNights] = useState();

  const [bookingType, setBookingType] = useState();

  const [guestType, setGuestType] = useState();

  const [total, setTotal] = useState(0);

  const [date, setDate] = useState();

  console.log("Date", date);

  //Redirecting to shopping cart page

  const redirectToCart = (showCartPage) => {
    if (showCartPage) {
      return <Redirect to="/cart" />;
    }
  };

  //Number of nights

  const handleUpdate = (roomId) => (e) => {
    setRun(!run);
    setNights(e.target.value < 1 ? 1 : e.target.value);
    console.log(nights);
    // setTotal(e.target.value)
  };

  const updateRoomNights = () => {
    return (
      <div>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            onChange={handleUpdate(room._id)}
          />
        </div>
      </div>
    );
  };

  const checkinDate = () => {

    const handleCheckin = (e) => {
      setDate(e.target.value);
      
      // calcTotal()
    };

    return (
      <div>
        <div className="input-group">
          <input
            type="date"
            className="form-control"
            onChange={handleCheckin}
          />
        </div>
      </div>
    );

  }

  //Select type of Booking

  const selectBookingType = () => {
    const handleChangee = (event) => {
      setBookingType(event.target.value);
      console.log("BOOOKING TYPEEEEE", bookingType);
    };

    return radioButtonBookingTypeValues.map((price, i) => (
      <div key={i}>
        <input
          onChange={handleChangee}
          value={`${price._id}`}
          name={price}
          type="radio"
        />
        <label className="form-check-label">{price.name}</label>
      </div>
    ));
  };

  const selectGuestType = () => {
    const handleChangee = (event) => {
      setGuestType(event.target.value);
      console.log("guestType", guestType);
      // calcTotal()
    };

    return radioButtonGuestTypeValues.map((price, i) => (
      <div key={i}>
        <input
          onChange={handleChangee}
          value={`${price._id}`}
          name={price}
          type="radio"
          // className="mr-2 ml-1"
        />
        <label className="form-check-label">{price.name}</label>
      </div>
    ));
  };

  const calcTotal = () => {
    let sum = 0;
    let initTotal = 0;
    if (bookingType === "0") {
      sum = nights * 15;
      setTotal(sum);
    } else if (bookingType === "1") {
      sum = nights * 24;
      setTotal(sum);
    } else if (bookingType === "2") {
      sum = nights * 30;
      setTotal(sum);
    } else {
      console.log("ERROR");
    }
  };

  useEffect(() => {
    setTotal(nights);
    calcTotal();
  }, [nights, bookingType]);

  return (
    <div className="card">
      {redirectToCart(showCartPage)}

      <section className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-pic-zoom">
                <ProductImage pro={room} url="product"></ProductImage>
              </div>
            </div>
            <div className="col-lg-6 product-details">
              <h2 className="p-title">{room.name}</h2>
              <h3 className="p-price">${total}</h3>

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
                      <b>Views:</b>
                      <p>{room.viewType}</p>
                    </div>
                    <div className="panel-body">
                      <b>BathTub:</b>
                      <p>{room.bathTub}</p>
                    </div>
                    <div className="panel-body">
                      <b>Balcony:</b>
                      <p>{room.balcony}</p>
                    </div>
                    <div className="panel-body">
                      <b>Floor Area:</b>
                      <p>{room.floorArea}</p>
                    </div>
                    <div className="panel-body">
                      <b>WiFI:</b>
                      <p>{room.wifi}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion">
                <div className="panel">
                  <div className="panel-header" id="headingOne">
                    <b>Checkin Date and No. of Nights</b>

                    <section>
                      <div className="container">
                        <div className="row">
                          <div>
                            <form className="checkout-form">
                              <div className="row address-inputs">
                                <div className="col-md-12">
                                <div className="quantity">
                                    <div className="pro-qty">
                                      {checkinDate()}
                                    </div>
                                  </div>
                                  <div className="quantity">
                                    <div className="pro-qty">
                                      {updateRoomNights()}
                                    </div>
                                  </div>

                                  <div className="filter-widget">
                                    <h2 className="fw-title">Booking Type</h2>
                                    <ul className="category-menu">
                                      {selectBookingType()}
                                    </ul>
                                  </div>
                                </div>

                                <div className="filter-widget">
                                  <h2 className="fw-title">Guest Type</h2>
                                  <ul className="category-menu">
                                    {selectGuestType()}
                                  </ul>
                                </div>

                                <bookingPayment />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <Pay
                        room={room}
                        total={total}
                        checkInDate={date}
                        roomId={roomId}
                      />
                    </section>
                  </div>
                  <div
                    id="collapse1"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  ></div>
                </div>
              </div>
              <div className="social-sharing">
                <a>
                  <i className="fa fa-google-plus" />
                </a>
                <a>
                  <i className="fa fa-pinterest" />
                </a>
                <a>
                  <i className="fa fa-facebook" />
                </a>
                <a>
                  <i className="fa fa-twitter" />
                </a>
                <a>
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

export default RoomUI;
