const { User } = require('../../../config/database');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


exports.createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await User.create({
      fullname,
      email,
      password,
      is_staff: false,
      is_superuser: false,
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUserList = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.json(userList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.is_staff = req.body.is_staff || user.is_staff;
      user.is_superuser = req.body.is_superuser || user.is_superuser;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
