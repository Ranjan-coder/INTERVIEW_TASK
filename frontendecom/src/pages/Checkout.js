import React from 'react';
import { useCart } from '../context/CartContext'; // Import Cart Context
import API from '../utils/api';
import { useNavigate } from 'react-router-dom'; // For redirection
import styles from '../Style/Checkout.module.css'; // Import Modular CSS
import { jwtDecode } from 'jwt-decode'; // For decoding JWT

const Checkout = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const totalAmount = getCartTotal();
  const navigate = useNavigate(); // For navigation

  // const handleCheckout = async () => {
  //   try {
  //     // Assuming token is stored in localStorage
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       alert('You need to be logged in to place an order.');
  //       navigate('/login'); // Redirect to login if token is missing
  //       return;
  //     }

  //     // Decode the token to get user ID
  //     const decoded = jwtDecode(token);
  //     const userId = decoded.id; // Adjust based on your JWT payload structure

  //     if (cart.length === 0) {
  //       alert('Your cart is empty. Add items to place an order.');
  //       return;
  //     }

  //     // Prepare order data
  //     const orderData = {
  //       products: cart.map((product) => ({
  //         productId: product._id,
  //         quantity: product.quantity,
  //       })),
  //       totalAmount,
  //       user: userId,
  //     };

  //     // Make an API call to place the order
  //     await API.post('/orders', orderData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Pass the token in headers
  //       },
  //     });

  //     alert('Order placed successfully!');
  //     clearCart(); // Clear the cart after successful order
  //     navigate('/products'); // Redirect to products page
  //   } catch (error) {
  //     console.error('Checkout failed', error);
  //     alert('Failed to place the order');
  //   }
  // };

  const handleCheckout = async () => {
    try {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to place an order.');
        navigate('/login'); // Redirect to login if token is missing
        return;
      }
  
      // Decode the token to get the user ID (if needed for verification)
      const decoded = jwtDecode(token);
      const userId = decoded.id; // Adjust this based on your JWT payload structure
  
      // Check if the cart is empty
      if (cart.length === 0) {
        alert('Your cart is empty. Add items to place an order.');
        return;
      }
  
      // Prepare order data for the backend
      const orderData = {
        products: cart.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        })),
        totalAmount, // Total amount of the cart
        user: userId, // User ID (can be retrieved from token)
      };
  
      // Make an API call to place the order
      // await API.post('/orders', orderData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`, // Pass the token in headers
      //   },
      // });
  
      // Clear localStorage after a successful order placement
      localStorage.removeItem('cart'); // This assumes you're storing cart in localStorage (if applicable)
  
      // Clear the cart from frontend state and context
      clearCart();
  
      // Notify the user that the order was placed successfully
      alert('Order placed successfully!');
  
      // Redirect to the products page or order history page
      navigate('/');
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Failed to place the order');
    }
  };
  

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCartContainer}>
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart to place an order.</p>
        <button onClick={() => navigate('/products')} className={styles.addItemsButton}>
          Go to Products
        </button>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <div className={styles.cartItems}>
        <h3>Cart Items:</h3>
        <ul>
          {cart.map((product) => (
            <li key={product._id} className={styles.cartItem}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <div className={styles.itemDetails}>
                <span>{product.name} - ${product.price}</span>
                <div className={styles.quantityControls}>
                  <button onClick={() => decreaseQuantity(product._id)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product._id)}>+</button>
                  <button onClick={() => removeFromCart(product._id)} className={styles.removeButton}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total Amount: ${totalAmount}</h3>
      </div>
      <button onClick={handleCheckout} className={styles.placeOrderButton}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;





// import React from 'react';
// import { useCart } from '../context/CartContext'; // Import Cart Context
// import API from '../utils/api';
// import { useNavigate } from 'react-router-dom'; // For redirection
// import styles from '../Style/Checkout.module.css'; // Import Modular CSS
// import {jwtDecode} from 'jwt-decode'; // For decoding JWT

// const Checkout = () => {
//   const { cart, updateCart, getCartTotal, clearCart } = useCart();
//   const totalAmount = getCartTotal();
//   const navigate = useNavigate(); // For navigation

//   // Handle quantity increase by interacting with backend
//   const handleIncreaseQuantity = async (productId) => {
//     try {
//       await API.post('/cart/add', { productId, quantity: 1 }); // Call API to increase quantity
//       const response = await API.get('/cart'); // Fetch updated cart from backend
//       updateCart(response.data.items); // Update cart context with new data
//     } catch (error) {
//       console.error('Failed to increase quantity', error);
//     }
//   };

//   // Handle quantity decrease by interacting with backend
//   const handleDecreaseQuantity = async (productId) => {
//     try {
//       await API.post('/cart/remove', { productId, quantity: 1 }); // Call API to decrease quantity
//       const response = await API.get('/cart'); // Fetch updated cart from backend
//       updateCart(response.data.items); // Update cart context with new data
//     } catch (error) {
//       console.error('Failed to decrease quantity', error);
//     }
//   };

//   // Handle item removal from cart
//   const handleRemoveItem = async (productId) => {
//     try {
//       await API.post('/cart/remove', { productId, quantity: 0 }); // Call API to remove item completely
//       const response = await API.get('/cart'); // Fetch updated cart from backend
//       updateCart(response.data.items); // Update cart context with new data
//     } catch (error) {
//       console.error('Failed to remove item', error);
//     }
//   };

//   // Handle checkout process
//   const handleCheckout = async () => {
//     try {
//       // Assuming token is stored in localStorage
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('You need to be logged in to place an order.');
//         navigate('/login'); // Redirect to login if token is missing
//         return;
//       }

//       // Decode the token to get user ID
//       const decoded = jwtDecode(token);
//       const userId = decoded.id; // Adjust based on your JWT payload structure

//       if (cart.length === 0) {
//         alert('Your cart is empty. Add items to place an order.');
//         return;
//       }

//       // Prepare order data
//       const orderData = {
//         products: cart.map((product) => ({
//           productId: product._id,
//           quantity: product.quantity,
//         })),
//         totalAmount,
//         user: userId,
//       };

//       // Make an API call to place the order
//       await API.post('/orders', orderData, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Pass the token in headers
//         },
//       });

//       alert('Order placed successfully!');
//       clearCart(); // Clear the cart in context after successful order
//       await API.post('/cart/clear'); // Clear the cart in backend
//       navigate('/products'); // Redirect to products page
//     } catch (error) {
//       console.error('Checkout failed', error);
//       alert('Failed to place the order');
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className={styles.emptyCartContainer}>
//         <h2>Your Cart is Empty</h2>
//         <p>Add items to your cart to place an order.</p>
//         <button onClick={() => navigate('/products')} className={styles.addItemsButton}>
//           Go to Products
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.checkoutContainer}>
//       <h2>Checkout</h2>
//       <div className={styles.cartItems}>
//         <h3>Cart Items:</h3>
//         <ul>
//           {cart.map((product) => (
//             <li key={product._id} className={styles.cartItem}>
//               <img src={product.image} alt={product.name} className={styles.productImage} />
//               <div className={styles.itemDetails}>
//                 <span>{product.name} - ${product.price}</span>
//                 <div className={styles.quantityControls}>
//                   <button onClick={() => handleDecreaseQuantity(product._id)}>-</button>
//                   <span>{product.quantity}</span>
//                   <button onClick={() => handleIncreaseQuantity(product._id)}>+</button>
//                   <button onClick={() => handleRemoveItem(product._id)} className={styles.removeButton}>
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <h3>Total Amount: ${totalAmount}</h3>
//       </div>
//       <button onClick={handleCheckout} className={styles.placeOrderButton}>
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default Checkout;
