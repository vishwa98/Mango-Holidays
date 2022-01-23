import React from "react";
//import { API } from "../../config";

const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

const ProductImage = ({ pro, url }) => (
  <div>
    <img src={`${API}${url}/photo/${pro._id}`} alt={pro.name} />
  </div>
);

export default ProductImage;
