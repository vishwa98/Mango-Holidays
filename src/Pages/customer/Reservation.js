import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Content from "./Content";
import ReservationUI from "./ReservationUI";
import { TOKEN, USER_ID } from "../../Util";
import { getReservedRooms } from "./customerBackEnd";

const Reservation = () => {
  const [reservedRooms, setReservedRooms] = useState([]);
  const [run, setRun] = useState(false);

  const loadReservations = () => {
    const userId = localStorage.getItem(USER_ID);
    const token = localStorage.getItem(TOKEN);
    getReservedRooms(userId, token).then((resRooms) => {
      setReservedRooms(resRooms);
      return resRooms;
    });
  };

  useEffect(() => {
    loadReservations();
  }, [run]);

  const showItems = (reservedRooms) => {
    return (
      <div>
        <hr />
        {reservedRooms.map((product, i) => (
          <ReservationUI
            key={i}
            product={product}
            showAddToCartButton={true}
            productQuantity={false}
            removeProductBtn={false}
            removeWishListBtn={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const emptyReservationList= () => (
    <h2>
      Your have no reservations. <br />{" "}
      <Link to="/shop">Find your favourite places to stay here</Link>
    </h2>
  );

  return (
    <Content>
      <div>
        {/* Page info */}
        <div className="page-top-info">
          <div className="container">
            <h4>My Reservations</h4>
            <div className="site-pagination">
              <a>Home</a> /<a>Reservations</a>
            </div>
          </div>
        </div>
        {/* Page info end */}
        {/* product section */}

        {reservedRooms.length > 0
          ? showItems(reservedRooms)
          : emptyReservationList()}

        {/* product section end */}
      </div>
    </Content>
  );
};

export default Reservation;
