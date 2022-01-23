import React from "react";
import { useHistory } from "react-router-dom";
import { GetToken } from "../../Util";

const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export default function ProductListItem({ prod, deleteProductById }) {
  const history = useHistory();
  const goToUpdatePage = () => {
    history.push(`storemanager/update/product/${prod._id}`, {
      product: prod,
    });
  };
  const onClickDelete = () => {
    deleteProductById(prod._id);
  };
  return (
    <>
      {prod.name}
      <div>
        <span
          className={
            "badge badge-primary " +
            (prod.quantity > 80 ? "badge-primary" : "badge-danger")
          }
        >
          {prod.quantity}
        </span>
        <button className="btn btn-primary ml-3" onClick={goToUpdatePage}>
          Update
        </button>
        <button className="btn btn-danger ml-3" onClick={onClickDelete}>
          Delete
        </button>
      </div>
    </>
  );
}
