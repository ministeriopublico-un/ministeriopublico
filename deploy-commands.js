const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  {
    name: 'registro',
    description: 'Registrar una investigación con datos completos',
    options: [
      { name: 'numero-de-expediente-de-fiscalia', type: 3, description: 'Número de expediente', required: true },
      { name: 'directorio-o-seccion-asignada', type: 3, description: 'Fiscalía/Sección asignada', required: true },
      { name: 'fiscal-responsable', type: 3, description: 'Fiscal responsable', required: true },
      { name: 'fecha-y-hora-de-la-apertura', type: 3, description: 'Fecha y hora de apertura', required: true },
      { name: 'fuente-de-la-denuncia', type: 3, description: 'Fuente de la denuncia', required: true },
      { name: 'calificacion-penal-preliminar', type: 3, description: 'Calificación penal preliminar', required: true },
      { name: 'jurisdiccion-territorial', type: 3, description: 'Jurisdicción territorial', required: true },
      { name: 'datos-del-denunciante', type: 3, description: 'Datos del denunciante', required: true },
      { name: 'datos-de-la-victima', type: 3, description: 'Datos de la víctima', required: true },
      { name: 'datos-del-imputado-o-imputada', type: 3, description: 'Datos del imputado/a', required: true },
      { name: 'representacion-legal', type: 3, description: 'Representación legal', required: true },
      { name: 'descripcion-circunstanciada', type: 3, description: 'Descripción circunstanciada', required: true },
      { name: 'lugar-fecha-y-hora-del-hecho', type: 3, description: 'Lugar, fecha y hora del hecho', required: true },
      { name: 'decision-sobre-confidencialidad', type: 3, description: 'Decisión sobre confidencialidad', required: true },
      { name: 'instrucciones-a-la-policia', type: 3, description: 'Instrucciones a la policía', required: true },
      { name: 'elementos-de-conviccion-recibido', type: 3, description: 'Elementos de convicción recibidos', required: true },
      { name: 'registro-de-actuacion-policial', type: 3, description: 'Registro de actuación policial', required: true },
      { name: 'requerimientos-de-peritaje', type: 3, description: 'Requerimientos de peritaje', required: true },
      { name: 'acciones-para-la-proteccion-vict', type: 3, description: 'Acciones de protección a la víctima', required: true },
      { name: 'plazo-para-el-primer-informe', type: 3, description: 'Plazo para el primer informe', required: true }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registrando comandos slash...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Comando /registro registrado correctamente.');
  } catch (error) {
    console.error(error);
  }
})();
