const jwt = require('jsonwebtoken');

const generateToken = (userId, name, role, expires, secret) => {
  const payLoad = {
    id: userId,
    name: name,
    role: role
  };

  return jwt.sign(payLoad, secret, {
    expiresIn: expires
  });
};

module.exports = { generateToken };
