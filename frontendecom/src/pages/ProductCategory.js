import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import styles from '../Style/ProductCategory.module.css'; // Modular CSS

const ProductCategory = () => {
  const { category } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await API.get(`/category/${category}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, [category]);

  return (
    <div className={styles.productCategoryContainer}>
      <h2 className={styles.categoryTitle}>{category} Products</h2>
      <div className={styles.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
