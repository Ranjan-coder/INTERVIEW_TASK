import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Style/Navbar.module.css'; // Importing CSS Module

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.link}>Home</Link>
        {/* <Link to="/product" className={styles.link}>Products</Link> */}
        {isLoggedIn ? (
          <>
            <Link to="/checkout" className={styles.link}>Checkout</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/register" className={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
