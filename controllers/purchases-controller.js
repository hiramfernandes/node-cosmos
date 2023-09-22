const { connect } = require('../database/cosmos-connector');

const container = connect('purchases');

const createPurchase = async (req, res, next) => {
    var receivedObject = req.body;
    console.log(receivedObject);

    const purchase = { ...receivedObject };
    await container.items.upsert(purchase);

    res.status(201)
       .json({purchase});
};

const getPurchaseByIdAndDate = async (req, res, next) => {
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
};

const getPurchases = async (req, res, next) => {
    try {
        const { resources: items } = await container.items.readAll().fetchAll();

        console.log(items);

        res.status(200)
            .send(items);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.createPurchase = createPurchase;
exports.getPurchases = getPurchases;
exports.getPurchaseByIdAndDate = getPurchaseByIdAndDate;
