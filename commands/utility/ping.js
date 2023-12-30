const { SlashCommandBuilder } = require('discord.js');

module.exports = { // node stuff so we can use this elsewhere
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'), 
        //discord boiler plate, we can add more information here too
	async execute(interaction) { // we have to serve the user something
		await interaction.reply('Pong!');
	},
};