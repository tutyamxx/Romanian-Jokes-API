/* eslint-disable no-console */
/* eslint-disable no-undef */

const MongoClient = require('mongodb').MongoClient;

// --| DB environment variables config for local/GitHub Actions and Heroku run
const dbName = process.env?.DB_NAME;
const dbCollection = process.env?.DB_COLLECTION;
const dbUri = process.env?.DB_URI;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
};

// --| Check if param is an Object
const isObject = (param) => Object.prototype.toString.call(param) === '[object Object]';

// --| Query the MongoDB
const mongoQueryFind = async (databaseName, databaseCollection, dbQueryObject = { }) => {
    if (!databaseName || !databaseCollection) throw new Error('One of the parameters is missing!');
    if (!isObject(dbQueryObject)) throw new Error('Parameter for query must be an object!');

    const client = await MongoClient.connect(dbUri, connectOptions);
    let dataResult = [];

    try {
        const dbo = client.db(databaseName);
        const collection = dbo.collection(databaseCollection);

        dataResult = await collection.find(dbQueryObject).toArray().then((items) => {
            client.close();
            return items;
        });
    } catch (error) {
        console.log(error.message);
        client.close();
    }

    return dataResult;
};

// --| Get from MongoDB using computed results via aggregation operations
const mongoAggregate = async (databaseName, databaseCollection, pipeLine) => {
    if (!databaseName || !databaseCollection) throw new Error('One of the parameters is missing!');
    if (!Array.isArray(pipeLine)) throw new Error('Parameter for pipeline must be an array of aggregation stages!');

    const client = await MongoClient.connect(dbUri, connectOptions);
    let dataResult = [];

    try {
        const dbo = client.db(databaseName);
        const collection = dbo.collection(databaseCollection);

        dataResult = await collection.aggregate(pipeLine).toArray().then((items) => {
            client.close();
            return items;
        });
    } catch (error) {
        console.log(error.message);
        client.close();
    }

    return dataResult;
};

// --| Find something unique in the MongoDB using distinct and applying a string as filter
const mongoFindUnique = async (databaseName, databaseCollection, dataFilter) => {
    if (!databaseName || !databaseCollection || !dataFilter) throw new Error('One of the parameters is missing!');
    if (!dataFilter.length || typeof dataFilter !== 'string') throw new Error('Filter parameter must be a string!');

    const client = await MongoClient.connect(dbUri, connectOptions);
    let dataResult = [];

    try {
        const dbo = client.db(databaseName);
        const collection = dbo.collection(databaseCollection);

        dataResult = await collection.distinct(dataFilter).then((items) => {
            client.close();
            return items;
        });
    } catch (error) {
        console.log(error.message);
        client.close();
    }

    return dataResult;
};

// --| Count the items from specified database and collection
const mongoCountCollectionItems = async (databaseName, databaseCollection) => {
    if (!databaseName || !databaseCollection) throw new Error('One of the parameters is missing!');

    const client = await MongoClient.connect(dbUri, connectOptions);
    let dataResult = 0;

    try {
        const dbo = client.db(databaseName);
        const collection = dbo.collection(databaseCollection);

        dataResult = await collection.count({ }).then((number) => {
            client.close();
            return number;
        });
    } catch (error) {
        console.log(error.message);
        client.close();
    }

    return dataResult;
};

module.exports = {
    dbName, dbCollection,
    mongoQueryFind, mongoAggregate, mongoFindUnique, mongoCountCollectionItems
};
