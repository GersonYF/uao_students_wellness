require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const logger = require('../config/logger');
const logger = require(`/var/www/html/config/logger`);

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//const db = require('../config/database');
const db = require(`/var/www/html/config/database`);
db.sequelize.sync();

// Rutas
app.use('/api/users', require('./app/routes/user.routes'));

app.listen(port, () => {
  logger.info(`Servidor corriendo en el puerto ${port}`);
});
