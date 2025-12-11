const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

// Se usa ApplicationCommandOptionType para referencia más clara
const commands = [
	{
		name: 'registro',
		description: 'Registrar una investigación con datos completos',
		options: [
			{ name: 'numero-de-expediente-de-fiscalia', type: ApplicationCommandOptionType.String, description: 'Número de expediente', required: true },
			{
				name: 'directorio-o-seccion-asignada',
				type: ApplicationCommandOptionType.String,
				description: 'Fiscalía/Sección asignada',
				required: true,
				choices: [
					{ name: 'Dir. DD.HH. (「⬢」)', value: 'Dir. DD.HH.' },
					{ name: 'Dir. Delinc. Org. (「⬣」)', value: 'Dir. Delincuencia Org.' },
					{ name: 'Dir. Corrupción (「⬤」)', value: 'Dir. Corrupción' },
					{ name: 'Fiscalía Territorial', value: 'Fiscalia Territorial' },
				],
			},
			{ name: 'fiscal-responsable', type: ApplicationCommandOptionType.User, description: 'Fiscal responsable (@usuario)', required: true }, // CAMBIO A USER
			{ name: 'fecha-y-hora-de-la-apertura', type: ApplicationCommandOptionType.String, description: 'Fecha y hora de apertura', required: true },
			{ name: 'fuente-de-la-denuncia', type: ApplicationCommandOptionType.String, description: 'Fuente de la denuncia (Ej. Ticket #XXXX)', required: true },
			{
				name: 'calificacion-penal-preliminar',
				type: ApplicationCommandOptionType.String,
				description: 'Calificación penal preliminar',
				required: true,
				choices: [
					{ name: 'Homicidio Calificado', value: 'Homicidio Calificado' },
					{ name: 'Abuso de Autoridad', value: 'Abuso de Autoridad' },
					{ name: 'Corrupción/Cohecho', value: 'Corrupción/Cohecho' },
					{ name: 'Lesiones Personales', value: 'Lesiones Personales' },
					{ name: 'N/A', value: 'N/A' },
				],
			},
			{ name: 'jurisdiccion-territorial', type: ApplicationCommandOptionType.String, description: 'Jurisdicción territorial', required: true },
			
            { name: 'datos-del-denunciante', type: ApplicationCommandOptionType.User, description: 'Datos del denunciante (@usuario)', required: true }, // CAMBIO A USER
			{ name: 'datos-de-la-victima', type: ApplicationCommandOptionType.User, description: 'Datos de la víctima (@usuario)', required: true }, // CAMBIO A USER
			{ name: 'datos-del-imputado-o-imputada', type: ApplicationCommandOptionType.User, description: 'Datos del imputado/a (@usuario)', required: true }, // CAMBIO A USER
			
            { name: 'representacion-legal', type: ApplicationCommandOptionType.String, description: 'Representación legal (Abogado/Defensor Público)', required: true },
			{ name: 'descripcion-circunstanciada', type: ApplicationCommandOptionType.String, description: 'Descripción circunstanciada del hecho', required: true },
			{ name: 'lugar-fecha-y-hora-del-hecho', type: ApplicationCommandOptionType.String, description: 'Lugar, fecha y hora del hecho', required: true },
			
            {
				name: 'decision-sobre-confidencialidad',
				type: ApplicationCommandOptionType.String,
				description: 'Decisión sobre confidencialidad',
				required: true,
				choices: [
					{ name: 'PÚBLICO (No sensible)', value: 'PÚBLICO' },
					{ name: 'RESERVADO (Alto perfil)', value: 'RESERVADO' },
					{ name: 'SECRETO (Conflicto de interés)', value: 'SECRETO' },
				],
			},
			
            { name: 'instrucciones-a-la-policia', type: ApplicationCommandOptionType.String, description: 'Instrucciones a la policía', required: true },
			{ name: 'elementos-de-conviccion-recibido', type: ApplicationCommandOptionType.String, description: 'Elementos de convicción recibidos', required: true },
			{ name: 'registro-de-actuacion-policial', type: ApplicationCommandOptionType.String, description: 'Registro de actuación policial', required: true },
			{ name: 'requerimientos-de-peritaje', type: ApplicationCommandOptionType.String, description: 'Requerimientos de peritaje', required: true },
			{ name: 'acciones-para-la-proteccion-vict', type: ApplicationCommandOptionType.String, description: 'Acciones de protección a la víctima', required: true },
			{ name: 'plazo-para-el-primer-informe', type: ApplicationCommandOptionType.String, description: 'Plazo para el primer informe', required: true }
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
