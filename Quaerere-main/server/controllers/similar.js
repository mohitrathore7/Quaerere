const axios = require('axios');
const SaveData = require('../models/saveData');
const User = require('../models/User');

const similar = async (requestBody) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  };

  try {
    const response = await axios.post("https://api.metaphor.systems/findSimilar", requestBody, { headers });
    console.log(response)
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


exports.fetchSimilar = async (req, res) => {
  const { request_body } = req.body
  try {
    const data = await similar(request_body)
    // const user = await User.findOne({ email: email });

    // if (!user) {
    //   return res.json({ success: false, message: "Make an account" });
    // }

    // if (toSave) {
    //   let x = JSON.stringify(data.results);

    //   // Fetch the existing data
    //   const existingData = await SaveData.findOne({ email: email });

    //   if (existingData) {
    //     // Add x as a new element to the data array
    //     existingData.data.push(x);

    //     // Save the updated data back to the database
    //     await existingData.save();
    //   } else {
    //     // Create a new document in the SaveData model if it doesn't exist
    //     await SaveData.create({
    //       data: [x], // Store x as the first element in the array
    //       email: email // Store the user's email
    //     });
    //   }
    // }

    res.status(200).json(data.results)
  } catch (error) {
    res.status(500).json(error.message)
  }
}