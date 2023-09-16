const { CosmosClient } = require('@azure/cosmos');

const connect = (containerName) => {
    const connectionString = '<ADD-CONNECTION-STRING-HERE>';
    const databaseName = 'control';

    const client = new CosmosClient(connectionString);
    var database = client.database(databaseName);
    var container = database.container(containerName);

    return container;
}

exports.connect = connect;