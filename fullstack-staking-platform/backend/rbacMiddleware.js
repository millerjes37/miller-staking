const rbacMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Ensure role is added to user payload during authentication
      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied.' });
      }
    };
  };
  
  module.exports = rbacMiddleware;
  