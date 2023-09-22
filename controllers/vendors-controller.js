const { connect } = require('../database/cosmos-connector');

const getVendors = async (req, res, next) => {
    try {
        const container = connect('vendors');
        const { resources: items } = await container.items.readAll().fetchAll();

        console.log(items);

        res.status(200).send(items);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getVendors = getVendors;
