const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  
  if (!token) return res.status(401).send('Access denied. No token provided.');
  
  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    console.log('decoedL: ', decoded)
    req.user = decoded;
    next();
  } catch (e) {
    console.error('Error: ', e)
    res.status(400).send('Invalid token.');
  }
};
