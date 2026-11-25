/* Jacks4WD – Tienda · Conexión con Supabase
 * Usa la MISMA clave publishable de la app: es pública por diseño.
 * La seguridad la aplican las reglas del servidor (supabase/*.sql).
 * NUNCA pongas aquí la clave secreta (sb_secret_… / service_role).
 */
const TIENDA_NUBE = {
  url: 'https://zdbajipgoultgcrxizyn.supabase.co',
  clave: 'sb_publishable_yQgTIx4Z6VA30h3VEaTaOA_0nJd-wvs',
  dominioUsuarios: 'jacks4wd.app', // "admin" → admin@jacks4wd.app
};
