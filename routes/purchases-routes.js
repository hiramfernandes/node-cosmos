const express = require('express');
const { connect } = require('../database/cosmos-connector');

const router = express.Router();

router.get('/purchases', async (req, res, next) => {
    try {
        const container = connect('purchases');
        const { resources: items } = await container.items.readAll().fetchAll();

        console.log(items);

        res.status(200)
            .send(items);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;