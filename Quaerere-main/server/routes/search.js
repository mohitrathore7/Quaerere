const express = require('express')
const { fetchSearch } = require('../controllers/serach');
const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/search').post(protect,fetchSearch);

module.exports = router