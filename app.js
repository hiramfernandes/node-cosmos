const express = require('express');
const { connect } = require('./database/cosmos-connector');

const port = 3000;
const app = express();

console.log(`Application running on port ${3000}`);

app.get('/', async (req, res, next) => {
    res.send('<h2>Main Page</h2>')
});

app.get('/purchases', async (req, res, next) => {
    try{
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

app.get('/vendors', async(req, res) => {
    try {
        const container = connect('vendors');
        const { resources: items } = await container.items.readAll().fetchAll();
    
        console.log(items);
    
        res.status(200).send(items);    
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port);
