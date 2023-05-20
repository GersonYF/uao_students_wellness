const express = require('express');
const router = express.Router();
//const { authMiddleware } = require('../../../config/middlewares');
const { authMiddleware } = require('/var/www/html/config/middlewares');
const dashboardController = require('../controllers/dashboard.controller');

router.get('/counts', authMiddleware, dashboardController.getCombinedData);
router.get('/counts/gender', authMiddleware, dashboardController.getGenderCounts);
router.get('/counts/smoking-and-cigarretes', authMiddleware, dashboardController.getSmokingAndECigaretteCounts);
router.get('/counts/alcohol-consumption', authMiddleware, dashboardController.getAlcoholConsumptionCounts);
router.get('/counts/sleep-quality', authMiddleware, dashboardController.getSleepQualityCounts);

module.exports = router;
