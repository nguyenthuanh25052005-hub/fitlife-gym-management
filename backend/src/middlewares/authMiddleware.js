const { verifyToken } = require("../utils/jwt");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access token is required"
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid authorization format"
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

function authorizeRoles(...roles) {
  return function roleMiddleware(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        message: "User is not authenticated"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource"
      });
    }

    return next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};