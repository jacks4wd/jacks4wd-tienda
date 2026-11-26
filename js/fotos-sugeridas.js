/* =====================================================================
   Jacks4WD · Fotos de productos buscadas automáticamente (EN REVISIÓN)
   Las genera la habilidad "buscar-fotos-productos". Cada foto se guarda en
   img/productos/ y aparece en Administrar → "Fotos en revisión": los clientes
   NO la ven hasta que el administrador la aprueba.
   Campos: id del producto, foto (ruta), fuentes (páginas consultadas),
   nota (por qué se eligió), fecha.
   ===================================================================== */
const FOTOS_SUGERIDAS = [
  {
    id: 'ome-bp51-tundra-2022',
    foto: 'img/productos/ome-bp51-tundra-2022.jpg',
    fuentes: [
      'https://store.arbusa.com/bp51-kit-fr-3-in-0-330-lb-rr-2-in-0-lb-3203k/',
      'https://www.shocksurplus.com/products/old-man-emu-bp51-shocks-kit-for-2022-2026-toyota-tundra-4wd',
    ],
    nota: 'Foto oficial de ARB USA del kit BP-51 3203K para Tundra 2022+ (coilovers delanteros con depósito, amortiguadores traseros BP-51 y espirales traseros). Coincide con la foto de ShockSurplus, que muestra la variante 3207K con brazos superiores. Confirma que tu kit es el 3203K (sin brazos).',
    fecha: '2026-11-25',
  },
];
