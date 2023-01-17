import { useContext, useEffect } from 'react';
import { ContextApp } from '../contexts/ContextApp';
import { ADD_TOTAL_PRODUCTS_AMOUNT } from '../contexts/types';
import ProductCard from './ProductCard';

const ContainerResults = () => {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    dispatch({ type: ADD_TOTAL_PRODUCTS_AMOUNT });
  }, []);

  return (
    <>
      <div className='container-result-list'>
        {state.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className='container-products-total'>
        <label>Total de productos</label>
        <div>
          <label>{state.totalProducts}</label>
        </div>
      </div>
    </>
  );
};

export default ContainerResults;
