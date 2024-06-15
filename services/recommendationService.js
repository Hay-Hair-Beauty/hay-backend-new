const axios = require('axios');
const dotenv = require('dotenv');
const csvParser = require('csv-parser');
const { Transform } = require('stream');

dotenv.config();

const csvUrl = 'https://storage.googleapis.com/hay-recomendations/data_recomm.csv';

const getRecommendationData = async () => {
  try {
    const csvData = await downloadCsvFromGcs();
    return csvData;
  } catch (error) {
    console.error('Error fetching data from GCS:', error);
    throw error;
  }
};


const getRecommendationByHairIssue = async (hairIssue) => {
    try {
      const csvData = await downloadCsvFromGcs();
      const products = csvData.filter(row => row.hair_issue === hairIssue);
      return products;
    } catch (error) {
      console.error('Error fetching data from GCS:', error);
      throw error;
    }
  };

const downloadCsvFromGcs = async () => {
    try {
      const csvData = [];
      const response = await axios.get(csvUrl, { responseType: 'stream' });
      const csvTransform = new Transform({
        objectMode: true,
        transform: (chunk, encoding, callback) => {
          callback(null, chunk);
        }
      });
  
      return new Promise((resolve, reject) => {
        response.data
          .pipe(csvParser())
          .pipe(csvTransform)
          .on('data', (row) => csvData.push(row))
          .on('end', () => resolve(csvData))
          .on('error', (err) => reject(err));
      });
    } catch (error) {
      console.error('Error fetching data from GCS:', error);
      throw error;
    }
  };

module.exports = {
  getRecommendationData,
  getRecommendationByHairIssue,
};