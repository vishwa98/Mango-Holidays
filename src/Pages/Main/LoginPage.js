import React, { useEffect } from "react";
import Content from "../customer/Content";
import UserType from "../../Util/UserType";
import {
  SetValuesOnStorage,
  IsLoggedIn,
  IsStoreManagerLoggedIn,
} from "../../Util";

const prefix =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/"
    : "";
const URL = prefix + "api/auth/login";

export default function LoginPage(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { history } = props;

  useEffect(() => {
    // check if we are already logged in
    if (IsLoggedIn()) {
      // redirect to the correct page according to the user type
      if (IsStoreManagerLoggedIn()) {
        history.push("/storemanager");
      } else {
        history.push("/shop");
      }
    }

    if (
      props.hasOwnProperty("location") &&
      props.location.state &&
      props.location.state.error
    ) {
      setError(props.location.state.error);
      console.log(props.location.state.pageTriedToAccess);
    }
    return () => {};
  }, []);

  const errorAlert = (msg) => {
    return (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    );
  };

  const login = (e) => {
    e.preventDefault();
    console.log("Login Request Sent: " + URL);
    // send the login post request
    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.token) {
          setError(data.response);
        } else {
          setError("");

          // save the token, email and the role onto the localStorage
          SetValuesOnStorage(data.token, data.role, email, data.id);

          // redirect to the correct page according to the user type
          if (data.role === UserType.ADMIN) {
            history.push("/admin");
          } else if (data.role === UserType.STORE_MANAGER) {
            history.push("/storemanager");
          } else {
            history.push("/shop");
          }
        }
      })
      .catch((err) => setError(err));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Content>
      <div className="container mt-5 width-login-form">
        {error && errorAlert(error)}
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={updateEmail}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              required
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>
          <div className="form-group mt-3">
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Content>
  );
}
