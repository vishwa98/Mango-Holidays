import React, { Component } from "react";
import Content from "../customer/Content";
import { Logout } from "../../Util";

export default class Forbidden extends Component {
  constructor(props) {
    super(props);
    this.id = setTimeout(() => {
      Logout();
      this.props.history.push("/signin", {
        error: "Please login with proper credentials to access the page...",
        pageTriedToAccess: this.props.location.state.pageTriedToAccess,
      });
    }, 5000);
  }

  render() {
    return (
      <Content>
        <div className="container">
          <h2>Acess Denied</h2>
          <p>Sorry you do not have access to this area...</p>
          <p>You will be redirected to the login page shortly...</p>
        </div>
      </Content>
    );
  }
}
