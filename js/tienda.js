/* Jacks4WD · Tienda — lógica
 * Rutas: #/ (inicio con selector integrado), #/catalogo/:categoria,
 * #/producto/:id, #/carrito, #/admin (administrar).
 * El catálogo (marcas + productos) se carga de Supabase si existe; si no,
 * usa los datos iniciales de productos.js. El administrador puede editarlo
 * desde #/admin y guardarlo en la nube.
 */
(() => {
  'use strict';
  const CFG = typeof TIENDA_CONFIG !== 'undefined' ? TIENDA_CONFIG : null;
  const MARCAS_INICIAL = typeof MARCAS !== 'undefined' ? MARCAS : [];
  const PRODUCTOS_INICIAL = typeof PRODUCTOS !== 'undefined' ? PRODUCTOS : [];
  const VEHICULOS_INICIAL = typeof VEHICULOS !== 'undefined' ? VEHICULOS : [];
  const CFG_INICIAL = typeof CONFIG_INICIAL !== 'undefined' ? CONFIG_INICIAL : null;
  const CONFIG_DEF = {
    heroEtiqueta: 'JACKS4WD · Especialistas 4x4',
    heroTitulo: 'Equipa tu 4x4 con lo mejor',
    heroSubtitulo: 'Suspensiones, accesorios y merch oficial. Elige tu vehículo y pide directo por WhatsApp.',
    fondo: '#f6f5f3',
    colorTexto: '#141517',
    colorCard: '#ffffff',
    colorAcento: '#b43a08',
    footerDescripcion: 'Especialistas en vehículos 4x4 · Suspensiones, accesorios y merch.',
    modoPrivadoIG: true,
    claveInvitado: 'jacks4wd',
    categorias: [
      { id: 'suspension', nombre: 'Kits de suspensión', shop: 'Suspension Parts', icono: '🔧', texto: 'Sistemas completos de suspensión para tu 4x4', subcategorias: [{ id: 'nitrocharger', nombre: 'Nitrocharger' }, { id: 'mt64', nombre: 'MT64' }, { id: 'bp51', nombre: 'BP-51' }] },
      { id: 'partes', nombre: 'Partes de suspensión', shop: 'Suspension Parts', icono: '⚙️', texto: 'Brazos de control, amortiguadores, resortes y repuestos por separado', subcategorias: [{ id: 'mesetas', nombre: 'Brazos de control superiores / Mesetas' }, { id: 'amortiguadores', nombre: 'Amortiguadores' }, { id: 'resortes', nombre: 'Resortes' }, { id: 'barras', nombre: 'Barras estabilizadoras' }, { id: 'bujes', nombre: 'Bujes y rótulas' }] },
      { id: 'accesorio', nombre: 'Accesorios', shop: 'Accesorios', icono: '🛞', texto: 'Luces, winches y más', subcategorias: [{ id: 'luces', nombre: 'Luces' }, { id: 'winches', nombre: 'Winches' }, { id: 'protecciones', nombre: 'Protecciones' }] },
      { id: 'merch', nombre: 'Merch', shop: 'Merch', icono: '👕', texto: 'Ropa y stickers del taller' },
    ],
    faqs: [
      {
        id: 'faq-mesetas',
        esMesetas: true,
        pregunta: '¿Por qué recomendamos combinar tu kit de suspensión con Brazos de Control Superiores (Mesetas)?',
        respuesta: 'Al elevar un vehículo 4x4 (especialmente a partir de 2 pulgadas), la geometría original de la suspensión delantera cambia y se pierde ángulo de avance (caster) y caída (camber). Los Brazos de Control Superiores (Mesetas / UCA) corregidos devuelven los ángulos de alineación a rango óptimo de fábrica, evitan que la rótula superior trabaje forzada en descuelgue máximo, mejoran notablemente la estabilidad en autopista y permiten aprovechar todo el recorrido real de tus nuevos amortiguadores.',
      },
      {
        id: 'faq-instalacion',
        esMesetas: false,
        pregunta: '¿Realizan la instalación y alineación en el taller Jacks4WD?',
        respuesta: 'Sí. En nuestro taller contamos con personal especializado en sistemas 4x4 para instalar tu suspensión, brazos de control superiores, bolsas de aire y accesorios, aplicando el torque exacto de fabricante. Escríbenos al cerrar tu pedido por WhatsApp para coordinar tu cita.',
      },
      {
        id: 'faq-pagos',
        esMesetas: false,
        pregunta: '¿Cuáles son los métodos de pago y entrega disponibles?',
        respuesta: 'Aceptamos Zelle, Pago Móvil y efectivo directamente en el taller. Puedes retirar tus piezas en nuestras instalaciones, agendar instalación directa o coordinar envío asegurado.',
      },
    ],
    merchTipos: [
      { id: 'franelas', nombre: 'Franelas', generos: true },
      { id: 'stickers', nombre: 'Stickers', generos: false },
      { id: 'jerseys', nombre: 'Jerseys', generos: true },
      { id: 'chaquetas', nombre: 'Chaquetas', generos: true },
    ],
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n) => `$${Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const uid = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  // ===================== CATÁLOGO (estado + carga de Supabase) =====================
  const CATALOGO_KEY = 'jacks4wd-tienda-catalogo';
  const confInicial = () => ({ ...CONFIG_DEF, ...(CFG_INICIAL || {}), categorias: (CFG_INICIAL?.categorias || CONFIG_DEF.categorias).map((c) => ({ ...c })), merchTipos: (CFG_INICIAL?.merchTipos || CONFIG_DEF.merchTipos).map((t) => ({ ...t })) });
  let catalogo = { config: confInicial(), marcas: MARCAS_INICIAL.map((m) => ({ ...m })), productos: PRODUCTOS_INICIAL.map((p) => ({ ...p })), vehiculos: VEHICULOS_INICIAL.map((v) => ({ ...v })) };
  const NUBE = typeof TIENDA_NUBE !== 'undefined' ? TIENDA_NUBE : null;

  function catalogoLocal() { try { return JSON.parse(localStorage.getItem(CATALOGO_KEY) || 'null'); } catch { return null; } }
  function guardarCatalogoLocal() { try { localStorage.setItem(CATALOGO_KEY, JSON.stringify(catalogo)); } catch { /* sin almacenamiento */ } }

  // Carga el catálogo de Supabase (lectura pública); si no hay, usa el local/inicial.
  async function cargarCatalogo() {
    if (!NUBE || !NUBE.url || !NUBE.clave) return;
    try {
      const r = await fetch(`${NUBE.url}/rest/v1/tienda?select=data&id=eq.catalogo`, {
        headers: { apikey: NUBE.clave, 'Content-Type': 'application/json' },
      });
      if (!r.ok) return;
      const filas = await r.json();
      if (Array.isArray(filas) && filas.length && filas[0].data) {
        const d = filas[0].data;
        if (Array.isArray(d.marcas) && Array.isArray(d.productos)) {
          catalogo = {
            config: d.config ? { ...confInicial(), ...d.config, categorias: (d.config.categorias || confInicial().categorias).map((c) => ({ ...c })) } : confInicial(),
            marcas: d.marcas,
            productos: d.productos,
            vehiculos: Array.isArray(d.vehiculos) ? d.vehiculos : VEHICULOS_INICIAL.map((v) => ({ ...v })),
          };
          guardarCatalogoLocal();
          return true;
        }
      }
    } catch { /* sin conexión: se usa el local */ }
    const local = catalogoLocal();
    if (local && Array.isArray(local.marcas) && Array.isArray(local.productos)) catalogo = {
      config: local.config ? { ...confInicial(), ...local.config, categorias: (local.config.categorias || confInicial().categorias).map((c) => ({ ...c })) } : confInicial(),
      marcas: local.marcas, productos: local.productos,
      vehiculos: Array.isArray(local.vehiculos) ? local.vehiculos : VEHICULOS_INICIAL.map((v) => ({ ...v })),
    };
    return false;
  }

  const marcas = () => catalogo.marcas || [];
  const productos = () => catalogo.productos || [];
  const vehiculos = () => catalogo.vehiculos || [];
  const config = () => catalogo.config || confInicial();
  const categorias = () => config().categorias || confInicial().categorias;
  const marcaPorNombre = (n) => marcas().find((m) => m.nombre === n);

  // ===================== CARRITO =====================
  const CARRITO_KEY = 'jacks4wd-carrito';
  let carrito = leerCarrito();
  function leerCarrito() { try { return JSON.parse(localStorage.getItem(CARRITO_KEY) || '[]'); } catch { return []; } }
  function guardarCarrito() { try { localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito)); } catch { /* sin almacenamiento */ } pintarBadge(); }
  function pintarBadge() {
    const n = carrito.reduce((a, x) => a + x.cant, 0);
    const b = $('#cart-count'); if (!b) return;
    b.hidden = n === 0; b.textContent = n;
  }

  // ===================== DESCUENTO CLIENTE =====================
  const CLIENTE_KEY = 'jacks4wd-cliente';
  let cliente = leerCliente();
  function leerCliente() { try { return JSON.parse(localStorage.getItem(CLIENTE_KEY) || 'null'); } catch { return null; } }
  function guardarCliente() { try { localStorage.setItem(CLIENTE_KEY, JSON.stringify(cliente)); } catch { /* sin almacenamiento */ } }
  function clienteRegistrado() { return cliente && cliente.desc ? cliente : null; }
  function tokenDeURL() {
    const m = location.hash.match(/[?&]cliente=([A-Za-z0-9]+)/);
    if (m) return m[1];
    return new URLSearchParams(location.search).get('cliente');
  }
  async function validarCliente(token) {
    if (!NUBE || !NUBE.url || !NUBE.clave || !token) return null;
    try {
      const r = await fetch(`${NUBE.url}/rest/v1/rpc/cliente_descuento`, {
        method: 'POST', headers: { apikey: NUBE.clave, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_token: token }),
      });
      if (!r.ok) return null;
      const d = await r.json();
      if (d && d.valido) return { token, desc: CFG.descuentoCliente, nombre: d.nombre || '' };
      return null;
    } catch { return null; }
  }
  async function detectarCliente() {
    const token = tokenDeURL(); if (!token) return;
    const ok = await validarCliente(token);
    cliente = ok; guardarCliente();
    rutear();
  }

  // ===================== NAVEGACIÓN =====================

  // Listener de cierre de los menús (se reutiliza para poder removeEventListener)
  let _cerrarShop = null;

  function pintarNav() {
    $('#nav').innerHTML = `
      <a href="#/" data-ruta="#/">Inicio</a>
      <a href="#/faq" data-ruta="#/faq">FAQ</a>
      <a href="#/admin" data-ruta="#/admin" class="solo-admin-link">Administrar</a>`;
    pintarCatBar();
  }

  const hrefCat = (id, q) => `#/catalogo/${id}${q ? '?' + q : ''}`;

  // Marcas disponibles para kits de suspensión (todas las que tengan productos en suspensión + marcas automotrices registradas)
  function marcasSuspension() {
    const deProds = productos().filter((p) => p.categoria === 'suspension').map((p) => p.marca).filter(Boolean);
    const soloMerch = new Set(
      productos().filter((p) => p.categoria === 'merch').map((p) => p.marca).filter((m) => m && !deProds.includes(m))
    );
    const deCatalogo = marcas().map((m) => m.nombre).filter((n) => n && n.toLowerCase() !== 'jacks4wd' && !soloMerch.has(n));
    return [...new Set([...deProds, ...deCatalogo])];
  }

  // Enlaces desplegables de una categoría (sin "Ver todo")
  function enlacesCategoria(c) {
    if (c.id === 'merch') {
      return merchTipos().map((t) =>
        `<a href="${hrefCat('merch', 'tipo=' + encodeURIComponent(t.id))}">${esc(t.nombre)}</a>` +
        (t.generos ? GENEROS.map((g) => `<a class="sub" href="${hrefCat('merch', 'tipo=' + encodeURIComponent(t.id) + '&gen=' + g)}">${g}</a>`).join('') : '')
      ).join('');
    }
    if (c.id === 'suspension') {
      const subs = c.subcategorias || [];
      const ms = marcasSuspension();
      return ms.map((m) => {
        const esOME = m.toLowerCase().includes('old man emu');
        const subLinks = esOME && subs.length
          ? subs.map((s) => `<a class="sub" href="${hrefCat('suspension', 'marca=' + encodeURIComponent(m) + '&sub=' + encodeURIComponent(s.id))}">${esc(s.nombre)}</a>`).join('')
          : '';
        return `<a href="${hrefCat('suspension', 'marca=' + encodeURIComponent(m))}">${esc(m)}</a>${subLinks}`;
      }).join('');
    }
    const subs = c.subcategorias || [];
    if (subs.length) return subs.map((s) => `<a href="${hrefCat(c.id, 'sub=' + encodeURIComponent(s.id))}">${esc(s.nombre)}</a>`).join('');
    const ms = [...new Set(productos().filter((p) => p.categoria === c.id).map((p) => p.marca).filter(Boolean))];
    return ms.map((m) => `<a href="${hrefCat(c.id, 'marca=' + encodeURIComponent(m))}">${esc(m)}</a>`).join('');
  }

  // Barra de categorías (debajo de la barra principal), al estilo "All categories / Lift kits / ..." de Mudify
  function pintarCatBar() {
    const bar = $('#catbar'); if (!bar) return;
    const cats = categorias();
    bar.innerHTML = `
      <div class="nav-drop">
        <button type="button" class="nav-drop-btn">Todas las categorías <span class="flecha">▾</span></button>
        <div class="nav-drop-menu mega">
          ${cats.map((c) => `<div class="menu-grupo"><a class="menu-grupo-titulo" href="${hrefCat(c.id)}">${esc(c.nombre)}</a>${enlacesCategoria(c)}</div>`).join('')}
        </div>
      </div>
      ${cats.map((c) => `
        <div class="nav-drop">
          <a class="nav-drop-btn" href="${hrefCat(c.id)}">${esc(c.nombre)} <span class="flecha">▾</span></a>
          <div class="nav-drop-menu">
            <a class="ver-todo" href="${hrefCat(c.id)}">Ver todo</a>
            ${enlacesCategoria(c)}
          </div>
        </div>`).join('')}`;

    const tactil = window.matchMedia && window.matchMedia('(hover: none)').matches;
    const drops = $$('#catbar .nav-drop');
    drops.forEach((d) => {
      const btn = d.querySelector('.nav-drop-btn');
      // Escritorio: el menú se abre con el ratón (CSS). Táctil: el primer toque abre el menú.
      btn.onclick = (e) => {
        if (btn.tagName === 'A' && !tactil) return;      // enlace normal
        if (btn.tagName === 'A') e.preventDefault();
        e.stopPropagation();
        drops.forEach((x) => { if (x !== d) x.classList.remove('abierto'); });
        d.classList.toggle('abierto');
      };
      // Al elegir una opción, el menú se cierra aunque el ratón siga encima
      d.querySelector('.nav-drop-menu').onclick = (e) => { if (e.target.closest('a')) { d.classList.add('cerrado'); d.classList.remove('abierto'); } };
      d.onmouseleave = () => d.classList.remove('cerrado');
    });

    if (_cerrarShop) document.removeEventListener('click', _cerrarShop);
    _cerrarShop = (e) => { if (!e.target.closest('#catbar')) drops.forEach((x) => x.classList.remove('abierto')); };
    document.addEventListener('click', _cerrarShop);
  }

  // Parámetros del hash: #/catalogo/merch?tipo=franelas&gen=Hombres
  function hashQuery() { return new URLSearchParams((location.hash.split('?')[1]) || ''); }
  function productoPorId(id) { return productos().find((p) => p.id === id); }

  function logoMarca(nombre) {
    const m = marcaPorNombre(nombre);
    if (m && m.logo) return `<img src="${esc(m.logo)}" alt="${esc(m.nombre)}" loading="lazy">`;
    return `<span class="sin-foto" style="font-size:1.3rem">${esc((nombre || '?').slice(0, 2).toUpperCase())}</span>`;
  }
  // Iconos SVG de trazo uniforme para el escaparate (sin depender de emojis genéricos)
  const SVG_ICONOS = {
    truck: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 15v-3l2.2-4.2A2 2 0 0 1 7 6.7h6.6a2 2 0 0 1 1.7 1l1.8 3.3H20a1 1 0 0 1 1 1v3h-2"/><circle cx="7" cy="16.5" r="2.2"/><circle cx="17" cy="16.5" r="2.2"/><path d="M9.2 16.5h5.6"/></svg>',
    shock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="3" rx="1"/><rect x="9" y="18.5" width="6" height="3" rx="1"/><path d="M12 5.5v13"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h7"/></svg>',
    gear: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    shirt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3.5l5 3-2 3.8-2.5-1.2V20.5h-7V9.1L6 10.3 4 6.5l5-3a3 3 0 0 0 6 0z"/></svg>',
    shield: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    wrench: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    chat: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    garage: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-2v-7H6v7H4a1 1 0 0 1-1-1z"/><path d="M9 17h6"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    filter: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  };

  // ===================== VEHÍCULO ACTIVO (persistencia estilo ARB USA) =====================
  const VEH_KEY = 'jacks4wd-vehiculo-activo';
  function leerVehActivo() {
    try {
      const v = JSON.parse(localStorage.getItem(VEH_KEY) || 'null');
      return v && v.marca && v.modelo ? v : null;
    } catch { return null; }
  }
  function guardarVehActivo(v) {
    try {
      if (v && v.marca && v.modelo) localStorage.setItem(VEH_KEY, JSON.stringify(v));
      else localStorage.removeItem(VEH_KEY);
    } catch { /* sin almacenamiento */ }
  }
  function sincronizarVehDesdeURL() {
    const q = hashQuery();
    const marca = q.get('vMarca');
    const modelo = q.get('vModelo');
    if (!marca || !modelo) return leerVehActivo();
    const genNombre = q.get('vGen') || '';
    const vDef = vehiculos().find((x) => x.marca === marca && x.modelo === modelo);
    const gDef = genNombre ? (vDef?.generaciones || []).find((g) => g.nombre === genNombre) : null;
    const activo = {
      marca,
      modelo,
      genNombre: gDef ? gDef.nombre : genNombre,
      anios: gDef?.anios || [],
    };
    guardarVehActivo(activo);
    return activo;
  }
  function urlCatalogoConVeh(catId, veh) {
    const params = new URLSearchParams();
    if (veh && veh.marca && veh.modelo) {
      params.set('vMarca', veh.marca);
      params.set('vModelo', veh.modelo);
      if (veh.genNombre) params.set('vGen', veh.genNombre);
    }
    const qs = params.toString();
    return `#/catalogo/${catId}${qs ? '?' + qs : ''}`;
  }
  function productoCompatibleConVeh(p, veh) {
    if (!veh) return true;
    if (!Array.isArray(p.compatibles) || !p.compatibles.length) return true;
    const vDef = vehiculos().find((v) => v.marca === veh.marca && v.modelo === veh.modelo);
    const gensValidas = new Set((vDef?.generaciones || []).map((g) => String(g.nombre || '').trim().toLowerCase()));
    return p.compatibles.some((c) => {
      if (c.marca !== veh.marca || c.modelo !== veh.modelo) return false;
      const vg = String(veh.genNombre || '').trim().toLowerCase();
      const cg = String(c.genNombre || '').trim().toLowerCase();
      if (vg && cg && gensValidas.has(cg)) return cg === vg;
      if (!c.anios || !c.anios.length) return true;
      if (!veh.anios || !veh.anios.length) return true;
      return c.anios.some((a) => veh.anios.includes(a));
    });
  }
  function etiquetaVehiculo(marca, modelo, genNombre = '') {
    if (!genNombre) return `${marca} ${modelo}`.trim();
    if (genNombre.toLowerCase().includes(String(modelo || '').toLowerCase())) return `${marca} ${genNombre}`.trim();
    return `${marca} ${modelo} · ${genNombre}`.trim();
  }
  function coincideAltura(alturaProd, filtroAlt) {
    if (!filtroAlt) return true;
    const a = String(alturaProd || '').trim();
    if (!a) return false;
    if (a === filtroAlt) return true;
    const m = a.match(/^(\d+(?:\.\d+)?)"?\s*-\s*(\d+(?:\.\d+)?)"?$/);
    const f = parseFloat(filtroAlt);
    if (m && Number.isFinite(f)) return f >= parseFloat(m[1]) && f <= parseFloat(m[2]);
    return false;
  }
  function extraerOpcionesAltura(listaProds) {
    const set = new Set();
    listaProds.forEach((p) => {
      const a = String(p.altura || '').trim();
      if (!a) return;
      const m = a.match(/^(\d+)\s*"?\s*-\s*(\d+)\s*"?$/);
      if (m) {
        for (let x = Number(m[1]); x <= Number(m[2]); x++) set.add(`${x}"`);
      } else {
        set.add(a);
      }
    });
    return [...set].sort((x, y) => (parseFloat(x) || 99) - (parseFloat(y) || 99));
  }

  // Renderiza el icono de una categoría: si es imagen subida → <img>, si no → SVG técnico
  function renderIconoCat(icono, catId = '') {
    if (icono && (icono.startsWith('data:image') || icono.startsWith('http') || icono.startsWith('/'))) {
      return `<img src="${esc(icono)}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;vertical-align:middle" loading="lazy">`;
    }
    if (catId === 'merch') return SVG_ICONOS.shirt;
    if (catId === 'suspension') return SVG_ICONOS.shock;
    return SVG_ICONOS.gear;
  }
  function fotoHTML(p) {
    if (p.foto) return `<img src="${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy">`;
    const cat = categorias().find((c) => c.id === p.categoria);
    return `<span class="sin-foto">${renderIconoCat(cat?.icono, p.categoria)}</span>`;
  }
  function nombreSubcategoria(p) {
    if (!p || !p.subcategoria) return '';
    const cat = categorias().find((c) => c.id === p.categoria);
    return (cat?.subcategorias || []).find((s) => s.id === p.subcategoria)?.nombre || '';
  }
  function subtituloTarjeta(p, vehActivo = null) {
    const partes = [];
    if (p.marca) partes.push(p.marca);
    const subNom = nombreSubcategoria(p);
    if (subNom) partes.push(subNom);
    if (vehActivo && Array.isArray(p.compatibles) && p.compatibles.length) {
      partes.push(`${vehActivo.marca} ${vehActivo.modelo}${vehActivo.genNombre ? ' ' + vehActivo.genNombre : ''}`);
    } else if (Array.isArray(p.compatibles) && p.compatibles.length === 1) {
      const c = p.compatibles[0];
      partes.push(`${c.marca} ${c.modelo}`);
    }
    return partes.join(' · ');
  }
  function tarjetaProducto(p, vehActivo = null) {
    const tieneOpciones = Boolean(p.opciones && Array.isArray(p.opciones.valores) && p.opciones.valores.length);
    const sub = subtituloTarjeta(p, vehActivo);
    return `<article class="card">
      <div class="foto-wrap">
        <a class="foto" href="#/producto/${esc(p.id)}" aria-label="${esc(p.nombre)}">
          ${p.altura ? `<span class="card-badge">Elevación ${esc(p.altura)}</span>` : ''}
          ${fotoHTML(p)}
        </a>
        ${tieneOpciones
          ? `<a class="card-quick-btn" href="#/producto/${esc(p.id)}">Elegir ${esc((p.opciones.nombre || 'opción').toLowerCase())}</a>`
          : `<button type="button" class="card-quick-btn" data-quick-add="${esc(p.id)}">+ Añadir al pedido</button>`}
      </div>
      <a class="cuerpo" href="#/producto/${esc(p.id)}">
        ${sub ? `<span class="marca">${esc(sub)}</span>` : ''}
        <span class="nombre">${esc(p.nombre)}</span>
        <div class="card-pie">
          <span class="precio">${fmt(p.precio)} <small class="moneda">USD</small></span>
          <span class="card-flecha" aria-hidden="true">${SVG_ICONOS.arrowRight}</span>
        </div>
      </a>
    </article>`;
  }

  // ===================== BARRA DE VEHÍCULO ESTILO ARB USA =====================
  function htmlBarraVehiculo(vehActivo, modo = 'home') {
    const marcasVeh = [...new Set(vehiculos().map((v) => v.marca).filter(Boolean))];
    const etiquetaActiva = vehActivo
      ? `${vehActivo.marca} ${vehActivo.modelo}${vehActivo.genNombre ? ' · ' + vehActivo.genNombre : ''}`
      : '';
    return `
      <div class="arb-veh-bar ${modo === 'home' ? 'en-home' : 'en-catalogo'}">
        <div class="arb-veh-top">
          <div class="arb-veh-titulo">
            <span class="arb-veh-icono">${SVG_ICONOS.truck}</span>
            <span>${vehActivo ? 'Vehículo seleccionado:' : 'Compra piezas para tu vehículo'}</span>
            ${vehActivo ? `<strong class="arb-veh-activo-pill">${esc(etiquetaActiva)}</strong>` : ''}
          </div>
          ${vehActivo ? `<button type="button" class="arb-veh-limpiar" id="vb-limpiar">Ver catálogo sin filtro ✕</button>` : ''}
        </div>
        <form class="arb-veh-form" id="vb-form">
          <label class="arb-veh-campo">
            <span class="arb-veh-label">Marca</span>
            <select id="vb-marca" aria-label="Marca del vehículo">
              <option value="">Selecciona marca</option>
              ${marcasVeh.map((m) => `<option value="${esc(m)}" ${vehActivo?.marca === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}
            </select>
          </label>
          <label class="arb-veh-campo">
            <span class="arb-veh-label">Modelo</span>
            <select id="vb-modelo" aria-label="Modelo del vehículo" ${vehActivo?.marca ? '' : 'disabled'}>
              <option value="">Selecciona modelo</option>
            </select>
          </label>
          <label class="arb-veh-campo">
            <span class="arb-veh-label">Año / Generación</span>
            <select id="vb-gen" aria-label="Año o generación del vehículo" ${vehActivo?.modelo ? '' : 'disabled'}>
              <option value="">Todas las generaciones</option>
            </select>
          </label>
          <button type="submit" class="btn arb-veh-submit">${modo === 'home' ? 'Buscar piezas' : 'Filtrar piezas'}</button>
        </form>
      </div>`;
  }

  function activarBarraVehiculo(vehInicial, alCambiar) {
    const form = $('#vb-form');
    if (!form) return;
    const selMarca = $('#vb-marca');
    const selModelo = $('#vb-modelo');
    const selGen = $('#vb-gen');

    const poblarModelos = (marca, modeloSel = '') => {
      const modelos = vehiculos().filter((v) => v.marca === marca).map((v) => v.modelo);
      selModelo.innerHTML = '<option value="">Selecciona modelo</option>' +
        modelos.map((m) => `<option value="${esc(m)}" ${m === modeloSel ? 'selected' : ''}>${esc(m)}</option>`).join('');
      selModelo.disabled = !marca || !modelos.length;
      if (marca && !modeloSel && modelos.length === 1) selModelo.value = modelos[0];
    };

    const poblarGens = (marca, modelo, genSel = '') => {
      const v = vehiculos().find((x) => x.marca === marca && x.modelo === modelo);
      const gens = v?.generaciones || [];
      selGen.innerHTML = '<option value="">Todas las generaciones</option>' +
        gens.map((g) => `<option value="${esc(g.nombre)}" ${g.nombre === genSel ? 'selected' : ''}>${esc(g.nombre)}</option>`).join('');
      selGen.disabled = !modelo || !gens.length;
      if (modelo && !genSel && gens.length === 1) selGen.value = gens[0].nombre;
    };

    if (vehInicial?.marca) {
      poblarModelos(vehInicial.marca, vehInicial.modelo || '');
      if (vehInicial.modelo) poblarGens(vehInicial.marca, vehInicial.modelo, vehInicial.genNombre || '');
    }

    selMarca.onchange = () => {
      poblarModelos(selMarca.value, '');
      poblarGens(selMarca.value, selModelo.value, '');
    };
    selModelo.onchange = () => {
      poblarGens(selMarca.value, selModelo.value, '');
    };

    form.onsubmit = (e) => {
      e.preventDefault();
      const marca = selMarca.value;
      const modelo = selModelo.value;
      if (!marca) { toast('Selecciona la marca de tu vehículo'); selMarca.focus(); return; }
      if (!modelo) { toast('Selecciona el modelo de tu vehículo'); selModelo.focus(); return; }
      const genNombre = selGen.value || '';
      const vDef = vehiculos().find((x) => x.marca === marca && x.modelo === modelo);
      const gDef = genNombre ? (vDef?.generaciones || []).find((g) => g.nombre === genNombre) : null;
      const nuevo = { marca, modelo, genNombre, anios: gDef?.anios || [] };
      guardarVehActivo(nuevo);
      alCambiar(nuevo);
    };

    const btnLimpiar = $('#vb-limpiar');
    if (btnLimpiar) {
      btnLimpiar.onclick = () => {
        guardarVehActivo(null);
        alCambiar(null);
      };
    }
  }

  function productosDestacados() {
    const todos = productos();
    if (todos.length <= 8) return todos;
    const usados = new Set();
    const out = [];
    const tomar = (fn, max) => {
      for (const p of todos) {
        if (out.length >= 8 || max <= 0) break;
        if (!usados.has(p.id) && fn(p)) { usados.add(p.id); out.push(p); max--; }
      }
    };
    tomar((p) => p.subcategoria === 'bp51', 3);
    tomar((p) => p.subcategoria === 'mt64', 2);
    tomar((p) => p.subcategoria === 'nitrocharger', 2);
    tomar((p) => p.categoria === 'merch', 1);
    tomar(() => true, 8 - out.length);
    return out;
  }

  // ===================== INICIO (etapa superior oscura + destacados en estudio claro) =====================
  function vistaInicio() {
    const cfg = config();
    const vehs = vehiculos();
    const vehActivo = leerVehActivo();
    const catSusp = (categorias().find((c) => c.id === 'suspension') || categorias().find((c) => c.id !== 'merch') || categorias()[0] || {}).id || 'suspension';
    const heroStyle = cfg.heroFoto ? `style="--hero-bg-img: url('${esc(cfg.heroFoto)}')"` : '';
    const marcasVeh = [...new Set(vehs.map((v) => v.marca).filter(Boolean))];
    let marcaVehActiva = vehActivo?.marca && marcasVeh.includes(vehActivo.marca) ? vehActivo.marca : (marcasVeh[0] || '');

    const htmlTarjetasVeh = (lista) => lista.map((v) => {
      const gens = v.generaciones || [];
      return `
      <article class="build-card">
        ${v.foto
          ? `<img src="${esc(v.foto)}" alt="${esc(v.marca)} ${esc(v.modelo)}" loading="lazy">`
          : `<span class="build-placeholder">${SVG_ICONOS.truck}</span>`}
        <div class="build-titulo-overlay">
          <span class="build-marca">${esc(v.marca)}</span>
          <span class="build-modelo">${esc(v.modelo)}</span>
        </div>
        <div class="build-drawer">
          <span class="build-instruccion">${gens.length ? 'Selecciona año / generación:' : 'Suspensión disponible:'}</span>
          <div class="build-gens">
            ${gens.length
              ? gens.map((g, gi) => {
                const txtGen = g.nombre.toLowerCase().includes(v.modelo.toLowerCase()) ? g.nombre : `${v.modelo} · ${g.nombre}`;
                return `
                <button type="button" class="build-gen-btn" data-marca="${esc(v.marca)}" data-modelo="${esc(v.modelo)}" data-gen="${gi}">
                  <span>${esc(txtGen)}</span>
                  <span aria-hidden="true">${SVG_ICONOS.arrowRight}</span>
                </button>`;
              }).join('')
              : `<button type="button" class="build-gen-btn" data-marca="${esc(v.marca)}" data-modelo="${esc(v.modelo)}" data-gen="-1">
                  <span>Ver kits para ${esc(v.modelo)}</span>
                  <span aria-hidden="true">${SVG_ICONOS.arrowRight}</span>
                </button>`}
          </div>
        </div>
      </article>`;
    }).join('') || '<p class="vacio">Aún no hay vehículos configurados.</p>';

    const vehsIniciales = marcaVehActiva ? vehs.filter((v) => v.marca === marcaVehActiva) : vehs;

    $('#vista').innerHTML = `
      <div class="home-oscuro">
        <div class="home-contenedor">
          <section class="hero" ${heroStyle}>
            <div class="hero-contenido">
              <h1>${esc(cfg.heroTitulo)}</h1>
              <p>${esc(cfg.heroSubtitulo)}</p>
              <div class="hero-acciones">
                <a class="btn-hero-primary" href="#/" data-scroll="seccion-shop">Elegir mi vehículo</a>
                <a class="btn-hero-ghost" href="#/catalogo/${esc(catSusp)}">Ver suspensiones</a>
              </div>
            </div>
          </section>

          <div class="trust-band">
            <div class="trust-item">
              <div class="trust-icono">${SVG_ICONOS.wrench}</div>
              <div>
                <div class="trust-titulo">Especialistas 4x4</div>
                <div class="trust-desc">Asesoría real, no bots</div>
              </div>
            </div>
            <div class="trust-item">
              <div class="trust-icono">${SVG_ICONOS.shield}</div>
              <div>
                <div class="trust-titulo">Producto garantizado</div>
                <div class="trust-desc">Solo marcas reconocidas</div>
              </div>
            </div>
            <div class="trust-item">
              <div class="trust-icono">${SVG_ICONOS.chat}</div>
              <div>
                <div class="trust-titulo">Pedidos por WhatsApp</div>
                <div class="trust-desc">Respuesta rápida y directa</div>
              </div>
            </div>
            <div class="trust-item">
              <div class="trust-icono">${SVG_ICONOS.garage}</div>
              <div>
                <div class="trust-titulo">Instalación disponible</div>
                <div class="trust-desc">Retiro e instalación en el taller</div>
              </div>
            </div>
          </div>

          <section class="seccion" id="seccion-shop">
            <div class="seccion-head">
              <h2>Compra por vehículo</h2>
              <a href="#/catalogo/${esc(catSusp)}">Ver catálogo de suspensiones →</a>
            </div>
            ${marcasVeh.length > 1 ? `
            <div class="build-marcas-tabs" id="veh-marcas-tabs" role="tablist" aria-label="Marca del vehículo">
              ${marcasVeh.map((m) => {
                const cnt = vehs.filter((v) => v.marca === m).length;
                return `<button type="button" class="build-marca-tab ${m === marcaVehActiva ? 'on' : ''}" data-vmarca="${esc(m)}">
                  <span>${esc(m)}</span><span class="build-marca-cnt">${cnt}</span>
                </button>`;
              }).join('')}
              <button type="button" class="build-marca-tab ${!marcaVehActiva ? 'on' : ''}" data-vmarca="">
                <span>Todas</span><span class="build-marca-cnt">${vehs.length}</span>
              </button>
            </div>` : ''}
            <div class="build-grid" id="vehiculos-home">
              ${htmlTarjetasVeh(vehsIniciales)}
            </div>
          </section>
        </div>
      </div>

      <div class="home-claro">
        <div class="home-contenedor">
          <section class="seccion home-destacados">
            <div class="seccion-head"><h2>Productos destacados</h2><a href="#/catalogo/all">Ver todo →</a></div>
            <div class="grid">${productosDestacados().map((p) => tarjetaProducto(p, vehActivo)).join('') || '<p class="vacio">No hay productos todavía.</p>'}</div>
          </section>
        </div>
      </div>`;

    const tabsMarcas = $('#veh-marcas-tabs');
    if (tabsMarcas) {
      tabsMarcas.onclick = (e) => {
        const b = e.target.closest('[data-vmarca]');
        if (!b) return;
        marcaVehActiva = b.dataset.vmarca || '';
        $$('#veh-marcas-tabs .build-marca-tab').forEach((x) => x.classList.toggle('on', x === b));
        const filtrados = marcaVehActiva ? vehs.filter((v) => v.marca === marcaVehActiva) : vehs;
        $('#vehiculos-home').innerHTML = htmlTarjetasVeh(filtrados);
      };
    }

    const gridVeh = $('#vehiculos-home');
    if (gridVeh) {
      gridVeh.onclick = (e) => {
        const btn = e.target.closest('.build-gen-btn');
        if (!btn) {
          const card = e.target.closest('.build-card');
          if (card) {
            const yaAbierta = card.classList.contains('abierto');
            $$('#vehiculos-home .build-card').forEach((c) => c.classList.remove('abierto'));
            if (!yaAbierta) card.classList.add('abierto');
          }
          return;
        }
        const v = vehiculos().find((x) => x.marca === btn.dataset.marca && x.modelo === btn.dataset.modelo);
        const gi = Number(btn.dataset.gen);
        const g = gi >= 0 ? v?.generaciones?.[gi] : null;
        const elegido = {
          marca: btn.dataset.marca,
          modelo: btn.dataset.modelo,
          genNombre: g?.nombre || '',
          anios: g?.anios || [],
        };
        guardarVehActivo(elegido);
        location.hash = urlCatalogoConVeh(catSusp, elegido);
      };
    }

    $$('[data-scroll]').forEach((a) => {
      a.onclick = (e) => {
        e.preventDefault();
        document.getElementById(a.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    });
  }

  function rangoAnios(anios) {
    const a = [...(anios || [])].sort((x, y) => x - y);
    if (!a.length) return '';
    if (a.length === 1) return String(a[0]);
    const rangos = []; let ini = a[0], prev = a[0];
    for (let i = 1; i < a.length; i++) {
      if (a[i] === prev + 1) { prev = a[i]; continue; }
      rangos.push(ini === prev ? String(ini) : `${ini}–${prev}`); ini = a[i]; prev = a[i];
    }
    rangos.push(ini === prev ? String(ini) : `${ini}–${prev}`);
    return rangos.join(', ');
  }

  // ===================== CATÁLOGO (2 columnas estilo ARB USA) =====================
  function vistaCatalogo(categoria) {
    if (categoria === 'merch') { vistaMerch(); return; }
    const cats = categorias();
    const catsAutomotriz = cats.filter((c) => c.id !== 'merch');
    const esTodo = categoria === 'all' || !cats.some((c) => c.id === categoria);
    const cat = esTodo ? null : cats.find((c) => c.id === categoria);

    const q = hashQuery();
    let vehActivo = sincronizarVehDesdeURL();
    let selSub = q.get('sub') || '';
    let selMarca = q.get('marca') || '';
    let selAltura = q.get('altura') || '';
    let orden = 'destacados';
    let sidebarAbiertoMovil = false;

    const subDefInicial = selSub && cat ? (cat.subcategorias || []).find((s) => s.id === selSub) : null;
    if (selSub && cat && !subDefInicial) selSub = '';

    const titulo = esTodo ? 'Catálogo 4x4' : (cat?.nombre || 'Catálogo');
    const subTexto = esTodo
      ? 'Suspensiones, repuestos y accesorios de alto rendimiento para tu 4x4.'
      : (cat?.texto || 'Piezas garantizadas e instalación especializada en nuestro taller.');

    $('#vista').innerHTML = `
      <nav class="breadcrumb" id="cat-breadcrumb"></nav>
      <div class="cat-hero">
        <h1 id="cat-titulo">${esc(titulo)}</h1>
        <p>${esc(subTexto)}</p>
      </div>

      <div id="cat-veh-slot"></div>

      <div class="arb-plp">
        <button type="button" class="btn ghost arb-toggle-filtros" id="btn-toggle-filtros">
          ${SVG_ICONOS.filter} <span>Filtrar productos</span>
        </button>
        <aside class="arb-sidebar" id="arb-sidebar" aria-label="Filtros de catálogo"></aside>
        <div class="arb-main">
          <div class="arb-toolbar">
            <div class="arb-toolbar-izq">
              <span class="arb-conteo" id="arb-conteo">0 resultados</span>
              <div class="arb-chips-activos" id="arb-chips"></div>
            </div>
            <label class="arb-orden-wrap">
              <span>Ordenar por</span>
              <select id="arb-orden" aria-label="Ordenar productos">
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre-asc">Nombre: A–Z</option>
              </select>
            </label>
          </div>
          <div id="arb-resultados"></div>
        </div>
      </div>`;

    const baseCategoriaVeh = () => productos().filter((p) => {
      if (esTodo) {
        if (p.categoria === 'merch') return false;
      } else if (p.categoria !== categoria) {
        return false;
      }
      return productoCompatibleConVeh(p, vehActivo);
    });

    const renderBarraSuperior = () => {
      const subObj = selSub && cat ? (cat.subcategorias || []).find((s) => s.id === selSub) : null;
      const vehTxt = vehActivo ? etiquetaVehiculo(vehActivo.marca, vehActivo.modelo, vehActivo.genNombre) : '';
      $('#cat-breadcrumb').innerHTML = `
        <a href="#/">Inicio</a><span>›</span>
        ${subObj
          ? `<a href="${urlCatalogoConVeh(categoria, vehActivo)}">${esc(titulo)}</a><span>›</span><strong>${esc(subObj.nombre)}</strong>`
          : `<strong>${esc(titulo)}</strong>`}
        ${vehTxt ? `<span>›</span><strong>${esc(vehTxt)}</strong>` : ''}`;

      $('#cat-titulo').textContent = vehTxt ? `${titulo} · ${vehTxt}` : titulo;
      $('#cat-veh-slot').innerHTML = htmlBarraVehiculo(vehActivo, 'catalogo');
      activarBarraVehiculo(vehActivo, (nuevoVeh) => {
        vehActivo = nuevoVeh;
        renderTodo();
        if (categoria === 'suspension' && vehActivo) evaluarPopupMesetas({ modo: 'catalogo', veh: vehActivo });
      });
    };

    const renderSidebarYResultados = () => {
      const poolBase = baseCategoriaVeh();
      const subsCat = cat?.subcategorias || [];

      // Conteos por categoría (respetando el vehículo activo)
      const conteoTodo = productos().filter((p) => p.categoria !== 'merch' && productoCompatibleConVeh(p, vehActivo)).length;
      const conteosCat = Object.fromEntries(catsAutomotriz.map((c) => [
        c.id,
        productos().filter((p) => p.categoria === c.id && productoCompatibleConVeh(p, vehActivo)).length,
      ]));

      // Pool tras subcategoría para calcular marcas y elevaciones disponibles
      const poolSub = selSub ? poolBase.filter((p) => p.subcategoria === selSub) : poolBase;
      const marcasDisp = [...new Set(poolSub.map((p) => p.marca).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
      const alturasDisp = extraerOpcionesAltura(poolSub);

      if (selMarca && !marcasDisp.includes(selMarca)) selMarca = '';
      if (selAltura && !alturasDisp.includes(selAltura)) selAltura = '';

      const hayFiltrosFacet = Boolean(selSub || selMarca || selAltura);

      $('#arb-sidebar').innerHTML = `
        <div class="arb-sidebar-head">
          <span>Filtrar por</span>
          ${hayFiltrosFacet ? '<button type="button" class="arb-reset-link" id="arb-limpiar-facets">Limpiar</button>' : ''}
        </div>

        <div class="arb-facet">
          <div class="arb-facet-titulo">Categoría</div>
          <div class="arb-facet-lista">
            <a class="arb-cat-link ${esTodo ? 'on' : ''}" href="${urlCatalogoConVeh('all', vehActivo)}">
              <span>Todas las piezas</span><span class="arb-count">${conteoTodo}</span>
            </a>
            ${catsAutomotriz.map((c) => `
              <a class="arb-cat-link ${!esTodo && c.id === categoria ? 'on' : ''}" href="${urlCatalogoConVeh(c.id, vehActivo)}">
                <span>${esc(c.nombre)}</span><span class="arb-count">${conteosCat[c.id] || 0}</span>
              </a>`).join('')}
            ${cats.some((c) => c.id === 'merch') ? `
              <a class="arb-cat-link" href="#/catalogo/merch">
                <span>Merch oficial</span><span class="arb-count">${productos().filter((p) => p.categoria === 'merch').length}</span>
              </a>` : ''}
          </div>
        </div>

        ${marcasDisp.length ? `
        <div class="arb-facet">
          <div class="arb-facet-titulo">Marca</div>
          <div class="arb-facet-lista">
            ${marcasDisp.map((m) => {
              const cnt = poolSub.filter((p) => coincideAltura(p.altura, selAltura) && p.marca === m).length;
              const activo = selMarca === m;
              return `<button type="button" class="arb-check-btn ${activo ? 'on' : ''}" data-f-marca="${esc(m)}">
                <span class="arb-box">${activo ? SVG_ICONOS.check : ''}</span>
                <span class="arb-check-txt">${esc(m)}</span>
                <span class="arb-count">${cnt}</span>
              </button>`;
            }).join('')}
          </div>
        </div>` : ''}

        ${subsCat.length ? `
        <div class="arb-facet">
          <div class="arb-facet-titulo">${categoria === 'suspension' ? 'Línea' : 'Subcategoría'}</div>
          <div class="arb-facet-lista">
            ${subsCat.map((s) => {
              const cnt = poolBase.filter((p) => (!selMarca || p.marca === selMarca) && coincideAltura(p.altura, selAltura) && p.subcategoria === s.id).length;
              const activo = selSub === s.id;
              return `<button type="button" class="arb-check-btn ${activo ? 'on' : ''}" data-f-sub="${esc(s.id)}">
                <span class="arb-box">${activo ? SVG_ICONOS.check : ''}</span>
                <span class="arb-check-txt">${esc(s.nombre)}</span>
                <span class="arb-count">${cnt}</span>
              </button>`;
            }).join('')}
          </div>
        </div>` : ''}

        ${alturasDisp.length ? `
        <div class="arb-facet">
          <div class="arb-facet-titulo">Elevación</div>
          <div class="arb-facet-lista">
            ${alturasDisp.map((alt) => {
              const cnt = poolSub.filter((p) => (!selMarca || p.marca === selMarca) && coincideAltura(p.altura, alt)).length;
              const activo = selAltura === alt;
              return `<button type="button" class="arb-check-btn ${activo ? 'on' : ''}" data-f-altura="${esc(alt)}">
                <span class="arb-box">${activo ? SVG_ICONOS.check : ''}</span>
                <span class="arb-check-txt">${esc(alt)}</span>
                <span class="arb-count">${cnt}</span>
              </button>`;
            }).join('')}
          </div>
        </div>` : ''}`;

      // Filtrado final y ordenamiento
      let lista = poolSub.slice();
      if (selMarca) lista = lista.filter((p) => p.marca === selMarca);
      if (selAltura) lista = lista.filter((p) => coincideAltura(p.altura, selAltura));

      if (orden === 'precio-asc') lista.sort((a, b) => (Number(a.precio) || 0) - (Number(b.precio) || 0));
      else if (orden === 'precio-desc') lista.sort((a, b) => (Number(b.precio) || 0) - (Number(a.precio) || 0));
      else if (orden === 'nombre-asc') lista.sort((a, b) => String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es'));

      $('#arb-conteo').textContent = `${lista.length} ${lista.length === 1 ? 'resultado' : 'resultados'}`;

      // Chips activos
      const chips = [];
      if (vehActivo) {
        chips.push(`<button type="button" class="arb-chip" data-quitar="veh">${esc(vehActivo.marca + ' ' + vehActivo.modelo + (vehActivo.genNombre ? ' · ' + vehActivo.genNombre : ''))} ✕</button>`);
      }
      if (selSub) {
        const sn = subsCat.find((s) => s.id === selSub)?.nombre || selSub;
        chips.push(`<button type="button" class="arb-chip" data-quitar="sub">${esc(sn)} ✕</button>`);
      }
      if (selMarca) chips.push(`<button type="button" class="arb-chip" data-quitar="marca">${esc(selMarca)} ✕</button>`);
      if (selAltura) chips.push(`<button type="button" class="arb-chip" data-quitar="altura">Elevación ${esc(selAltura)} ✕</button>`);
      $('#arb-chips').innerHTML = chips.join('');

      // Grilla de resultados
      const caja = $('#arb-resultados');
      if (!lista.length) {
        caja.innerHTML = `
          <div class="arb-vacio">
            <h3>No encontramos piezas con estos filtros</h3>
            <p>${vehActivo
              ? `Aún no hemos cargado piezas en ${esc(titulo.toLowerCase())} para ${esc(vehActivo.marca + ' ' + vehActivo.modelo + (vehActivo.genNombre ? ' ' + vehActivo.genNombre : ''))}. Consúltanos por WhatsApp o revisa el catálogo general.`
              : 'Prueba quitando alguno de los filtros seleccionados o escríbenos directo por WhatsApp.'}</p>
            <div class="arb-vacio-acciones">
              ${(vehActivo || hayFiltrosFacet) ? '<button type="button" class="btn" id="arb-vacio-reset">Ver todos los productos</button>' : ''}
              <a class="btn wa" href="https://wa.me/${esc(CFG?.whatsapp || '')}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
            </div>
          </div>`;
        const btnReset = $('#arb-vacio-reset');
        if (btnReset) {
          btnReset.onclick = () => {
            selSub = ''; selMarca = ''; selAltura = '';
            vehActivo = null; guardarVehActivo(null);
            renderTodo();
          };
        }
      } else {
        caja.innerHTML = `<div class="arb-grid">${lista.map((p) => tarjetaProducto(p, vehActivo)).join('')}</div>`;
      }
    };

    const renderTodo = () => {
      renderBarraSuperior();
      renderSidebarYResultados();
    };

    $('#arb-sidebar').onclick = (e) => {
      if (e.target.closest('#arb-limpiar-facets')) {
        selSub = ''; selMarca = ''; selAltura = '';
        renderSidebarYResultados();
        return;
      }
      const bSub = e.target.closest('[data-f-sub]');
      if (bSub) { selSub = selSub === bSub.dataset.fSub ? '' : bSub.dataset.fSub; renderSidebarYResultados(); return; }
      const bMarca = e.target.closest('[data-f-marca]');
      if (bMarca) { selMarca = selMarca === bMarca.dataset.fMarca ? '' : bMarca.dataset.fMarca; renderSidebarYResultados(); return; }
      const bAlt = e.target.closest('[data-f-altura]');
      if (bAlt) { selAltura = selAltura === bAlt.dataset.fAltura ? '' : bAlt.dataset.fAltura; renderSidebarYResultados(); }
    };

    $('#arb-chips').onclick = (e) => {
      const c = e.target.closest('[data-quitar]');
      if (!c) return;
      if (c.dataset.quitar === 'veh') { vehActivo = null; guardarVehActivo(null); renderTodo(); return; }
      if (c.dataset.quitar === 'sub') selSub = '';
      if (c.dataset.quitar === 'marca') selMarca = '';
      if (c.dataset.quitar === 'altura') selAltura = '';
      renderSidebarYResultados();
    };

    $('#arb-orden').onchange = (e) => {
      orden = e.target.value;
      renderSidebarYResultados();
    };

    $('#btn-toggle-filtros').onclick = () => {
      sidebarAbiertoMovil = !sidebarAbiertoMovil;
      $('#arb-sidebar').classList.toggle('abierto', sidebarAbiertoMovil);
    };

    renderTodo();
    if (categoria === 'suspension' && vehActivo) evaluarPopupMesetas({ modo: 'catalogo', veh: vehActivo });
  }

  // ===================== MERCH (menú lateral por tipo + Hombres/Mujeres) =====================
  const GENEROS = ['Hombres', 'Mujeres'];
  const MERCH_TIPOS_DEF = [
    { id: 'franelas', nombre: 'Franelas', generos: true },
    { id: 'stickers', nombre: 'Stickers', generos: false },
    { id: 'jerseys', nombre: 'Jerseys', generos: true },
    { id: 'chaquetas', nombre: 'Chaquetas', generos: true },
  ];
  function merchTipos() {
    const c = config();
    if (!Array.isArray(c.merchTipos)) c.merchTipos = MERCH_TIPOS_DEF.map((t) => ({ ...t }));
    return c.merchTipos;
  }

  function vistaMerch() {
    const tipos = merchTipos();
    const todos = productos().filter((p) => p.categoria === 'merch');
    const qm = hashQuery();
    let selTipo = tipos.some((t) => t.id === qm.get('tipo')) ? qm.get('tipo') : '';   // id del tipo ('' = todo)
    let selGen = selTipo && GENEROS.includes(qm.get('gen')) ? qm.get('gen') : '';    // 'Hombres' | 'Mujeres' | ''
    const abiertos = new Set(); // grupos con submenú desplegado
    if (selTipo && tipos.find((t) => t.id === selTipo)?.generos) abiertos.add(selTipo);

    $('#vista').innerHTML = `
      <nav class="breadcrumb"><a href="#/">Inicio</a><span>›</span><strong>Merch</strong></nav>
      <div class="cat-hero">
        <h1>Merch</h1>
        <p>${esc(categorias().find((c) => c.id === 'merch')?.texto || 'Ropa y stickers del taller')}</p>
      </div>
      <div class="merch-layout">
        <aside class="merch-menu" id="merch-menu">
          <div class="merch-menu-titulo">Tipo de producto</div>
          <button type="button" class="merch-item on" data-tipo="" data-gen="">Todo</button>
          ${tipos.map((t) => `
            <div class="merch-grupo" data-grupo="${esc(t.id)}">
              <button type="button" class="merch-item" data-tipo="${esc(t.id)}" data-gen="">
                <span>${esc(t.nombre)}</span>${t.generos ? '<span class="merch-flecha">▾</span>' : ''}
              </button>
              ${t.generos ? `<div class="merch-sub">${GENEROS.map((g) => `<button type="button" class="merch-item sub" data-tipo="${esc(t.id)}" data-gen="${g}">${g}</button>`).join('')}</div>` : ''}
            </div>`).join('')}
        </aside>
        <div class="merch-contenido">
          <div class="seccion-head"><h2 id="merch-titulo">Todo el merch</h2></div>
          <div id="merch-lista"></div>
        </div>
      </div>`;

    const pintar = () => {
      let lista = todos;
      if (selTipo) lista = lista.filter((p) => p.tipo === selTipo);
      if (selGen) lista = lista.filter((p) => !p.genero || p.genero === 'Unisex' || p.genero === selGen);
      const t = tipos.find((x) => x.id === selTipo);
      $('#merch-titulo').textContent = t ? `${t.nombre}${selGen ? ' · ' + selGen : ''}` : 'Todo el merch';
      $('#merch-lista').innerHTML = lista.length
        ? `<div class="grid">${lista.map((p) => tarjetaProducto(p, null)).join('')}</div>`
        : '<p class="vacio">Aún no hay productos en esta sección.</p>';
      $$('#merch-menu .merch-item').forEach((b) => b.classList.toggle('on', (b.dataset.tipo || '') === selTipo && (b.dataset.gen || '') === selGen));
      $$('#merch-menu .merch-grupo').forEach((g) => g.classList.toggle('abierto', abiertos.has(g.dataset.grupo)));
    };

    $('#merch-menu').onclick = (e) => {
      const b = e.target.closest('.merch-item'); if (!b) return;
      const tipo = b.dataset.tipo || '';
      const gen = b.dataset.gen || '';
      const def = tipos.find((t) => t.id === tipo);
      if (def && def.generos) {
        // Clic en el título: abre o repliega el submenú. Clic en Hombres/Mujeres: lo mantiene abierto.
        if (!gen && abiertos.has(tipo)) abiertos.delete(tipo); else abiertos.add(tipo);
      } else {
        abiertos.clear();
      }
      selTipo = tipo;
      selGen = gen;
      pintar();
    };
    pintar();
  }

  // ===================== DETALLE =====================
  function vistaProducto(id) {
    const p = productoPorId(id);
    if (!p) { $('#vista').innerHTML = '<p class="vacio">Producto no encontrado.</p>'; return; }
    const cat = categorias().find((c) => c.id === p.categoria);
    const vehActivo = leerVehActivo();
    const subNom = nombreSubcategoria(p);
    const esCompatVeh = vehActivo && Array.isArray(p.compatibles) && p.compatibles.length && productoCompatibleConVeh(p, vehActivo);
    const opciones = p.opciones && p.opciones.valores && p.opciones.valores.length
      ? `<div class="opciones"><label>${esc(p.opciones.nombre || 'Opción')}
          <select id="sel-opcion">${p.opciones.valores.map((v) => `<option>${esc(v)}</option>`).join('')}</select>
        </label></div>`
      : '';
    const compat = (p.compatibles && p.compatibles.length)
      ? `<div class="tabla-compat-wrap">
          <div class="tabla-compat-titulo">Compatibilidad de vehículo</div>
          <div class="tabla-compat">
            ${p.compatibles.map((c) => `
              <div class="tabla-compat-fila">
                <span class="tabla-compat-veh">${esc(c.marca)} ${esc(c.modelo)}</span>
                <span class="tabla-compat-anios">${esc(c.genNombre || rangoAnios(c.anios) || 'Todas las generaciones')}</span>
              </div>`).join('')}
          </div>
        </div>`
      : '';
    $('#vista').innerHTML = `
      <nav class="breadcrumb"><a href="#/">Inicio</a><span>›</span><a href="${p.categoria === 'merch' ? '#/catalogo/merch' : urlCatalogoConVeh(p.categoria, vehActivo)}">${esc(cat?.nombre || p.categoria)}</a><span>›</span><strong>${esc(p.nombre)}</strong></nav>
      <div class="detalle seccion">
        <div class="foto">${fotoHTML(p)}</div>
        <div>
          <h1>${esc(p.nombre)}</h1>
          ${(p.marca || subNom || p.altura || esCompatVeh) ? `<div class="detalle-specs">
            ${p.marca ? `<span class="spec-tag">Marca: ${esc(p.marca)}</span>` : ''}
            ${subNom ? `<span class="spec-tag">Línea: ${esc(subNom)}</span>` : ''}
            ${p.altura ? `<span class="spec-tag">Elevación: ${esc(p.altura)}</span>` : ''}
            ${esCompatVeh ? `<span class="spec-tag spec-ok">Compatible: ${esc(vehActivo.marca + ' ' + vehActivo.modelo + (vehActivo.genNombre ? ' ' + vehActivo.genNombre : ''))}</span>` : ''}
          </div>` : ''}
          <div class="precio">${fmt(p.precio)} <small class="moneda">USD</small></div>
          <p class="desc">${esc(p.descripcion)}</p>
          ${compat}
          ${opciones}
          <button class="btn grande" id="btn-add">Añadir al pedido</button>
        </div>
      </div>`;
    $('#btn-add').onclick = () => agregarAlCarrito(p.id, $('#sel-opcion')?.value);
    if (p.categoria === 'suspension' && !/con\s+mesetas/i.test(p.nombre || '')) {
      evaluarPopupMesetas({ modo: 'producto', prod: p, veh: vehActivo });
    }
  }

  // ===================== PREGUNTAS FRECUENTES (FAQ) & POP-UP DE MESETAS =====================
  function faqs() {
    const c = config();
    if (!Array.isArray(c.faqs) || !c.faqs.length) {
      c.faqs = CONFIG_DEF.faqs.map((f) => ({ ...f }));
    }
    return c.faqs;
  }
  function faqMesetasId() {
    const lista = faqs();
    return (lista.find((f) => f.esMesetas) || lista.find((f) => f.id === 'faq-mesetas') || lista[0] || {}).id || '';
  }
  function vistaFAQ() {
    const lista = faqs();
    const q = hashQuery();
    const focoId = q.get('tema') === 'mesetas' ? faqMesetasId() : (q.get('id') || '');
    $('#vista').innerHTML = `
      <nav class="breadcrumb"><a href="#/">Inicio</a><span>›</span><strong>Preguntas frecuentes</strong></nav>
      <div class="cat-hero">
        <h1>Preguntas frecuentes</h1>
        <p>Respuestas técnicas de nuestro taller sobre suspensiones, geometría de alineación, instalación y pedidos.</p>
      </div>
      <div class="faq-lista" id="faq-lista">
        ${lista.map((f, idx) => {
          const abierto = focoId ? f.id === focoId : idx === 0;
          const destacado = focoId && f.id === focoId;
          return `
          <details class="faq-item ${destacado ? 'destacado' : ''}" id="faq-${esc(f.id)}" ${abierto ? 'open' : ''}>
            <summary class="faq-pregunta">
              <span>${esc(f.pregunta)}</span>
              <span class="faq-icono" aria-hidden="true">+</span>
            </summary>
            <div class="faq-respuesta">
              <p>${esc(f.respuesta).replace(/\n/g, '<br>')}</p>
            </div>
          </details>`;
        }).join('') || '<p class="vacio">Aún no hay preguntas frecuentes registradas.</p>'}
      </div>`;

    if (focoId && document.getElementById && typeof setTimeout === 'function') {
      setTimeout(() => {
        document.getElementById('faq-' + focoId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    }
  }

  const _mesetasOmitidas = new Set();
  function cerrarPopupMesetas() {
    const el = document.getElementById ? document.getElementById('mesetas-popup') : null;
    if (el && typeof el.remove === 'function') el.remove();
  }
  function carritoTieneMesetas() {
    return carrito.some((x) => {
      const p = productoPorId(x.id);
      return p && (p.subcategoria === 'mesetas' || /mesetas\s+superiores|brazos\s+de\s+control\s+superiores/i.test(p.nombre || ''));
    });
  }
  function buscarMesetaSugerida({ prod = null, veh = null, prodsCarrito = [] } = {}) {
    const mesetas = productos().filter((p) => p.categoria === 'partes' && p.subcategoria === 'mesetas');
    if (!mesetas.length) return null;
    if (veh) {
      const porVeh = mesetas.find((m) => Array.isArray(m.compatibles) && m.compatibles.length && productoCompatibleConVeh(m, veh));
      if (porVeh) return porVeh;
    }
    const fuentes = prod ? [prod] : prodsCarrito;
    for (const f of fuentes) {
      for (const comp of (f.compatibles || [])) {
        const match = mesetas.find((m) => Array.isArray(m.compatibles) && m.compatibles.length && m.compatibles.some((mc) => mc.marca === comp.marca && mc.modelo === comp.modelo));
        if (match) return match;
      }
    }
    // Si hay una meseta universal (sin restricción de vehículos), usarla
    return mesetas.find((m) => !Array.isArray(m.compatibles) || !m.compatibles.length) || null;
  }

  function evaluarPopupMesetas(ctx = {}) {
    cerrarPopupMesetas();
    if (carritoTieneMesetas()) return;
    const { modo, prod = null, veh = null } = ctx;
    let claveOmitir = '';
    let prodsSusp = [];

    if (modo === 'carrito') {
      prodsSusp = carrito.map((x) => productoPorId(x.id)).filter((p) => p && p.categoria === 'suspension' && !/con\s+mesetas/i.test(p.nombre || ''));
      if (!prodsSusp.length) return;
      claveOmitir = 'carrito::' + prodsSusp.map((p) => p.id).sort().join(',');
    } else if (modo === 'producto' && prod) {
      claveOmitir = 'prod::' + prod.id;
    } else if (modo === 'catalogo' && veh) {
      claveOmitir = `cat::${veh.marca}::${veh.modelo}::${veh.genNombre || ''}`;
    } else {
      return;
    }

    if (_mesetasOmitidas.has(claveOmitir)) return;

    const meseta = buscarMesetaSugerida({ prod, veh, prodsCarrito: prodsSusp });
    const vehRef = veh
      ? etiquetaVehiculo(veh.marca, veh.modelo, veh.genNombre)
      : (prod?.compatibles?.length === 1 ? `${prod.compatibles[0].marca} ${prod.compatibles[0].modelo}` : '');

    if (!document.body || !document.createElement) return;
    const caja = document.createElement('aside');
    caja.id = 'mesetas-popup';
    caja.className = 'mesetas-popup';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-label', 'Sugerencia de brazos de control superiores');
    caja.innerHTML = `
      <button type="button" class="mesetas-cerrar" id="mesetas-cerrar" aria-label="Cerrar sugerencia">✕</button>
      <div class="mesetas-encabezado">
        <span class="mesetas-icono">${SVG_ICONOS.wrench}</span>
        <strong>Recomendación técnica Jacks4WD</strong>
      </div>
      <p class="mesetas-texto">Sugerimos combinar tu kit de suspensión${vehRef ? ` para <strong>${esc(vehRef)}</strong>` : ''} con <strong>Brazos de Control Superiores (Mesetas)</strong> para mantener una alineación exacta y proteger las rótulas.</p>
      ${meseta ? `
      <div class="mesetas-prod">
        <div class="mesetas-prod-foto">${fotoHTML(meseta)}</div>
        <div class="mesetas-prod-info">
          <span class="mesetas-prod-nombre">${esc(meseta.nombre)}</span>
          <span class="mesetas-prod-precio">${fmt(meseta.precio)} USD</span>
        </div>
      </div>` : ''}
      <div class="mesetas-acciones">
        <button type="button" class="btn small" id="mesetas-btn-add">${meseta ? '+ Añadir al carrito' : 'Ver mesetas disponibles'}</button>
        <button type="button" class="btn small ghost" id="mesetas-btn-faq">¿Por qué?</button>
      </div>`;
    document.body.appendChild(caja);

    const btnCerrar = document.getElementById('mesetas-cerrar');
    if (btnCerrar) {
      btnCerrar.onclick = () => {
        _mesetasOmitidas.add(claveOmitir);
        cerrarPopupMesetas();
      };
    }
    const btnAdd = document.getElementById('mesetas-btn-add');
    if (btnAdd) {
      btnAdd.onclick = () => {
        if (meseta) {
          agregarAlCarrito(meseta.id);
          cerrarPopupMesetas();
          if (modo === 'carrito') vistaCarrito();
        } else {
          cerrarPopupMesetas();
          location.hash = veh ? `${urlCatalogoConVeh('partes', veh)}${urlCatalogoConVeh('partes', veh).includes('?') ? '&' : '?'}sub=mesetas` : '#/catalogo/partes?sub=mesetas';
        }
      };
    }
    const btnFaq = document.getElementById('mesetas-btn-faq');
    if (btnFaq) {
      btnFaq.onclick = () => {
        cerrarPopupMesetas();
        location.hash = '#/faq?tema=mesetas';
      };
    }
  }

  // ===================== CARRITO =====================
  function agregarAlCarrito(id, variante) {
    const p = productoPorId(id); if (!p) return;
    const clave = id + (variante ? '::' + variante : '');
    const existente = carrito.find((x) => x.clave === clave);
    if (existente) existente.cant++;
    else carrito.push({ clave, id, variante: variante || '', cant: 1 });
    guardarCarrito();
    toast('Añadido al carrito');
  }
  function vistaCarrito() {
    const desc = clienteRegistrado();
    if (!carrito.length) {
      $('#vista').innerHTML = `<h1>Carrito</h1><p class="vacio">Tu carrito está vacío.</p><div style="text-align:center"><a class="btn" href="#/catalogo/all">Ver productos</a></div>`;
      return;
    }
    const total = carrito.reduce((a, x) => a + (productoPorId(x.id)?.precio || 0) * x.cant, 0);
    const conDesc = desc ? total * (1 - desc.desc / 100) : total;
    $('#vista').innerHTML = `
      <h1>Tu pedido</h1>
      ${desc ? `<div class="banner-descuento">Hola${desc.nombre ? ' ' + esc(desc.nombre) : ''}: eres cliente registrado, ${desc.desc}% de descuento aplicado.</div>` : ''}
      <div class="carrito-lista">
        ${carrito.map((x) => {
          const p = productoPorId(x.id);
          if (!p) return '';
          return `<div class="carrito-item">
            <div class="foto">${fotoHTML(p)}</div>
            <div class="info">
              <div class="nombre">${esc(p.nombre)}</div>
              ${x.variante ? `<div class="var">${esc(x.variante)}</div>` : ''}
              <div class="cant">
                <button type="button" data-dec="${esc(x.clave)}" aria-label="Disminuir cantidad">−</button><span>${x.cant}</span><button type="button" data-inc="${esc(x.clave)}" aria-label="Aumentar cantidad">+</button>
              </div>
            </div>
            <div class="precio">${fmt(p.precio * x.cant)}</div>
            <button type="button" class="carrito-quitar" data-del="${esc(x.clave)}" aria-label="Eliminar ${esc(p.nombre)} del carrito" title="Eliminar del carrito">✕</button>
          </div>`;
        }).join('')}
      </div>
      <div class="resumen">
        <div class="fila"><span>Subtotal</span><span>${fmt(total)}</span></div>
        ${desc ? `<div class="fila"><span>Descuento (${desc.desc}%)</span><span>−${fmt(total - conDesc)}</span></div>` : ''}
        <div class="total"><span>Total</span><span>${fmt(conDesc)}</span></div>
        <div class="pago-opciones" style="margin-top:12px">
          <label><input type="radio" name="pago" value="Pago Móvil" checked> Pago Móvil</label>
          <label><input type="radio" name="pago" value="Zelle"> Zelle</label>
          <label><input type="radio" name="pago" value="Efectivo al retirar"> Efectivo al retirar en el taller</label>
        </div>
        <button class="btn wa grande" id="btn-pedir" style="width:100%">Pedir por WhatsApp</button>
      </div>`;
    $$('#vista .cant button').forEach((b) => (b.onclick = () => {
      const x = carrito.find((i) => i.clave === b.dataset.dec || i.clave === b.dataset.inc);
      if (!x) return;
      if (b.dataset.dec !== undefined) { x.cant = Math.max(0, x.cant - 1); if (x.cant === 0) carrito = carrito.filter((i) => i !== x); }
      else x.cant++;
      guardarCarrito(); vistaCarrito();
    }));
    $$('#vista [data-del]').forEach((b) => (b.onclick = () => {
      carrito = carrito.filter((i) => i.clave !== b.dataset.del);
      guardarCarrito();
      vistaCarrito();
    }));
    $('#btn-pedir').onclick = () => pedirWhatsApp(conDesc);
    evaluarPopupMesetas({ modo: 'carrito', veh: leerVehActivo() });
  }
  function pedirWhatsApp(total) {
    const pago = $('input[name="pago"]:checked')?.value || 'Pago Móvil';
    const desc = clienteRegistrado();
    const lineas = carrito.map((x) => {
      const p = productoPorId(x.id);
      return `• ${p.nombre}${x.variante ? ' (' + x.variante + ')' : ''} x${x.cant} — ${fmt(p.precio * x.cant)}`;
    }).join('\n');
    const mensaje = `Hola ${CFG.nombre}! Quiero hacer un pedido:\n\n${lineas}\n\nTotal: ${fmt(total)} USD\nPago: ${pago}\n${desc ? 'Cliente registrado (descuento aplicado).\n' : ''}\nMi nombre es: `;
    window.open(`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank');
  }

  // ===================== ADMINISTRACIÓN =====================
  let sesionAdmin = null;

  async function loginAdmin(email, clave) {
    if (!NUBE || !NUBE.url || !NUBE.clave) throw new Error('No hay conexión configurada.');
    const r = await fetch(`${NUBE.url}/auth/v1/token?grant_type=password`, {
      method: 'POST', headers: { apikey: NUBE.clave, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: clave }),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error_description || d.msg || 'No se pudo iniciar sesión');
    // Verificar que sea admin
    const perfil = await fetch(`${NUBE.url}/rest/v1/perfiles?select=rol&id=eq.${d.user.id}`, {
      headers: { apikey: NUBE.clave, Authorization: 'Bearer ' + d.access_token, 'Content-Type': 'application/json' },
    }).then((x) => x.json());
    if (!perfil.length || perfil[0].rol !== 'admin') throw new Error('Este usuario no es administrador.');
    return { access_token: d.access_token, email: d.user.email };
  }

  async function guardarCatalogoNube() {
    if (!sesionAdmin) throw new Error('Inicia sesión primero.');
    const r = await fetch(`${NUBE.url}/rest/v1/tienda`, {
      method: 'POST',
      headers: { apikey: NUBE.clave, Authorization: 'Bearer ' + sesionAdmin.access_token, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
      body: JSON.stringify({ id: 'catalogo', data: { config: catalogo.config, marcas: catalogo.marcas, productos: catalogo.productos, vehiculos: catalogo.vehiculos } }),
    });
    if (!r.ok) { const t = await r.text(); throw new Error(t || 'No se pudo guardar'); }
    guardarCatalogoLocal();
  }

  function vistaAdmin() {
    const pintarLogin = () => {
      $('#vista').innerHTML = `
        <h1>Administrar tienda</h1>
        <p class="hint">Inicia sesión con la cuenta de administrador para editar marcas y productos.</p>
        <div class="card" style="padding:20px;max-width:420px">
          <form id="form-admin-login">
            <label style="display:block;margin-bottom:10px">Usuario
              <input name="usuario" autocomplete="username" placeholder="admin" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">
            </label>
            <label style="display:block;margin-bottom:12px">Contraseña
              <input name="clave" type="password" autocomplete="current-password" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">
            </label>
            <p id="admin-msg" class="hint" style="color:var(--bad)"></p>
            <button class="btn" type="submit">Entrar</button>
          </form>
        </div>`;
      $('#form-admin-login').onsubmit = async (e) => {
        e.preventDefault();
        const f = e.target; const btn = f.querySelector('button');
        let usuario = f.usuario.value.trim().toLowerCase();
        if (!usuario.includes('@')) usuario += '@' + (CFG.dominioUsuarios || 'jacks4wd.app');
        btn.disabled = true;
        try { sesionAdmin = await loginAdmin(usuario, f.clave.value); pintarPanel(); }
        catch (err) { $('#admin-msg').textContent = err.message; }
        finally { btn.disabled = false; }
      };
    };

    const pintarPanel = () => {
      $('#vista').innerHTML = `
        <div class="seccion-head">
          <h1>Administrar tienda</h1>
          <div style="display:flex;gap:8px">
            <button class="btn ghost" id="admin-salir">Salir</button>
            <button class="btn" id="admin-guardar">💾 Guardar en la nube</button>
          </div>
        </div>
        <p id="admin-estado" class="hint"></p>

        <section class="seccion">
          <div class="seccion-head"><h2>Configuración de la página</h2></div>
          <div class="card" style="padding:16px">
            <div class="grid" style="grid-template-columns:2fr 1fr;gap:10px">
              <label style="font-size:.88rem;font-weight:600">Título del hero
                <input id="cfg-hero-titulo" value="${esc(config().heroTitulo)}" style="width:100%;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit;margin-top:4px">
              </label>
              <label style="display:flex;flex-direction:column;gap:4px;font-size:.88rem;font-weight:600">Color acento de marca
                <input id="cfg-color-acento" type="color" value="${esc(config().colorAcento || '#b43a08')}" style="width:100%;height:40px;padding:2px;border:1px solid var(--linea);border-radius:8px;cursor:pointer">
              </label>
            </div>
            <label style="display:block;margin-top:10px;font-size:.88rem;font-weight:600">Subtítulo del hero
              <input id="cfg-hero-sub" value="${esc(config().heroSubtitulo)}" style="width:100%;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit;margin-top:4px">
            </label>
            <label style="display:block;margin-top:10px;font-size:.88rem;font-weight:600">Descripción del pie de página
              <input id="cfg-footer" value="${esc(config().footerDescripcion)}" style="width:100%;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit;margin-top:4px">
            </label>
            <div style="margin-top:14px;padding:14px;border:1px solid var(--linea);border-radius:8px;background:var(--bg)">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
                <label style="display:flex;align-items:center;gap:8px;font-size:.9rem;font-weight:700;cursor:pointer">
                  <input type="checkbox" id="cfg-modo-ig" ${config().modoPrivadoIG !== false ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--primary)">
                  Modo pre-lanzamiento: redirigir público general a Instagram
                </label>
                <button type="button" class="btn small" id="btn-copiar-invitado">Copiar link de invitado</button>
              </div>
              <div style="display:flex;align-items:center;gap:10px;margin-top:10px;flex-wrap:wrap">
                <label style="font-size:.84rem;font-weight:600;color:var(--texto-suave)">Clave de invitado:
                  <input id="cfg-clave-invitado" value="${esc(config().claveInvitado || 'jacks4wd')}" style="padding:7px 10px;border:1px solid var(--linea-fuerte);border-radius:6px;font:inherit;margin-left:6px;width:160px">
                </label>
                <span class="hint" style="font-size:.82rem">Quien abra tu enlace de invitado podrá ver y probar toda la tienda desde cualquier teléfono o computadora; el resto irá directo a Instagram.</span>
              </div>
            </div>
            <div style="margin-top:14px">
              <label style="display:block;font-weight:700;margin-bottom:8px;font-size:.9rem">Foto del hero (banner principal)</label>
              <div class="foto-box" id="hero-foto-box">
                <div id="hero-foto-preview">${config().heroFoto ? `<img src="${esc(config().heroFoto)}" style="max-height:130px;border-radius:8px">` : '<div class="sin-foto" style="font-size:1rem;height:auto;background:transparent;color:var(--muted)">Sin foto de portada</div>'}</div>
                <button type="button" class="btn small primary" id="cfg-hero-buscar">Buscar en Google</button>
                <label class="btn small ghost">Elegir archivo<input id="cfg-hero-foto-input" type="file" accept="image/*" hidden></label>
                <button type="button" class="btn tiny ghost" id="cfg-hero-quitar" ${config().heroFoto ? '' : 'hidden'}>Quitar</button>
              </div>
              <p class="hint pasos-foto" style="margin-top:6px">Ctrl+V tras copiar imagen, o arrastra/elige archivo. Las superficies del catálogo se mantienen siempre en blanco estudio para preservar la nitidez de las piezas.</p>
            </div>
          </div>
        </section>

        <section class="seccion">
          <div class="seccion-head"><h2>Preguntas frecuentes (FAQ)</h2><button class="btn ghost" id="faq-nueva">+ Nueva pregunta</button></div>
          <p class="hint" style="margin:-6px 0 12px">Personaliza las respuestas de la página FAQ. La pregunta marcada para Mesetas se abrirá automáticamente cuando un cliente toque “¿Por qué?” en la sugerencia de Brazos de Control Superiores.</p>
          <div style="display:flex;flex-direction:column;gap:12px" id="lista-faqs"></div>
        </section>

        <section class="seccion">
          <div class="seccion-head"><h2>Categorías</h2><button class="btn ghost" id="cat-nueva">+ Nueva categoría</button></div>
          <div class="grid" id="lista-categorias"></div>
        </section>

        <section class="seccion">
          <div class="seccion-head"><h2>Tipos de merch</h2><button class="btn ghost" id="merch-tipo-nuevo">+ Nuevo tipo</button></div>
          <p class="hint" style="margin:-6px 0 12px">Aparecen en el menú izquierdo de Merch. Marca “Hombres / Mujeres” para que el tipo tenga submenú. Luego asigna el tipo en cada producto de categoría Merch.</p>
          <div class="grid" id="lista-merch-tipos"></div>
        </section>

        <section class="seccion">
          <div class="seccion-head"><h2>Marcas</h2><button class="btn ghost" id="marca-nueva">+ Nueva marca</button></div>
          <div class="grid" id="lista-marcas"></div>
        </section>

        <section class="seccion">
          <div class="seccion-head"><h2>Vehículos</h2><button class="btn ghost" id="veh-nuevo">+ Nuevo vehículo</button></div>
          <p class="hint" style="margin:-6px 0 12px">Tip rápido: haz clic o arrastra una foto directamente sobre el recuadro de cualquier vehículo para cambiar su imagen sin abrir el editor.</p>
          <div class="grid" id="lista-vehiculos"></div>
        </section>

        <section class="seccion">
          <div class="seccion-head"><h2>Productos</h2><button class="btn ghost" id="prod-nuevo">+ Nuevo producto</button></div>
          <div class="card" style="padding:16px;margin-bottom:16px" id="lote-foto-card">
            <div style="font-weight:700;font-size:.95rem;margin-bottom:6px">Carga rápida de foto por línea o marca</div>
            <p class="hint" style="margin:0 0 12px;font-size:.84rem">¿Muchos kits comparten la misma foto de referencia (por ejemplo Nitrocharger, MT64 o BP-51)? Elige el grupo y sube o pega una sola imagen para aplicarla a todos de una vez. También puedes hacer clic o arrastrar una imagen directo sobre la miniatura de cada producto abajo.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              <select id="lote-grupo" style="padding:9px 12px;border:1px solid var(--linea-fuerte);border-radius:6px;font:inherit;min-width:220px">
                <option value="sub:nitrocharger">Línea: Kits Nitrocharger</option>
                <option value="sub:mt64">Línea: Kits MT64</option>
                <option value="sub:bp51">Línea: Kits BP-51</option>
                <option value="sub:mesetas">Subcategoría: Brazos / Mesetas</option>
                ${marcas().map((m) => `<option value="marca:${esc(m.nombre)}">Marca: ${esc(m.nombre)}</option>`).join('')}
              </select>
              <label class="btn small primary" style="cursor:pointer">Elegir foto para el grupo<input type="file" id="lote-foto-input" accept="image/*" hidden></label>
              <label style="display:flex;align-items:center;gap:6px;font-size:.84rem;font-weight:600;cursor:pointer">
                <input type="checkbox" id="lote-solo-vacios" checked style="accent-color:var(--primary)"> Solo productos sin foto
              </label>
              <span id="lote-estado" class="hint" style="font-size:.84rem;font-weight:700;color:var(--ok)"></span>
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
            <input id="admin-buscar-prod" placeholder="Buscar producto por nombre, vehículo, marca o altura…" style="flex:1;min-width:220px;padding:10px 12px;border:1px solid var(--linea-fuerte);border-radius:8px;font:inherit">
            <select id="admin-filtro-prod" style="padding:10px 12px;border:1px solid var(--linea-fuerte);border-radius:8px;font:inherit">
              <option value="">Todos los productos</option>
              <option value="sin-foto">Solo sin foto</option>
              ${categorias().map((c) => `<option value="cat:${esc(c.id)}">${esc(c.nombre)}</option>`).join('')}
            </select>
          </div>
          <div class="grid" id="lista-productos"></div>
        </section>`;
      pintarListaFAQs();
      pintarListaCategorias();
      pintarListaMerchTipos();
      pintarListaMarcas();
      pintarListaVehiculos();
      pintarListaProductos();
      // Guardar configuración de página al salir de esos campos
      ['cfg-hero-titulo', 'cfg-hero-sub', 'cfg-footer', 'cfg-color-acento', 'cfg-modo-ig', 'cfg-clave-invitado'].forEach((id) => {
        const el = $('#' + id); if (!el) return;
        el.oninput = el.onchange = () => {
          const c = config();
          if (id === 'cfg-hero-titulo') c.heroTitulo = el.value;
          else if (id === 'cfg-hero-sub') c.heroSubtitulo = el.value;
          else if (id === 'cfg-footer') c.footerDescripcion = el.value;
          else if (id === 'cfg-color-acento') c.colorAcento = el.value;
          else if (id === 'cfg-modo-ig') {
            c.modoPrivadoIG = el.checked;
            try { localStorage.setItem('jacks4wd-modo-publico', el.checked ? '0' : '1'); } catch {}
          } else if (id === 'cfg-clave-invitado') {
            c.claveInvitado = el.value.trim() || 'jacks4wd';
          }
          guardarCatalogoLocal();
          aplicarConfig();
        };
      });

      const btnCopiarInv = $('#btn-copiar-invitado');
      if (btnCopiarInv) {
        btnCopiarInv.onclick = () => {
          const clave = encodeURIComponent((config().claveInvitado || 'jacks4wd').trim());
          const base = (location.origin && location.origin !== 'null' ? location.origin + location.pathname : 'https://tienda.jacks4wd.com/');
          const link = `${base}?invitado=${clave}`;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).then(() => toast('Link de invitado copiado')).catch(() => prompt('Copia este link de invitado:', link));
          } else {
            prompt('Copia este link de invitado:', link);
          }
        };
      }

      // --- Carga masiva de foto por línea o marca ---
      const aplicarFotoLote = async (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        try {
          const dataUrl = await redimensionarImagen(file, 500);
          const criterio = $('#lote-grupo').value;
          const soloVacios = $('#lote-solo-vacios').checked;
          let aplicados = 0;
          productos().forEach((p) => {
            if (soloVacios && p.foto) return;
            const coincide = criterio.startsWith('sub:')
              ? p.subcategoria === criterio.slice(4)
              : p.marca === criterio.slice(6);
            if (coincide) { p.foto = dataUrl; aplicados++; }
          });
          guardarCatalogoLocal();
          pintarListaProductos();
          $('#lote-estado').textContent = aplicados
            ? `Foto aplicada a ${aplicados} producto(s). Recuerda pulsar "Guardar en la nube".`
            : 'Ningún producto coincidió (desmarca "Solo productos sin foto" si deseas reemplazarlas).';
        } catch (err) { alert(err.message); }
      };
      $('#lote-foto-input').onchange = (e) => aplicarFotoLote(e.target.files[0]);
      const loteCard = $('#lote-foto-card');
      loteCard.ondragover = (e) => { e.preventDefault(); loteCard.classList.add('soltar'); };
      loteCard.ondragleave = () => loteCard.classList.remove('soltar');
      loteCard.ondrop = (e) => { e.preventDefault(); loteCard.classList.remove('soltar'); aplicarFotoLote(e.dataTransfer.files[0]); };

      $('#admin-buscar-prod').oninput = () => pintarListaProductos();
      $('#admin-filtro-prod').onchange = () => pintarListaProductos();

      // --- Foto del hero ---
      const pintarHeroPreview = () => {
        const f = config().heroFoto;
        $('#hero-foto-preview').innerHTML = f
          ? `<img src="${esc(f)}" style="max-height:130px;border-radius:8px">`
          : '<div class="sin-foto" style="font-size:1rem;height:auto;background:transparent;color:var(--muted)">Sin foto de portada</div>';
        $('#cfg-hero-quitar').hidden = !f;
      };
      const usarFotoHero = async (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        try {
          config().heroFoto = await redimensionarImagen(file, 1600);
          guardarCatalogoLocal(); pintarHeroPreview();
        } catch (e) { alert(e.message); }
      };
      const alPegarHero = (e) => {
        const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'));
        if (item && document.getElementById('hero-foto-box')) { e.preventDefault(); usarFotoHero(item.getAsFile()); }
      };

      // --- Zona del hero ---
      const heroFotoZona = $('#hero-foto-box');
      heroFotoZona.ondragover = (e) => { e.preventDefault(); heroFotoZona.classList.add('soltar'); };
      heroFotoZona.ondragleave = () => heroFotoZona.classList.remove('soltar');
      heroFotoZona.ondrop = (e) => { e.preventDefault(); heroFotoZona.classList.remove('soltar'); usarFotoHero(e.dataTransfer.files[0]); };

      $('#cfg-hero-foto-input').onchange = (e) => usarFotoHero(e.target.files[0]);
      $('#cfg-hero-buscar').onclick = () => window.open('https://www.google.com/search?tbm=isch&q=4x4+offroad+4runner+prado+adventure+landscape+wide', '_blank', 'noopener');
      $('#cfg-hero-quitar').onclick = () => { config().heroFoto = ''; guardarCatalogoLocal(); pintarHeroPreview(); };

      const alPegarPanel = (e) => {
        if (document.getElementById('modal')?.open) return;
        alPegarHero(e);
      };
      document.addEventListener('paste', alPegarPanel);
      // Limpiar listener de paste al salir del admin
      $('#admin-salir').onclick = () => { document.removeEventListener('paste', alPegarPanel); sesionAdmin = null; pintarLogin(); };
      $('#admin-guardar').onclick = async () => {
        try { await guardarCatalogoNube(); $('#admin-estado').textContent = '✅ Guardado en la nube.'; }
        catch (e) { $('#admin-estado').textContent = '❌ ' + e.message; }
      };
      $('#marca-nueva').onclick = () => editarMarca(null);
      $('#veh-nuevo').onclick = () => editarVehiculo(null);
      $('#prod-nuevo').onclick = () => editarProducto(null);
      $('#cat-nueva').onclick = () => {
        const c = categorias();
        const id = 'cat' + Date.now().toString(36);
        c.push({ id, nombre: 'Nueva categoría', shop: 'Nueva categoría', icono: '📦', texto: '' });
        guardarCatalogoLocal();
        pintarListaCategorias();
      };
    };

    const pintarListaFAQs = () => {
      const lista = faqs();
      const caja = $('#lista-faqs');
      if (!caja) return;
      caja.innerHTML = lista.map((f) => `
        <div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px">
          <input data-faq="${esc(f.id)}" data-f="pregunta" value="${esc(f.pregunta)}" placeholder="Escribe la pregunta frecuente" style="width:100%;padding:9px 11px;border:1px solid var(--linea-fuerte);border-radius:8px;font:inherit;font-weight:700">
          <textarea data-faq="${esc(f.id)}" data-f="respuesta" rows="3" placeholder="Escribe la respuesta detallada" style="width:100%;padding:9px 11px;border:1px solid var(--linea);border-radius:8px;font:inherit">${esc(f.respuesta)}</textarea>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <label style="display:flex;align-items:center;gap:8px;font-size:.85rem;font-weight:600;cursor:pointer">
              <input type="radio" name="faq-mesetas-sel" data-faq="${esc(f.id)}" data-f="esMesetas" ${f.esMesetas ? 'checked' : ''} style="accent-color:var(--primary)">
              Abrir esta respuesta al tocar "¿Por qué?" en el pop-up de Mesetas
            </label>
            <button type="button" class="btn tiny ghost" data-faq-borrar="${esc(f.id)}" style="color:var(--bad)">✕ Eliminar</button>
          </div>
        </div>`).join('') || '<p class="vacio">Sin preguntas frecuentes.</p>';

      caja.oninput = caja.onchange = (e) => {
        const el = e.target.closest('[data-faq]'); if (!el) return;
        const item = lista.find((x) => x.id === el.dataset.faq); if (!item) return;
        if (el.dataset.f === 'esMesetas') {
          lista.forEach((x) => { x.esMesetas = (x.id === item.id); });
        } else {
          item[el.dataset.f] = el.value;
        }
        guardarCatalogoLocal();
      };
      caja.onclick = (e) => {
        const b = e.target.closest('[data-faq-borrar]'); if (!b) return;
        if (!confirm('¿Eliminar esta pregunta frecuente?')) return;
        const idx = lista.findIndex((x) => x.id === b.dataset.faqBorrar);
        if (idx >= 0) lista.splice(idx, 1);
        if (lista.length && !lista.some((x) => x.esMesetas)) lista[0].esMesetas = true;
        guardarCatalogoLocal();
        pintarListaFAQs();
      };
      const btnNueva = $('#faq-nueva');
      if (btnNueva) {
        btnNueva.onclick = () => {
          lista.push({ id: 'faq-' + Date.now().toString(36), pregunta: 'Nueva pregunta frecuente', respuesta: '', esMesetas: lista.length === 0 });
          guardarCatalogoLocal();
          pintarListaFAQs();
        };
      }
    };

    const pintarListaCategorias = () => {
      $('#lista-categorias').innerHTML = categorias().map((c) => `
        <div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <div class="cat-icono-preview" data-cat-id="${esc(c.id)}" style="width:56px;height:56px;border:2px dashed var(--linea);border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;font-size:1.6rem;background:var(--bg-suave)" title="Clic para cambiar icono/imagen">
                ${c.icono && (c.icono.startsWith('data:image') || c.icono.startsWith('http')) ? `<img src="${esc(c.icono)}" style="width:100%;height:100%;object-fit:cover">` : `<span>${c.icono || '📦'}</span>`}
              </div>
              <span style="font-size:.7rem;color:var(--muted)">Icono</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;flex:1;min-width:200px">
              <input data-cat="${esc(c.id)}" data-f="nombre" value="${esc(c.nombre)}" placeholder="Nombre" style="width:100%;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit" title="Nombre de la categoría">
              <input data-cat="${esc(c.id)}" data-f="texto" value="${esc(c.texto || '')}" placeholder="Descripción corta" style="width:100%;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit" title="Descripción corta">
              ${c.id === 'merch' ? '<span style="font-size:.78rem;color:var(--muted)">Los submenús de Merch se administran en “Tipos de merch”.</span>' : `<input data-cat="${esc(c.id)}" data-f="subs" value="${esc((c.subcategorias || []).map((s) => s.nombre).join(', '))}" placeholder="Subcategorías del menú (separadas por coma)" style="width:100%;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit" title="Subcategorías del menú superior, separadas por coma">`}
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
              <button type="button" class="btn tiny ghost" data-cat-borrar="${esc(c.id)}" style="color:var(--bad)">✕ Eliminar</button>
            </div>
          </div>
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
            <span style="font-size:.8rem;font-weight:600;color:var(--muted)">Emoji:</span>
            <input data-cat="${esc(c.id)}" data-f="icono" value="${c.icono && !c.icono.startsWith('data:') && !c.icono.startsWith('http') ? esc(c.icono) : ''}" placeholder="🔧" style="width:60px;padding:7px;border:1px solid var(--linea);border-radius:8px;font:inherit;text-align:center;font-size:1.2rem" title="Escribe un emoji">
            <span style="font-size:.8rem;color:var(--muted)">o</span>
            <label class="btn small ghost" style="cursor:pointer">📁 Subir imagen<input type="file" accept="image/*" data-cat-foto="${esc(c.id)}" hidden></label>
            ${c.icono && (c.icono.startsWith('data:image') || c.icono.startsWith('http')) ? `<button type="button" class="btn tiny ghost" data-cat-quitar-foto="${esc(c.id)}" style="color:var(--bad)">Quitar imagen</button>` : ''}
          </div>
        </div>`).join('');

      $('#lista-categorias').oninput = (e) => {
        const i = e.target.closest('[data-cat]'); if (!i || !i.dataset.f) return;
        const c = categorias().find((x) => x.id === i.dataset.cat); if (!c) return;
        if (i.dataset.f === 'subs') {
          // Conserva los id existentes para no desvincular productos al editar nombres
          const prev = c.subcategorias || [];
          const nombres = i.value.split(',').map((x) => x.trim()).filter(Boolean);
          const usados = new Set();
          const out = nombres.map((n) => { const m = prev.find((s) => s.nombre === n && !usados.has(s.id)); if (m) usados.add(m.id); return m; });
          out.forEach((m, k) => {
            if (m) return;
            const p2 = prev[k];
            if (p2 && !usados.has(p2.id) && !nombres.includes(p2.nombre)) { usados.add(p2.id); out[k] = { id: p2.id, nombre: nombres[k] }; }
            else out[k] = { id: 's' + Math.random().toString(36).slice(2, 8), nombre: nombres[k] };
          });
          c.subcategorias = out;
        } else c[i.dataset.f] = i.value;
        guardarCatalogoLocal();
      };

      // Manejar subida de imagen para icono
      $$('#lista-categorias [data-cat-foto]').forEach((input) => {
        input.onchange = async (e) => {
          const file = e.target.files[0]; if (!file) return;
          const catId = input.dataset.catFoto;
          const c = categorias().find((x) => x.id === catId); if (!c) return;
          try {
            c.icono = await redimensionarImagen(file, 120);
            guardarCatalogoLocal();
            pintarListaCategorias();
          } catch (err) { alert(err.message); }
        };
      });

      $('#lista-categorias').onclick = (e) => {
        // Quitar imagen de icono
        const q = e.target.closest('[data-cat-quitar-foto]');
        if (q) {
          const c = categorias().find((x) => x.id === q.dataset.catQuitarFoto); if (!c) return;
          c.icono = '📦'; guardarCatalogoLocal(); pintarListaCategorias(); return;
        }
        // Eliminar categoría
        const b = e.target.closest('[data-cat-borrar]'); if (!b) return;
        if (!confirm('¿Eliminar esta categoría?')) return;
        const idx = categorias().findIndex((x) => x.id === b.dataset.catBorrar);
        if (idx >= 0) categorias().splice(idx, 1);
        guardarCatalogoLocal();
        pintarListaCategorias();
      };
    };

    const pintarListaMerchTipos = () => {
      const tipos = merchTipos();
      $('#lista-merch-tipos').innerHTML = tipos.map((t) => `
        <div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px">
          <input data-mt="${esc(t.id)}" data-f="nombre" value="${esc(t.nombre)}" placeholder="Nombre (ej. Franelas)" style="width:100%;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit">
          <label style="display:flex;gap:8px;align-items:center;font-size:.88rem;font-weight:600;cursor:pointer">
            <input type="checkbox" data-mt="${esc(t.id)}" data-f="generos" ${t.generos ? 'checked' : ''}> Submenú Hombres / Mujeres
          </label>
          <button type="button" class="btn tiny ghost" data-mt-borrar="${esc(t.id)}" style="color:var(--bad);align-self:flex-start">✕ Eliminar</button>
        </div>`).join('') || '<p class="vacio">Sin tipos de merch.</p>';
      const caja = $('#lista-merch-tipos');
      caja.oninput = caja.onchange = (e) => {
        const i = e.target.closest('[data-mt]'); if (!i) return;
        const t = tipos.find((x) => x.id === i.dataset.mt); if (!t) return;
        if (i.dataset.f === 'nombre') t.nombre = i.value;
        else if (i.dataset.f === 'generos') t.generos = i.checked;
        guardarCatalogoLocal();
      };
      caja.onclick = (e) => {
        const b = e.target.closest('[data-mt-borrar]'); if (!b) return;
        const t = tipos.find((x) => x.id === b.dataset.mtBorrar); if (!t) return;
        if (!confirm(`¿Eliminar el tipo "${t.nombre}"? Los productos asociados quedarán sin tipo.`)) return;
        productos().forEach((p) => { if (p.tipo === t.id) p.tipo = ''; });
        tipos.splice(tipos.indexOf(t), 1);
        guardarCatalogoLocal();
        pintarListaMerchTipos();
      };
      $('#merch-tipo-nuevo').onclick = () => {
        tipos.push({ id: 'mt' + Date.now().toString(36), nombre: 'Nuevo tipo', generos: false });
        guardarCatalogoLocal();
        pintarListaMerchTipos();
      };
    };

    const pintarListaMarcas = () => {
      $('#lista-marcas').innerHTML = marcas().map((m) => `
        <div class="card" style="padding:14px;display:flex;gap:12px;align-items:center">
          <div class="v-logo" style="width:56px;height:56px;flex:none;border-radius:10px;overflow:hidden;border:1px solid var(--linea);display:flex;align-items:center;justify-content:center">${logoMarca(m.nombre)}</div>
          <div style="flex:1;min-width:0">
            <div class="nombre">${esc(m.nombre)}</div>
            <div class="hint">${esc(m.descripcion || '')}</div>
          </div>
          <button class="btn ghost" data-editar-marca="${esc(m.id)}">Editar</button>
        </div>`).join('') || '<p class="vacio">Sin marcas.</p>';
      $$('#lista-marcas [data-editar-marca]').forEach((b) => (b.onclick = () => editarMarca(b.dataset.editarMarca)));
    };

    const pintarListaVehiculos = () => {
      $('#lista-vehiculos').innerHTML = vehiculos().map((v) => `
        <div class="card" style="padding:14px;display:flex;gap:12px;align-items:center">
          <label data-drop-veh="${esc(v.id)}" title="Clic o arrastra imagen aquí para cambiar foto rápido" style="width:76px;height:56px;flex:none;border-radius:8px;overflow:hidden;border:1.5px dashed var(--linea-fuerte);display:flex;align-items:center;justify-content:center;background:var(--bg);cursor:pointer;position:relative">
            ${v.foto ? `<img src="${esc(v.foto)}" style="width:100%;height:100%;object-fit:cover">` : `<span class="sin-foto" style="padding:4px">${SVG_ICONOS.truck}</span>`}
            <input type="file" accept="image/*" data-veh-foto-rapida="${esc(v.id)}" hidden>
          </label>
          <div style="flex:1;min-width:0">
            <div class="nombre">${esc(v.marca)} ${esc(v.modelo)}</div>
            <div class="hint">${(v.generaciones || []).map((g) => esc(g.nombre)).join(' · ') || 'Sin generaciones'}</div>
          </div>
          <button class="btn ghost" data-editar-veh="${esc(v.id)}">Editar</button>
        </div>`).join('') || '<p class="vacio">Sin vehículos.</p>';
      $$('#lista-vehiculos [data-editar-veh]').forEach((b) => (b.onclick = () => editarVehiculo(b.dataset.editarVeh)));
      const subirRapidoVeh = async (vId, file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const v = vehiculos().find((x) => x.id === vId); if (!v) return;
        try {
          v.foto = await redimensionarImagen(file, 600);
          guardarCatalogoLocal();
          pintarListaVehiculos();
          toast(`Foto actualizada: ${v.marca} ${v.modelo}`);
        } catch (err) { alert(err.message); }
      };
      $$('#lista-vehiculos [data-veh-foto-rapida]').forEach((inp) => {
        inp.onchange = (e) => subirRapidoVeh(inp.dataset.vehFotoRapida, e.target.files[0]);
      });
      $$('#lista-vehiculos [data-drop-veh]').forEach((zona) => {
        zona.ondragover = (e) => { e.preventDefault(); zona.style.borderColor = 'var(--primary)'; };
        zona.ondragleave = () => { zona.style.borderColor = ''; };
        zona.ondrop = (e) => { e.preventDefault(); zona.style.borderColor = ''; subirRapidoVeh(zona.dataset.dropVeh, e.dataTransfer.files[0]); };
      });
    };

    const pintarListaProductos = () => {
      const qTxt = ($('#admin-buscar-prod')?.value || '').trim().toLowerCase();
      const filtro = $('#admin-filtro-prod')?.value || '';
      const filtrados = productos().filter((p) => {
        if (filtro === 'sin-foto' && p.foto) return false;
        if (filtro.startsWith('cat:') && p.categoria !== filtro.slice(4)) return false;
        if (!qTxt) return true;
        const compTxt = (p.compatibles || []).map((c) => `${c.marca} ${c.modelo} ${c.genNombre || ''}`).join(' ');
        return `${p.nombre} ${p.marca || ''} ${p.altura || ''} ${compTxt}`.toLowerCase().includes(qTxt);
      });

      $('#lista-productos').innerHTML = filtrados.map((p) => `
        <div class="card" style="padding:14px;display:flex;gap:12px;align-items:center">
          <label data-drop-prod="${esc(p.id)}" title="Clic o arrastra imagen aquí para cambiar foto sin abrir editor" style="width:60px;height:60px;flex:none;border-radius:8px;overflow:hidden;border:1.5px dashed var(--linea-fuerte);display:flex;align-items:center;justify-content:center;background:#ffffff;cursor:pointer">
            ${fotoHTML(p)}
            <input type="file" accept="image/*" data-prod-foto-rapida="${esc(p.id)}" hidden>
          </label>
          <div style="flex:1;min-width:0">
            <div class="nombre">${esc(p.nombre)}</div>
            <div class="hint">${esc(categorias().find((c) => c.id === p.categoria)?.nombre || p.categoria)} · ${esc(p.marca || '—')}${p.altura ? ' · Elev. ' + esc(p.altura) : ''} · ${fmt(p.precio)} · ${(p.compatibles || []).length ? p.compatibles.map((c) => esc(c.modelo + (c.genNombre ? ' (' + c.genNombre + ')' : ''))).join(', ') : 'universal'}</div>
          </div>
          <button class="btn ghost" data-editar-prod="${esc(p.id)}">Editar</button>
        </div>`).join('') || '<p class="vacio">No hay productos que coincidan con el filtro.</p>';
      $$('#lista-productos [data-editar-prod]').forEach((b) => (b.onclick = () => editarProducto(b.dataset.editarProd)));
      const subirRapidoProd = async (pId, file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const prod = productoPorId(pId); if (!prod) return;
        try {
          prod.foto = await redimensionarImagen(file, 500);
          guardarCatalogoLocal();
          pintarListaProductos();
          toast('Foto de producto actualizada');
        } catch (err) { alert(err.message); }
      };
      $$('#lista-productos [data-prod-foto-rapida]').forEach((inp) => {
        inp.onchange = (e) => subirRapidoProd(inp.dataset.prodFotoRapida, e.target.files[0]);
      });
      $$('#lista-productos [data-drop-prod]').forEach((zona) => {
        zona.ondragover = (e) => { e.preventDefault(); zona.style.borderColor = 'var(--primary)'; };
        zona.ondragleave = () => { zona.style.borderColor = ''; };
        zona.ondrop = (e) => { e.preventDefault(); zona.style.borderColor = ''; subirRapidoProd(zona.dataset.dropProd, e.dataTransfer.files[0]); };
      });
    };

    if (sesionAdmin) pintarPanel();
    else pintarLogin();
  }

  // ---------- Editor de marca ----------
  function editarMarca(id) {
    const m = id ? marcas().find((x) => x.id === id) : { id: uid(), nombre: '', logo: '', descripcion: '' };
    const nuevo = !id;
    abrirModal(`
      <h3>${nuevo ? 'Nueva marca' : 'Editar marca'}</h3>
      <form id="form-marca">
        <div class="foto-box" id="logo-box">
          <div id="logo-preview">${m.logo ? `<img src="${esc(m.logo)}">` : '<div class="sin-foto">Sin logo</div>'}</div>
          <button type="button" class="btn small primary" id="logo-buscar">🔍 Buscar en Google</button>
          <label class="btn small ghost">Elegir archivo<input id="logo-input" type="file" accept="image/*" hidden></label>
          <button type="button" class="btn tiny ghost" id="logo-quitar">Quitar logo</button>
        </div>
        <p class="hint pasos-foto">1) pulsa <em>Buscar en Google</em> → 2) clic derecho en la imagen → <em>Copiar imagen</em> → 3) vuelve aquí y pulsa <strong>Ctrl + V</strong>. También puedes arrastrar o elegir archivo.</p>
        <label style="display:block;margin-top:12px">Nombre *
          <input name="nombre" required value="${esc(m.nombre)}" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">
        </label>
        <label style="display:block;margin-top:10px">Descripción
          <textarea name="descripcion" rows="2" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">${esc(m.descripcion)}</textarea>
        </label>
        <div class="actions" style="margin-top:14px;display:flex;gap:8px">
          ${nuevo ? '' : '<button type="button" class="btn ghost" id="marca-borrar" style="margin-right:auto;color:var(--bad)">Eliminar</button>'}
          <button type="button" class="btn ghost" data-act="cerrar">Cancelar</button>
          <button class="btn primary" type="submit">Guardar</button>
        </div>
      </form>`);

    let logo = m.logo || '';
    const pintar = () => {
      $('#logo-preview').innerHTML = logo ? `<img src="${esc(logo)}">` : '<div class="sin-foto">Sin logo</div>';
      $('#logo-quitar').hidden = !logo;
    };
    const usarImagen = async (f) => {
      if (!f || !f.type.startsWith('image/')) return;
      try { logo = await redimensionarImagen(f, 240); pintar(); } catch (e) { alert(e.message); }
    };
    const alPegar = (e) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'));
      if (item) { e.preventDefault(); usarImagen(item.getAsFile()); }
    };
    document.addEventListener('paste', alPegar);
    $('#logo-input').onchange = (e) => usarImagen(e.target.files[0]);
    $('#logo-buscar').onclick = () => window.open('https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(`${m.nombre || 'suspension'} logo png`), '_blank', 'noopener');
    $('#logo-quitar').onclick = () => { logo = ''; pintar(); };
    const zona = $('#logo-box');
    zona.ondragover = (e) => { e.preventDefault(); zona.classList.add('soltar'); };
    zona.ondragleave = () => zona.classList.remove('soltar');
    zona.ondrop = (e) => { e.preventDefault(); zona.classList.remove('soltar'); usarImagen(e.dataTransfer.files[0]); };

    $('#form-marca').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target;
      const nombre = f.nombre.value.trim();
      if (!nombre) { alert('Escribe el nombre de la marca.'); return; }
      m.nombre = nombre; m.logo = logo; m.descripcion = f.descripcion.value.trim();
      document.removeEventListener('paste', alPegar);
      const lista = marcas();
      if (nuevo) catalogo.marcas.push(m);
      cerrarModal(); guardarCatalogoLocal(); vistaAdmin();
    };
    $('#marca-borrar')?.addEventListener('click', async () => {
      if (!confirm('¿Eliminar esta marca?')) return;
      catalogo.marcas = catalogo.marcas.filter((x) => x.id !== m.id);
      document.removeEventListener('paste', alPegar);
      cerrarModal(); guardarCatalogoLocal(); vistaAdmin();
    });
    const cancelar = $('#form-marca [data-act="cerrar"]');
    cancelar.onclick = () => { document.removeEventListener('paste', alPegar); cerrarModal(); };
  }

  // ---------- Editor de vehículo ----------
  function editarVehiculo(id) {
    const v = id ? vehiculos().find((x) => x.id === id) : { id: uid(), marca: '', modelo: '', foto: '', generaciones: [{ nombre: '', anios: [] }] };
    const nuevo = !id;
    const gens = (v.generaciones || []).map((g) => ({ nombre: g.nombre || '', anios: g.anios || [] }));

    const pintarGens = () => {
      $('#veh-gens').innerHTML = gens.map((g, i) => `
        <div class="card" style="padding:10px;display:flex;gap:8px;align-items:center">
          <input data-g="${i}" data-f="nombre" value="${esc(g.nombre)}" placeholder="Generación (ej. 2010+)" style="flex:1;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit">
          <input data-g="${i}" data-f="anios" value="${esc((g.anios || []).join(', '))}" placeholder="2010-2026" style="flex:1;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit">
          <button type="button" class="btn tiny ghost" data-gen-quitar="${i}" title="Quitar">✕</button>
        </div>`).join('') || '<p class="hint">Sin generaciones.</p>';
    };

    abrirModal(`
      <h3>${nuevo ? 'Nuevo vehículo' : 'Editar vehículo'}</h3>
      <form id="form-veh">
        <div class="foto-box" id="foto-box">
          <div id="foto-preview">${v.foto ? `<img src="${esc(v.foto)}">` : '<div class="sin-foto">🚙 Sin foto</div>'}</div>
          <button type="button" class="btn small primary" id="foto-buscar">🔍 Buscar en Google</button>
          <label class="btn small ghost">Elegir archivo<input id="foto-input" type="file" accept="image/*" hidden></label>
          <button type="button" class="btn tiny ghost" id="foto-quitar">Quitar foto</button>
        </div>
        <p class="hint pasos-foto">1) <em>Buscar en Google</em> → 2) clic derecho → <em>Copiar imagen</em> → 3) <strong>Ctrl + V</strong>. O arrastra / elige archivo.</p>

        <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
          <label>Marca *
            <input name="marca" required value="${esc(v.marca)}" placeholder="Toyota" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">
          </label>
          <label>Modelo *
            <input name="modelo" required value="${esc(v.modelo)}" placeholder="4Runner" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">
          </label>
        </div>

        <div style="margin-top:12px">
          <div class="seccion-head" style="margin-bottom:8px"><strong>Generaciones</strong><button type="button" class="btn tiny ghost" id="gen-agregar">+ Agregar generación</button></div>
          <div id="veh-gens" style="display:flex;flex-direction:column;gap:6px"></div>
          <p class="hint" style="margin-top:6px">Cada generación es un rango de años. Ej: "2010+" con años 2010-2026, y "2003-2009" con 2003-2009.</p>
        </div>

        <div class="actions" style="margin-top:14px;display:flex;gap:8px">
          ${nuevo ? '' : '<button type="button" class="btn ghost" id="veh-borrar" style="margin-right:auto;color:var(--bad)">Eliminar</button>'}
          <button type="button" class="btn ghost" data-act="cerrar">Cancelar</button>
          <button class="btn primary" type="submit">Guardar</button>
        </div>
      </form>`);

    let foto = v.foto || '';
    const pintar = () => {
      $('#foto-preview').innerHTML = foto ? `<img src="${esc(foto)}">` : '<div class="sin-foto">🚙 Sin foto</div>';
      $('#foto-quitar').hidden = !foto;
    };
    const usarImagen = async (f) => {
      if (!f || !f.type.startsWith('image/')) return;
      try { foto = await redimensionarImagen(f, 600); pintar(); } catch (e) { alert(e.message); }
    };
    const alPegar = (e) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'));
      if (item) { e.preventDefault(); usarImagen(item.getAsFile()); }
    };
    document.addEventListener('paste', alPegar);
    $('#foto-input').onchange = (e) => usarImagen(e.target.files[0]);
    $('#foto-buscar').onclick = () => window.open('https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(`${v.marca || ''} ${v.modelo || ''} 4x4`), '_blank', 'noopener');
    $('#foto-quitar').onclick = () => { foto = ''; pintar(); };
    const zona = $('#foto-box');
    zona.ondragover = (e) => { e.preventDefault(); zona.classList.add('soltar'); };
    zona.ondragleave = () => zona.classList.remove('soltar');
    zona.ondrop = (e) => { e.preventDefault(); zona.classList.remove('soltar'); usarImagen(e.dataTransfer.files[0]); };

    pintarGens();
    $('#gen-agregar').onclick = () => { gens.push({ nombre: '', anios: [] }); pintarGens(); };
    $('#veh-gens').onclick = (e) => {
      const q = e.target.closest('[data-gen-quitar]');
      if (q) { gens.splice(Number(q.dataset.genQuitar), 1); pintarGens(); }
    };
    $('#veh-gens').oninput = (e) => {
      const i = e.target.closest('[data-g]'); if (!i) return;
      const g = gens[Number(i.dataset.g)]; if (!g) return;
      if (i.dataset.f === 'nombre') g.nombre = i.value;
      else g.anios = parseAnios(i.value);
    };

    $('#form-veh').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target;
      const marca = f.marca.value.trim();
      const modelo = f.modelo.value.trim();
      if (!marca || !modelo) { alert('Escribe la marca y el modelo.'); return; }
      const marcaAnt = v.marca;
      const modeloAnt = v.modelo;
      v.marca = marca; v.modelo = modelo;
      v.foto = foto;
      // Guardar generaciones que tengan al menos nombre (años son opcionales)
      v.generaciones = gens.filter((g) => g.nombre.trim());
      // Si se renombró marca o modelo de un vehículo existente, actualizar automáticamente los productos asociados
      if (!nuevo && marcaAnt && modeloAnt && (marcaAnt !== marca || modeloAnt !== modelo)) {
        productos().forEach((prod) => {
          (prod.compatibles || []).forEach((c) => {
            if (c.marca === marcaAnt && c.modelo === modeloAnt) {
              c.marca = marca;
              c.modelo = modelo;
            }
          });
        });
      }
      document.removeEventListener('paste', alPegar);
      if (nuevo) catalogo.vehiculos.push(v);
      cerrarModal(); guardarCatalogoLocal(); vistaAdmin();
    };
    $('#veh-borrar')?.addEventListener('click', async () => {
      if (!confirm('¿Eliminar este vehículo?')) return;
      catalogo.vehiculos = catalogo.vehiculos.filter((x) => x.id !== v.id);
      document.removeEventListener('paste', alPegar);
      cerrarModal(); guardarCatalogoLocal(); vistaAdmin();
    });
    $('#form-veh [data-act="cerrar"]').onclick = () => { document.removeEventListener('paste', alPegar); cerrarModal(); };
  }

  // Parsea "2010-2026" o "2010, 2012, 2015" a una lista de años
  function parseAnios(txt) {
    const out = new Set();
    String(txt || '').split(',').forEach((parte) => {
      parte = parte.trim();
      const rango = parte.match(/^(\d{4})\s*-\s*(\d{4})$/);
      if (rango) {
        const a = Number(rango[1]), b = Number(rango[2]);
        for (let y = Math.min(a, b); y <= Math.max(a, b); y++) out.add(y);
      } else if (/^\d{4}$/.test(parte)) {
        out.add(Number(parte));
      }
    });
    return [...out].sort((a, b) => a - b);
  }

  // ---------- Editor de producto ----------
  function editarProducto(id) {
    const p = id ? productos().find((x) => x.id === id) : { id: uid(), nombre: '', categoria: 'suspension', marca: marcas()[0]?.nombre || '', altura: '', precio: '', descripcion: '', foto: '', compatibles: [], opciones: null };
    const nuevo = !id;
    const catOpciones = categorias().map((c) => `<option ${c.id === p.categoria ? 'selected' : ''} value="${c.id}">${esc(c.nombre)}</option>`).join('');
    const marcaOpciones = marcas().map((m) => `<option ${m.nombre === p.marca ? 'selected' : ''}>${esc(m.nombre)}</option>`).join('');
    abrirModal(`
      <h3>${nuevo ? 'Nuevo producto' : 'Editar producto'}</h3>
      <form id="form-prod">
        <div class="foto-box" id="foto-box">
          <div id="foto-preview">${p.foto ? `<img src="${esc(p.foto)}">` : '<div class="sin-foto">Sin foto</div>'}</div>
          <button type="button" class="btn small primary" id="foto-buscar">🔍 Buscar en Google</button>
          <label class="btn small ghost">Elegir archivo<input id="foto-input" type="file" accept="image/*" hidden></label>
          <button type="button" class="btn tiny ghost" id="foto-quitar">Quitar foto</button>
        </div>
        <p class="hint pasos-foto">1) <em>Buscar en Google</em> → 2) clic derecho → <em>Copiar imagen</em> → 3) <strong>Ctrl + V</strong>. O arrastra / elige archivo.</p>

        <label style="display:block;margin-top:12px">Nombre *
          <input name="nombre" required value="${esc(p.nombre)}" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">
        </label>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <label>Categoría<select name="categoria" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">${catOpciones}</select></label>
          <label>Marca<select name="marca" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">${marcaOpciones}</select></label>
        </div>
        <div id="sub-campo" style="margin-top:10px" hidden>
          <label>Subcategoría (menú superior)<select name="subcategoria" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit"></select></label>
        </div>
        <div id="merch-campos" class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-top:10px" ${p.categoria === 'merch' ? '' : 'hidden'}>
          <label>Tipo de merch<select name="tipo" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit"><option value="">— Sin tipo —</option>${merchTipos().map((t) => `<option value="${esc(t.id)}" ${t.id === p.tipo ? 'selected' : ''}>${esc(t.nombre)}</option>`).join('')}</select></label>
          <label>Género<select name="genero" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit"><option value="">Unisex / no aplica</option>${GENEROS.map((g) => `<option ${g === p.genero ? 'selected' : ''}>${g}</option>`).join('')}</select></label>
        </div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <label>Precio (USD) *<input name="precio" inputmode="decimal" required value="${esc(p.precio)}" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit"></label>
          <label>Altura (solo suspensión)<input name="altura" value="${esc(p.altura || '')}" placeholder='2"' style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit"></label>
        </div>
        <label style="display:block;margin-top:10px">Descripción
          <textarea name="descripcion" rows="3" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">${esc(p.descripcion)}</textarea>
        </label>
        <label style="display:block;margin-top:10px">Opciones (tallas/colores), separadas por coma — dejar vacío si no aplica
          <input name="opciones" value="${esc((p.opciones?.valores || []).join(', '))}" placeholder="S, M, L, XL" style="width:100%;padding:10px;border:1px solid var(--linea);border-radius:8px;font:inherit">
        </label>

        <div style="margin-top:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <strong style="font-size:.9rem">Compatible con vehículos</strong>
            <span style="font-size:.8rem;color:var(--muted)">Dejar vacío = compatible con todo</span>
          </div>
          <div id="compat-lista" style="display:flex;flex-direction:column;gap:6px"></div>
          <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
            <select id="compat-veh" style="flex:1;min-width:140px;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit">
              <option value="">— Vehículo —</option>
              ${vehiculos().map((v) => `<option value="${esc(v.id)}">${esc(v.marca)} ${esc(v.modelo)}</option>`).join('')}
            </select>
            <select id="compat-gen" style="flex:1;min-width:120px;padding:9px;border:1px solid var(--linea);border-radius:8px;font:inherit">
              <option value="">— Generación —</option>
            </select>
            <button type="button" class="btn ghost" id="compat-agregar">+ Añadir</button>
          </div>
        </div>

        <div class="actions" style="margin-top:14px;display:flex;gap:8px">
          ${nuevo ? '' : '<button type="button" class="btn ghost" id="prod-borrar" style="margin-right:auto;color:var(--bad)">Eliminar</button>'}
          <button type="button" class="btn ghost" data-act="cerrar">Cancelar</button>
          <button class="btn primary" type="submit">Guardar</button>
        </div>
      </form>`);

    const pintarSubs = () => {
      const f = $('#form-prod');
      const c = categorias().find((x) => x.id === f.categoria.value);
      const subs = f.categoria.value === 'merch' ? [] : (c?.subcategorias || []);
      $('#sub-campo').hidden = !subs.length;
      f.subcategoria.innerHTML = '<option value="">— Sin subcategoría —</option>' + subs.map((s) => `<option value="${esc(s.id)}" ${s.id === p.subcategoria ? 'selected' : ''}>${esc(s.nombre)}</option>`).join('');
    };
    $('#form-prod').categoria.onchange = (e) => { $('#merch-campos').hidden = e.target.value !== 'merch'; pintarSubs(); };
    pintarSubs();
    let foto = p.foto || '';
    const pintar = () => {
      $('#foto-preview').innerHTML = foto ? `<img src="${esc(foto)}">` : '<div class="sin-foto">Sin foto</div>';
      $('#foto-quitar').hidden = !foto;
    };
    const usarImagen = async (f) => {
      if (!f || !f.type.startsWith('image/')) return;
      try { foto = await redimensionarImagen(f, 500); pintar(); } catch (e) { alert(e.message); }
    };
    const alPegar = (e) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'));
      if (item) { e.preventDefault(); usarImagen(item.getAsFile()); }
    };
    document.addEventListener('paste', alPegar);
    $('#foto-input').onchange = (e) => usarImagen(e.target.files[0]);
    $('#foto-buscar').onclick = () => window.open('https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(`${p.nombre || p.marca} suspension`), '_blank', 'noopener');
    $('#foto-quitar').onclick = () => { foto = ''; pintar(); };
    const zona = $('#foto-box');
    zona.ondragover = (e) => { e.preventDefault(); zona.classList.add('soltar'); };
    zona.ondragleave = () => zona.classList.remove('soltar');
    zona.ondrop = (e) => { e.preventDefault(); zona.classList.remove('soltar'); usarImagen(e.dataTransfer.files[0]); };

    // --- Lógica de compatibles ---
    let compatibles = (p.compatibles || []).map((c) => ({ ...c }));

    const pintarCompat = () => {
      const lista = $('#compat-lista');
      if (!lista) return;
      lista.innerHTML = compatibles.length
        ? compatibles.map((c, ci) => `
            <div class="card" style="padding:8px 12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              <span style="font-weight:700;font-size:.88rem">${esc(c.marca)} ${esc(c.modelo)}</span>
              ${c.genNombre ? `<span style="font-size:.8rem;background:var(--bg-suave);padding:2px 8px;border-radius:999px">${esc(c.genNombre)}</span>` : '<span style="font-size:.8rem;color:var(--muted)">Todas las generaciones</span>'}
              ${c.anios?.length ? `<span style="font-size:.8rem;color:var(--muted)">(${c.anios[0]}–${c.anios[c.anios.length-1]})</span>` : ''}
              <button type="button" class="btn tiny ghost" data-compat-quitar="${ci}" style="margin-left:auto;color:var(--bad)">✕</button>
            </div>`).join('')
        : '<p class="hint" style="margin:0;font-size:.85rem">Sin restricciones — aparece para cualquier vehículo.</p>';
      // Reasignar onclick cada vez que se repinta
      lista.onclick = (e) => {
        const b = e.target.closest('[data-compat-quitar]'); if (!b) return;
        compatibles.splice(Number(b.dataset.compatQuitar), 1);
        pintarCompat();
      };
    };

    // Inicializar la lista con los compatibles existentes
    pintarCompat();

    // Cuando cambia el vehículo, actualizar generaciones
    $('#compat-veh').onchange = () => {
      const vId = $('#compat-veh').value;
      const veh = vehiculos().find((x) => x.id === vId);
      const sel = $('#compat-gen');
      sel.innerHTML = '<option value="">— Todas las generaciones —</option>' +
        (veh?.generaciones || []).map((g, gi) => `<option value="${gi}">${esc(g.nombre)}</option>`).join('');
    };

    const agregarCompat = (silencioso) => {
      const vId = $('#compat-veh').value;
      if (!vId) { if (!silencioso) alert('Selecciona un vehículo primero.'); return; }
      const veh = vehiculos().find((x) => x.id === vId); if (!veh) return;
      const genIdx = $('#compat-gen').value;
      if (genIdx !== '') {
        const g = veh.generaciones[Number(genIdx)];
        if (!g) return;
        // Evitar duplicado por generación específica
        if (compatibles.some((c) => c.marca === veh.marca && c.modelo === veh.modelo && c.genNombre === g.nombre)) {
          if (!silencioso) alert('Este vehículo y generación ya está en la lista.'); return;
        }
        compatibles.push({ marca: veh.marca, modelo: veh.modelo, genNombre: g.nombre, anios: g.anios || [] });
      } else {
        // Todas las generaciones del vehículo
        if (compatibles.some((c) => c.marca === veh.marca && c.modelo === veh.modelo && !c.genNombre)) {
          if (!silencioso) alert('Este vehículo (todas las generaciones) ya está en la lista.'); return;
        }
        compatibles.push({ marca: veh.marca, modelo: veh.modelo, anios: [] });
      }
      pintarCompat();
    };
    $('#compat-agregar').onclick = () => agregarCompat(false);

    $('#form-prod').onsubmit = async (e) => {
      e.preventDefault();
      // Si dejó un vehículo elegido sin pulsar "+ Añadir", se añade automáticamente al guardar
      agregarCompat(true);
      const f = e.target;
      const nombre = f.nombre.value.trim();
      const precio = Number(f.precio.value);
      if (!nombre) { alert('Escribe el nombre.'); return; }
      if (!Number.isFinite(precio) || precio < 0) { alert('Precio inválido.'); return; }
      p.nombre = nombre;
      p.categoria = f.categoria.value;
      p.marca = f.marca.value;
      p.precio = precio;
      p.altura = f.altura.value.trim();
      p.descripcion = f.descripcion.value.trim();
      p.foto = foto;
      p.compatibles = compatibles;
      p.tipo = p.categoria === 'merch' ? f.tipo.value : '';
      p.subcategoria = p.categoria === 'merch' ? '' : f.subcategoria.value;
      p.genero = p.categoria === 'merch' ? f.genero.value : '';
      const opc = f.opciones.value.split(',').map((x) => x.trim()).filter(Boolean);
      if (opc.length) p.opciones = { nombre: 'Opción', valores: opc };
      else p.opciones = null;
      document.removeEventListener('paste', alPegar);
      if (nuevo) catalogo.productos.push(p);
      cerrarModal(); guardarCatalogoLocal(); vistaAdmin();
      // Guardado automático en la nube (si no, al recargar se pierde el cambio)
      guardarCatalogoNube()
        .then(() => { const s = $('#admin-estado'); if (s) s.textContent = '✅ Producto guardado en la nube.'; })
        .catch((err) => { const s = $('#admin-estado'); if (s) s.textContent = '❌ No se pudo guardar en la nube: ' + err.message; });
    };
    $('#prod-borrar')?.addEventListener('click', async () => {
      if (!confirm('¿Eliminar este producto?')) return;
      catalogo.productos = catalogo.productos.filter((x) => x.id !== p.id);
      document.removeEventListener('paste', alPegar);
      cerrarModal(); guardarCatalogoLocal(); vistaAdmin();
    });
    $('#form-prod [data-act="cerrar"]').onclick = () => { document.removeEventListener('paste', alPegar); cerrarModal(); };
  }

  // ===================== UTILIDADES =====================
  function redimensionarImagen(file, max = 500) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src);
        res(c.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => rej(new Error('No se pudo leer la imagen'));
      img.src = URL.createObjectURL(file);
    });
  }
  function abrirModal(html) {
    let m = $('#modal');
    if (!m) { m = document.createElement('dialog'); m.id = 'modal'; document.body.appendChild(m); }
    const body = $('#modal-body') || (() => { const b = document.createElement('div'); b.id = 'modal-body'; m.appendChild(b); return b; })();
    body.innerHTML = html;
    if (!m.open) m.showModal();
  }
  function cerrarModal() { $('#modal')?.close(); }
  let toastTimer;
  function toast(msg) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
    el.textContent = msg; el.className = 'mostrar';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.className = ''), 1800);
  }

  // ===================== ROUTER =====================
  function rutear() {
    cerrarPopupMesetas();
    const hash = (location.hash || '#/').split('?')[0];
    const partes = hash.slice(2).split('/').filter(Boolean);
    const [raiz, arg] = partes;
    const vista = $('#vista');
    const esInicio = !raiz || !['catalogo', 'producto', 'carrito', 'admin', 'faq'].includes(raiz);
    if (vista && vista.classList) vista.classList.toggle('es-inicio', esInicio);
    if (raiz === 'catalogo') vistaCatalogo(arg || 'all');
    else if (raiz === 'producto') vistaProducto(arg);
    else if (raiz === 'carrito') vistaCarrito();
    else if (raiz === 'faq') vistaFAQ();
    else if (raiz === 'admin') vistaAdmin();
    else vistaInicio();
    $$('#nav > a').forEach((a) => a.classList.toggle('active', a.dataset.ruta === hash));
    window.scrollTo(0, 0);
  }

  // ===================== ARRANQUE =====================
  async function iniciar() {
    if (!CFG) { $('#vista').innerHTML = '<p class="vacio">Falta la configuración de la tienda.</p>'; return; }
    // Redes sociales / contacto en el header y footer
    $('#link-instagram').href = CFG.instagram || '#';
    $('#link-youtube').href = CFG.youtube || '#';
    $('#link-youtube').style.display = CFG.youtube ? '' : 'none';
    $('#link-whatsapp').href = `https://wa.me/${CFG.whatsapp}`;
    // Footer: duplicados de los links de contacto
    const fwa = document.getElementById('footer-link-wa');
    const fig = document.getElementById('footer-link-ig');
    if (fwa) fwa.href = `https://wa.me/${CFG.whatsapp}`;
    if (fig) { fig.href = CFG.instagram || '#'; if (!CFG.instagram) fig.style.display = 'none'; }
    // Acción rápida "+ Añadir al pedido" delegada en todas las tarjetas de producto
    document.addEventListener('click', (e) => {
      const btn = e.target?.closest?.('[data-quick-add]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      agregarAlCarrito(btn.dataset.quickAdd);
    });
    pintarNav();
    pintarBadge();
    window.addEventListener('hashchange', rutear);
    await cargarCatalogo();
    aplicarConfig();

    // Verificación de modo pre-lanzamiento (redirección a Instagram si no entró con link de invitado)
    try { localStorage.setItem('jacks4wd-modo-publico', config().modoPrivadoIG === false ? '1' : '0'); } catch {}
    if (typeof window !== 'undefined' && window.__jacksVerificarAccesoPublico) {
      if (config().modoPrivadoIG !== false) {
        location.replace(CFG.instagram || 'https://instagram.com/jacks4wd');
        return;
      }
      if (document.documentElement && document.documentElement.style) {
        document.documentElement.style.visibility = '';
      }
    }

    pintarNav(); // repintar con las categorías y marcas ya cargadas
    rutear();
    detectarCliente();
  }

  // Contraste relativo contra blanco (#ffffff) para garantizar WCAG AA (>= 4.5:1)
  function contrasteConBlanco(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex || '')) return 0;
    const lin = (c) => {
      const s = parseInt(c, 16) / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    const L = 0.2126 * lin(hex.slice(1, 3)) + 0.7152 * lin(hex.slice(3, 5)) + 0.0722 * lin(hex.slice(5, 7));
    return 1.05 / (L + 0.05);
  }

  // Aplica la configuración visual (acento de marca, foto del hero, footer)
  // preservando siempre el lienzo claro y las tarjetas blanco estudio estilo ARB USA.
  function aplicarConfig() {
    const cfg = config();
    // Migración (una vez): categoría "Partes de suspensión" y subcategorías en catálogos ya guardados
    if (!cfg.migrado2) {
      cfg.categorias = cfg.categorias || [];
      CONFIG_DEF.categorias.forEach((d, i) => {
        const subs = () => (d.subcategorias || []).map((s) => ({ ...s }));
        const ex = cfg.categorias.find((c) => c.id === d.id);
        if (!ex) cfg.categorias.splice(Math.min(i, cfg.categorias.length), 0, { ...d, subcategorias: subs() });
        else if (!Array.isArray(ex.subcategorias)) ex.subcategorias = subs();
      });
      cfg.migrado2 = true;
    }
    if (cfg.colorAcento && cfg.colorAcento.toLowerCase() === '#c2410c') cfg.colorAcento = '#b43a08';
    // Categorías duplicadas (mismo nombre): se conserva la primera y sus productos pasan a ella
    const vistos = new Map();
    cfg.categorias = (cfg.categorias || []).filter((c) => {
      const k = String(c.nombre || '').trim().toLowerCase();
      if (!vistos.has(k)) { vistos.set(k, c.id); return true; }
      productos().forEach((p) => { if (p.categoria === c.id) p.categoria = vistos.get(k); });
      return false;
    });
    // Renombre: "Suspensiones" → "Kits de suspensión" (también en catálogos ya guardados)
    (cfg.categorias || []).forEach((c) => { if (c.id === 'suspension' && c.nombre === 'Suspensiones') c.nombre = 'Kits de suspensión'; });

    // Migración (una vez): cargar los modelos y kits completos OME (Nitrocharger, MT64, BP-51)
    // también cuando el navegador o Supabase ya tenían el catálogo inicial de prueba guardado.
    if (!cfg.migradoKitsOME1) {
      const catSusp = (cfg.categorias || []).find((c) => c.id === 'suspension');
      if (catSusp) {
        catSusp.subcategorias = Array.isArray(catSusp.subcategorias) ? catSusp.subcategorias : [];
        [
          { id: 'nitrocharger', nombre: 'Nitrocharger' },
          { id: 'mt64', nombre: 'MT64' },
          { id: 'bp51', nombre: 'BP-51' },
        ].forEach((linea) => {
          if (!catSusp.subcategorias.some((s) => s.id === linea.id)) catSusp.subcategorias.push({ ...linea });
        });
      }

      catalogo.marcas = Array.isArray(catalogo.marcas) ? catalogo.marcas : [];
      MARCAS_INICIAL.forEach((m) => {
        if (!catalogo.marcas.some((x) => x.nombre.toLowerCase() === m.nombre.toLowerCase())) {
          catalogo.marcas.push({ ...m });
        }
      });

      // Integrar modelos de vehículos sin borrar fotos ni años que el admin ya hubiera editado
      catalogo.vehiculos = Array.isArray(catalogo.vehiculos) ? catalogo.vehiculos : [];
      const normVeh = (marca, modelo) => `${String(marca || '').trim().toLowerCase()}::${String(modelo || '').trim().toLowerCase()}`;
      VEHICULOS_INICIAL.forEach((vIni) => {
        const ya = catalogo.vehiculos.find((x) => x.id === vIni.id || normVeh(x.marca, x.modelo) === normVeh(vIni.marca, vIni.modelo));
        if (!ya) {
          catalogo.vehiculos.push({
            ...vIni,
            generaciones: (vIni.generaciones || []).map((g) => ({ ...g })),
          });
        } else {
          // Dejar el espacio limpio de generaciones para que el admin cargue los años manualmente, conservando su foto
          ya.generaciones = [];
        }
      });

      // Quitar los 3 kits de ejemplo iniciales si no tenían foto personalizada y añadir los 111 kits reales
      const idsDemoAntiguos = new Set(['susp-ome-nitrocharger-plus', 'susp-ome-bp51', 'susp-ome-mt64']);
      catalogo.productos = (catalogo.productos || []).filter((p) => !(idsDemoAntiguos.has(p.id) && !p.foto));
      const idsExistentes = new Set(catalogo.productos.map((p) => p.id));
      PRODUCTOS_INICIAL.forEach((pIni) => {
        if (!idsExistentes.has(pIni.id)) {
          catalogo.productos.push({
            ...pIni,
            compatibles: (pIni.compatibles || []).map((c) => ({ ...c })),
          });
        }
      });

      cfg.migradoKitsOME1 = true;
      guardarCatalogoLocal();
    }

    // Asegurar siempre subcategoría "Brazos de control superiores / Mesetas" en Partes de suspensión y FAQs base
    const catPartes = (cfg.categorias || []).find((c) => c.id === 'partes');
    if (catPartes) {
      catPartes.subcategorias = Array.isArray(catPartes.subcategorias) ? catPartes.subcategorias : [];
      if (!catPartes.subcategorias.some((s) => s.id === 'mesetas')) {
        catPartes.subcategorias.unshift({ id: 'mesetas', nombre: 'Brazos de control superiores / Mesetas' });
      }
    }
    if (!Array.isArray(cfg.faqs) || !cfg.faqs.length) {
      cfg.faqs = CONFIG_DEF.faqs.map((f) => ({ ...f }));
    }
    if (cfg.modoPrivadoIG === undefined) cfg.modoPrivadoIG = true;
    if (!cfg.claveInvitado) cfg.claveInvitado = 'jacks4wd';

    // Normalizador permanente de variantes/duplicados de modelos:
    // - "Autana" -> "Land Cruiser S80" (veh-toyota-autana)
    // - "Merú / Prado" / "Prado / Meru" / "Land Cruiser S90" -> "Land Cruiser Serie 90" (veh-toyota-meru-prado)
    // - "Land Cruiser 300 series" / "LC300" -> "Land Cruiser 300" (veh-toyota-lc300)
    // - Respeta también nombres personalizados en la nube (ej. "Land Cruiser 70 series", "Montero / Pajero") por id de vehículo.
    const resolverAliasVeh = (marca, modelo, genNombre = '') => {
      const mk = String(marca || '').trim();
      const md = String(modelo || '').trim();
      const ml = md.toLowerCase().replace(/\s+/g, ' ');
      if (ml === 'autana' || ml === 'land cruiser s80' || ml === 'land cruiser serie 80' || ml === 'land cruiser 80 series') {
        return { vehId: 'veh-toyota-autana', marca: 'Toyota', modelo: 'Land Cruiser S80', genToken: '', genNombre, forzarModelo: true };
      }
      if (ml.includes('meru') || ml.includes('merú') || ml === 'land cruiser s90' || ml === 'land cruiser serie 90' || ml === 'land cruiser 90 series') {
        return { vehId: 'veh-toyota-meru-prado', marca: 'Toyota', modelo: 'Land Cruiser Serie 90', genToken: '', genNombre, forzarModelo: true };
      }
      if (ml === 'fortuner nacional') return { vehId: 'veh-toyota-fortuner', marca: 'Toyota', modelo: 'Fortuner', genToken: 'nacional', genNombre: 'Fortuner Nacional' };
      if (ml === 'fortuner dubai') return { vehId: 'veh-toyota-fortuner', marca: 'Toyota', modelo: 'Fortuner', genToken: 'dubai', genNombre: 'Fortuner Dubai' };
      if (ml === 'fortuner') return { vehId: 'veh-toyota-fortuner', marca: 'Toyota', modelo: 'Fortuner', genToken: '', genNombre };
      if (ml === 'hilux kavak' || ml === 'hilux nacional') return { vehId: 'veh-toyota-hilux', marca: 'Toyota', modelo: 'Hilux', genToken: 'nacional', genNombre: 'Hilux Nacional' };
      if (ml === 'hilux revo') return { vehId: 'veh-toyota-hilux', marca: 'Toyota', modelo: 'Hilux', genToken: 'revo', genNombre: 'Hilux Revo' };
      if (ml === 'hilux') return { vehId: 'veh-toyota-hilux', marca: 'Toyota', modelo: 'Hilux', genToken: '', genNombre };
      if (ml === 'machito serie 71' || ml === 'machito s71') return { vehId: 'veh-toyota-machito', marca: 'Toyota', modelo: 'Machito', genToken: 's71', genNombre: 'Machito S71' };
      if (ml === 'machito serie 76' || ml === 'machito s76') return { vehId: 'veh-toyota-machito', marca: 'Toyota', modelo: 'Machito', genToken: 's76', genNombre: 'Machito S76' };
      if (ml.includes('hembrita') || ml.includes('78') || ml.includes('79') || ml === 'machito s79') return { vehId: 'veh-toyota-machito', marca: 'Toyota', modelo: 'Machito', genToken: 's79', genNombre: 'Machito S79' };
      if (ml === 'machito' || ml.includes('70 series') || ml.includes('serie 70')) return { vehId: 'veh-toyota-machito', marca: 'Toyota', modelo: md, genToken: '', genNombre };
      if (ml === 'cherokee liberty kj' || ml === 'cherokee kj') return { vehId: 'veh-jeep-cherokee', marca: 'Jeep', modelo: 'Cherokee', genToken: 'kj', genNombre: 'Cherokee KJ' };
      if (ml === 'cherokee liberty kk' || ml === 'cherokee kk') return { vehId: 'veh-jeep-cherokee', marca: 'Jeep', modelo: 'Cherokee', genToken: 'kk', genNombre: 'Cherokee KK' };
      if (ml === 'grand cherokee wk') return { vehId: 'veh-jeep-grand-cherokee', marca: 'Jeep', modelo: 'Grand Cherokee', genToken: 'wk', genNombre: 'Grand Cherokee WK' };
      if (ml === 'grand cherokee wk2') return { vehId: 'veh-jeep-grand-cherokee', marca: 'Jeep', modelo: 'Grand Cherokee', genToken: 'wk2', genNombre: 'Grand Cherokee WK2' };
      if (ml === 'grand cherokee commander' || ml === 'commander') return { vehId: 'veh-jeep-grand-cherokee', marca: 'Jeep', modelo: 'Grand Cherokee', genToken: 'commander', genNombre: 'Commander' };
      if (ml === 'grand cherokee wj millenium' || ml === 'grand cherokee wj') return { vehId: 'veh-jeep-grand-cherokee', marca: 'Jeep', modelo: 'Grand Cherokee', genToken: 'wj', genNombre: 'WJ Millenium' };
      if (ml === 'montero sport') return { vehId: 'veh-mitsubishi-montero', marca: 'Mitsubishi', modelo: 'Montero', genToken: 'sport', genNombre: 'Montero Sport' };
      if (ml === 'montero limited') return { vehId: 'veh-mitsubishi-montero', marca: 'Mitsubishi', modelo: 'Montero', genToken: 'limited', genNombre: 'Montero Limited' };
      if (ml === 'montero dakar') return { vehId: 'veh-mitsubishi-montero', marca: 'Mitsubishi', modelo: 'Montero', genToken: 'dakar', genNombre: 'Montero Dakar' };
      if (ml === 'montero' || ml.includes('pajero')) return { vehId: 'veh-mitsubishi-montero', marca: 'Mitsubishi', modelo: md, genToken: '', genNombre };
      if (ml.includes('lc300') || ml.includes('s300') || ((ml.includes('land cruiser') || ml.includes('landcruiser')) && /\b300\b/.test(ml))) {
        return { vehId: 'veh-toyota-lc300', marca: 'Toyota', modelo: 'Land Cruiser 300', genToken: '', genNombre, forzarModelo: true };
      }
      return { vehId: '', marca: mk, modelo: md, genToken: '', genNombre };
    };

    const adaptarGenAVeh = (vehObj, genNombre, genToken = '') => {
      const gens = vehObj?.generaciones || [];
      if (!gens.length) return genNombre || '';
      const gn = String(genNombre || '').trim();
      const gl = gn.toLowerCase();
      const exacto = gens.find((g) => String(g.nombre || '').trim().toLowerCase() === gl);
      if (exacto) return exacto.nombre;
      const tok = genToken || (
        gl.includes('nacional') || gl.includes('kavak') ? 'nacional' :
        gl.includes('dubai') ? 'dubai' :
        gl.includes('revo') ? 'revo' :
        gl.includes('s71') ? 's71' :
        gl.includes('s76') ? 's76' :
        gl.includes('s79') || gl.includes('78') ? 's79' :
        gl.includes('wk2') ? 'wk2' :
        gl.includes('commander') || /\bwk\b/.test(gl) ? 'wk' :
        gl.includes('wj') || gl.includes('millenium') ? 'wj' :
        gl.includes('sport') ? 'sport' :
        gl.includes('limited') ? 'limited' :
        gl.includes('dakar') ? 'dakar' :
        gl.includes('kj') ? 'kj' :
        gl.includes('kk') ? 'kk' : ''
      );
      if (!tok) return gn;
      const buscar = (fn) => gens.find((g) => fn(String(g.nombre || '').toLowerCase()))?.nombre;
      if (tok === 'nacional') return buscar((s) => s.includes('nacional') || s.includes('kavak') || s.includes('1era') || s.includes('(ve)')) || gn;
      if (tok === 'dubai') return buscar((s) => s.includes('dubai') || s.includes('2da')) || gn;
      if (tok === 'revo') return buscar((s) => s.includes('revo')) || gn;
      if (tok === 's71') return buscar((s) => s.includes('s71') || s.includes('71')) || gn;
      if (tok === 's76') return buscar((s) => s.includes('s76') || s.includes('76')) || gn;
      if (tok === 's79') return buscar((s) => s.includes('s79') || s.includes('79') || s.includes('78')) || gn;
      if (tok === 'wk2') return buscar((s) => s.includes('wk2')) || gn;
      if (tok === 'wk') return buscar((s) => (s.includes('wk') && !s.includes('wk2')) || s.includes('commander')) || gn;
      if (tok === 'wj') return buscar((s) => s.includes('wj') || s.includes('millenium')) || gn;
      if (tok === 'sport') return buscar((s) => s.includes('sport')) || gn;
      if (tok === 'limited') return buscar((s) => s.includes('limited')) || gn;
      if (tok === 'dakar') return buscar((s) => s.includes('dakar')) || gn;
      if (tok === 'kj') return buscar((s) => s.includes('kj')) || gn;
      if (tok === 'kk') return buscar((s) => s.includes('kk')) || gn;
      return gn;
    };

    // Asegurar marcas iniciales (incluyendo Dobinsons) y todas las marcas presentes en productos
    catalogo.marcas = Array.isArray(catalogo.marcas) ? catalogo.marcas : [];
    MARCAS_INICIAL.forEach((m) => {
      if (!catalogo.marcas.some((x) => x.nombre.toLowerCase() === m.nombre.toLowerCase())) catalogo.marcas.push({ ...m });
    });
    (catalogo.productos || []).forEach((p) => {
      if (p.marca && !catalogo.marcas.some((x) => x.nombre.toLowerCase() === p.marca.toLowerCase())) {
        catalogo.marcas.push({ id: 'm-' + uid(), nombre: p.marca, logo: '', descripcion: '' });
      }
    });

    // Fusionar vehículos por id canónico primero (respetando fotos y nombres personalizados de la nube,
    // y aplicando los renombres explícitos Land Cruiser S80, Land Cruiser Serie 90 y Land Cruiser 300).
    {
      const previos = Array.isArray(catalogo.vehiculos) ? catalogo.vehiculos : [];
      const porId = new Map();
      const porClaveNombre = new Map();
      const resultado = [];

      const registrar = (v, desdeNube = false) => {
        const al = resolverAliasVeh(v.marca, v.modelo);
        const idCanon = al.vehId || v.id || '';
        const claveNom = `${al.marca.toLowerCase()}::${al.modelo.toLowerCase()}`;
        let dest = (idCanon && porId.get(idCanon)) || porClaveNombre.get(claveNom);
        if (!dest) {
          dest = {
            id: idCanon || ('veh-' + uid()),
            marca: al.marca,
            modelo: al.forzarModelo ? al.modelo : (desdeNube ? v.modelo : al.modelo),
            foto: v.foto || '',
            generaciones: (v.generaciones || []).map((g) => ({ ...g })),
          };
          if (dest.id) porId.set(dest.id, dest);
          porClaveNombre.set(`${dest.marca.toLowerCase()}::${dest.modelo.toLowerCase()}`, dest);
          porClaveNombre.set(claveNom, dest);
          resultado.push(dest);
        } else {
          if (al.forzarModelo) dest.modelo = al.modelo;
          else if (desdeNube && v.modelo && v.id === dest.id) dest.modelo = v.modelo;
          if (v.foto) dest.foto = v.foto;
          if (desdeNube && Array.isArray(v.generaciones) && v.generaciones.length) {
            dest.generaciones = v.generaciones.map((g) => ({ ...g }));
          } else {
            (v.generaciones || []).forEach((g) => {
              if (g && g.nombre && !dest.generaciones.some((x) => x.nombre.trim().toLowerCase() === g.nombre.trim().toLowerCase())) {
                dest.generaciones.push({ ...g });
              }
            });
          }
          porClaveNombre.set(`${dest.marca.toLowerCase()}::${dest.modelo.toLowerCase()}`, dest);
        }
      };

      VEHICULOS_INICIAL.forEach((vIni) => registrar(vIni, false));
      previos.forEach((vPrev) => registrar(vPrev, true));
      catalogo.vehiculos = resultado;
    }

    // Sincronizar compatibles de todos los productos con los nombres reales de cada vehículo y sus generaciones
    {
      const vehPorId = new Map((catalogo.vehiculos || []).map((v) => [v.id, v]));
      const vehPorNom = new Map((catalogo.vehiculos || []).map((v) => [`${v.marca.toLowerCase()}::${v.modelo.toLowerCase()}`, v]));
      const mapaProdInicial = new Map(PRODUCTOS_INICIAL.map((p) => [p.id, p]));

      (catalogo.productos || []).forEach((p) => {
        const ini = mapaProdInicial.get(p.id);
        if (!cfg.migradoVehUnificados4) {
          if (ini && !p.altura && ini.altura) p.altura = ini.altura;
          if (!p.altura && p.categoria === 'suspension') {
            const r = String(p.nombre || '').match(/\b([2345])\s*-\s*([2345])\s*"/);
            const s = String(p.nombre || '').match(/(?:^|\s)([2345])\s*"/);
            if (r) p.altura = `${r[1]}"-${r[2]}"`;
            else if (s) p.altura = `${s[1]}"`;
          }
        }
        if (Array.isArray(p.compatibles) && p.compatibles.length) {
          const vistosC = new Set();
          p.compatibles = p.compatibles.map((c) => {
            const al = resolverAliasVeh(c.marca, c.modelo, c.genNombre || '');
            const vDest = (al.vehId && vehPorId.get(al.vehId)) || vehPorNom.get(`${al.marca.toLowerCase()}::${al.modelo.toLowerCase()}`);
            const marcaFinal = vDest ? vDest.marca : al.marca;
            const modeloFinal = vDest ? vDest.modelo : al.modelo;
            const genFinal = adaptarGenAVeh(vDest, al.genNombre, al.genToken);
            const nuevoC = { ...c, marca: marcaFinal, modelo: modeloFinal };
            if (genFinal) nuevoC.genNombre = genFinal;
            return nuevoC;
          }).filter((c) => {
            const k = `${c.marca}::${c.modelo}::${c.genNombre || ''}::${(c.anios || []).join(',')}`;
            if (vistosC.has(k)) return false;
            vistosC.add(k);
            return true;
          });
        }
      });

      const vAct = leerVehActivo();
      if (vAct) {
        const al = resolverAliasVeh(vAct.marca, vAct.modelo, vAct.genNombre || '');
        const vDest = (al.vehId && vehPorId.get(al.vehId)) || vehPorNom.get(`${al.marca.toLowerCase()}::${al.modelo.toLowerCase()}`);
        const marcaFinal = vDest ? vDest.marca : al.marca;
        const modeloFinal = vDest ? vDest.modelo : al.modelo;
        const genFinal = adaptarGenAVeh(vDest, al.genNombre, al.genToken);
        if (marcaFinal !== vAct.marca || modeloFinal !== vAct.modelo || genFinal !== (vAct.genNombre || '')) {
          guardarVehActivo({ ...vAct, marca: marcaFinal, modelo: modeloFinal, genNombre: genFinal });
        }
      }

      cfg.migradoVehUnificados4 = true;
      guardarCatalogoLocal();
    }

    // Limpiar cualquier color oscuro heredado en nube/localStorage que corrompía fondos y tarjetas
    cfg.fondo = '#f6f5f3';
    cfg.colorCard = '#ffffff';
    cfg.colorTexto = '#141517';
    cfg.fondoFoto = '';

    const body = document.body;
    const root = document.documentElement;

    if (body && body.style) {
      body.style.backgroundImage = '';
      body.style.backgroundColor = '';
      body.style.backgroundSize = '';
      body.style.backgroundPosition = '';
      body.style.backgroundAttachment = '';
    }
    if (root && root.style && typeof root.style.removeProperty === 'function') {
      root.style.removeProperty('--texto');
      root.style.removeProperty('--card');
      root.style.removeProperty('--bg-suave');

      if (cfg.colorAcento && contrasteConBlanco(cfg.colorAcento) >= 4.5) {
        root.style.setProperty('--primary', cfg.colorAcento);
        const hex = cfg.colorAcento.replace('#', '');
        const r = Math.round(parseInt(hex.slice(0, 2), 16) * 0.78).toString(16).padStart(2, '0');
        const g = Math.round(parseInt(hex.slice(2, 4), 16) * 0.78).toString(16).padStart(2, '0');
        const b2 = Math.round(parseInt(hex.slice(4, 6), 16) * 0.78).toString(16).padStart(2, '0');
        root.style.setProperty('--primary-dark', `#${r}${g}${b2}`);
      } else {
        root.style.removeProperty('--primary');
        root.style.removeProperty('--primary-dark');
      }
    }

    // --- Foto del hero ---
    const hero = document.querySelector('.hero');
    if (hero && hero.style && typeof hero.style.setProperty === 'function') {
      if (cfg.heroFoto) hero.style.setProperty('--hero-bg-img', `url("${cfg.heroFoto}")`);
      else hero.style.removeProperty('--hero-bg-img');
    }

    // --- Descripción del footer ---
    const footerDesc = document.getElementById ? document.getElementById('footer-desc') : null;
    if (footerDesc && cfg.footerDescripcion) footerDesc.textContent = cfg.footerDescripcion;
  }

  document.addEventListener('DOMContentLoaded', iniciar);
})();