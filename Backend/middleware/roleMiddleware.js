exports.authorize = (roles) => (req, res, next) => {

  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: 'Not authorized, no user role' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};
