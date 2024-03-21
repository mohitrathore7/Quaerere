const User = require("../models/User");
const SaveData = require("../models/saveData");

exports.saveData = async (req, res) => {
  const { email, toSave, item } = req.body
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json({ success: false, message: "Make an account" });
  }

  if (toSave) {

    const existingData = await SaveData.findOne({ email: email });
    if (existingData) {
      existingData.data.push(item);

      await existingData.save();
    } else {

      await SaveData.create({
        data: [item],
        email: email
      });
    }
    res.send("Item saved").status(200)
  }
}

function parseStringToArray(inputString) {
  try {
      // Parse the outer array
      const jsonArray = JSON.parse(inputString);

      // Parse each JSON string within the array
      const parsedArray = jsonArray.map(jsonStr => JSON.parse(jsonStr));

      return parsedArray;
  } catch (error) {
      console.error('Error parsing the input string:', error);
      return null; // Return null in case of an error
  }
}

exports.fetchSaveData = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ success: false, message: "Make an account" });
    }

    const data = await SaveData.findOne({ email: email })
    console.log(data.data)
    res.json(data.data).status(200)
  } catch (error) {
    res.json(error.message).status(500)
  }

}