import React, { useState } from "react";
import ProductImage from './ProductImage';
import {cartValueUpdate,deleteProductFromCart} from './cartLocalStorage';



const CartUI = ({ product, productQuantity = false, removeProductBtn = false, setRun = f => f, run = undefined }) => {

  const [count, setCount] = useState(product.count);


    //Removing product from cart

    const showRemoveButton = removeProductBtn => {
      return (
        removeProductBtn && (
              <button
                  onClick={() => {deleteProductFromCart(product._id); setRun(!run);}}
                  className="btn btn-danger"
              >
                  Remove Product
              </button>
          )
      );
  };

    
      
      //Product Quantity

      const handleUpdate = productId => e => {
        setRun(!run);
        setCount(e.target.value < 1 ? 1 : e.target.value);
        setCount(e.target.value > product.quantity ? product.quantity : e.target.value);
        if (e.target.value >= 1 && e.target.value < product.quantity) {

          cartValueUpdate(productId, e.target.value);

        }
        
    };


    //Updating the cart


      const updateShoppingCart = productQuantity => {

        return (
          productQuantity && (
              <div>
                  <div className="input-group">
                     
                          
                     
                      <input type="number" className="form-control" value={product.count} onChange={handleUpdate(product._id)}/>


                  </div>
              </div>
          )
      );
      }


    return (
        
               <div>

                <table>
                      <thead>
                        <tr>
                          <th className="product-th">Product</th>
                          <th className="quy-th">Quantity</th>
                          <th className="size-th">Action</th>
                          <th className="total-th">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="product-col">
                          <ProductImage pro={product} url="product"></ProductImage>
                          <b>{product.name}</b>
                          </td>
                          <td className="quy-col">
                            <div className="quantity">
                              <div className="pro-qty">
                              {updateShoppingCart(productQuantity)}
                              </div>
                            </div>
                          </td>
                          <td className="size-col">{showRemoveButton(removeProductBtn)}</td>
                          <td className="total-col"><h4>${product.price}</h4></td>
                        </tr>
                        
                      </tbody>
                    </table>                 
                    </div>
        
    );
};

export default CartUI;