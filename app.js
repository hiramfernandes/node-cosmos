const express = require('express');
const { CosmosClient } = require("@azure/cosmos");

const port = 3000;

const app = express();

function connect() {
    const connectionString = '<YOUR_CONNECTION_STRING_GOES_HERE>';
    const databaseName = 'control';
    const containerName = 'purchases';

    const client = new CosmosClient(connectionString);
    var database = client.database(databaseName);
    var container = database.container(containerName);

    return container;
}

app.get('/', async (req, res, next) => {
    res.send('<h2>Main Page</h2>')
});

app.get('/purchases', async (req, res, next) => {
    try{
        const container = connect();
        const { resources: items } = await container.items.readAll().fetchAll();
    
        console.log(items);

        res.status(200)
           .send(items);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})


app.listen(port);
