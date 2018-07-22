var middleware = {};

middleware.isLoggedIn = (req, res, next) => {
  console.log('User attempting to access an auth route...');
  console.log(req.cookies);
  console.log(req.user);
  if (req.isAuthenticated()) {
    console.log('User is logged in, proceading...');
    return next();
  } else {
    console.log('User is not logged in');
    res.status(401).json({
      err: 'You have to be logged in to do that'
    })
  }
}

module.exports = middleware;
