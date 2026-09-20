import { IMAGES } from "./images";

/* ────────────────────────────── Types ────────────────────────────── */

export type MenuCategory = {
  id: string;
  name: string;
  tagline: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  /** Shown on the home page "Featured menu" + "Signature dishes" rails. */
  featured: boolean;
  signature: boolean;
  tags: string[];
  available: boolean;
};

export type GalleryImage = {
  id: string;
  image: string;
  caption: string;
  /** Portrait tiles break up the masonry grid. */
  ratio: "portrait" | "square" | "landscape";
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
};

export type OpeningHour = {
  id: string;
  day: string;
  opens: string;
  closes: string;
  closed: boolean;
  note?: string;
};

export type ReservationStatus = "pending" | "confirmed" | "seated" | "cancelled";

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  request: string;
  status: ReservationStatus;
  createdAt: number;
};

export type SiteContent = {
  brand: {
    name: string;
    wordmark: string;
    tagline: string;
    michelin: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    mapQuery: string;
    instagram: string;
    facebook: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    stats: { label: string; value: string }[];
  };
  signature: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  chef: {
    kicker: string;
    title: string;
    name: string;
    role: string;
    quote: string;
    bio: string;
    image: string;
    accolades: string[];
  };
  story: {
    kicker: string;
    title: string;
    paragraphs: string[];
    image: string;
    since: string;
  };
  featured: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  gallery: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  testimonials: {
    kicker: string;
    title: string;
  };
  hours: {
    kicker: string;
    title: string;
    note: string;
  };
  location: {
    kicker: string;
    title: string;
    description: string;
    dressCode: string;
    parking: string;
  };
  reservationCta: {
    title: string;
    subtitle: string;
    note: string;
  };
  menuPage: {
    kicker: string;
    title: string;
    subtitle: string;
    tastingMenuTitle: string;
    tastingMenuPrice: number;
    tastingMenuDescription: string;
    tastingMenuCourses: string[];
  };
  aboutPage: {
    kicker: string;
    title: string;
    lead: string;
    values: { id: string; title: string; body: string }[];
    timeline: { id: string; year: string; title: string; body: string }[];
  };
  galleryPage: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  contactPage: {
    kicker: string;
    title: string;
    subtitle: string;
    privateDining: string;
  };
  categories: MenuCategory[];
  items: MenuItem[];
  galleryImages: GalleryImage[];
  testimonialsList: Testimonial[];
  openingHours: OpeningHour[];
};

/* ─────────────────────────── Defaults ─────────────────────────── */

const p = (key: keyof typeof IMAGES) => key as string;

const cat = (id: string, name: string, tagline: string): MenuCategory => ({ id, name, tagline });

export const defaultContent: SiteContent = {
  brand: {
    name: "Maison Noir",
    wordmark: "Maison Noir",
    tagline: "Contemporary Fine Dining",
    michelin: "One Michelin Star · 2024",
  },
  contact: {
    phone: "+33 1 84 88 21 45",
    whatsapp: "+33 6 12 45 78 90",
    email: "reservations@maisonnoir.fr",
    address: "18 Rue des Lanternes",
    city: "75003 Paris, France",
    mapQuery: "18 Rue des Lanternes, 75003 Paris, France",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  hero: {
    kicker: "Paris · Since 1998",
    title: "An Evening Worth Remembering",
    subtitle:
      "Contemporary cuisine, exceptional ingredients and an atmosphere designed for unforgettable evenings.",
    primaryCta: "View Menu",
    secondaryCta: "Reserve a Table",
    image: p("heroInterior"),
    stats: [
      { label: "Michelin Star", value: "2024" },
      { label: "Wine Labels", value: "480" },
      { label: "Seats", value: "54" },
    ],
  },
  signature: {
    kicker: "Signature Plates",
    title: "The dishes our guests return for",
    subtitle:
      "Four plates that define the house style — precise technique, seasonal produce and a quiet, confident hand with seasoning.",
  },
  chef: {
    kicker: "The Kitchen",
    title: "A chef obsessed with the last five percent",
    name: "Élodie Marchand",
    role: "Executive Chef & Proprietor",
    quote: "Luxury is restraint. Anyone can add — the craft is knowing when to stop.",
    bio: "Élodie trained in Lyon and Copenhagen before taking the pass at Maison Noir in 2016. Her cooking is architectural without being cold: produce sourced the same morning, sauces reduced for two days, and plating that lets a single ingredient take the room.",
    image: p("chefPortrait"),
    accolades: ["Michelin Star, 2024", "Gault & Millau — 4 Toques", "World's 50 Best — Discovery"],
  },
  story: {
    kicker: "Our Story",
    title: "Twenty-six years on the Rue des Lanternes",
    paragraphs: [
      "Maison Noir opened in 1998 inside a former atelier, its walls left deliberately raw so the candlelight has something to fall against. The original marble bar still stands where it always has — only the menu keeps moving.",
      "Today we seat fifty-four guests a night across three intimate rooms, each with its own tempo: the bar for aperitifs, the garden room for long dinners, and the cellar table for twelve, where the wine pairing is poured by our sommelier himself.",
    ],
    image: p("diningRoom"),
    since: "1998",
  },
  featured: {
    kicker: "This Season",
    title: "From the current menu",
    subtitle:
      "Our carte changes with the market. These are the plates on the pass this week — printed each morning, never twice the same.",
  },
  gallery: {
    kicker: "The Room",
    title: "An evening at Maison Noir",
    subtitle: "Candlelight, brass, and the quiet theatre of a dining room found at its best.",
  },
  testimonials: {
    kicker: "Guest Book",
    title: "What our guests say",
  },
  hours: {
    kicker: "Opening Hours",
    title: "When we welcome you",
    note: "Last orders are taken 45 minutes before closing. The bar pours until midnight, Thursday through Saturday.",
  },
  location: {
    kicker: "Find Us",
    title: "In the heart of the Marais",
    description:
      "Tucked behind a lantern-lit archway two minutes from Place des Vosges. Look for the brass plaque — there is no sign, and that is deliberate.",
    dressCode: "Smart elegant. Jackets appreciated, never required.",
    parking: "Valet parking from 19:00 · Métro Saint-Paul (line 1), 3 minutes on foot.",
  },
  reservationCta: {
    title: "Reserve your table",
    subtitle:
      "Tables are released 60 days in advance and the weekend service fills quickly. We hold a small number of counter seats for walk-ins each evening.",
    note: "For parties of 7 or more, please contact us directly.",
  },
  menuPage: {
    kicker: "The Carte",
    title: "Dinner Menu",
    subtitle:
      "Served Tuesday to Sunday from 19:00. Our kitchen can accommodate most dietary requirements with 24 hours' notice.",
    tastingMenuTitle: "Menu Dégustation",
    tastingMenuPrice: 145,
    tastingMenuDescription:
      "Seven courses chosen by Chef Marchand from whatever the market gave us that morning. Wine pairing available.",
    tastingMenuCourses: [
      "Amuse-bouche & house bread",
      "Two opening courses",
      "Fish from the day boat",
      "Main course from the wood grill",
      "Cheese trolley",
      "Seasonal dessert",
      "Petit fours & coffee",
    ],
  },
  aboutPage: {
    kicker: "About",
    title: "A house built on patience",
    lead: "Maison Noir is a family-run restaurant with a single obsession: that every guest leaves having had the best dinner of their month.",
    values: [
      {
        id: "v1",
        title: "Sourced the same morning",
        body: "Our fish arrives at 05:40 from a day boat in Brittany; vegetables come from two growers who plant for us by name.",
      },
      {
        id: "v2",
        title: "Technique in service of flavour",
        body: "Sauces are built over days, not hours. Nothing lands on the pass that has not been tasted twice.",
      },
      {
        id: "v3",
        title: "A room that lets you talk",
        body: "Acoustics treated, lighting dimmed to 40 lux after 21:00, tables spaced so the table beside you stays a stranger.",
      },
      {
        id: "v4",
        title: "Hospitality without theatre",
        body: "We remember regulars' allergies and their anniversaries. Service should feel inevitable, never performed.",
      },
    ],
    timeline: [
      { id: "t1", year: "1998", title: "The atelier", body: "Henri Marchand opens a 22-seat bistro behind a lantern archway." },
      { id: "t2", year: "2007", title: "The cellar", body: "A vaulted stone cellar is restored into a private table for twelve." },
      { id: "t3", year: "2016", title: "A new generation", body: "Élodie takes the pass and rebuilds the carte around seasonal produce." },
      { id: "t4", year: "2024", title: "One star", body: "Michelin awards a star; Gault & Millau names us a four-toque house." },
    ],
  },
  galleryPage: {
    kicker: "Gallery",
    title: "Inside Maison Noir",
    subtitle: "Three rooms, one kitchen, and a marble bar that has seen twenty-six years of evenings.",
  },
  contactPage: {
    kicker: "Contact",
    title: "Come and see us",
    subtitle:
      "Questions about a reservation, a private event or a dietary requirement? We answer every message personally.",
    privateDining:
      "The cellar table seats twelve and includes a private sommelier. Minimum spend applies Friday and Saturday.",
  },

  categories: [
    cat("starters", "Starters", "Small plates to open the evening"),
    cat("mains", "Main Courses", "The heart of the carte"),
    cat("seafood", "Seafood", "Landed the same morning"),
    cat("meat", "Meat", "Aged, grilled over oak"),
    cat("desserts", "Desserts", "Pastry made in-house daily"),
    cat("drinks", "Drinks", "Cellar, bar and zero-proof"),
  ],

  items: [
    /* Starters */
    {
      id: "i1",
      categoryId: "starters",
      name: "Heirloom Tomato Tartare",
      description: "Hand-cut tomatoes, shallot, aged sherry vinegar, basil oil and toasted sourdough.",
      price: 19,
      image: p("tomatoTartare"),
      featured: true,
      signature: true,
      tags: ["Vegetarian", "Vegan option"],
      available: true,
    },
    {
      id: "i2",
      categoryId: "starters",
      name: "Chestnut & Truffle Velouté",
      description: "Silken chestnut cream, black truffle shavings, chive oil, brioche soldiers.",
      price: 17,
      image: p("veloute"),
      featured: false,
      signature: false,
      tags: ["Vegetarian"],
      available: true,
    },
    {
      id: "i3",
      categoryId: "starters",
      name: "Duck Liver Parfait",
      description: "Whipped parfait, Sauternes jelly, toasted pistachio, brioche feuilletée.",
      price: 24,
      image: p("parfait"),
      featured: false,
      signature: false,
      tags: ["House classic"],
      available: true,
    },
    {
      id: "i4",
      categoryId: "starters",
      name: "Burrata & Blood Orange",
      description: "Puglian burrata, blood orange, pink peppercorn honey, tarragon.",
      price: 21,
      image: p("burrata"),
      featured: false,
      signature: false,
      tags: ["Vegetarian", "Gluten free"],
      available: true,
    },
    {
      id: "i5",
      categoryId: "starters",
      name: "Charred Leek Vinaigrette",
      description: "Grilled baby leeks, hazelnut praline, egg yolk confit, mustard vinaigrette.",
      price: 16,
      image: p("charredLeek"),
      featured: false,
      signature: false,
      tags: ["Vegetarian"],
      available: true,
    },

    /* Main courses */
    {
      id: "i6",
      categoryId: "mains",
      name: "Wild Mushroom Risotto",
      description: "Carnaroli rice, girolles and ceps, aged parmesan, thyme butter.",
      price: 32,
      image: p("risotto"),
      featured: true,
      signature: false,
      tags: ["Vegetarian"],
      available: true,
    },
    {
      id: "i7",
      categoryId: "mains",
      name: "Salt-Baked Celeriac",
      description: "Whole celeriac baked in salt, black garlic purée, pickled walnut, watercress.",
      price: 29,
      image: p("celeriac"),
      featured: false,
      signature: false,
      tags: ["Vegetarian", "Vegan"],
      available: true,
    },
    {
      id: "i8",
      categoryId: "mains",
      name: "Truffle Tagliatelle",
      description: "Egg tagliatelle folded through parmesan cream, fresh périgord truffle.",
      price: 34,
      image: p("tagliatelle"),
      featured: false,
      signature: false,
      tags: ["Vegetarian", "Seasonal"],
      available: true,
    },
    {
      id: "i9",
      categoryId: "mains",
      name: "Saffron Pumpkin Agnolotti",
      description: "Hand-pinched agnolotti, roasted pumpkin, brown butter, sage, amaretti crumb.",
      price: 30,
      image: p("agnolotti"),
      featured: false,
      signature: false,
      tags: ["Vegetarian"],
      available: true,
    },
    {
      id: "i10",
      categoryId: "mains",
      name: "Heritage Chicken Suprême",
      description: "Corn-fed chicken, vin jaune sauce, girolles, confit leg croquette.",
      price: 38,
      image: p("chickenSupreme"),
      featured: false,
      signature: false,
      tags: ["House classic"],
      available: true,
    },

    /* Seafood */
    {
      id: "i11",
      categoryId: "seafood",
      name: "Fine de Claire Oysters",
      description: "Half dozen No. 2, champagne mignonette, rye crumb, lemon.",
      price: 26,
      image: p("oysters"),
      featured: false,
      signature: false,
      tags: ["Raw bar", "Gluten free"],
      available: true,
    },
    {
      id: "i12",
      categoryId: "seafood",
      name: "Hand-Dived Scallop Crudo",
      description: "Orkney scallop, yuzu kosho, cucumber, dill oil, finger lime.",
      price: 28,
      image: p("scallopCrudo"),
      featured: true,
      signature: true,
      tags: ["Raw bar", "Gluten free"],
      available: true,
    },
    {
      id: "i13",
      categoryId: "seafood",
      name: "Line-Caught Turbot",
      description: "Roasted on the bone, beurre blanc, samphire, sea herbs, mussel emulsion.",
      price: 46,
      image: p("turbot"),
      featured: true,
      signature: false,
      tags: ["Day boat"],
      available: true,
    },
    {
      id: "i14",
      categoryId: "seafood",
      name: "Lobster Linguine",
      description: "Half native lobster, bisque butter, linguine, chervil, Espelette.",
      price: 52,
      image: p("lobsterLinguine"),
      featured: false,
      signature: true,
      tags: ["Signature"],
      available: true,
    },
    {
      id: "i15",
      categoryId: "seafood",
      name: "Caviar & Buckwheat Blini",
      description: "30g Oscietra caviar, warm blini, crème fraîche, chives.",
      price: 68,
      image: p("caviar"),
      featured: false,
      signature: false,
      tags: ["Celebration"],
      available: true,
    },

    /* Meat */
    {
      id: "i16",
      categoryId: "meat",
      name: "Aged Beef Tournedos",
      description: "45-day aged Charolais, bordelaise, bone marrow, pommes soufflées.",
      price: 58,
      image: p("tournedos"),
      featured: true,
      signature: true,
      tags: ["Signature", "Grill"],
      available: true,
    },
    {
      id: "i17",
      categoryId: "meat",
      name: "Rack of Lamb, Black Garlic",
      description: "Pyrenean lamb, black garlic purée, aubergine caviar, rosemary jus.",
      price: 48,
      image: p("lamb"),
      featured: false,
      signature: false,
      tags: ["Grill"],
      available: true,
    },
    {
      id: "i18",
      categoryId: "meat",
      name: "Challans Duck Breast",
      description: "Dry-aged duck, cherry gastrique, salt-baked beetroot, five spice.",
      price: 44,
      image: p("duck"),
      featured: false,
      signature: false,
      tags: ["House classic"],
      available: true,
    },
    {
      id: "i19",
      categoryId: "meat",
      name: "Ibérico Pork Presa",
      description: "Oak-grilled presa, romesco, padrón peppers, smoked paprika oil.",
      price: 39,
      image: p("iberico"),
      featured: false,
      signature: false,
      tags: ["Grill"],
      available: true,
    },
    {
      id: "i20",
      categoryId: "meat",
      name: "Dry-Aged Ribeye for Two",
      description: "1kg bone-in ribeye, café de Paris butter, triple-cooked chips, watercress.",
      price: 96,
      image: p("ribeye"),
      featured: false,
      signature: false,
      tags: ["To share", "Grill"],
      available: true,
    },

    /* Desserts */
    {
      id: "i21",
      categoryId: "desserts",
      name: "Valrhona Chocolate Fondant",
      description: "Warm Guanaja fondant, salted caramel, crème anglaise, cocoa nib praline.",
      price: 16,
      image: p("fondant"),
      featured: true,
      signature: false,
      tags: ["Vegetarian"],
      available: true,
    },
    {
      id: "i22",
      categoryId: "desserts",
      name: "Vanilla Mille-Feuille",
      description: "Tahitian vanilla crème diplomate, caramelised puff pastry, gold leaf.",
      price: 15,
      image: p("milleFeuille"),
      featured: false,
      signature: false,
      tags: ["Vegetarian"],
      available: true,
    },
    {
      id: "i23",
      categoryId: "desserts",
      name: "Crème Brûlée à la Fève",
      description: "Tonka bean custard, burnt sugar crust, almond tuile.",
      price: 14,
      image: p("cremeBrulee"),
      featured: false,
      signature: false,
      tags: ["Vegetarian", "Gluten free"],
      available: true,
    },
    {
      id: "i24",
      categoryId: "desserts",
      name: "Raspberry & Rose Soufflé",
      description: "Made to order, 20 minutes. Raspberry coulis, rose petal, crème fraîche sorbet.",
      price: 18,
      image: p("souffle"),
      featured: false,
      signature: false,
      tags: ["Vegetarian", "Made to order"],
      available: true,
    },
    {
      id: "i25",
      categoryId: "desserts",
      name: "Cheese Trolley Selection",
      description: "Five matured cheeses from our cellar, quince, walnut, raisin bread.",
      price: 22,
      image: p("cheeseTrolley"),
      featured: false,
      signature: false,
      tags: ["Vegetarian"],
      available: true,
    },

    /* Drinks */
    {
      id: "i26",
      categoryId: "drinks",
      name: "Maison Noir Old Fashioned",
      description: "Cognac, chestnut syrup, cocoa bitters, orange oils, oak-smoked glass.",
      price: 18,
      image: p("cocktail"),
      featured: true,
      signature: true,
      tags: ["Bar signature"],
      available: true,
    },
    {
      id: "i27",
      categoryId: "drinks",
      name: "Bergamot French 75",
      description: "Gin, bergamot cordial, champagne, lemon twist.",
      price: 17,
      image: p("barCounter"),
      featured: false,
      signature: false,
      tags: ["Cocktail"],
      available: true,
    },
    {
      id: "i28",
      categoryId: "drinks",
      name: "Château Margaux 2015",
      description: "Premier Grand Cru Classé, Margaux. Served by the glass, 125ml.",
      price: 42,
      image: p("wineGlasses"),
      featured: false,
      signature: false,
      tags: ["Cellar", "By the glass"],
      available: true,
    },
    {
      id: "i29",
      categoryId: "drinks",
      name: "Sancerre 'Les Monts Damnés'",
      description: "Flinty Loire sauvignon, citrus and white flowers. Bottle or glass.",
      price: 16,
      image: p("wineBottles"),
      featured: false,
      signature: false,
      tags: ["Cellar", "By the glass"],
      available: true,
    },
    {
      id: "i30",
      categoryId: "drinks",
      name: "Zero-Proof Garden Spritz",
      description: "Verjus, elderflower, cucumber, soda, rosemary — no alcohol, all the ceremony.",
      price: 12,
      image: p("spritz"),
      featured: false,
      signature: false,
      tags: ["Zero proof"],
      available: true,
    },
  ],

  galleryImages: [
    { id: "g1", image: p("heroInterior"), caption: "The garden room, 21:00", ratio: "landscape" },
    { id: "g2", image: p("candlelitRoom"), caption: "Table seven, candlelight", ratio: "portrait" },
    { id: "g3", image: p("chefPlating"), caption: "Service on the pass", ratio: "square" },
    { id: "g4", image: p("tableSetting"), caption: "Set for a private dinner", ratio: "square" },
    { id: "g5", image: p("marbleBar"), caption: "The original marble bar", ratio: "landscape" },
    { id: "g6", image: p("cocktail"), caption: "Chestnut Old Fashioned", ratio: "portrait" },
    { id: "g7", image: p("pastryDetail"), caption: "Pastry section, 15:30", ratio: "square" },
    { id: "g8", image: p("produce"), caption: "Morning delivery", ratio: "square" },
    { id: "g9", image: p("serviceDetail"), caption: "Silver service detail", ratio: "portrait" },
    { id: "g10", image: p("platedGreen"), caption: "Herb garden garnish", ratio: "square" },
    { id: "g11", image: p("sommelier"), caption: "The cellar table", ratio: "portrait" },
    { id: "g12", image: p("breadService"), caption: "House bread, baked daily", ratio: "square" },
  ],

  testimonialsList: [
    {
      id: "r1",
      quote:
        "The scallop crudo is the single best thing I have eaten in Paris this year. Service was quietly flawless — we were never once interrupted, yet never once waiting.",
      author: "Camille Desforges",
      role: "Le Figaro — Restaurant Critic",
      rating: 5,
    },
    {
      id: "r2",
      quote:
        "We booked for an anniversary and they remembered it without being told. Candlelight, the cellar table, a dessert with a candle in it. Faultless from the first pour.",
      author: "Idris & Naomi Bennett",
      role: "Guests, London",
      rating: 5,
    },
    {
      id: "r3",
      quote:
        "As a vegetarian I am used to being an afterthought. Here the celeriac was the dish the whole table envied. That is rare and it is why we return.",
      author: "Dr. Sofia Lindqvist",
      role: "Regular since 2019",
      rating: 5,
    },
    {
      id: "r4",
      quote:
        "We hosted twelve clients in the cellar. The sommelier read the room perfectly. Two of them have since booked for their own anniversaries.",
      author: "Marc Aurel",
      role: "Private dining guest",
      rating: 5,
    },
  ],

  openingHours: [
    { id: "h1", day: "Monday", opens: "—", closes: "—", closed: true, note: "Kitchen closed" },
    { id: "h2", day: "Tuesday", opens: "19:00", closes: "22:30", closed: false },
    { id: "h3", day: "Wednesday", opens: "19:00", closes: "22:30", closed: false },
    { id: "h4", day: "Thursday", opens: "19:00", closes: "23:30", closed: false, note: "Bar until midnight" },
    { id: "h5", day: "Friday", opens: "18:30", closes: "23:30", closed: false, note: "Bar until midnight" },
    { id: "h6", day: "Saturday", opens: "12:00", closes: "23:30", closed: false, note: "Lunch & dinner" },
    { id: "h7", day: "Sunday", opens: "12:00", closes: "21:30", closed: false, note: "Lunch & dinner" },
  ],
};

export const defaultReservations: Reservation[] = [
  {
    id: "res-1",
    name: "Camille Desforges",
    phone: "+33 6 44 21 09 88",
    email: "camille.d@lefigaro.fr",
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: "20:00",
    request: "Anniversary — quiet corner table if possible.",
    status: "confirmed",
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
  },
  {
    id: "res-2",
    name: "Marc Aurel",
    phone: "+33 6 11 78 22 40",
    email: "m.aurel@aurelpartners.com",
    guests: 8,
    date: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    time: "19:30",
    request: "Cellar table. Two guests eat pescatarian.",
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "res-3",
    name: "Sofia Lindqvist",
    phone: "+46 70 984 11 23",
    email: "sofia@lindqvist.se",
    guests: 4,
    date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    time: "21:00",
    request: "Vegetarian menu for two guests.",
    status: "confirmed",
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
];
