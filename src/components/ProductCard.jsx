import { useState, useEffect, useRef, useContext } from 'react';
import { ContextApp } from '../contexts/ContextApp';
import images from '../assets/img';
import { HANDLE_CHANGE_PRODUCT_AMOUNT } from '../contexts/types';

const ProductCard = ({ product }) => {
  const { dispatch } = useContext(ContextApp);

  const titleRef = useRef(null);
  const [titleValue, setTitleValue] = useState('');
  const [titleFontValue, setTitleFontValue] = useState(14);
  const [amountProduct, setAmountProduct] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setTitleValue(product.title);
  }, []);

  const handleChangeEditMode = () => setIsEditMode(!isEditMode);

  const handleChangeTitleValue = ({ target: { value } }) =>
    setTitleValue(value);

  const handleChangeKeyPress = ({ code }) =>
    code === 'Enter' && handleChangeEditMode();

  const handleChangeFontSize = ({ target: { value } }) => {
    setTitleFontValue(Number(value));
    titleRef.current.style.fontSize = `${value}px`;
  };

  const handleChangeAmountProduct = ({ target: { value } }) => {
    if (value === '') {
      setAmountProduct(1);
      dispatch({
        type: HANDLE_CHANGE_PRODUCT_AMOUNT,
        payload: { id: product.id, amount: Number(1) },
      });
      return;
    }

    setAmountProduct(Number(value));
    dispatch({
      type: HANDLE_CHANGE_PRODUCT_AMOUNT,
      payload: { id: product.id, amount: Number(value) },
    });
  };

  return (
    <div className='product-card'>
      <img src={product.image} alt='' />
      <div className='card-title'>
        <h2 ref={titleRef}>
          {titleValue}{' '}
          {!isEditMode && (
            <img
              src={images.editIcon}
              alt='edit-icon'
              onClick={handleChangeEditMode}
            />
          )}
        </h2>
        {isEditMode && (
          <>
            <input
              type='text'
              value={titleValue}
              onChange={handleChangeTitleValue}
              onKeyDown={handleChangeKeyPress}
            />
            <input
              type='range'
              step={1}
              min={14}
              max={30}
              value={titleFontValue}
              onChange={handleChangeFontSize}
              onKeyDown={handleChangeKeyPress}
            />
          </>
        )}
      </div>
      <div className='card-price'>
        <label>${product.possible_price.toFixed(2)}</label>
        <input
          type='number'
          min={1}
          step={1}
          value={amountProduct}
          onChange={handleChangeAmountProduct}
        />
      </div>
      <p>{product.description}</p>
      <button>Add to card</button>
      <a href='#'>Learn More</a>
    </div>
  );
};

export default ProductCard;
