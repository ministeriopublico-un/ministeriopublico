const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

// Definimos las URLs de las imágenes
const HEADER_IMAGE_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448518866035544273/ministerio_publico_venezuela.png?ex=693b8dd1&is=693a3c51&hm=e20e1ae17a49040fa39067e08869a769883acc67abd69dea54f97141547eec96&=&format=webp&quality=lossless&width=1172&height=313';
const THUMBNAIL_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448517274800754728/MINISTERIO_PUBLICO_DE_VENEZUELA_LOGO.png?ex=693b8c56&is=693a3ad6&hm=83af40c13feafd3bc91a944be73cab55a235379089fd165743a596cc33dfeb4a&=&format=webp&quality=lossless&width=675&height=675';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const opts = interaction.options;

    // --- LÓGICA DEL COMANDO /registro ---
	if (interaction.commandName === 'registro') {
		const embed = new EmbedBuilder()
			.setColor(0x003366) 
			.setTitle('📜 REGISTRO DE APERTURA DE INVESTIGACIÓN FORMAL')
			.setDescription(
				"El proceso judicial requiere la observancia rigurosa del **debido proceso** y de la garantía de la **celeridad y buena marcha de la administración de justicia**."
			)
			.setAuthor({
				name: 'Fiscalía General de la República',
				iconURL: THUMBNAIL_URL
			})
			.setImage(HEADER_IMAGE_URL) 
			.setThumbnail(THUMBNAIL_URL) 
			.addFields(
				{
					name: 'I. IDENTIFICACIÓN Y CLASIFICACIÓN INTERNA', value:
						`1. **Nro. Expediente:** ${opts.getString('numero-de-expediente-de-fiscalia')}\n` +
						`2. **Fiscalía/Sección Asignada:** ${opts.getString('directorio-o-seccion-asignada')}\n` +
						`3. **Fiscal Responsable:** ${opts.getUser('fiscal-responsable')}\n` + 
						`4. **Fecha y Hora de Apertura:** ${opts.getString('fecha-y-hora-de-la-apertura')}\n` +
						`5. **Fuente de la Denuncia:** ${opts.getString('fuente-de-la-denuncia')}\n` +
						`6. **Calificación Penal Preliminar:** ${opts.getString('calificacion-penal-preliminar')}\n` +
						`7. **Jurisdicción Territorial:** ${opts.getString('jurisdiccion-territorial')}`
				},
				{
					name: 'II. INFORMACIÓN DE LAS PARTES PROCESALES', value:
						`1. **Denunciante:** ${opts.getUser('datos-del-denunciante')}\n` + 
						`2. **Víctima:** ${opts.getUser('datos-de-la-victima')}\n` + 
						`3. **Imputado/a:** ${opts.getUser('datos-del-imputado-o-imputada')}\n` + 
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

    // --- LÓGICA DEL COMANDO /personal-accion ---
    if (interaction.commandName === 'personal-accion') {
        
        const tipoAccion = opts.getString('tipo-de-accion');
        const funcionario = opts.getUser('funcionario-afectado');
        const rangoAnterior = opts.getString('rango-o-estado-anterior');
        const rangoNuevo = opts.getString('rango-o-estado-nuevo');
        const motivo = opts.getString('motivo-oficial');
        const firmante = opts.getString('autoridad-firmante');
        
        let color = 0x00FF00; // Verde para Promoción
        let titulo = '🟢 ORDEN DE PROMOCIÓN DE PERSONAL';
        
        if (tipoAccion === 'DEGRADACION') {
            color = 0xFFA500; // Naranja
            titulo = '🟠 ORDEN DE DEGRADACIÓN DE PERSONAL';
        } else if (tipoAccion === 'SANCION') {
            color = 0xFF4500; // Rojo-Naranja
            titulo = '🔴 ORDEN DE MEDIDA DISCIPLINARIA (SANCIÓN)';
        } else if (tipoAccion === 'REMOCION') {
            color = 0xFF0000; // Rojo Fuerte
            titulo = '⚫ ORDEN DE REMOCIÓN Y EXPULSIÓN';
        }

        const embedPersonal = new EmbedBuilder()
            .setColor(color)
            .setTitle(`🛡️ ${titulo} - FISCALÍA GENERAL DE LA REPÚBLICA`)
            .setDescription(`Se notifica el movimiento oficial de personal emitido por la máxima autoridad competente en la Dirección de Recursos Humanos.`)
            .setThumbnail(THUMBNAIL_URL)
            .addFields(
                { name: 'I. FUNCIONARIO AFECTADO', value: `${funcionario}`, inline: true },
                { name: 'II. TIPO DE ACCIÓN', value: `**${tipoAccion.toUpperCase()}**`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true }, // Campo vacío para espacio
                
                { name: 'III. ESTADO ANTERIOR', value: `\`${rangoAnterior}\``, inline: true },
                { name: 'IV. ESTADO NUEVO', value: `**\`${rangoNuevo}\`**`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true }, // Campo vacío para espacio
                
                { name: 'V. MOTIVO OFICIAL DE LA ACCIÓN', value: motivo },
            )
            .setFooter({ text: `Emitido por la autoridad firmante: ${firmante}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embedPersonal] });
    }
});

client.login(process.env.TOKEN);
