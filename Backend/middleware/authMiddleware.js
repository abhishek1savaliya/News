const { verifyToken } = require('../config/jwt');

exports.protect = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  // Extract token by removing 'Bearer ' prefix
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = verifyToken(token);

    // Attach decoded user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    // Catch any error during token verification
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};