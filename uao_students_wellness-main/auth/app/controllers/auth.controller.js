const { User } = require('../../../config/database');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.me = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
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
