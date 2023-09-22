const express = require('express');

const router = express.Router();

const purchasesController = require('../controllers/purchases-controller');

router.get('/', purchasesController.getPurchases);
router.post('/', purchasesController.createPurchase);
router.get('/:purchaseid/:purchasedate', purchasesController.getPurchaseByIdAndDate);

module.exports = router;
