const MongoAuth = require('./mongo-auth');
const mongoAuth = new MongoAuth();

async function Connect() {
  await mongoAuth.connect();
}

async function Close() {
  await mongoAuth.close();
}

module.exports = { Connect, Close, mongoAuth };
