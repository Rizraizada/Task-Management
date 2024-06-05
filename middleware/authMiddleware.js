const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
      next(); // User is authenticated, proceed to the next middleware/route handler
    } else {
      res.redirect('/login'); // User is not authenticated, redirect to login page
    }
  };
  
  module.exports = authMiddleware;
  