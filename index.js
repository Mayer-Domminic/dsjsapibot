// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const path = require('node:path');
const fs = require('fs');
const { token } = require('./config.json');
const MongoAuth = require('./mongo-auth');
const deployCommands = require('./deploy-commands');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// command handler
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder); // navigating to ./commands
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // reads files within sub categories
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Async function to handle database operations
async function connectAndHandleDatabase() {
    const mongoAuth = new MongoAuth();

    // Connects client to mongo database
    await mongoAuth.connect();

    // Example usage
    //await mongoAuth.saveData("yourCollection", { key: "value" });
    //const data = await mongoAuth.fetchData("yourCollection", { key: "value" });
    //console.log(data);

    // Close connection when done
    mongoAuth.close();
}

// Call the async function
connectAndHandleDatabase().catch(console.error);

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// command handling of the interaction
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Log in to Discord with your client's token
client.login(token);
