const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
require('dotenv').config();
const { createCanvas, loadImage } = require('canvas');

// --- CONSTANTES GLOBALES DE IMAGEN Y COLOR ---
const HEADER_IMAGE_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448518866035544273/ministerio_publico_venezuela.png?ex=693b8dd1&is=693a3c51&hm=e20e1ae17a49040fa39067e08869a769883acc67abd69dea54f97141547eec96&=&format=webp&quality=lossless&width=1172&height=313';
const THUMBNAIL_URL = 'https://media.discordapp.net/attachments/1448017639371964587/1448517274800754728/MINISTERIO_PUBLICO_DE_VENEZUELA_LOGO.png?ex=693b8c56&is=693a3ad6&hm=83af40c13feafd3bc91a944be73cab55a235379089fd165743a596cc33dfeb4a&=&format=webp&quality=lossless&width=675&height=675';

// Colores de la Fiscalía (MP)
const MP_COLOR = 0x001F4E; 
const MP_COLOR_HEX = '#001F4E';
const LIGHT_MP_COLOR_HEX = '#003366'; // Azul más claro para la zona principal
const DARK_BANNER_COLOR_HEX = '#1e3c72'; // Color del banner superior (más oscuro)

// Colores del Texto en la Ficha
const TEXT_COLOR_DARK = '#000000'; // Texto de datos en NEGRO (para zona clara)
const TEXT_COLOR_BANNER = '#FFFFFF'; // Texto del banner en BLANCO (para zona oscura)

// --- CONFIGURACIÓN DEL CLIENTE ---
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
	console.log(`Bot conectado como ${client.user.tag}`);
});

// --- MANEJO DE INTERACCIONES ---
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const opts = interaction.options;

    // --- COMANDO /registro ---
	if (interaction.commandName === 'registro') {
		const embed = new EmbedBuilder()
			.setColor(MP_COLOR) 
			.setTitle('📜 REGISTRO DE APERTURA DE INVESTIGACIÓN FORMAL')
			.setDescription(
				"El proceso judicial requiere la observancia rigurosa del **debido proceso** y de la garantía de la **celeridad y buena marcha de la administración de justicia**."
			)
			.setAuthor({ name: 'Fiscalía General de la República', iconURL: THUMBNAIL_URL })
			.setImage(HEADER_IMAGE_URL) 
			.setThumbnail(THUMBNAIL_URL) 
			.addFields(
				{ name: 'I. IDENTIFICACIÓN Y CLASIFICACIÓN INTERNA', value: `1. **Nro. Expediente:** ${opts.getString('numero-de-expediente-de-fiscalia')}\n2. **Fiscalía/Sección Asignada:** ${opts.getString('directorio-o-seccion-asignada')}\n3. **Fiscal Responsable:** ${opts.getUser('fiscal-responsable')}\n4. **Fecha y Hora de Apertura:** ${opts.getString('fecha-y-hora-de-la-apertura')}\n5. **Fuente de la Denuncia:** ${opts.getString('fuente-de-la-denuncia')}\n6. **Calificación Penal Preliminar:** ${opts.getString('calificacion-penal-preliminar')}\n7. **Jurisdicción Territorial:** ${opts.getString('jurisdiccion-territorial')}` },
				{ name: 'II. INFORMACIÓN DE LAS PARTES PROCESALES', value: `1. **Denunciante:** ${opts.getUser('datos-del-denunciante')}\n2. **Víctima:** ${opts.getUser('datos-de-la-victima')}\n3. **Imputado/a:** ${opts.getUser('datos-del-imputado-o-imputada')}\n4. **Representación Legal:** ${opts.getString('representacion-legal')}` },
				{ name: 'III. DESCRIPCIÓN DEL HECHO PUNIBLE', value: `1. **Descripción Circunstanciada:** ${opts.getString('descripcion-circunstanciada')}\n2. **Lugar/Fecha/Hora del Hecho:** ${opts.getString('lugar-fecha-y-hora-del-hecho')}\n3. **Elementos de Convicción:** ${opts.getString('elementos-de-conviccion-recibido')}\n4. **Confidencialidad:** ${opts.getString('decision-sobre-confidencialidad')}` },
				{ name: 'IV. ÓRDENES DE INVESTIGACIÓN Y DILIGENCIAS', value: `1. **Instrucciones a la Policía:** ${opts.getString('instrucciones-a-la-policia')}\n2. **Registro Policial:** ${opts.getString('registro-de-actuacion-policial')}\n3. **Peritaje:** ${opts.getString('requerimientos-de-peritaje')}\n4. **Protección a la Víctima:** ${opts.getString('acciones-para-la-proteccion-vict')}\n5. **Plazo para Primer Informe:** ${opts.getString('plazo-para-el-primer-informe')}` }
			)
			.setFooter({ text: 'Emitido por la Secretaría del Despacho | Garantía de Celeridad Procesal' })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	}

    // --- COMANDO /personal-accion ---
    if (interaction.commandName === 'personal-accion') {
        const tipoAccion = opts.getString('tipo-de-accion');
        const funcionario = opts.getUser('funcionario-afectado');
        const rangoAnterior = opts.getString('rango-o-estado-anterior');
        const rangoNuevo = opts.getString('rango-o-estado-nuevo');
        const motivo = opts.getString('motivo-oficial');
        const firmante = opts.getString('autoridad-firmante');
        
        let titulo = '';
        
        if (tipoAccion === 'PROMOCION') {
            titulo = '🟢 ORDEN DE PROMOCIÓN DE PERSONAL';
        } else if (tipoAccion === 'DEGRADACION') {
            titulo = '🟠 ORDEN DE DEGRADACIÓN DE PERSONAL';
        } else if (tipoAccion === 'SANCION') {
            titulo = '🔴 ORDEN DE MEDIDA DISCIPLINARIA (SANCIÓN)';
        } else if (tipoAccion === 'REMOCION') {
            titulo = '⚫ ORDEN DE REMOCIÓN Y EXPULSIÓN';
        }

        const embedPersonal = new EmbedBuilder()
            .setColor(MP_COLOR)
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

    // --- COMANDO /anuncio (Generador de Embed) ---
    if (interaction.commandName === 'anuncio') {
        const titulo = opts.getString('titulo');
        const descripcion = opts.getString('descripcion');
        const colorHex = opts.getString('color-hex') || MP_COLOR; 
        const imagenUrl = opts.getString('imagen-principal-url');
        const thumbnailUrl = opts.getString('thumbnail-url');
        const pieDePagina = opts.getString('pie-de-pagina') || 'Secretaría de la Fiscalía General';

        const colorValido = /^#[0-9A-F]{6}$/i.test(colorHex);
        const finalColor = colorValido ? colorHex : MP_COLOR;

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

    // --- COMANDO /personal-moderacion ---
    if (interaction.commandName === 'personal-moderacion') {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: '⛔ **Acceso Denegado.** No posee la potestad legal para ejecutar comandos de moderación.', ephemeral: true });
        }
        
        const accion = opts.getString('accion');
        const usuario = opts.getMember('usuario');
        const razon = opts.getString('razon') || 'Sin motivo oficial registrado.';
        const rol = opts.getRole('rol');
        
        let titulo = '';
        let descripcion = '';

        try {
            switch (accion) {
                case 'BAN':
                    if (!usuario) return interaction.reply({ content: 'Debe especificar el usuario a banear.', ephemeral: true });
                    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                        return interaction.reply({ content: '⛔ Necesita el permiso BAN_MEMBERS.', ephemeral: true });
                    }
                    await usuario.ban({ reason: razon });
                    titulo = '⚫ **REMOCIÓN TOTAL DE LA REPÚBLICA (BAN)**';
                    descripcion = `**Ciudadano Removido:** ${usuario.user.tag}\n**Motivo:** ${razon}\n**Autoridad Ejecutora:** ${interaction.user.tag}`;
                    break;

                case 'KICK':
                    if (!usuario) return interaction.reply({ content: 'Debe especificar el usuario a expulsar.', ephemeral: true });
                    await usuario.kick(razon);
                    titulo = '🔴 **EXPULSIÓN INMEDIATA**';
                    descripcion = `**Ciudadano Expulsado:** ${usuario.user.tag}\n**Motivo:** ${razon}\n**Autoridad Ejecutora:** ${interaction.user.tag}`;
                    break;
                
                case 'TIMEOUT':
                    if (!usuario) return interaction.reply({ content: 'Debe especificar el usuario a silenciar.', ephemeral: true });
                    const tiempo = opts.getInteger('tiempo-segundos');
                    if (!tiempo || tiempo < 10) return interaction.reply({ content: 'Debe especificar un tiempo válido (mínimo 10 segundos).', ephemeral: true });
                    
                    const tiempoMs = tiempo * 1000;
                    await usuario.timeout(tiempoMs, razon);
                    titulo = '⏳ **MEDIDA CAUTELAR (SILENCIO TEMPORAL)**';
                    descripcion = `**Afectado:** ${usuario.user.tag}\n**Duración:** ${tiempo} segundos\n**Motivo:** ${razon}`;
                    break;

                case 'CLEAR':
                    const cantidad = opts.getInteger('cantidad-mensajes');
                    if (!cantidad || cantidad < 1 || cantidad > 100) return interaction.reply({ content: 'Especifique una cantidad de mensajes entre 1 y 100.', ephemeral: true });
                    await interaction.channel.bulkDelete(cantidad, true);
                    titulo = '🗑️ **SANCIÓN DE DESPACHO (LIMPIEZA)**';
                    descripcion = `Se eliminaron **${cantidad}** mensajes del canal \`${interaction.channel.name}\`.`;
                    break;
                
                case 'ADD_ROLE':
                    if (!usuario || !rol) return interaction.reply({ content: 'Debe especificar el usuario y el rol a asignar.', ephemeral: true });
                    await usuario.roles.add(rol, razon);
                    titulo = '➕ **MOVIMIENTO DE PERSONAL (ASIGNACIÓN DE ROL)**';
                    descripcion = `**Funcionario:** ${usuario.user.tag}\n**Rol Asignado:** ${rol.name}\n**Razón:** ${razon}`;
                    break;
                
                case 'REMOVE_ROLE':
                    if (!usuario || !rol) return interaction.reply({ content: 'Debe especificar el usuario y el rol a remover.', ephemeral: true });
                    await usuario.roles.remove(rol, razon);
                    titulo = '➖ **MOVIMIENTO DE PERSONAL (REMOCIÓN DE ROL)**';
                    descripcion = `**Funcionario:** ${usuario.user.tag}\n**Rol Removido:** ${rol.name}\n**Razón:** ${razon}`;
                    break;
            }

            const modEmbed = new EmbedBuilder()
                .setColor(MP_COLOR)
                .setTitle(titulo)
                .setDescription(descripcion)
                .setFooter({ text: `Ejecutado por ${interaction.user.tag}` })
                .setTimestamp();
            
            await interaction.reply({ embeds: [modEmbed], ephemeral: false });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `❌ **Error Procesal:** No se pudo completar la acción. Revise la jerarquía de roles del Bot.`, ephemeral: true });
        }
    }

    // --- COMANDO /anuncio-oficial ---
    if (interaction.commandName === 'anuncio-oficial') {
        const mensaje = opts.getString('mensaje');
        const tituloCorto = opts.getString('titulo-corto');

        const embedOficial = new EmbedBuilder()
            .setColor(MP_COLOR)
            .setTitle(`📢 COMUNICADO OFICIAL: ${tituloCorto.toUpperCase()}`)
            .setDescription(mensaje)
            .setThumbnail(THUMBNAIL_URL)
            .setFooter({ text: `Secretaría del Despacho | Emitido por ${interaction.user.tag}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embedOficial] });
    }

    // --- COMANDO /ficha-oficial (ESTABLE Y LEGIBLE) ---
    if (interaction.commandName === 'ficha-oficial') {
        
        // 1. Ejecución inmediata del deferReply (CRÍTICO para evitar timeouts)
        await interaction.deferReply(); 

        const funcionario = opts.getUser('funcionario');
        const cargo = opts.getString('cargo-actual');
        const registro = opts.getString('registro-nacional');
        const autoridad = opts.getString('autoridad-emite');
        const filename = `id_ficha_${funcionario.id}.png`;

        // 2. Configuración del Canvas (Tarjeta de 600x300)
        const canvas = createCanvas(600, 300);
        const context = canvas.getContext('2d');
        
        // 3. DIBUJAR FONDO (Degradado para estabilidad y legibilidad)
        const gradient = context.createLinearGradient(0, 100, 0, 300);
        gradient.addColorStop(0, LIGHT_MP_COLOR_HEX); // Azul más claro arriba
        gradient.addColorStop(1, MP_COLOR_HEX); // Azul oscuro abajo
        
        context.fillStyle = gradient;
        context.fillRect(0, 100, 600, 200); // Rellena el área principal (debajo del banner)

        // 4. Dibujar Banner Superior (Color Sólido más Oscuro)
        context.fillStyle = DARK_BANNER_COLOR_HEX; 
        context.fillRect(0, 0, 600, 100);
        
        // 5. Dibujar Foto de Perfil (Avatar del Funcionario)
        let avatarToDraw = null;
        const avatarURL = funcionario.displayAvatarURL({ extension: 'png', size: 64 }); 
        
        try {
            avatarToDraw = await loadImage(avatarURL);
        } catch (e) {
            console.warn(`Error cargando avatar. Usando logo de respaldo.`);
            try {
                avatarToDraw = await loadImage(THUMBNAIL_URL);
            } catch (error) {
                 console.error("Error cargando el logo de respaldo. Dejando el área vacía.");
            }
        }
        
        // Dibujar el área del avatar si se pudo cargar algo
        if (avatarToDraw) {
            // Dibujar el marco de la foto (círculo)
            context.beginPath();
            context.arc(70, 50, 40, 0, Math.PI * 2, true);
            context.fillStyle = '#FFFFFF';
            context.fill();
            context.closePath();
            
            // Recortar el avatar en círculo
            context.save();
            context.beginPath();
            context.arc(70, 50, 38, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            context.drawImage(avatarToDraw, 32, 12, 76, 76); 
            context.restore();
        }


        // 6. Escribir Título Principal (Verdana)
        context.font = 'bold 28px Verdana'; 
        context.fillStyle = TEXT_COLOR_BANNER; // BLANCO
        context.fillText('FISCALÍA GENERAL', 120, 45); 

        // 7. Escribir Nombre de Usuario (Tag) (Verdana)
        context.font = '22px Verdana'; 
        context.fillStyle = TEXT_COLOR_BANNER; // BLANCO
        context.fillText(`${funcionario.tag}`, 120, 80); 

        // 8. Línea Separadora 
        context.strokeStyle = TEXT_COLOR_BANNER; // BLANCA
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(20, 110);
        context.lineTo(580, 110);
        context.stroke();

        // 9. Escribir Datos del Funcionario (NEGRO)
        context.fillStyle = TEXT_COLOR_DARK; // NEGRO para contraste en el fondo claro
        
        // Cargo
        context.font = 'bold 22px Verdana'; 
        context.fillText('CARGO:', 20, 150);
        context.font = '22px Verdana'; 
        context.fillText(cargo, 200, 150);

        // Registro
        context.font = 'bold 22px Verdana'; 
        context.fillText('REGISTRO N°:', 20, 190);
        context.font = '22px Verdana'; 
        context.fillText(registro, 200, 190);
        
        // Autoridad
        context.font = 'bold 22px Verdana'; 
        context.fillText('AUTORIDAD:', 20, 230);
        context.font = '22px Verdana'; 
        context.fillText(autoridad, 200, 230);

        // 10. Footer (fecha)
        context.font = '16px Verdana'; 
        context.fillStyle = TEXT_COLOR_DARK; // NEGRO
        context.fillText(`Emitida: ${new Date().toLocaleDateString('es-ES')}`, 400, 280);


        // 11. Generar Buffer PNG
        let buffer;
        try {
            buffer = canvas.toBuffer('image/png');
        } catch (e) {
             console.error('Error al convertir canvas a buffer:', e);
             return interaction.editReply({ content: '❌ Error crítico: Falló la generación del archivo PNG.', ephemeral: true });
        }
        
        // 12. Crear el Attachment de Discord
        const attachment = new AttachmentBuilder(buffer, { name: filename });

        // 13. Crear el Embed
        const fichaEmbed = new EmbedBuilder()
            .setColor(MP_COLOR)
            .setTitle(`✅ FICHA DE IDENTIFICACIÓN OFICIAL GENERADA`)
            .setDescription(`Se ha emitido la Tarjeta de Identificación para el funcionario **${funcionario.tag}**.\n\nGuárdela como prueba de su registro en la Dirección de Recursos Humanos.`)
            .setImage(`attachment://${filename}`)
            .setFooter({ text: `Autoridad Certificadora: ${autoridad}` })
            .setTimestamp();

        // 14. Enviar el Embed y el Attachment
        await interaction.editReply({ embeds: [fichaEmbed], files: [attachment] });
    }
});

client.login(process.env.TOKEN);
