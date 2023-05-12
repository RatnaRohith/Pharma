const { User } = require('../models/user.model');
const encrypt = require('../helpers/encrypt');
const decrypt = require('../helpers/decrypt');

const _ = require('lodash');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).send('There are no users');
  return res.send(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.password =  decrypt(user.password);
  if (!user) return res.status(404).send('user not found');
  return res.status(200).send(user);
};

const createNewUser = async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) return res.status(400).send('User already registered.');

  user = new User(req.body);

  const userPassword = user.password;
  user.password = encrypt(req.body.password);

  try {
    await user.save();


    return res.send(_.pick(user, ['_id', 'name', 'email']));
  } catch (error) {
    return res.send(error);
  }
};

const updateUser = async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user && user._id != req.params.id)
    return res.status(400).send('email already registered');

  req.body.password = encrypt(req.body.pass);

  user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user)
    return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('There is no user with the given ID.');

  res.status(200).send(user);
};

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};
