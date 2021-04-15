import React from 'react';
import ProductList from './ProductList.jsx'
import { PRODUCTS_PER_PAGE } from '../constants/productList';

const productsListChunk = ({ products, page }) => {
  const startIndex = ( page - 1 ) * PRODUCTS_PER_PAGE;
  const selectedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  return selectedProducts.map(product => (
    <ProductList productList={product} key={product._id} />
  ))
}

export default productsListChunk;