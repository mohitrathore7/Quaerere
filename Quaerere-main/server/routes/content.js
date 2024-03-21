const express = require('express')
const { fetchContent } = require('../controllers/content');
const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/fetch-Content').post(protect,fetchContent);

module.exports = router