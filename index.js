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

// !ping → prueba de conexión
client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.reply('¡Pong! ⚖️');
  }
});

// !acto → registrar actos institucionales
client.on('messageCreate', message => {
  if (message.content.startsWith('!acto')) {
    const args = message.content.split(' ').slice(1);
    const contenido = args.join(' ');
    message.channel.send(`📜 Se registra el acto institucional: ${contenido}`);
  }
});

// !sancion → aplicar medidas disciplinarias
client.on('messageCreate', message => {
  if (message.content.startsWith('!sancion')) {
    const args = message.content.split(' ').slice(1);
    const contenido = args.join(' ');
    message.channel.send(`⚠️ Se aplica medida disciplinaria: ${contenido}`);
  }
});

// !jerarquia → asignar rango institucional
client.on('messageCreate', message => {
  if (message.content.startsWith('!jerarquia')) {
    const args = message.content.split(' ').slice(1);
    const contenido = args.join(' ');
    message.channel.send(`🏛️ Se ha conferido rango jerárquico: ${contenido}`);
  }
});

client.login(process.env.TOKEN);
