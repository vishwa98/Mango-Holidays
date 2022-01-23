import React from "react";


const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

const HomeImg = ({ pro, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${pro._id}`}
            
        />
    </div>
);

export default HomeImg;
