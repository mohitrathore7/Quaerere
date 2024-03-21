const mongoose = require("mongoose");
const axios = require('axios');
const User = require('../models/User');
const SaveData = require('../models/saveData');

const search = async (requestBody) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  };

  try {
    const response = await axios.post("https://api.metaphor.systems/search", requestBody, { headers });
    console.log(response)
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

exports.fetchSearch = async (req, res) => {
  const { request_body } = req.body;
  try {
    const data = await search(request_body);
    
    res.status(200).json(data.results);
  } catch (error) {
    res.status(500).json(error);
  }
}
