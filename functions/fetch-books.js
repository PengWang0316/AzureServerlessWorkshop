'use strict';

const cosmos = require('@azure/cosmos');
const client = new cosmos.CosmosClient({ endpoint: process.env.DATABASE_ENDPOINT, auth: { masterKey: process.env.DATABASE_READKEY } });

module.exports.handler = async (context, req) => {
  try {
    const { result } = await client.database('ToDoList').container('Items').items.readAll().toArray();
    context.res = {
      status: 200,
      body: JSON.stringify(result),
    };
    context.done();
  } catch (err) {
    context.log.error(err);
    context.done(err);
  }
};
