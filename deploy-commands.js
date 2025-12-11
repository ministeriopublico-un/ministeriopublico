const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  {
    name: 'acto',
    description: 'Registrar un acto institucional',
    options: [
      {
        name: 'contenido',
        type: 3, // STRING
        description: 'Detalle del acto',
        required: true,
      },
    ],
  },
  {
    name: 'sancion',
    description: 'Aplicar una medida disciplinaria',
    options: [
      {
        name: 'contenido',
        type: 3,
        description: 'Detalle de la sanción',
        required: true,
      },
    ],
  },
  {
    name: 'jerarquia',
    description: 'Asignar un rango institucional',
    options: [
      {
        name: 'contenido',
        type: 3,
        description: 'Detalle del rango',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registrando comandos slash...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log('Comandos registrados correctamente.');
  } catch (error) {
    console.error(error);
  }
})();
