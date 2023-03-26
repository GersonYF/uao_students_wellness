const { User } = require('../../config/database');

module.exports = {
  validateAssignedUser: async (req, res, next) => {
    const assignedUserId = req.body.assignedUserId;

    const user = await User.findByPk(assignedUserId);

    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    req.assignedUser = user;
    next();
  },
};
