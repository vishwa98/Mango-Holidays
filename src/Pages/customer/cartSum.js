import React from "react";


const PayTotal = ({ products }) => {
    
    const CartTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return nextValue.count;
        }, 0);
    };

    return (

        <div>
            ${CartTotal()}
        </div>
    );
};

export default PayTotal;