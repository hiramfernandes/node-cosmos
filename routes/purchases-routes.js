const express = require('express');
const { connect } = require('../database/cosmos-connector');

const router = express.Router();
const container = connect('purchases');

router.get('/', async (req, res, next) => {
    try {
        const { resources: items } = await container.items.readAll().fetchAll();

        console.log(items);

        res.status(200)
            .send(items);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.post('/', async (req, res, next) => {
    var receivedObject = req.body;
    console.log(receivedObject);

    const purchase = { ...receivedObject };
    await container.items.upsert(purchase);

    res.status(201)
       .json({purchase});
})

router.get('/:purchaseid/:purchasedate', async (req, res, next) => {
    const purchaseId = req.params.purchaseid;
    const purchaseDate = req.params.purchasedate;
    console.log(purchaseId);
    console.log(purchaseDate);

    try {
        const item = container.item(purchaseId, purchaseDate);
        const { resource: readDoc } = await item.read();
        console.log(readDoc);

        res.send(readDoc).status(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
