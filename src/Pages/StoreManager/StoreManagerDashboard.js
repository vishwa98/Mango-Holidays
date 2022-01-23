import React, { Component } from "react";
import Content from "../customer/Content";
import { IsLoggedIn, IsCustomerLoggedIn, GetToken } from "../../Util";
import SearchResult from "../../Component/StoreManagerComponents/SearchResult";
const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export default class StoreManagerDashboard extends Component {
  constructor(props) {
    super(props);
    if (!IsLoggedIn() || IsCustomerLoggedIn()) {
      props.history.push("/forbidden", { pageTriedToAccess: "/storemanager" });
    }
    this.state = {
      searchQuery: "",
      products: [],
      filteredProducts: [],
      success: "",
      error: "",
    };
  }

  componentDidMount() {
    fetch(`${URL}products`)
      .then((res) => res.json())
      .then((productsRes) => {
        this.setProducts(productsRes);
        this.setFilteredProducts(productsRes);
      })
      .catch((err) => console.log(err));

    console.log(this.props);
    if (
      this.props.history.location.state &&
      this.props.history.location.state.success
    ) {
      this.setState({ success: this.props.history.location.state.msg });
      window.history.pushState(null, "");
    }
  }

  // search query submission
  onSubmitSearchQuery = (e) => {
    // prevent submitting of the form
    e.preventDefault();
  };

  // search and filter the product list
  setSearchQuery = (e) => {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
    this.setState((prevState) => ({
      filteredProducts: prevState.products.filter(
        (prod) =>
          prod.name.toLowerCase().search(searchQuery.toLowerCase()) !== -1
      ),
    }));
  };

  // set the product state
  setProducts = (products) => {
    this.setState({ products });
  };

  // set the filteredProducts state
  setFilteredProducts = (filteredProducts) => {
    this.setState({ filteredProducts });
  };

  // goto the product adding page
  onClickAddNewProduct = () => {
    this.props.history.push("/storemanager/create/product");
  };

  setSuccess = (msg) => {
    this.setState({
      success: msg,
    });
  };

  updateFilteredList = () => {
    this.setState((prevState) => ({
      filteredProducts: prevState.products.filter(
        (prod) =>
          prod.name
            .toLowerCase()
            .search(this.state.searchQuery.toLowerCase()) !== -1
      ),
    }));
  };

  deleteProductById = (id) => {
    fetch(`${URL}room/delete/${id}`, {
      method: "DELETE",
      body: { id },
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        if (msg.success) {
          this.setSuccess("Product Deleted Successfully: ");
          this.setState(
            (prevState) => ({
              products: prevState.products.filter((p) => p._id !== id),
            }),
            this.updateFilteredList
          );
        } else {
          this.setState({ error: msg.error });
        }
      })
      .catch((err) => this.setState({ error: err }));
  };

  render() {
    const errorAlert = (msg) => {
      return (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      );
    };
    const successAlert = (msg) => {
      return (
        <div className="alert alert-success" role="alert">
          {msg}
        </div>
      );
    };
    return (
      <Content>
        <div className="container">
          <div className="d-flex flex-row justify-content-between">
            <h2 className="mt-3">Store Manager</h2>
            <button
              className="btn btn-primary mt-3"
              style={{ height: "36px" }}
              onClick={this.onClickAddNewProduct}
            >
              Add New Room
            </button>
          </div>

          <form onSubmit={this.onSubmitSearchQuery} className="mt-5">
            <div className="d-flex flex-row justify-content-between">
              <div className="flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  id="inputSearch"
                  placeholder="Enter search query"
                  value={this.state.searchQuery}
                  onChange={this.setSearchQuery}
                />
              </div>
              <div className="ml-5">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            {this.state.success && successAlert(this.state.success)}
            {this.state.error && errorAlert(this.state.error)}
            {this.state.products.length > 0 ? (
              <SearchResult
                query={this.state.searchQuery}
                products={this.state.filteredProducts}
                deleteProductById={this.deleteProductById}
              />
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </div>
      </Content>
    );
  }
}
