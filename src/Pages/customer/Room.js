import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displaySingleRoom } from "./customerBackEnd";
import RoomUI from "./RoomUI";

const Room = (props) => {
  const [singleRoom, setSingleRoom] = useState({});
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({});


  //Get the single product data

  const selectedRoomView = (productId) => {
    displaySingleRoom(productId).then((sproduct) => {
      if (sproduct && sproduct.error) {
        setError(sproduct.error);
      } else if (sproduct) {
        setSingleRoom(sproduct);
        setProduct(sproduct);
      } else {
        console.log("Could not load the product..");
      }
    });
  };

  useEffect(() => {
    const roomId = props.match.params.productId;
    console.log(roomId);
    selectedRoomView(roomId);
  }, []);


  return (
    <Content>
      <div className="container">
        <div>
          {/* Page info */}
          <div className="page-top-info">
            <div className="container">
              <h4>Room</h4>
              <div className="site-pagination">
                <h6>Room Details</h6>
              </div>
            </div>
          </div>
          {/* Page info end */}
          {/* product section */}

          {singleRoom && singleRoom.description && (
            <RoomUI
              roomId={product._id}
              room={singleRoom}
              viewProductBtn={false}
              addToWishListBtn={true}
            />
          )}

          {/* product section end */}
        </div>
      </div>
    </Content>
  );
};

export default Room;
