const jwt = require('jsonwebtoken');
const logger = require('../../config/logger');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    logger.info("Token: ", token)
    const decoded = jwt.verify(token, process.env.SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'No estás autenticado.', error });
  }
};
