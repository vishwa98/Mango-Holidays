//Adding products to the cart

export const addProductToCart = (prod, next) => {

    let cart = [];

    if (typeof window !== "undefined") {

        if (localStorage.getItem("cart")) {

            cart = JSON.parse(localStorage.getItem("cart"));

        }

        cart.push({

            ...prod,
            count: 1

        });

        cart = Array.from(new Set(cart.map(c => c._id))).map(id => {

            return cart.find(c => c._id === id);

        });

        localStorage.setItem("cart", JSON.stringify(cart));

        next();
    }
};


//Retrieving the products in the local storage

export const displayCartProducts = () => {

    if (typeof window !== "undefined") {

        if (localStorage.getItem("cart")) {

            return JSON.parse(localStorage.getItem("cart"));

        }
    }

    return [];

};

//Updating the quantity

export const cartValueUpdate = (productId,count,checkInDate) => {

    let cart = [];

    if (typeof window !== "undefined") {

        if (localStorage.getItem("cart")) {

            cart = JSON.parse(localStorage.getItem("cart"));

        }

        cart.map((product,j) => {

            if (product._id === productId) {

                cart[j].count = count;
                cart[j].checkInDate = checkInDate;

            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));

    }
};

//Deleting a product form cart


export const deleteProductFromCart = productId => {

    let cart = [];

    if (typeof window !== "undefined") {

        if (localStorage.getItem("cart")) {

            cart = JSON.parse(localStorage.getItem("cart"));

        }

        cart.map((product,j) => {

            if (product._id === productId) {

                cart.splice(j,1);

            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return cart;
};


//Getting the total number of products in cart

export const cartTotalProducts = () => {

    if (typeof window !== "undefined") {

        if (localStorage.getItem("cart")) {

            return JSON.parse(localStorage.getItem("cart")).length;

        }
    }

    return 0;
};



//Clearing the cart after payment

export const clearCart = next => {

    if (typeof window !== "undefined"){

        localStorage.removeItem("cart");
        
        next();
    }
}

