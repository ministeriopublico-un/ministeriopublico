const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

// Obtener variables del entorno
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

// Array que contendrá la definición de todos los comandos
const commands = [
    // 1. COMANDO /registro
	{
        name: 'registro',
        description: 'Registra formalmente la apertura de una nueva investigación fiscal (expediente).',
        options: [
            { name: 'numero-de-expediente-de-fiscalia', description: 'Número único de expediente (Ej: MP-2025-001).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'directorio-o-seccion-asignada', description: 'Fiscalía o Sección interna responsable.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'fiscal-responsable', description: 'El Fiscal que asume el expediente.', type: ApplicationCommandOptionType.User, required: true },
            { name: 'fecha-y-hora-de-la-apertura', description: 'Fecha y hora en que se abrió la investigación.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'fuente-de-la-denuncia', description: 'Cómo se inició el proceso (Ej: Denuncia ciudadana, Oficio policial).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'calificacion-penal-preliminar', description: 'Delito preliminar (Ej: Homicidio Calificado, Fraude Electrónico).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'jurisdiccion-territorial', description: 'Ubicación territorial donde ocurrió el hecho o se abre el expediente.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'datos-del-denunciante', description: 'La persona o entidad que presentó la denuncia.', type: ApplicationCommandOptionType.User, required: true },
            { name: 'datos-de-la-victima', description: 'La persona o entidad víctima del hecho.', type: ApplicationCommandOptionType.User, required: true },
            { name: 'datos-del-imputado-o-imputada', description: 'La persona señalada como autora o partícipe (si aplica).', type: ApplicationCommandOptionType.User, required: true },
            { name: 'representacion-legal', description: 'Abogados o representantes legales de las partes (si aplica).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'descripcion-circunstanciada', description: 'Detalle breve y circunstanciado del hecho punible.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'lugar-fecha-y-hora-del-hecho', description: 'Coordenadas o descripción del lugar, fecha y hora del suceso.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'elementos-de-conviccion-recibido', description: 'Evidencia inicial recibida (Ej: Testimonios, videos, documentos).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'decision-sobre-confidencialidad', description: 'Si el expediente será reservado o público.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'instrucciones-a-la-policia', description: 'Órdenes inmediatas a la policía (Ej: Aprehensión, Vigilancia).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'registro-de-actuacion-policial', description: 'Número o referencia del registro policial inicial.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'requerimientos-de-peritaje', description: 'Si se requiere examen forense, balístico, etc.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'acciones-para-la-proteccion-vict', description: 'Medidas cautelares para la víctima/testigos (si aplica).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'plazo-para-el-primer-informe', description: 'Plazo para que la policía entregue el primer informe.', type: ApplicationCommandOptionType.String, required: true },
        ],
    },
    // 2. COMANDO /personal-accion
    {
        name: 'personal-accion',
        description: 'Notifica movimientos de personal (Promoción, Degradación, Sanción o Remoción).',
        options: [
            {
                name: 'tipo-de-accion',
                description: 'Seleccione el tipo de acción oficial de personal.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: 'PROMOCIÓN', value: 'PROMOCION' },
                    { name: 'DEGRADACIÓN', value: 'DEGRADACION' },
                    { name: 'SANCIÓN DISCIPLINARIA', value: 'SANCION' },
                    { name: 'REMOCIÓN/EXPULSIÓN', value: 'REMOCION' },
                ],
            },
            { name: 'funcionario-afectado', description: 'Miembro del personal que será afectado por la acción.', type: ApplicationCommandOptionType.User, required: true },
            { name: 'rango-o-estado-anterior', description: 'Rango/Estado/Cargo que tenía antes de la acción.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'rango-o-estado-nuevo', description: 'El nuevo Rango/Estado/Cargo después de la acción.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'motivo-oficial', description: 'El motivo oficial emitido por la Dirección de RR.HH.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'autoridad-firmante', description: 'Nombre de la autoridad que firma la orden (Ej: Fiscal General, Director RR.HH.).', type: ApplicationCommandOptionType.String, required: true },
        ],
    },
    // 3. COMANDO /anuncio (General)
    {
        name: 'anuncio',
        description: 'Publica un anuncio general usando un Embed personalizado.',
        options: [
            { name: 'titulo', description: 'Título principal del anuncio.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'descripcion', description: 'Cuerpo del mensaje del anuncio.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'color-hex', description: 'Color del borde del embed (Ej: #FF0000 para rojo).', type: ApplicationCommandOptionType.String, required: false },
            { name: 'imagen-principal-url', description: 'URL de la imagen grande a usar en el anuncio.', type: ApplicationCommandOptionType.String, required: false },
            { name: 'thumbnail-url', description: 'URL de la imagen pequeña (thumbnail) a usar.', type: ApplicationCommandOptionType.String, required: false },
            { name: 'pie-de-pagina', description: 'Texto del pie de página del anuncio.', type: ApplicationCommandOptionType.String, required: false },
        ],
    },
    // 4. COMANDO /personal-moderacion
    {
        name: 'personal-moderacion',
        description: 'Ejecuta acciones de moderación (requiere permisos de Moderador/Administrador).',
        options: [
            {
                name: 'accion',
                description: 'Acción de moderación a ejecutar.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: 'BAN (Remoción Total)', value: 'BAN' },
                    { name: 'KICK (Expulsión)', value: 'KICK' },
                    { name: 'TIMEOUT (Silencio Temporal)', value: 'TIMEOUT' },
                    { name: 'LIMPIAR MENSAJES (Clear)', value: 'CLEAR' },
                    { name: 'ASIGNAR ROL', value: 'ADD_ROLE' },
                    { name: 'REMOVER ROL', value: 'REMOVE_ROLE' },
                ],
            },
            { name: 'usuario', description: 'El usuario afectado por la acción (no aplica para CLEAR).', type: ApplicationCommandOptionType.User, required: false },
            { name: 'razon', description: 'Motivo oficial de la acción de moderación.', type: ApplicationCommandOptionType.String, required: false },
            { name: 'tiempo-segundos', description: 'Duración del silencio (solo para TIMEOUT, en segundos).', type: ApplicationCommandOptionType.Integer, required: false },
            { name: 'cantidad-mensajes', description: 'Cantidad de mensajes a limpiar (solo para CLEAR, máx 100).', type: ApplicationCommandOptionType.Integer, required: false },
            { name: 'rol', description: 'El rol a asignar o remover (solo para ADD/REMOVE_ROLE).', type: ApplicationCommandOptionType.Role, required: false },
        ],
    },
    // 5. COMANDO /anuncio-oficial
    {
        name: 'anuncio-oficial',
        description: 'Publica un comunicado oficial de la Fiscalía.',
        options: [
            { name: 'titulo-corto', description: 'Título corto del comunicado (Ej: Cierre de Despacho).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'mensaje', description: 'Contenido completo del comunicado oficial.', type: ApplicationCommandOptionType.String, required: true },
        ],
    },
    // 6. COMANDO /ficha-oficial (CANVAS)
    {
        name: 'ficha-oficial',
        description: 'Genera la Tarjeta de Identificación Oficial de un Funcionario.',
        options: [
            { name: 'funcionario', description: 'El usuario de Discord para el que se emite la ficha.', type: ApplicationCommandOptionType.User, required: true },
            { name: 'cargo-actual', description: 'El cargo o título actual del funcionario.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'registro-nacional', description: 'Número de registro interno o Cédula.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'autoridad-emite', description: 'La autoridad que certifica la ficha (Ej: Dir. RR.HH.).', type: ApplicationCommandOptionType.String, required: true },
        ],
    },
    // 7. COMANDO /solicitud-informacion
    {
        name: 'solicitud-informacion',
        description: 'Genera un requerimiento oficial de información o diligencia a otra dependencia.',
        options: [
            { name: 'expediente-asociado', description: 'Número de Expediente Fiscal.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'dependencia-solicitada', description: 'El departamento o cuerpo policial al que se dirige la solicitud.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'documento-requerido', description: 'El material o evidencia específica que se necesita.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'plazo-horas', description: 'El tiempo límite para la entrega de la información (en horas).', type: ApplicationCommandOptionType.Integer, required: true },
            { name: 'funcionario-remitente', description: 'El Fiscal o Funcionario que emite la solicitud.', type: ApplicationCommandOptionType.User, required: true },
        ],
    },
    // 8. COMANDO /orden-judicial-solicitud
    {
        name: 'orden-judicial-solicitud',
        description: 'Solicita al Poder Judicial la autorización para ejecutar una orden judicial.',
        options: [
            { name: 'expediente-asociado', description: 'Número de Expediente Fiscal.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'tipo-orden', description: 'Tipo de orden requerida (ej: Detención, Allanamiento, Interceptación, etc.).', type: ApplicationCommandOptionType.String, required: true },
            { name: 'motivo-fundamento', description: 'Fundamento legal y motivo detallado por el cual se solicita la orden.', type: ApplicationCommandOptionType.String, required: true },
            { name: 'plazo-dias', description: 'Vigencia (en días) que se solicita para la orden judicial.', type: ApplicationCommandOptionType.Integer, required: true },
            { name: 'fiscal-remitente', description: 'El Fiscal o Funcionario que emite la solicitud al Tribunal.', type: ApplicationCommandOptionType.User, required: true },
            { name: 'poder-judicial-ping', description: 'Mención (@rol o @usuario) del Poder Judicial para notificar.', type: ApplicationCommandOptionType.String, required: true },
        ],
    },
];

// Instancia de REST
const rest = new REST({ version: '10' }).setToken(TOKEN);

// Función de despliegue
(async () => {
	try {
		console.log(`Iniciando el despliegue de ${commands.length} comandos de aplicación.`);

		// El método `put` registra (o sobrescribe) todos los comandos en el servidor.
		const data = await rest.put(
			// Utiliza Routes.applicationGuildCommands para comandos específicos de un servidor (más rápido en desarrollo)
            // Para producción, usa Routes.applicationCommands(CLIENT_ID)
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Despliegue exitoso. Se cargaron ${data.length} comandos.`);
	} catch (error) {
		// Asegúrate de manejar cualquier error
		console.error(error);
	}
})();
