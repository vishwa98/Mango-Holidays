import React, { useState, useEffect } from "react";
import Content from "../customer/Content";
import { GetToken, IsStoreManagerLoggedIn } from "../../Util";
import {} from "../..";
const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export default function AddNewRoomPage({ history }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!IsStoreManagerLoggedIn()) {
      history.push("/forbidden", {
        pageTriedToAccess: "/storemanager/create/product",
      });
    } else {
      fetch(`${URL}categories/`)
        .then((res) => res.json())
        .then((categoriesRes) => setCategories(categoriesRes.data));
    }
    return () => {};
  }, []);

  const onClickSubmitForm = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("formId"));

    fetch(`${URL}room/create`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          history.push("/storemanager", {
            success: true,
            msg: "Successfully added the product",
          });
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        setError(err);
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
        <form id="formId" onSubmit={onClickSubmitForm}>
          <div className="form-group">
            <label htmlFor="inputProductName">Product Name:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Room Name"
              name="name"
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
              maxLength={1000}
              required
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
              placeholder="Room Views"
              name="viewType"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">Bath Tub:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Bath Tub"
              name="bathTub"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">Balcony:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Balcony"
              name="balcony"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">Floor Area:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Floor Area"
              name="floorArea"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputProductName">wifi:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="WiFi"
              name="wifi"
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Content>
  );
}
