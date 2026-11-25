/* =====================================================================
   Jacks4WD · Configuración base de la tienda (marcas y vehículos de arranque)
   ===================================================================== */

const TIENDA_CONFIG = {
  nombre: 'Jacks4WD',
  whatsapp: '584142333535',
  instagram: 'https://instagram.com/jacks4wd',
  youtube: '',
  moneda: 'USD',
  descuentoCliente: 10,
  modoPrivadoIG: true,
  claveInvitado: 'jacks4wd',
  // Dirección pública de la tienda: base de los enlaces que se copian (invitado, cliente).
  // Al lanzar con dominio propio, cámbiala por 'https://tienda.jacks4wd.com/'.
  urlPublica: 'https://app.jacks4wd.com/jacks4wd-tienda/',
};

const CONFIG_INICIAL = {
  heroTitulo: 'Equipa tu 4x4 con lo mejor',
  heroSubtitulo: 'Suspensiones, accesorios y merch oficial. Elige tu vehículo y pide directo por WhatsApp.',
  fondo: '#f6f5f3',
  footerDescripcion: 'Especialistas en vehículos 4x4 · Suspensiones, accesorios y merch.',
  modoPrivadoIG: true,
  claveInvitado: 'jacks4wd',
  categorias: [
    {
      id: 'suspension',
      nombre: 'Kits de suspensión',
      shop: 'Suspension Parts',
      icono: '🔧',
      texto: 'Sistemas completos de suspensión para tu 4x4',
      subcategorias: [
        { id: 'nitrocharger', nombre: 'Nitrocharger' },
        { id: 'mt64', nombre: 'MT64' },
        { id: 'bp51', nombre: 'BP-51' },
      ],
    },
    {
      id: 'partes',
      nombre: 'Partes de suspensión',
      shop: 'Suspension Parts',
      icono: '⚙️',
      texto: 'Brazos de control, amortiguadores, resortes y repuestos por separado',
      subcategorias: [
        { id: 'mesetas', nombre: 'Brazos de control superiores / Mesetas' },
        { id: 'amortiguadores', nombre: 'Amortiguadores' },
        { id: 'resortes', nombre: 'Resortes' },
        { id: 'barras', nombre: 'Barras estabilizadoras' },
        { id: 'bujes', nombre: 'Bujes y rótulas' },
      ],
    },
    {
      id: 'accesorio',
      nombre: 'Accesorios',
      shop: 'Accesorios',
      icono: '🛞',
      texto: 'Luces, winches y equipamiento 4x4',
      subcategorias: [
        { id: 'luces', nombre: 'Luces' },
        { id: 'winches', nombre: 'Winches' },
        { id: 'protecciones', nombre: 'Protecciones' },
      ],
    },
    {
      id: 'merch',
      nombre: 'Merch',
      shop: 'Merch',
      icono: '👕',
      texto: 'Ropa y stickers del taller',
    },
  ],
  faqs: [
  {
    "id": "faq-mesetas",
    "esMesetas": true,
    "pregunta": "¿Por qué recomendamos combinar tu kit de suspensión con Brazos de Control Superiores (Mesetas)?",
    "respuesta": "Al elevar un vehículo 4x4 (especialmente a partir de 2 pulgadas), la geometría original de la suspensión delantera cambia y se pierde ángulo de avance (caster) y caída (camber). Los Brazos de Control Superiores (Mesetas / UCA) corregidos devuelven los ángulos de alineación a rango óptimo de fábrica, evitan que la rótula superior trabaje forzada en descuelgue máximo, mejoran notablemente la estabilidad en autopista y permiten aprovechar todo el recorrido real de tus nuevos amortiguadores."
  },
  {
    "id": "faq-instalacion",
    "esMesetas": false,
    "pregunta": "¿Realizan la instalación y alineación en el taller Jacks4WD?",
    "respuesta": "Sí. En nuestro taller contamos con personal especializado en sistemas 4x4 para instalar tu suspensión, brazos de control superiores, bolsas de aire y accesorios, aplicando el torque exacto de fabricante. Escríbenos al cerrar tu pedido por WhatsApp para coordinar tu cita."
  },
  {
    "id": "faq-pagos",
    "esMesetas": false,
    "pregunta": "¿Cuáles son los métodos de pago y entrega disponibles?",
    "respuesta": "Aceptamos Zelle, Pago Móvil y efectivo directamente en el taller. Puedes retirar tus piezas en nuestras instalaciones, agendar instalación directa o coordinar envío asegurado."
  }
],
};

const MARCAS = [
  { id: 'ome', nombre: 'Old Man Emu', logo: '', descripcion: 'Suspensiones australianas ARB de alto rendimiento (Nitrocharger, MT64 y BP-51).' },
  { id: 'dobinsons', nombre: 'Dobinsons', logo: '', descripcion: 'Sistemas de suspensión y resortes 4x4 de ingeniería australiana.' },
  { id: 'jacks4wd', nombre: 'Jacks4WD', logo: '', descripcion: 'Merch oficial del taller.' },
];

const VEHICULOS = [
  {
    "id": "veh-toyota-meru-prado",
    "marca": "Toyota",
    "modelo": "Land Cruiser Serie 90",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-autana",
    "marca": "Toyota",
    "modelo": "Land Cruiser S80",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-fortuner",
    "marca": "Toyota",
    "modelo": "Fortuner",
    "foto": "",
    "generaciones": [
      {
        "nombre": "Fortuner Nacional",
        "anios": []
      },
      {
        "nombre": "Fortuner Dubai",
        "anios": []
      }
    ]
  },
  {
    "id": "veh-toyota-4runner",
    "marca": "Toyota",
    "modelo": "4Runner",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-fj-cruiser",
    "marca": "Toyota",
    "modelo": "FJ Cruiser",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-prado-s150",
    "marca": "Toyota",
    "modelo": "Prado S150",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-roraima-s200",
    "marca": "Toyota",
    "modelo": "Roraima Serie 200",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-lc250",
    "marca": "Toyota",
    "modelo": "Land Cruiser LC250",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-lc300",
    "marca": "Toyota",
    "modelo": "Land Cruiser 300",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-hilux",
    "marca": "Toyota",
    "modelo": "Hilux",
    "foto": "",
    "generaciones": [
      {
        "nombre": "Hilux Nacional",
        "anios": []
      },
      {
        "nombre": "Hilux Revo",
        "anios": []
      }
    ]
  },
  {
    "id": "veh-toyota-tacoma",
    "marca": "Toyota",
    "modelo": "Tacoma",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-tundra",
    "marca": "Toyota",
    "modelo": "Tundra",
    "foto": "",
    "generaciones": [
      { "nombre": "Tundra 2007–2021", "anios": [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021] },
      { "nombre": "Tundra 2022 en adelante", "anios": [2022, 2023, 2024, 2025, 2026] }
    ]
  },
  {
    "id": "veh-toyota-machito",
    "marca": "Toyota",
    "modelo": "Machito",
    "foto": "",
    "generaciones": [
      {
        "nombre": "Machito S71",
        "anios": []
      },
      {
        "nombre": "Machito S76",
        "anios": []
      },
      {
        "nombre": "Machito S79",
        "anios": []
      }
    ]
  },
  {
    "id": "veh-jeep-wrangler-jk",
    "marca": "Jeep",
    "modelo": "Rubicon / Wrangler JK",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-jeep-wrangler-jl",
    "marca": "Jeep",
    "modelo": "Rubicon / Wrangler JL",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-jeep-grand-cherokee",
    "marca": "Jeep",
    "modelo": "Grand Cherokee",
    "foto": "",
    "generaciones": [
      {
        "nombre": "WJ Millenium",
        "anios": []
      },
      {
        "nombre": "Grand Cherokee WK",
        "anios": []
      },
      {
        "nombre": "Grand Cherokee WK2",
        "anios": []
      },
      {
        "nombre": "Commander",
        "anios": []
      }
    ]
  },
  {
    "id": "veh-jeep-cherokee",
    "marca": "Jeep",
    "modelo": "Cherokee",
    "foto": "",
    "generaciones": [
      {
        "nombre": "Cherokee KJ",
        "anios": []
      },
      {
        "nombre": "Cherokee KK",
        "anios": []
      }
    ]
  },
  {
    "id": "veh-mitsubishi-montero",
    "marca": "Mitsubishi",
    "modelo": "Montero",
    "foto": "",
    "generaciones": [
      {
        "nombre": "Montero Sport",
        "anios": []
      },
      {
        "nombre": "Montero Limited",
        "anios": []
      },
      {
        "nombre": "Montero Dakar",
        "anios": []
      }
    ]
  },
  {
    "id": "veh-mitsubishi-l200",
    "marca": "Mitsubishi",
    "modelo": "L200",
    "foto": "",
    "generaciones": [
      { "nombre": "L200 2015–2025", "anios": [] },
      { "nombre": "L200 2024 en adelante", "anios": [] }
    ]
  },
  {
    "id": "veh-ford-ranger",
    "marca": "Ford",
    "modelo": "Ranger",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-ford-bronco",
    "marca": "Ford",
    "modelo": "Bronco",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-ford-everest",
    "marca": "Ford",
    "modelo": "Everest",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-ford-f250-f350",
    "marca": "Ford",
    "modelo": "F-250 / F-350",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-nissan-patrol",
    "marca": "Nissan",
    "modelo": "Patrol Y61",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-nissan-pathfinder",
    "marca": "Nissan",
    "modelo": "Pathfinder",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-suzuki-jimny",
    "marca": "Suzuki",
    "modelo": "Jimny",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-chevrolet-luv-dmax",
    "marca": "Chevrolet",
    "modelo": "Luv D-Max",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-mazda-bt50",
    "marca": "Mazda",
    "modelo": "BT-50",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-changan-kaicene-f70",
    "marca": "Changan",
    "modelo": "Kaicene F70",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-dongfeng-pickup",
    "marca": "Dongfeng",
    "modelo": "Dongfeng Pick-up",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-toyota-sequoia",
    "marca": "Toyota",
    "modelo": "Sequoia",
    "foto": "",
    "generaciones": [
      { "nombre": "Sequoia hasta 2021", "anios": [] },
      { "nombre": "Sequoia 2022 en adelante", "anios": [2022, 2023, 2024, 2025, 2026] }
    ]
  },
  {
    "id": "veh-chevrolet-tahoe",
    "marca": "Chevrolet",
    "modelo": "Tahoe",
    "foto": "",
    "generaciones": []
  },
  {
    "id": "veh-ford-explorer",
    "marca": "Ford",
    "modelo": "Explorer",
    "foto": "",
    "generaciones": []
  }
];

/* Los productos (kits Old Man Emu, Dobinsons, merch…) viven en Supabase y se
 * administran desde la propia tienda (Administrar). Este archivo solo trae la
 * configuración, marcas y vehículos base que la tienda usa al arrancar. */
