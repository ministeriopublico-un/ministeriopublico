const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'registro') {
    const opts = interaction.options;

    const embed = new EmbedBuilder()
      .setColor(0x003366)
      .setTitle('📜 Registro de Investigación')
      .setDescription(
        "El proceso judicial requiere la observancia rigurosa del **debido proceso** y de la garantía de la **celeridad y buena marcha de la administración de justicia**."
      )
      .addFields(
        { name: 'I. IDENTIFICACIÓN Y CLASIFICACIÓN INTERNA', value: 
          `1. **Número de Expediente:** ${opts.getString('numero-de-expediente-de-fiscalia')}\n` +
          `2. **Fiscalía/Sección Asignada:** ${opts.getString('directorio-o-seccion-asignada')}\n` +
          `3. **Fiscal Responsable:** ${opts.getString('fiscal-responsable')}\n` +
          `4. **Fecha y Hora de Apertura:** ${opts.getString('fecha-y-hora-de-la-apertura')}\n` +
          `5. **Fuente de la Denuncia:** ${opts.getString('fuente-de-la-denuncia')}\n` +
          `6. **Calificación Penal Preliminar:** ${opts.getString('calificacion-penal-preliminar')}\n` +
          `7. **Jurisdicción Territorial:** ${opts.getString('jurisdiccion-territorial')}`
        },
        { name: 'II. INFORMACIÓN DE LAS PARTES PROCESALES', value: 
          `1. **Denunciante:** ${opts.getString('datos-del-denunciante')}\n` +
          `2. **Víctima:** ${opts.getString('datos-de-la-victima')}\n` +
          `3. **Imputado/a:** ${opts.getString('datos-del-imputado-o-imputada')}\n` +
          `4. **Representación Legal:** ${opts.getString('representacion-legal')}`
        },
        { name: 'III. DESCRIPCIÓN DEL HECHO PUNIBLE', value: 
          `1. **Descripción Circunstanciada:** ${opts.getString('descripcion-circunstanciada')}\n` +
          `2. **Lugar/Fecha/Hora del Hecho:** ${opts.getString('lugar-fecha-y-hora-del-hecho')}\n` +
          `3. **Elementos de Convicción:** ${opts.getString('elementos-de-conviccion-recibido')}\n` +
          `4. **Confidencialidad:** ${opts.getString('decision-sobre-confidencialidad')}`
        },
        { name: 'IV. ÓRDENES DE INVESTIGACIÓN Y DILIGENCIAS', value: 
          `1. **Instrucciones a la Policía:** ${opts.getString('instrucciones-a-la-policia')}\n` +
          `2. **Registro Policial:** ${opts.getString('registro-de-actuacion-policial')}\n` +
          `3. **Peritaje:** ${opts.getString('requerimientos-de-peritaje')}\n` +
          `4. **Protección a la Víctima:** ${opts.getString('acciones-para-la-proteccion-vict')}\n` +
          `5. **Plazo para Primer Informe:** ${opts.getString('plazo-para-el-primer-informe')}`
        }
      )
      .setFooter({ text: 'Fiscalia General de la Republica' });

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
