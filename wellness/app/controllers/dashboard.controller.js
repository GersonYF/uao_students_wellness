const fs = require('fs');
const csvParser = require('csv-parser')
const path = require('path');

exports.getGenderCounts = async (req, res) => {
  let results = [];
  const csvFilePath = path.join(__dirname, '..', '..', '..', 'wellnesap_spark', 'resultados3.csv', 'part-00000-b2436bb6-0d60-405d-91fc-c00b9411aaf9-c000.csv');
  fs.createReadStream(csvFilePath) // replace with your actual file path
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results);
    });
};

exports.getSmokingAndECigaretteCounts = async (req, res) => {
  let results = [];
  const csvFilePath = path.join(__dirname, '..', '..', '..', 'wellnesap_spark', 'resultados3.csv', 'part-00001-b2436bb6-0d60-405d-91fc-c00b9411aaf9-c000.csv');
  fs.createReadStream(csvFilePath) // replace with your actual file path
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results);
    });
};

exports.getAlcoholConsumptionCounts = async (req, res) => {
  let results = [];
  const csvFilePath = path.join(__dirname, '..', '..', '..', 'wellnesap_spark', 'resultados3.csv', 'part-00002-b2436bb6-0d60-405d-91fc-c00b9411aaf9-c000.csv');
  fs.createReadStream(csvFilePath) // replace with your actual file path
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results);
    });
};

exports.getSleepQualityCounts = async (req, res) => {
  let results = [];
  const csvFilePath = path.join(__dirname, '..', '..', '..', 'wellnessapp_spark', 'resultados3.csv', 'part-00003-b2436bb6-0d60-405d-91fc-c00b9411aaf9-c000.csv');
  fs.createReadStream(csvFilePath) // replace with your actual file path
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results);
    });
};
