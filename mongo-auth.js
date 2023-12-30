const { MongoClient } = require('mongodb');
const config = require('./config.json');

class MongoAuth {
  constructor() {
    this.client = new MongoClient(config.dbToken, {
      // if we wanted specificity
    });
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      this.db = this.client.db("dsdbOrion"); // Replace with your database name
    } catch (err) {
      console.error(err);
    }
  }

  async saveData(collectionName, data) {
    try {
      const collection = this.db.collection(collectionName);
      await collection.insertOne(data);
      console.log('Data saved to MongoDB');
    } catch (err) {
      console.error(err);
    }
  }

  async fetchData(collectionName, query) {
    try {
      const collection = this.db.collection(collectionName);
      return await collection.findOne(query);
    } catch (err) {
      console.error(err);
    }
  }

  async updateData(collectionName, query, newData) {
    try {
      const collection = this.db.collection(collectionName);
      await collection.updateOne(query, { $set: newData });
      console.log('Data updated in MongoDB');
    } catch (err) {
      console.error(err);
    }
  }

  async deleteData(collectionName, query) {
    try {
      const collection = this.db.collection(collectionName);
      await collection.deleteOne(query);
      console.log('Data deleted from MongoDB');
    } catch (err) {
      console.error(err);
    }
  }

  close() {
    this.client.close();
  }
}

module.exports = MongoAuth;
