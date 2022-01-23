import React from "react";

import ProductListItem from "./ProductListItem";

export default function SearchResult({ query, products, deleteProductById }) {
  const productsList = products.map((prod) => {
    return (
      <li
        key={prod._id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <ProductListItem prod={prod} deleteProductById={deleteProductById} />
      </li>
    );
  });

  return (
    <div>
      <h3>Showing Result: {query}</h3>
      <hr />
      {products.length > 0 ? (
        <ul className="list-group mt-3">{productsList}</ul>
      ) : (
        "No product found for that query.."
      )}
    </div>
  );
}
