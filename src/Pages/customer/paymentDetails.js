import React, { useState, useEffect } from "react";
import { displayCartProducts} from "./cartLocalStorage";
import PaymentPage from "./PaymentPage";

const Cart = () => {
    const [cartProducts, setcartProducts] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setcartProducts(displayCartProducts());
    }, [run]);


    return (
        <div>
           

          <PaymentPage products={cartProducts} />
        
        
        </div>
    );
};

export default Cart;
