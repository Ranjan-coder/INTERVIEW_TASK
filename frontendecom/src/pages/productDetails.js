import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import styles from '../Style/ProductDetails.module.css'; // Modular CSS
import { useCart } from '../context/CartContext'; // Import Cart Context

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Get addToCart function from context

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert('Product added to cart!');
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.productDetailsContainer}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h2 className={styles.productName}>{product.name}</h2>
        <h2 className={styles.productCategory}>{product.category}</h2>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>Price: ${product.price}</p>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
