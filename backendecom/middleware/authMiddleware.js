// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers['authorization']; // Retrieve the authorization header
//   console.log(authHeader, 'Authorization header');

//   // Check if the header is present and contains a token
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization token missing or malformed' });
//   }

//   const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
//   console.log(token, 'Token extracted');

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         // Handle token verification error (expired, invalid)
//         console.error('JWT verification error:', err);
//         return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
//       }

//       // Token is valid, attach the decoded user info to the request object
//       req.user = decoded;
//       next(); // Proceed to the next middleware or route handler
//     });
//   } else {
//     // No token provided
//     return res.status(403).json({ message: 'Access denied, token missing' });
//   }
// };

// module.exports = authMiddleware;



const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader, 'Authorization header');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token, 'Token extracted');

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
      }

      req.user = decoded; // Ensure decoded has `id` and `email`
      next();
    });
  } else {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }
};

module.exports = authMiddleware;
