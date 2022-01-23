import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displayRooms } from "./customerBackEnd";
import HomeUI from "./HomeUI";

const Home = () => {
  const [roomsList, setRoomsList] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  //Display the latest released clothing brands in the home page

  const listOfRooms = () => {
    displayRooms("createdAt").then((data) => {
      if (!data) return;
      console.log(data);

      if (data.error) {
        setError(data.error);
      } else {
        setRoomsList(data);
      }
    });
  };

  useEffect(() => {
    listOfRooms();
  }, []);

  return (
    <Content>
      <div>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader" />
        </div>
        {/* Hero section */}
        
        {/* Hero section end */}
        {/* Features section */}
        <section className="features-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 p-0 feature">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src="img/icons/1.png" alt="#" />
                  </div>
                  <h2>Fast Secure Payments</h2>
                </div>
              </div>
              <div className="col-md-4 p-0 feature">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src="img/icons/2.png" alt="#" />
                  </div>
                  <h2>Premium Products</h2>
                </div>
              </div>
              <div className="col-md-4 p-0 feature">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src="img/icons/3.png" alt="#" />
                  </div>
                  <h2>Free &amp; fast Delivery</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features section end */}

        {/* Product filter section */}
        <section className="product-filter-section">
          <div className="container">
            <div className="section-title">
              <h2>ROOMS</h2>
            </div>

            <div className="row">
              {roomsList.map((allRoomsList, j) => (
                <div key={j} className="col-4 mb-3">
                  <HomeUI key={j} product={allRoomsList} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Content>
  );
};

export default Home;
