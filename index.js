const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.reply('¡Pong! ⚖️');
  }

  if (message.content.startsWith('!acto')) {
    const args = message.content.split(' ').slice(1);
    message.channel.send(`Se registra el acto institucional: ${args.join(' ')}`);
  }
});

client.login(process.env.TOKEN);
