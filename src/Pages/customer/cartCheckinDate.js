import React from "react";

const checkInDate = ({ products }) => {
  const CartCheckInDate = () => {
    return products.reduce((currentValue, nextValue) => {
      return nextValue.checkInDate;
    }, 0);
  };

  return <div>{CartCheckInDate()}</div>;
};

export default checkInDate;
