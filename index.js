const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

// Definimos las URLs de las imágenes
const HEADER_IMAGE_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448517138162782268/ministerio-publico-venezolano.png?ex=693b8c35&is=693a3ab5&hm=a9a609b65aa8896068b15e80ef14c296c88aba5ae8bd77359f0ff0bb86e104c2&=&format=webp&quality=lossless&width=600&height=375';
const THUMBNAIL_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448517274800754728/MINISTERIO_PUBLICO_DE_VENEZUELA_LOGO.png?ex=693b8c56&is=693a3ad6&hm=83af40c13feafd3bc91a944be73cab55a235379089fd165743a596cc33dfeb4a&=&format=webp&quality=lossless&width=675&height=675';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'registro') {
		const opts = interaction.options;

		const embed = new EmbedBuilder()
			.setColor(0x003366) // Azul Oscuro de Fiscalía
			.setTitle('📜 REGISTRO DE APERTURA DE INVESTIGACIÓN FORMAL')
			.setDescription(
				"El proceso judicial requiere la observancia rigurosa del **debido proceso** y de la garantía de la **celeridad y buena marcha de la administración de justicia**."
			)
			.setAuthor({
				name: 'Fiscalía General de la República',
				iconURL: THUMBNAIL_URL
			})
			.setImage(HEADER_IMAGE_URL) // Imagen de Cabecera
			.setThumbnail(THUMBNAIL_URL) // Thumbnail/Logo
			.addFields(
				{
					name: 'I. IDENTIFICACIÓN Y CLASIFICACIÓN INTERNA', value:
						`1. **Nro. Expediente:** ${opts.getString('numero-de-expediente-de-fiscalia')}\n` +
						`2. **Fiscalía/Sección Asignada:** ${opts.getString('directorio-o-seccion-asignada')}\n` +
						`3. **Fiscal Responsable:** ${opts.getUser('fiscal-responsable')}\n` + // CAMBIO A getUser
						`4. **Fecha y Hora de Apertura:** ${opts.getString('fecha-y-hora-de-la-apertura')}\n` +
						`5. **Fuente de la Denuncia:** ${opts.getString('fuente-de-la-denuncia')}\n` +
						`6. **Calificación Penal Preliminar:** ${opts.getString('calificacion-penal-preliminar')}\n` +
						`7. **Jurisdicción Territorial:** ${opts.getString('jurisdiccion-territorial')}`
				},
				{
					name: 'II. INFORMACIÓN DE LAS PARTES PROCESALES', value:
						`1. **Denunciante:** ${opts.getUser('datos-del-denunciante')}\n` + // CAMBIO A getUser
						`2. **Víctima:** ${opts.getUser('datos-de-la-victima')}\n` + // CAMBIO A getUser
						`3. **Imputado/a:** ${opts.getUser('datos-del-imputado-o-imputada')}\n` + // CAMBIO A getUser
						`4. **Representación Legal:** ${opts.getString('representacion-legal')}`
				},
				{
					name: 'III. DESCRIPCIÓN DEL HECHO PUNIBLE', value:
						`1. **Descripción Circunstanciada:** ${opts.getString('descripcion-circunstanciada')}\n` +
						`2. **Lugar/Fecha/Hora del Hecho:** ${opts.getString('lugar-fecha-y-hora-del-hecho')}\n` +
						`3. **Elementos de Convicción:** ${opts.getString('elementos-de-conviccion-recibido')}\n` +
						`4. **Confidencialidad:** ${opts.getString('decision-sobre-confidencialidad')}`
				},
				{
					name: 'IV. ÓRDENES DE INVESTIGACIÓN Y DILIGENCIAS', value:
						`1. **Instrucciones a la Policía:** ${opts.getString('instrucciones-a-la-policia')}\n` +
						`2. **Registro Policial:** ${opts.getString('registro-de-actuacion-policial')}\n` +
						`3. **Peritaje:** ${opts.getString('requerimientos-de-peritaje')}\n` +
						`4. **Protección a la Víctima:** ${opts.getString('acciones-para-la-proteccion-vict')}\n` +
						`5. **Plazo para Primer Informe:** ${opts.getString('plazo-para-el-primer-informe')}`
				}
			)
			.setFooter({ text: 'Emitido por la Secretaría del Despacho | Garantía de Celeridad Procesal' })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	}
});

client.login(process.env.TOKEN);
