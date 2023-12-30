// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const MongoAuth = require('./mongo-auth');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Async function to handle database operations
async function connectAndHandleDatabase() {
    const mongoAuth = new MongoAuth();

    // Connects client to mongo database
    await mongoAuth.connect();

    // Example usage
    await mongoAuth.saveData("yourCollection", { key: "value" });
    const data = await mongoAuth.fetchData("yourCollection", { key: "value" });
    console.log(data);

    // Close connection when done
    mongoAuth.close();
}

// Call the async function
connectAndHandleDatabase().catch(console.error);

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
