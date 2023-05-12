const { User } = require('../models/user.model');

const decrypt = require('../helpers/decrypt');
const _ = require('lodash');

const authenticateUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).send('Invalid email or password.');
  if (req.body.password !== decrypt(user.password))
    return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  console.log('auth token: ', token);

  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'role', 'email']));
};

module.exports = { authenticateUser };
