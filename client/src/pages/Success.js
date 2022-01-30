import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { idbPromise } from "../../utils/helpers";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from '../utils/mutations';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);
    const cart = await idbPromise('cart', 'get');
    const products = cart.map(item => item._id);

    useEffect(() => {
        async function saveOrder() {
            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                const productData = data.addOrder.products;
              
                productData.forEach((item) => {
                  idbPromise('cart', 'delete', item);
                });
            }
        }

        saveOrder();
    }, 
    
    [addOrder]);
    return (
      <div>
        <Jumbotron>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
        </Jumbotron>
      </div>
    );
  };