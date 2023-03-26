const { User } = require('../../config/database');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'fullname', 'email', 'is_staff', 'is_superuser'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
  }
};

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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (await user.validatePassword(password)) {
      const token = jwt.sign({ id: user.id, is_staff: user.is_staff, is_superuser: user.is_superuser }, process.env.SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};
