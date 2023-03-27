const jwt = require('jsonwebtoken');
const logger = require('../../config/logger');
const { User } = require('../../config/database');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    logger.info("Token: ", token);
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'fullname', 'email', 'is_staff', 'is_superuser'],
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'No estás autenticado.' });
  }
};
