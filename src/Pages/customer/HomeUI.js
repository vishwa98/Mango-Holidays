import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";


const HomeUI = ({
  product,
  viewProductBtn = true,
}) => {

  //Single Product View

  const viewSingleProduct = (viewProductBtn) => {
    return (
      viewProductBtn && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-info">View</button>
        </Link>
      )
    );
  };

  //Available stock

  const showStock = (rentPrice) => {
    return rentPrice > 0 ? (
      <span className="badge badge-primary badge-pill">Not Available </span>
    ) : (
      <span className="badge badge-primary badge-pill">Available </span>
    );
  };


  return (
    <div>

      <div className="col-lg-10 col-sm-6">
        <div className="product-item">
          <div className="pi-pic">
            <ProductImage pro={product} url="product"></ProductImage>
          </div>
          <div className="pi-text">
            <h6>${product.price}</h6>
            <p>{product.name}</p>
            <h6>{viewSingleProduct(viewProductBtn)}</h6>
            <h6>{showStock(product.rentPrice)}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUI;
