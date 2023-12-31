const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('setemoji')
      .setDescription('Map an emoji to a role')
      .addStringOption(option =>
        option.setName('emoji').setDescription('The emoji').setRequired(true))
      .addStringOption(option =>
        option.setName('roleid').setDescription('The role ID').setRequired(true)),
    async execute(interaction) {
      const emoji = interaction.options.getString('emoji');
      const roleId = interaction.options.getString('roleid');
      const guildId = interaction.guild.id;
      const { channelId, messageId } = // Fetch these from the saved reaction message
  
      // Call MongoAuth method to add the emoji-role mapping
      await mongoAuth.addEmojiRoleMapping(guildId, channelId, messageId, emoji, roleId);
      await interaction.reply(`Emoji ${emoji} mapped to role ${roleId}`);
    },
  };