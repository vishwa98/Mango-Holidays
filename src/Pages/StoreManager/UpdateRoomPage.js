import React, { useState, useEffect } from "react";
import Content from "../customer/Content";
import { GetToken, IsStoreManagerLoggedIn } from "../../Util";
import {} from "../..";
const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export default function UpdateRoomPage(props) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!IsStoreManagerLoggedIn()) {
      props.history.push("/forbidden", {
        pageTriedToAccess: "/storemanager/update/product",
      });
    } else {
      fetch(`${URL}categories/`)
        .then((res) => res.json())
        .then((categoriesRes) => setCategories(categoriesRes.data));

      fetch(`${URL}product/${props.match.params.id}`)
        .then((res) => res.json())
        .then((categoriesRes) => setProduct(categoriesRes))
        .catch((err) => console.log(err));
    }
    return () => {};
  }, []);

  const updateValue = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onClickSubmitForm = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("formId"));
    fetch(`${URL}room/update/${product._id}`, {
      method: "PUT",
      body: form,
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          props.history.push("/storemanager", {
            success: true,
            msg: "Successfully updated the product",
          });
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options =
    categories &&
    categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.gender}
      </option>
    ));

  const errorAlert = (msg) => {
    return (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    );
  };
  return (
    <Content>
      <div className="container mt-5">
        {error && errorAlert(error)}
        {product && (
          <form id="formId" onSubmit={onClickSubmitForm}>
            <div className="form-group">
              <label htmlFor="inputProductName">Product Name:</label>
              <input
                type="text"
                className="form-control"
                id="inputProductName"
                placeholder="Product Name"
                name="name"
                value={product.name}
                onChange={updateValue}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription">Description:</label>
              <input
                type="text"
                className="form-control"
                id="inputDescription"
                placeholder="Description"
                name="description"
                value={product.description}
                maxLength={1000}
                required
                onChange={updateValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPrice">Price:</label>
              <input
                type="number"
                className="form-control"
                id="inputPrice"
                placeholder="Price"
                name="price"
                value={product.price}
                onChange={updateValue}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCategory">Category:</label>
              <select
                required
                className="form-control"
                id="inputCategory"
                name="category"
                value={product.category}
                onChange={updateValue}
              >
                {options && options}
                {!options && "No Categories"}
              </select>
            </div>

            <div className="form-group">
            <label htmlFor="inputProductName">Available Views:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Product Name"
              name="viewType"
              value={product.viewType}
              onChange={updateValue}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">Bath Tub:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Product Name"
              name="bathTub"
              value={product.bathTub}
              onChange={updateValue}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">Balcony:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Product Name"
              name="balcony"
              value={product.balcony}
              onChange={updateValue}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">Floor Area:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Product Name"
              name="floorArea"
              value={product.floorArea}
              onChange={updateValue}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">wifi:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Product Name"
              name="wifi"
              value={product.wifi}
              onChange={updateValue}
              required
            />
          </div>

            <div className="form-group">
              <label htmlFor="inputQuantity">Quantity:</label>
              <input
                type="number"
                className="form-control"
                id="inputQuantity"
                placeholder="Quantity"
                name="quantity"
                value={product.quantity}
                required
                onChange={updateValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPhoto">Photo:</label>
              <input
                type="file"
                className="form-control"
                id="inputPhoto"
                placeholder="Photo"
                name="photo"
                onChange={updateValue}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </Content>
  );
}
