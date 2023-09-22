const express = require('express');
const vendorsController = require('../controllers/vendors-controller');

const router = express.Router();

router.get('/', vendorsController.getVendors);

module.exports = router;