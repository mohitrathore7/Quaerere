const express = require('express')
const { fetchSimilar } = require('../controllers/similar');
const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/find-similar').post(protect,fetchSimilar);

module.exports = router