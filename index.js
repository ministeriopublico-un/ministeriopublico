const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'acto') {
    const contenido = interaction.options.getString('contenido');
    await interaction.reply(`📜 Se registra el acto institucional: ${contenido}`);
  }

  if (interaction.commandName === 'sancion') {
    const contenido = interaction.options.getString('contenido');
    await interaction.reply(`⚠️ Se aplica medida disciplinaria: ${contenido}`);
  }

  if (interaction.commandName === 'jerarquia') {
    const contenido = interaction.options.getString('contenido');
    await interaction.reply(`🏛️ Se ha conferido rango jerárquico: ${contenido}`);
  }
});

client.login(process.env.TOKEN);
