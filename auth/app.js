require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('../config/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = require('../config/database');
db.sequelize.sync();

// Rutas
app.use('/api/auth', require('./app/routes/auth.routes'));

app.listen(port, () => {
  logger.info(`Servidor corriendo en el puerto ${port}`);
});
