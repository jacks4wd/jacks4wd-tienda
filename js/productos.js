/* =====================================================================
   Jacks4WD · Catálogo inicial de la tienda (datos de arranque)
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
};

const CONFIG_INICIAL = {
  heroEtiqueta: 'JACKS4WD · Especialistas 4x4',
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

const PRODUCTOS = [
  {
    "id": "ome-nitrocharger-meru-prado",
    "nombre": "Kit de Suspensión Nitrocharger Meru / Prado",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1340,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser Serie 90",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-2-autana-light",
    "nombre": "Kit de Suspensión Nitrocharger 2\" Autana Light +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "2\"",
    "precio": 1496,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser S80",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-2-autana",
    "nombre": "Kit de Suspensión Nitrocharger 2\" Autana +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "2\"",
    "precio": 1496,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser S80",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-3-autana",
    "nombre": "Kit de Suspensión Nitrocharger 3\" Autana +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 1521,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser S80",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-4-autana",
    "nombre": "Kit de Suspensión Nitrocharger 4\" Autana +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "4\"",
    "precio": 1651,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser S80",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-5-autana",
    "nombre": "Kit de Suspensión Nitrocharger 5\" Autana +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "5\"",
    "precio": 1671,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser S80",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-fortuner-2006-2020-nacional-medium",
    "nombre": "Kit de Suspensión Nitrocharger Fortuner 2006-2020 Nacional Medium",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1345,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Fortuner",
        "anios": [],
        "genNombre": "Fortuner Nacional"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-fortuner-dubai-2016-on-medium",
    "nombre": "Kit de Suspensión Nitrocharger Fortuner Dubai 2016-ON Medium",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1367,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Fortuner",
        "anios": [],
        "genNombre": "Fortuner Dubai"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-4runner-fj-2006-2010",
    "nombre": "Kit de Suspensión Nitrocharger 4Runner / FJ 2006-2010 +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1340,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      },
      {
        "marca": "Toyota",
        "modelo": "FJ Cruiser",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-4runner-2010-2024-prado-s150-medium",
    "nombre": "Kit de Suspensión Nitrocharger 4Runner 2010-2024 / Prado S150 Medium +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1340,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      },
      {
        "marca": "Toyota",
        "modelo": "Prado S150",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-4runner-2025-con-mesetas-superiores",
    "nombre": "Kit de Suspensión Nitrocharger 4Runner 2025+ Con Mesetas Superiores",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2395,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-roraima-land-cruiser-serie-200",
    "nombre": "Kit de Suspensión Nitrocharger Roraima Land Cruiser Serie 200",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1405,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Roraima Serie 200",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-lc250-2-2-8-diesel-medium",
    "nombre": "Kit de Suspensión Nitrocharger LC250 2\" 2.8 Diesel Medium",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "2\"",
    "precio": 1592,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser LC250",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-lc250-3-hybrid-i-forcemax",
    "nombre": "Kit de Suspensión Nitrocharger LC250 3\" Hybrid I-ForceMax",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 1537,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser LC250",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-lc300-soft-medium",
    "nombre": "Kit de Suspensión Nitrocharger LC300 Soft / Medium +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1465,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser 300",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-lc300-hd",
    "nombre": "Kit de Suspensión Nitrocharger LC300 HD +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1540,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser 300",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-hilux-nacional-kavak",
    "nombre": "Kit de Suspensión Nitrocharger Hilux Nacional (KAVAK)",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1953,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Nacional"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-hilux-revo-2016-on",
    "nombre": "Kit de Suspensión Nitrocharger Hilux REVO 2016-ON",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2163,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-hilux-revo-2016-on-con-bolsas-de-aire",
    "nombre": "Kit de Suspensión Nitrocharger Hilux REVO 2016-On Con Bolsas de Aire",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3053,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-hilux-revo-2016-on-con-bolsas-de-aire-modulo-y",
    "nombre": "Kit de Suspensión Nitrocharger Hilux REVO 2016-On con Bolsas de Aire, Módulo y Kit Espiche",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3509,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-tundra",
    "nombre": "Kit de Suspensión Nitrocharger Tundra",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2513,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tundra",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-tundra-3-2022",
    "nombre": "Kit de Suspensión Nitrocharger Tundra 3\" 2022+",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 2512,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tundra",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-tacoma-16-on",
    "nombre": "Kit de Suspensión Nitrocharger Tacoma 16-ON +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1989,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tacoma",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-tacoma-2024-3",
    "nombre": "Kit de Suspensión Nitrocharger Tacoma 2024+ 3\"",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 1570,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tacoma",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-3-machito-s71-03-10",
    "nombre": "Kit de Suspensión Nitrocharger 3\" Machito S71 03-10 +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 2299,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S71"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-3-machito-s71-10-on-2-puertas",
    "nombre": "Kit de Suspensión Nitrocharger 3\" Machito S71 10-ON 2 Puertas +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 2299,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S71"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-3-machito-s76-4-puertas",
    "nombre": "Kit de Suspensión Nitrocharger 3\" Machito S76 4 Puertas +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 2599,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S76"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-3-s78-y-s79-hembrita-long-van-10-on",
    "nombre": "Kit de Suspensión Nitrocharger 3\" S78 y S79 Hembrita / Long Van 10-ON +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 2721,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-machito-78-y-79-con-bolsas-de-aire",
    "nombre": "Kit de Suspensión Nitrocharger Machito 78 y 79 Con Bolsas de Aire",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3681,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-machito-78-y-79-con-bolsas-de-aire-modulo-y-kit",
    "nombre": "Kit de Suspensión Nitrocharger Machito 78 y 79 con Bolsas de Aire, Módulo y Kit Espiche",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4136,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-cherokee-liberty-kj",
    "nombre": "Kit de Suspensión Nitrocharger Cherokee Liberty KJ",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1335,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Cherokee",
        "anios": [],
        "genNombre": "Cherokee KJ"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-cherokee-liberty-kk",
    "nombre": "Kit de Suspensión Nitrocharger Cherokee Liberty KK",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1335,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Cherokee",
        "anios": [],
        "genNombre": "Cherokee KK"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-grand-cherokee-wk2-5g-2016-on",
    "nombre": "Kit de Suspensión Nitrocharger Grand Cherokee WK2 5G 2016-ON",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1725,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Grand Cherokee",
        "anios": [],
        "genNombre": "Grand Cherokee WK2"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-grand-cherokee-wk2-10-16",
    "nombre": "Kit de Suspensión Nitrocharger Grand Cherokee WK2 10-16",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1635,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Grand Cherokee",
        "anios": [],
        "genNombre": "Grand Cherokee WK2"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-grand-cherokee-wk-06-10",
    "nombre": "Kit de Suspensión Nitrocharger Grand Cherokee WK 06-10",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1268,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Grand Cherokee",
        "anios": [],
        "genNombre": "Grand Cherokee WK"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-grand-cherokee-commander",
    "nombre": "Kit de Suspensión Nitrocharger Grand Cherokee Commander",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1268,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Grand Cherokee",
        "anios": [],
        "genNombre": "Commander"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-grand-cherokee-wj-millenium",
    "nombre": "Kit de Suspensión Nitrocharger Grand Cherokee WJ Millenium",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1160,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Grand Cherokee",
        "anios": [],
        "genNombre": "WJ Millenium"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-rubicon-jk-2010-2016-2-y-4-ptas",
    "nombre": "Kit de Suspensión Nitrocharger Rubicon JK 2010-2016 2 y 4 Ptas.",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1419,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Rubicon / Wrangler JK",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-rubicon-jl-4-2010-2016-2-y-4-ptas",
    "nombre": "Kit de Suspensión Nitrocharger Rubicon JL 4\" 2010-2016 2 y 4 Ptas.",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "4\"",
    "precio": 2552,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Rubicon / Wrangler JL",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-montero-dakar",
    "nombre": "Kit de Suspensión Nitrocharger Montero Dakar",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1608,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Mitsubishi",
        "modelo": "Montero",
        "anios": [],
        "genNombre": "Montero Dakar"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-montero-dakar-con-gemelos",
    "nombre": "Kit de Suspensión Nitrocharger Montero Dakar con Gemelos",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1803,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Mitsubishi",
        "modelo": "Montero",
        "anios": [],
        "genNombre": "Montero Dakar"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-montero-sport-2004-2007",
    "nombre": "Kit de Suspensión Nitrocharger Montero Sport 2004-2007",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1270,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Mitsubishi",
        "modelo": "Montero",
        "anios": [],
        "genNombre": "Montero Sport"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-montero-sport-14-23-medium",
    "nombre": "Kit de Suspensión Nitrocharger Montero Sport 14-23 Medium",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1335,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Mitsubishi",
        "modelo": "Montero",
        "anios": [],
        "genNombre": "Montero Sport"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-montero-limited",
    "nombre": "Kit de Suspensión Nitrocharger Montero Limited +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1400,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Mitsubishi",
        "modelo": "Montero",
        "anios": [],
        "genNombre": "Montero Limited"
      }
    ]
  },
  {
    "id": "ome-nitrocharger-mitsubishi-l200-soft",
    "nombre": "Kit de Suspensión Nitrocharger Mitsubishi L200 Soft +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2219,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Mitsubishi",
        "modelo": "L200",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-patrol-3",
    "nombre": "Kit de Suspensión Nitrocharger Patrol 3\"+",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 1606,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Nissan",
        "modelo": "Patrol Y61",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-patrol-4-hd-400kg",
    "nombre": "Kit de Suspensión Nitrocharger Patrol 4\" HD 400kg",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "4\"",
    "precio": 1725,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Nissan",
        "modelo": "Patrol Y61",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-pathfinder",
    "nombre": "Kit de Suspensión Nitrocharger Pathfinder",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1380,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Nissan",
        "modelo": "Pathfinder",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-luv-dmax",
    "nombre": "Kit de Suspensión Nitrocharger Luv-Dmax+",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2047,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Chevrolet",
        "modelo": "Luv D-Max",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-f250-f350-2-2005-2015",
    "nombre": "Kit de Suspensión Nitrocharger F250 & F350 2\" 2005-2015",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "2\"",
    "precio": 1035,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "F-250 / F-350",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-ford-ranger-2011-2023",
    "nombre": "Kit de Suspensión Nitrocharger Ford Ranger 2011-2023",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2101,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "Ranger",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-ford-ranger-my22-2024",
    "nombre": "Kit de Suspensión Nitrocharger Ford Ranger MY22 2024+",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2621,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "Ranger",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-ford-bronco-2021-on",
    "nombre": "Kit de Suspensión Nitrocharger Ford Bronco 2021-ON",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2081,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "Bronco",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-mazda-bt50-2006-2011",
    "nombre": "Kit de Suspensión Nitrocharger Mazda BT50 2006-2011 +",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1595,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Mazda",
        "modelo": "BT-50",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-kaicene-f70-changan",
    "nombre": "Kit de Suspensión Nitrocharger Kaicene F70 Changan",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2163,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Changan",
        "modelo": "Kaicene F70",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-dongfeng-2021",
    "nombre": "Kit de Suspensión Nitrocharger Dongfeng 2021",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1964,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Dongfeng",
        "modelo": "Dongfeng Pick-up",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-jimny-2-puertas-2018",
    "nombre": "Kit de Suspensión Nitrocharger Jimny 2 Puertas 2018",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1583,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Suzuki",
        "modelo": "Jimny",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-nitrocharger-jimny-4-puertas-2023",
    "nombre": "Kit de Suspensión Nitrocharger Jimny 4 Puertas 2023+",
    "categoria": "suspension",
    "subcategoria": "nitrocharger",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 1796,
    "descripcion": "Sistema completo de suspensión Old Man Emu línea Nitrocharger. Confort, control y durabilidad comprobada en ruta y off-road.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Suzuki",
        "modelo": "Jimny",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-fortuner-nacional",
    "nombre": "Kit de Suspensión BP-51 Fortuner Nacional",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4305,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Fortuner",
        "anios": [],
        "genNombre": "Fortuner Nacional"
      }
    ]
  },
  {
    "id": "ome-bp51-fortuner-dubai",
    "nombre": "Kit de Suspensión BP-51 Fortuner Dubai",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4447,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Fortuner",
        "anios": [],
        "genNombre": "Fortuner Dubai"
      }
    ]
  },
  {
    "id": "ome-bp51-4runner-2010-2024-fj-2010-2016",
    "nombre": "Kit de Suspensión BP-51 4Runner 2010-2024/FJ 2010-2016",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4205,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      },
      {
        "marca": "Toyota",
        "modelo": "FJ Cruiser",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-4runner-2025-con-mesetas-superiores",
    "nombre": "Kit de Suspensión BP-51 4Runner 2025+ con Mesetas Superiores",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5325,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-prado-s150",
    "nombre": "Kit de Suspensión BP-51 Prado S150",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4170,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Prado S150",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-lc250-2-2-8-diesel-medium",
    "nombre": "Kit de Suspensión BP-51 LC250 2\" 2.8 Diesel Medium",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "2\"",
    "precio": 4526,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser LC250",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-lc250-3-hybrid-i-forcemax",
    "nombre": "Kit de Suspensión BP-51 LC250 3\" Hybrid I-ForceMax",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 5147,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser LC250",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-autana-2-3",
    "nombre": "Kit de Suspensión BP-51 Autana 2-3\"",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "2\"-3\"",
    "precio": 3991,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser S80",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-autana-4",
    "nombre": "Kit de Suspensión BP-51 Autana 4\"",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "4\"",
    "precio": 4121,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser S80",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-land-cruiser-s200-roraima",
    "nombre": "Kit de Suspensión BP-51 Land Cruiser S200 Roraima",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4246,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Roraima Serie 200",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-lc300-soft",
    "nombre": "Kit de Suspensión BP-51 LC300 (Soft)",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4289,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser 300",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-land-cruiser-s300",
    "nombre": "Kit de Suspensión BP-51 Land Cruiser S300",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4345,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser 300",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-serie-71-2002-2009",
    "nombre": "Kit de Suspensión BP-51 Serie 71 2002-2009",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4763,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S71"
      }
    ]
  },
  {
    "id": "ome-bp51-machito-serie-76-4-pts",
    "nombre": "Kit de Suspensión BP-51 Machito Serie 76 4 Pts",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5063,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S76"
      }
    ]
  },
  {
    "id": "ome-bp51-hembrita-serie-78-79",
    "nombre": "Kit de Suspensión BP-51 Hembrita Serie 78/79",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5171,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-bp51-hembrita-serie-78-79-con-bolsas-de-aire",
    "nombre": "Kit de Suspensión BP-51 Hembrita Serie 78/79 Con Bolsas de Aire",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 6131,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-bp51-hembrita-serie-78-79-con-bolsas-de-aire-2",
    "nombre": "Kit de Suspensión BP-51 Hembrita Serie 78/79 con Bolsas de Aire, Módulo y Kit Espiche",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 6586,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-bp51-kavak-06-15",
    "nombre": "Kit de Suspensión BP-51 Kavak 06-15",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4812,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Nacional"
      }
    ]
  },
  {
    "id": "ome-bp51-hilux-revo-16",
    "nombre": "Kit de Suspensión BP-51 Hilux Revo 16+",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5258,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-bp51-revo-con-bolsas-de-aire",
    "nombre": "Kit de Suspensión BP-51 Revo Con Bolsas de Aire",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 6148,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-bp51-revo-con-bolsas-de-aire-modulo-y-kit-espiche",
    "nombre": "Kit de Suspensión BP-51 Revo Con Bolsas de Aire, Módulo y Kit Espiche",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 6604,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-bp51-tacoma-16",
    "nombre": "Kit de Suspensión BP-51 Tacoma 16+",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4927,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tacoma",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-tacoma-2024",
    "nombre": "Kit de Suspensión BP-51 Tacoma 2024+",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5157,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tacoma",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-tundra",
    "nombre": "Kit de Suspensión BP-51 Tundra",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5306,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tundra",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-tundra-2022",
    "nombre": "Kit de Suspensión BP-51 Tundra 2022+",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5128,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tundra",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-patrol-y61-4",
    "nombre": "Kit de Suspensión BP-51 Patrol Y61 4\"",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "4\"",
    "precio": 4220,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Nissan",
        "modelo": "Patrol Y61",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-jeep-jl-4-puertas-2018-2023",
    "nombre": "Kit de Suspensión BP-51 Jeep JL 4 Puertas 2018-2023",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4980,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Jeep",
        "modelo": "Rubicon / Wrangler JL",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-ranger-px3",
    "nombre": "Kit de Suspensión BP-51 Ranger PX3",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5125,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "Ranger",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-bp51-ranger-my22",
    "nombre": "Kit de Suspensión BP-51 Ranger MY22",
    "categoria": "suspension",
    "subcategoria": "bp51",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5282,
    "descripcion": "Sistema completo Old Man Emu línea BP-51 con bypass interno y reservorio remoto ajustable en compresión y rebote.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "Ranger",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-fortuner-dubai",
    "nombre": "Kit de Suspensión MT64 Fortuner Dubai",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2597,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Fortuner",
        "anios": [],
        "genNombre": "Fortuner Dubai"
      }
    ]
  },
  {
    "id": "ome-mt64-4runner-2003-fj-2006-2009",
    "nombre": "Kit de Suspensión MT64 4Runner 2003 / FJ 2006-2009",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2570,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      },
      {
        "marca": "Toyota",
        "modelo": "FJ Cruiser",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-4runner-10-24-prado-150-fj-2010",
    "nombre": "Kit de Suspensión MT64 4Runner 10-24 / Prado 150 / FJ 2010+",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2570,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      },
      {
        "marca": "Toyota",
        "modelo": "FJ Cruiser",
        "anios": []
      },
      {
        "marca": "Toyota",
        "modelo": "Prado S150",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-4runner-2025-con-mesetas-superiores",
    "nombre": "Kit de Suspensión MT64 4Runner 2025+ con Mesetas Superiores",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3896,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "4Runner",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-roraima-lc200-2007-2021",
    "nombre": "Kit de Suspensión MT64 Roraima LC200 2007-2021",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2615,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Roraima Serie 200",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-roraima-lc200-2007-2021-hd",
    "nombre": "Kit de Suspensión MT64 Roraima LC200 2007-2021 HD",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2635,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Roraima Serie 200",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-lc250-2-2-8-diesel-medium",
    "nombre": "Kit de Suspensión MT64 LC250 2\" 2.8 Diesel Medium",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "2\"",
    "precio": 2702,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser LC250",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-lc250-3-hybrid-i-forcemax",
    "nombre": "Kit de Suspensión MT64 LC250 3\" Hybrid I-ForceMax",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 3882,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser LC250",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-lc300-2022",
    "nombre": "Kit de Suspensión MT64 LC300 2022+",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2610,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser 300",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-lc300-2022-hd",
    "nombre": "Kit de Suspensión MT64 LC300 2022+ HD",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 2695,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Land Cruiser 300",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-revo",
    "nombre": "Kit de Suspensión MT64 Revo",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3488,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-mt64-revo-hd",
    "nombre": "Kit de Suspensión MT64 Revo HD",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3607,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-mt64-revo-con-bolsas-de-aire",
    "nombre": "Kit de Suspensión MT64 Revo con Bolsas de Aire",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4378,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-mt64-revo-con-bolsas-de-aire-modulo-y-kit-espiche",
    "nombre": "Kit de Suspensión MT64 Revo con Bolsas de Aire, Módulo y Kit Espiche",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4833,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Hilux",
        "anios": [],
        "genNombre": "Hilux Revo"
      }
    ]
  },
  {
    "id": "ome-mt64-tacoma",
    "nombre": "Kit de Suspensión MT64 Tacoma",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3251,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tacoma",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-tacoma-3-2024",
    "nombre": "Kit de Suspensión MT64 Tacoma 3\" 2024+",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "3\"",
    "precio": 4270,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tacoma",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-tundra-22",
    "nombre": "Kit de Suspensión MT64 Tundra 22+",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3602,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Tundra",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-machito-serie-71-2002-2009",
    "nombre": "Kit de Suspensión MT64 Machito Serie 71 (2002-2009)",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3699,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S71"
      }
    ]
  },
  {
    "id": "ome-mt64-machito-serie-76-2010-2024",
    "nombre": "Kit de Suspensión MT64 Machito Serie 76 (2010-2024)",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3999,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S76"
      }
    ]
  },
  {
    "id": "ome-mt64-machito-serie-78-79-2010-2024",
    "nombre": "Kit de Suspensión MT64 Machito Serie 78/79 (2010-2024)",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 4106,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-mt64-serie-78-79-2010-2026-con-bolsas-de-aire",
    "nombre": "Kit de Suspensión MT64 Serie 78/79 (2010-2026) Con Bolsas de Aire",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5066,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-mt64-serie-78-79-2010-2026-con-bolsas-aire",
    "nombre": "Kit de Suspensión MT64 Serie 78/79 (2010-2026) con Bolsas de Aire, Módulo y Kit Espiche",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 5521,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Toyota",
        "modelo": "Machito",
        "anios": [],
        "genNombre": "Machito S79"
      }
    ]
  },
  {
    "id": "ome-mt64-ranger-my22-2023",
    "nombre": "Kit de Suspensión MT64 Ranger MY22 2023+",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3661,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "Ranger",
        "anios": []
      }
    ]
  },
  {
    "id": "ome-mt64-ford-everest-con-mesetas-superiores",
    "nombre": "Kit de Suspensión MT64 Ford Everest con Mesetas Superiores",
    "categoria": "suspension",
    "subcategoria": "mt64",
    "marca": "Old Man Emu",
    "altura": "",
    "precio": 3440,
    "descripcion": "Sistema completo Old Man Emu línea MT64 monotubo de gran diámetro para alto desempeño, confort y capacidad de carga.",
    "foto": "",
    "compatibles": [
      {
        "marca": "Ford",
        "modelo": "Everest",
        "anios": []
      }
    ]
  },
  {
    "id": "merch-camiseta",
    "nombre": "Camiseta Jacks4WD \"You can go fast, I can go anywhere\"",
    "categoria": "merch",
    "tipo": "franelas",
    "genero": "",
    "marca": "Jacks4WD",
    "precio": 20,
    "descripcion": "Camiseta oficial con el lema del taller. 100% algodón.",
    "foto": "",
    "opciones": {
      "nombre": "Talla",
      "valores": [
        "S",
        "M",
        "L",
        "XL"
      ]
    }
  }
];

/* =====================================================================
   Kits Dobinsons · Lista de precios XNEO (20-06-2025), precio Detal.
   Se añaden una sola vez al catálogo (migración "migradoKitsDobinsons1"
   en tienda.js) y quedan fijos al pulsar "Guardar en la nube".
   Fuera por ahora: Sequoia/Tahoe blindada (N5) — irán con la selección
   por peso/uso — y el 4Runner 3,75" (pendiente de confirmar generación).
   El MRA Land Cruiser 300 ya existe en la nube ("Kit Suspension Dobinsons MRR").
   ===================================================================== */
const KITS_DOBINSONS = (() => {
  // Vehículos con los nombres exactos del catálogo en la nube
  const V = {
    prado90:  [{ marca: 'Toyota', modelo: 'Land Cruiser Serie 90' }],
    prado150: [{ marca: 'Toyota', modelo: 'Prado S150' }],
    autana:   [{ marca: 'Toyota', modelo: 'Land Cruiser S80' }],
    fortNac:  [{ marca: 'Toyota', modelo: 'Fortuner', genNombre: 'Fortuner 1era gen. (Ve)' }],
    fortDub:  [{ marca: 'Toyota', modelo: 'Fortuner', genNombre: 'Fortuner 2da gen. ' }],
    r4ta:     [{ marca: 'Toyota', modelo: '4Runner', genNombre: '4ta Generacion' }],
    r5ta:     [{ marca: 'Toyota', modelo: '4Runner', genNombre: '5ta Generacion' }],
    fj:       [{ marca: 'Toyota', modelo: 'FJ Cruiser' }],
    hiluxNac: [{ marca: 'Toyota', modelo: 'Hilux', genNombre: 'Hilux 7ma generacion "Kavak (ve)"' }],
    hiluxRevo:[{ marca: 'Toyota', modelo: 'Hilux', genNombre: 'Hilux 9na generacion (Revo-Adventure)' }],
    hiluxGR:  [{ marca: 'Toyota', modelo: 'Hilux', genNombre: 'Hilux GR ' }],
    tundraA:  [{ marca: 'Toyota', modelo: 'Tundra', genNombre: 'Tundra 2007–2021' }],
    tundraB:  [{ marca: 'Toyota', modelo: 'Tundra', genNombre: 'Tundra 2022 en adelante' }],
    tacoma:   [{ marca: 'Toyota', modelo: 'Tacoma' }],
    roraima:  [{ marca: 'Toyota', modelo: 'Roraima Serie 200' }],
    lc250:    [{ marca: 'Toyota', modelo: 'Land Cruiser LC250' }],
    s71:      [{ marca: 'Toyota', modelo: 'Land Cruiser 70 series', genNombre: 'S71 "Machito" ' }],
    s76:      [{ marca: 'Toyota', modelo: 'Land Cruiser 70 series', genNombre: 'S76' }],
    s79:      [{ marca: 'Toyota', modelo: 'Land Cruiser 70 series', genNombre: 'S79' }],
    sequoia:  [{ marca: 'Toyota', modelo: 'Sequoia' }],
    sequoiaB: [{ marca: 'Toyota', modelo: 'Sequoia', genNombre: 'Sequoia 2022 en adelante' }],
    kk:       [{ marca: 'Jeep', modelo: 'Cherokee', genNombre: 'Cherokee KK' }],
    wk:       [{ marca: 'Jeep', modelo: 'Grand Cherokee', genNombre: '3era gen. WK / Commander' }],
    wk2:      [{ marca: 'Jeep', modelo: 'Grand Cherokee', genNombre: '4ta gen WK2' }],
    jl:       [{ marca: 'Jeep', modelo: 'Rubicon / Wrangler JL' }],
    sport:    [{ marca: 'Mitsubishi', modelo: 'Montero / Pajero', genNombre: 'Montero / Pajero Sport' }],
    limited:  [{ marca: 'Mitsubishi', modelo: 'Montero / Pajero', genNombre: 'Montero / Pajero Limited' }],
    dakar:    [{ marca: 'Mitsubishi', modelo: 'Montero / Pajero', genNombre: 'Montero / Pajero  Dakar' }],
    l200A:    [{ marca: 'Mitsubishi', modelo: 'L200', genNombre: 'L200 2015–2025' }],
    l200B:    [{ marca: 'Mitsubishi', modelo: 'L200', genNombre: 'L200 2024 en adelante' }],
    patrol:   [{ marca: 'Nissan', modelo: 'Patrol Y61' }],
    tahoe:    [{ marca: 'Chevrolet', modelo: 'Tahoe' }],
    explorer: [{ marca: 'Ford', modelo: 'Explorer' }],
  };
  V.r4y5 = [...V.r4ta, ...V.r5ta];
  V.machitos = [...V.s71, ...V.s76, ...V.s79];

  const SERIES = {
    twintube: { nombre: 'Twintube', desc: 'línea Twintube, con amortiguadores de gas de doble tubo. Una opción confiable para el uso diario, la carretera y el off-road moderado.' },
    ims:      { nombre: 'IMS', desc: 'línea IMS, con amortiguadores monotubo. Más control y mejor disipación del calor que la línea Twintube, para un uso exigente en trocha.' },
    mra:      { nombre: 'MRA', desc: 'línea MRA, la gama más alta de Dobinsons en nuestra lista, pensada para el off-road más exigente y vehículos cargados.' },
  };
  const QR_PICKUP = 'Incluye 4 amortiguadores, espirales delanteros y tacos con tornillos en U.';
  const QR_MACHITO = 'Incluye 5 amortiguadores, espirales delanteros, bujes, correctores y gemelos extendidos.';

  // [serie, ¿medio kit Quick Ride?, nombre del vehículo, altura, precio Detal (USD), compatibles]
  const FILAS = [
    // ---- Twintube · kit completo ----
    ['twintube', 0, 'Merú / Prado', '', 1400, V.prado90],
    ['twintube', 0, 'Prado Serie 150', '', 1400, V.prado150],
    ['twintube', 0, '3" Autana Serie 80', '3"', 1910, V.autana],
    ['twintube', 0, '3" HD Autana Serie 80', '3"', 1783, V.autana],
    ['twintube', 0, '4" Autana Serie 80', '4"', 2099, V.autana],
    ['twintube', 0, '6" Autana Serie 80', '6"', 2099, V.autana],
    ['twintube', 0, 'Fortuner Nacional', '', 1400, V.fortNac],
    ['twintube', 0, 'Fortuner Dubai', '', 1400, V.fortDub],
    ['twintube', 0, '4Runner 4ta Generación', '', 1400, V.r4ta],
    ['twintube', 0, '4Runner 5ta Generación', '', 1400, V.r5ta],
    ['twintube', 0, 'FJ Cruiser', '', 1400, V.fj],
    ['twintube', 0, 'Hilux Nacional (parabólica)', '', 2206, V.hiluxNac],
    ['twintube', 0, 'Hilux Revo (parabólica)', '', 2320, V.hiluxRevo],
    ['twintube', 0, 'Tundra 2007-2021', '', 2680, V.tundraA],
    ['twintube', 0, 'Cherokee Liberty KK', '', 1400, V.kk],
    ['twintube', 0, 'Grand Cherokee WK', '', 1400, V.wk],
    ['twintube', 0, 'Jeep Commander', '', 1400, V.wk],
    ['twintube', 0, 'L200 2015-2025', '', 2235, V.l200A],
    ['twintube', 0, 'Montero Dakar', '', 2060, V.dakar],
    ['twintube', 0, 'Montero Sport', '', 1400, V.sport],
    ['twintube', 0, 'Machito Serie 71', '', 2470, V.s71],
    ['twintube', 0, 'Machito Serie 76 (4 puertas)', '', 3370, V.s76],
    ['twintube', 0, 'Hembrita Serie 78/79 (parabólica)', '', 3090, V.s79],
    ['twintube', 0, '3" Nissan Patrol', '3"', 1910, V.patrol],
    ['twintube', 0, '4" Nissan Patrol', '4"', 2099, V.patrol],
    ['twintube', 0, '6" Nissan Patrol', '6"', 2099, V.patrol],
    ['twintube', 0, 'Roraima Serie 200', '', 1456, V.roraima],
    ['twintube', 0, 'Tahoe', '', 1856, V.tahoe],
    ['twintube', 0, 'Explorer 2012+', '', 1856, V.explorer],
    ['twintube', 0, 'Sequoia', '', 1735, V.sequoia],
    // ---- IMS · kit completo ----
    ['ims', 0, '4Runner', '', 2195, V.r4y5],
    ['ims', 0, 'Fortuner Nacional', '', 2195, V.fortNac],
    ['ims', 0, 'FJ Cruiser', '', 2195, V.fj],
    ['ims', 0, 'Merú / Prado', '', 2195, V.prado90],
    ['ims', 0, 'Fortuner Dubai', '', 2195, V.fortDub],
    ['ims', 0, 'Prado Serie 150', '', 2195, V.prado150],
    ['ims', 0, 'Hilux Nacional (parabólica)', '', 3060, V.hiluxNac],
    ['ims', 0, 'Hilux Revo (parabólica)', '', 3170, V.hiluxRevo],
    ['ims', 0, 'Hilux GR (parabólica)', '', 3290, V.hiluxGR],
    ['ims', 0, 'Tundra 2022+', '', 2545, V.tundraB],
    ['ims', 0, 'Roraima Serie 200', '', 2490, V.roraima],
    ['ims', 0, 'Land Cruiser Serie 250', '', 2670, V.lc250],
    ['ims', 0, 'Machito Serie 71', '', 3430, V.s71],
    ['ims', 0, 'Machito Serie 76 (4 puertas)', '', 4320, V.s76],
    ['ims', 0, 'Hembrita Serie 78/79 (parabólica)', '', 3830, V.s79],
    ['ims', 0, 'Grand Cherokee WK2', '', 2460, V.wk2],
    ['ims', 0, 'Montero Limited', '', 2195, V.limited],
    ['ims', 0, '3" Autana Serie 80', '3"', 2860, V.autana],
    ['ims', 0, '4" Autana Serie 80', '4"', 2980, V.autana],
    ['ims', 0, '6" Autana Serie 80', '6"', 2980, V.autana],
    // ---- MRA · kit completo (el de Land Cruiser 300 ya existe en la nube) ----
    ['mra', 0, '4Runner', '', 3670, V.r4y5],
    ['mra', 0, 'FJ Cruiser', '', 3670, V.fj],
    ['mra', 0, 'Fortuner Nacional', '', 3670, V.fortNac],
    ['mra', 0, 'Fortuner Dubai', '', 3670, V.fortDub],
    ['mra', 0, 'Merú / Prado', '', 3670, V.prado90],
    ['mra', 0, '3" Autana Serie 80', '3"', 4880, V.autana],
    ['mra', 0, '4" Autana Serie 80', '4"', 4995, V.autana],
    ['mra', 0, '6" Autana Serie 80', '6"', 4995, V.autana],
    ['mra', 0, 'Hilux Nacional (parabólica)', '', 4475, V.hiluxNac],
    ['mra', 0, 'Hilux Revo (parabólica)', '', 4590, V.hiluxRevo],
    ['mra', 0, 'Hilux GR (parabólica)', '', 5075, V.hiluxGR],
    ['mra', 0, 'Tundra 2022+', '', 4135, V.tundraB],
    ['mra', 0, 'Roraima Serie 200', '', 4020, V.roraima],
    ['mra', 0, 'Land Cruiser Serie 250', '', 4080, V.lc250],
    ['mra', 0, 'Sequoia 2022+', '', 4080, V.sequoiaB],
    ['mra', 0, 'Machito Serie 71', '', 5075, V.s71],
    ['mra', 0, 'Machito Serie 76 (4 puertas)', '', 5970, V.s76],
    ['mra', 0, 'Hembrita Serie 78/79 (parabólica)', '', 5740, V.s79],
    ['mra', 0, 'L200 2024+', '', 4590, V.l200B],
    ['mra', 0, 'L200 2015-2025', '', 4500, V.l200A],
    ['mra', 0, 'Jeep Gladiator JT', '', 5235, V.jl], // el Gladiator JT comparte plataforma con el JL
    ['mra', 0, 'Jeep Rubicon JL', '', 5235, V.jl],
    ['mra', 0, '3" Nissan Patrol', '3"', 4360, V.patrol],
    ['mra', 0, '4" Nissan Patrol', '4"', 4995, V.patrol],
    ['mra', 0, '6" Nissan Patrol', '6"', 4995, V.patrol],
    // ---- Quick Ride (medio kit) · Twintube ----
    ['twintube', 1, 'Hilux Revo', '', 1270, V.hiluxRevo],
    ['twintube', 1, 'Hilux Nacional', '', 1270, V.hiluxNac],
    ['twintube', 1, 'Tundra 2007-2021', '', 1435, V.tundraA],
    ['twintube', 1, 'Machito S71/76/78/79', '', 1610, V.machitos],
    ['twintube', 1, 'Tacoma', '', 1270, V.tacoma],
    ['twintube', 1, 'L200 2024+', '', 1270, V.l200B],
    ['twintube', 1, 'L200 2015-2025', '', 1270, V.l200A],
    // ---- Quick Ride (medio kit) · IMS ----
    ['ims', 1, 'Hilux Nacional', '', 2190, V.hiluxNac],
    ['ims', 1, 'Hilux Revo', '', 2190, V.hiluxRevo],
    ['ims', 1, 'Hilux GR', '', 2320, V.hiluxGR],
    ['ims', 1, 'Tundra 2007-2021', '', 2465, V.tundraA],
    ['ims', 1, 'L200 2015-2025', '', 2190, V.l200A],
    ['ims', 1, 'Tacoma', '', 2190, V.tacoma],
    ['ims', 1, 'Machito S71/76/78/79', '', 2560, V.machitos],
    // ---- Quick Ride (medio kit) · MRA ----
    ['mra', 1, 'Hilux Nacional', '', 3530, V.hiluxNac],
    ['mra', 1, 'Hilux Revo', '', 3530, V.hiluxRevo],
    ['mra', 1, 'Hilux GR', '', 4275, V.hiluxGR],
    ['mra', 1, 'Tundra 2007-2021', '', 4100, V.tundraA],
    ['mra', 1, 'Tacoma', '', 3530, V.tacoma],
    ['mra', 1, 'L200 2024+', '', 3530, V.l200B],
    ['mra', 1, 'L200 2015-2025', '', 3530, V.l200A],
    ['mra', 1, 'Machito S71/76/78/79', '', 3860, V.machitos],
  ];

  const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/"/g, 'in').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return FILAS.map(([serie, medio, veh, altura, precio, compatibles]) => {
    const s = SERIES[serie];
    const esMachito = /machito/i.test(veh);
    return {
      id: `dob-${serie}-${medio ? 'qr-' : ''}${slug(veh)}`,
      nombre: medio
        ? `Medio Kit Quick Ride ${s.nombre} ${veh}`
        : `Kit de Suspensión ${s.nombre} ${veh}`,
      categoria: 'suspension',
      subcategoria: serie,
      marca: 'Dobinsons',
      altura,
      precio,
      descripcion: medio
        ? `Medio kit de suspensión Dobinsons Quick Ride, ${s.desc} ${esMachito ? QR_MACHITO : QR_PICKUP}`
        : `Kit completo de suspensión Dobinsons, ${s.desc}`,
      foto: '',
      compatibles: compatibles.map((c) => ({ ...c, anios: [] })),
    };
  });
})();
