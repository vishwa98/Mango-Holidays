import React, { useState } from "react";

const Checkbox = ({categories, filterProducts}) => {

    const [checkBoxTicked, setcheckBoxTicked] = useState([])

    const tickCheckbox = categ => () => {

        //Checking whether checkbox is ticked or not

         const categId = checkBoxTicked.indexOf(categ);

         const tickedCategories = [...checkBoxTicked];
        
    
         if(categId === -1) {                   //if not ticked

            tickedCategories.push(categ);

         } else {

            tickedCategories.splice(categId, 1);

         }


         setcheckBoxTicked(tickedCategories);

         filterProducts(tickedCategories);

    }

    //Mapping through each prodcut categories

    return categories.map((cat, i) => (

        <li key={i} className="list-unstyled">

            <input
                type="checkbox"
                onChange = {tickCheckbox(cat._id)}
                value={checkBoxTicked.indexOf(cat._id === -1)}
                className="mr-2 ml-1"
               // className="form-check-input"
            />

            <label className="form-check-label">{cat.gender}</label>
        </li>

    ));

}

export default Checkbox;