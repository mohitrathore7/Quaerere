const express = require('express')
const { saveData,fetchSaveData } = require('../controllers/saveData');
const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/saveData').post(protect,saveData);
router.route('/fetchData').post(protect,fetchSaveData);

module.exports = router