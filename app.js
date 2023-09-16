const express = require('express');
const { CosmosClient } = require("@azure/cosmos");

const port = 3000;

const app = express();

function connect() {
    const connectionString = 'AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==';
    const databaseName = 'Control';
    const containerName = 'Purchases';

    const client = new CosmosClient(connectionString);
    var database = client.database(databaseName);
    var container = database.container(containerName);

    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    return container;
}

app.get('/', async (req, res, next) => {
    res.send('<h2>Main Page</h2>')
});

app.get('/purchases', async (req, res, next) => {
    try{
        const container = connect();
        const { resources: items } = await container.items.readAll().fetchAll();
    
        res.status(204).send(items);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})


app.listen(port);
