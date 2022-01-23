import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { cartTotalProducts } from "../../Pages/customer/cartLocalStorage";
import {
  IsCustomerLoggedIn,
  Logout,
  IsLoggedIn,
  IsAdminLoggedIn,
} from "../../Util";

export default function Navigation() {
  const history = useHistory();

  const onClickLogout = () => {
    Logout();
  };

  return (
    <header className="header-section">
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 text-center text-lg-left">
              {/* logo */}
              <NavLink to="/" className="site-logo">
                <img src="img/mango.png" alt="" />
              </NavLink>
            </div>
            <div className="col-xl-6 col-lg-5">
              <form className="header-search-form">
                <input  placeholder="Welcome to MangoHolidays (Pvt) Ltd !" />
                
                <button>
                  <i className="flaticon-search" />
                </button>
              </form>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="user-panel">
                <div className="up-item">
                  <i className="flaticon-profile mr-3" />
                  {IsLoggedIn() ? (
                    <Link to="/" onClick={onClickLogout}>
                      Sign Out
                    </Link>
                  ) : (
                    <>
                      <NavLink to="/signin">Sign In</NavLink> or{" "}
                      <NavLink to="/signup">Create Account</NavLink>
                    </>
                  )}
                </div>
                {IsCustomerLoggedIn() || !IsLoggedIn() ? (
                  <div className="up-item">
                    <div className="shopping-card">
                      <i className="flaticon-bag" />
                      <span>{cartTotalProducts()}</span>
                    </div>
                    <NavLink to="/cart">Shopping Cart</NavLink>
                  </div>
                ) : (
                  <div className="up-item">
                    <Link
                      to={
                       "/storemanager"
                      }
                      className="btn btn-primary"
                      style={{ color: "white" }}
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="main-navbar">
        <div className="container">
          {/* menu */}
          <ul className="main-menu">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/reservations">My Reservations</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
