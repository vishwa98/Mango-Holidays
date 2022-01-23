import React from "react";
import { Link} from "react-router-dom";
import ProductImage from "./ProductImage";

const ShopUI = ({ room, viewProductBtn = true }) => {
  //Single product view
  const viewSingleRoom = (viewProductBtn) => {
    return (
      viewProductBtn && (
        <Link to={`/product/${room._id}`} className="mr-2">
          <button className="btn btn-info">View</button>
        </Link>
      )
    );
  };


  return (
    <div>
      <div className="col-lg-12 col-sm-6">
        <div className="product-item">
          <div className="pi-pic">
            <ProductImage pro={room} url="product"></ProductImage>
            <div className="pi-links"></div>
          </div>
          <div className="pi-text">
            <h6>${room.price}</h6>
            <p>{room.name}</p>
            <h6>{viewSingleRoom(viewProductBtn)}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopUI;
