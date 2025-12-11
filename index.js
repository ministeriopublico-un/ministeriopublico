const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

// Definimos las URLs de las imágenes
const HEADER_IMAGE_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448518866035544273/ministerio_publico_venezuela.png?ex=693b8dd1&is=693a3c51&hm=e20e1ae17a49040fa39067e08869a769883acc67abd69dea54f97141547eec96&=&format=webp&quality=lossless&width=1172&height=313';
const THUMBNAIL_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448517274800754728/MINISTERIO_PUBLICO_DE_VENEZUELA_LOGO.png?ex=693b8c56&is=693a3ad6&hm=83af40c13feafd3bc91a944be73cab55a235379089fd165743a596cc33dfeb4a&=&format=webp&quality=lossless&width=675&height=675';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] }); // Se añaden GuildMembers y GuildMessages para Moderación

client.on('ready', () => {
	console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const opts = interaction.options;

    // --- LÓGICA DEL COMANDO /registro --- (Existente)
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

    // --- LÓGICA DEL COMANDO /personal-accion --- (Existente)
    if (interaction.commandName === 'personal-accion') {
        
        const tipoAccion = opts.getString('tipo-de-accion');
        const funcionario = opts.getUser('funcionario-afectado');
        const rangoAnterior = opts.getString('rango-o-estado-anterior');
        const rangoNuevo = opts.getString('rango-o-estado-nuevo');
        const motivo = opts.getString('motivo-oficial');
        const firmante = opts.getString('autoridad-firmante');
        
        let color = 0x00FF00; 
        let titulo = '🟢 ORDEN DE PROMOCIÓN DE PERSONAL';
        
        if (tipoAccion === 'DEGRADACION') {
            color = 0xFFA500; 
            titulo = '🟠 ORDEN DE DEGRADACIÓN DE PERSONAL';
        } else if (tipoAccion === 'SANCION') {
            color = 0xFF4500; 
            titulo = '🔴 ORDEN DE MEDIDA DISCIPLINARIA (SANCIÓN)';
        } else if (tipoAccion === 'REMOCION') {
            color = 0xFF0000; 
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
                { name: '\u200B', value: '\u200B', inline: true }, 
                
                { name: 'III. ESTADO ANTERIOR', value: `\`${rangoAnterior}\``, inline: true },
                { name: 'IV. ESTADO NUEVO', value: `**\`${rangoNuevo}\`**`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true }, 
                
                { name: 'V. MOTIVO OFICIAL DE LA ACCIÓN', value: motivo },
            )
            .setFooter({ text: `Emitido por la autoridad firmante: ${firmante}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embedPersonal] });
    }

    // --- LÓGICA DEL COMANDO /anuncio (Generador de Embed) ---
    if (interaction.commandName === 'anuncio') {
        const titulo = opts.getString('titulo');
        const descripcion = opts.getString('descripcion');
        const colorHex = opts.getString('color-hex') || '#003366'; // Por defecto: Azul de Fiscalía
        const imagenUrl = opts.getString('imagen-principal-url');
        const thumbnailUrl = opts.getString('thumbnail-url');
        const pieDePagina = opts.getString('pie-de-pagina') || 'Secretaría de la Fiscalía General';

        // Validar color HEX
        const colorValido = /^#[0-9A-F]{6}$/i.test(colorHex);
        const finalColor = colorValido ? colorHex : '#003366';

        const anuncioEmbed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(descripcion)
            .setColor(finalColor)
            .setFooter({ text: pieDePagina })
            .setTimestamp();
        
        if (imagenUrl) anuncioEmbed.setImage(imagenUrl);
        if (thumbnailUrl) anuncioEmbed.setThumbnail(thumbnailUrl);

        await interaction.reply({ embeds: [anuncioEmbed] });
    }

    // --- LÓGICA DEL COMANDO /personal-moderacion ---
    if (interaction.commandName === 'personal-moderacion') {
        
        // 1. CHEQUEO DE PERMISOS
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: '⛔ **Acceso Denegado.** No posee la potestad legal para ejecutar comandos de moderación.', ephemeral: true });
        }
        
        const accion = opts.getString('accion');
        const usuario = opts.getMember('usuario');
        const razon = opts.getString('razon') || 'Sin motivo oficial registrado.';
        const rol = opts.getRole('rol');
        
        let respuesta = '';
        
        try {
            switch (accion) {
                case 'BAN':
                    if (!usuario) return interaction.reply({ content: 'Debe especificar el usuario a banear.', ephemeral: true });
                    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                        return interaction.reply({ content: '⛔ Necesita el permiso BAN_MEMBERS.', ephemeral: true });
                    }
                    await usuario.ban({ reason: razon });
                    respuesta = `✅ **BAN EJECUTADO:** El ciudadano ${usuario.user.tag} ha sido removido de la República por: *${razon}*.`;
                    break;

                case 'KICK':
                    if (!usuario) return interaction.reply({ content: 'Debe especificar el usuario a expulsar.', ephemeral: true });
                    await usuario.kick(razon);
                    respuesta = `✅ **EXPULSIÓN EJECUTADA:** El ciudadano ${usuario.user.tag} fue expulsado del territorio por: *${razon}*.`;
                    break;
                
                case 'TIMEOUT':
                    if (!usuario) return interaction.reply({ content: 'Debe especificar el usuario a silenciar.', ephemeral: true });
                    const tiempo = opts.getInteger('tiempo-segundos');
                    if (!tiempo || tiempo < 10) return interaction.reply({ content: 'Debe especificar un tiempo válido (mínimo 10 segundos).', ephemeral: true });
                    
                    const tiempoMs = tiempo * 1000;
                    await usuario.timeout(tiempoMs, razon);
                    respuesta = `⏳ **MEDIDA CAUTELAR:** ${usuario.user.tag} ha sido silenciado (Timeout) por ${tiempo} segundos por: *${razon}*.`;
                    break;

                case 'CLEAR':
                    const cantidad = opts.getInteger('cantidad-mensajes');
                    if (!cantidad || cantidad < 1 || cantidad > 100) return interaction.reply({ content: 'Especifique una cantidad de mensajes entre 1 y 100.', ephemeral: true });
                    await interaction.channel.bulkDelete(cantidad, true);
                    respuesta = `🗑️ **SANCIÓN DE DESPACHO:** Se eliminaron ${cantidad} mensajes del canal.`;
                    break;
                
                case 'ADD_ROLE':
                    if (!usuario || !rol) return interaction.reply({ content: 'Debe especificar el usuario y el rol a asignar.', ephemeral: true });
                    await usuario.roles.add(rol, razon);
                    respuesta = `➕ **MOVIMIENTO DE PERSONAL:** El rol ${rol.name} ha sido asignado a ${usuario.user.tag}.`;
                    break;
                
                case 'REMOVE_ROLE':
                    if (!usuario || !rol) return interaction.reply({ content: 'Debe especificar el usuario y el rol a remover.', ephemeral: true });
                    await usuario.roles.remove(rol, razon);
                    respuesta = `➖ **MOVIMIENTO DE PERSONAL:** El rol ${rol.name} ha sido removido de ${usuario.user.tag}.`;
                    break;
            }
            await interaction.reply({ content: respuesta, ephemeral: false });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `❌ **Error Procesal:** No se pudo completar la acción debido a un error de permisos o jerarquía.`, ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN);
