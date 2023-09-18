const { CosmosClient } = require('@azure/cosmos');
const dotenv = require('dotenv');

dotenv.config();

const connect = (containerName) => {
    const cosmosEndpoint = process.env.COSMOS_ENDPOINT;
    const cosmosKey = process.env.COSMOS_KEY;
    const cosmosConnectionString = process.env.COSMOS_CONNECTION_STRING;
    const cosmosDatabaseName = process.env.COSMOS_DATABASE_NAME;

    console.log(`COSMOS_ENDPOINT: ${cosmosEndpoint}`);
    console.log(`COSMOS_KEY: ${cosmosKey}`);
    console.log(`COSMOS_CONNECTION_STRING: ${cosmosConnectionString}`);
    console.log(`COSMOS_DATABASE_NAME: ${cosmosDatabaseName}`);

    const databaseName = cosmosDatabaseName;

    const client = new CosmosClient(cosmosConnectionString);
    var database = client.database(databaseName);
    var container = database.container(containerName);

    return container;
}

exports.connect = connect;