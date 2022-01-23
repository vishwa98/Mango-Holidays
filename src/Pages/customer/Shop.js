import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displayCategories, displayFilteredProducts } from "./customerBackEnd";
import Checkbox from "./Checkbox";
import ShopUI from "./ShopUI";


const Shop = () => {
  const [filteredProducts, setfilteredProducts] = useState({
    filtertype: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(1000);
  const [filteredResults, setFilteredResults] = useState([]);

  const categoriesCheckBox = () => {
    displayCategories().then((catdata) => {
      if (!catdata) return;
      if (catdata.error) {
        setError(catdata.error);
      } else {
        setCategories(catdata.data);
      }
    });
  };

  const displayShopProducts = (newFilters) => {
    displayFilteredProducts(limit, newFilters).then((data) => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
      }
    });
  };

  useEffect(() => {
    categoriesCheckBox();
    displayShopProducts(limit, filteredProducts.filters);
  }, []);

  //filter the products according to the category and price

  const filterProducts = (filtertype, filterBy) => {
    const categoryPriceFilteredProducts = { ...filteredProducts };

    categoryPriceFilteredProducts.filtertype[filterBy] = filtertype;

    if (filterBy === "price") {
      let priceValues = handlePrice(filtertype);

      categoryPriceFilteredProducts.filtertype[filterBy] = priceValues;
    }

    displayShopProducts(filteredProducts.filtertype);

    setfilteredProducts(categoryPriceFilteredProducts);
  };

  //Getting the price range array to radio buttons

  const handlePrice = (value) => {
    let array = [];

    return array;
  };

  return (
    <Content>
      <div>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader" />
        </div>
        {/* Header section */}

        {/* Header section end */}
        {/* Page info */}
        <div className="page-top-info">
          <div className="container">
            <h4>SHOP PAGE</h4>
            <div className="site-pagination">
              <h6>Find your favourite products</h6>
            </div>
          </div>
        </div>
        {/* Page info end */}
        {/* Category section */}
        <section className="category-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <div className="filter-widget">
                  <h2 className="fw-title">Categories</h2>
                  <ul className="category-menu">
                    <Checkbox
                      categories={categories}
                      filterProducts={(filtertype) =>
                        filterProducts(filtertype, "category")
                      }
                    />
                  </ul>
                </div>

       

                
              </div>
              <div className="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
                <div className="row">
                  <div className="row">
                    {filteredResults.map((product, j) => (
                      <div key={j} className="col-4 mb-3">
                        <ShopUI room={product} />
                      </div>
                    ))}
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Category section end */}
      </div>
    </Content>
  );
};

export default Shop;
