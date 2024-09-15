import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Style/ProductCard.module.css'; // Modular CSS

const ProductCard = ({ product }) => {
  const { _id, image, name, category, price } = product;

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${_id}`}>
        <img
          src={image || 'https://via.placeholder.com/300'} // Placeholder if no image
          alt={name}
          className={styles.productImage}
        />
      </Link>
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productDescription}>{category}</p>
      <div className={styles.productPrice}>${price}</div>
      <Link to={`/products/${_id}`}>
      <button className={styles.addToCartButton}>Check Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
