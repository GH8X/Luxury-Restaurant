/**
 * Central image registry.
 *
 * Every photograph used by the site is referenced from here, and each one is
 * also editable from the /admin demo — so swapping a URL is a two-click job
 * for whoever owns the restaurant.
 */

type Fit = "crop" | "clip";

export function img(id: string, width = 1200, fit: Fit = "crop") {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=${fit}&w=${width}&q=80`;
}

export const IMAGES = {
  /* ── Spaces ───────────────────────────────────────────────── */
  heroInterior: "1517248135467-4c7edcad34c4",
  diningRoom: "1414235077428-338989a2e8c0",
  candlelitRoom: "1552566626-52f8b828add9",
  marbleBar: "1424847651672-bf20a4b0982b",
  barCounter: "1514933651103-005eec06c04b",

  /* ── People ───────────────────────────────────────────────── */
  chefPortrait: "1577219491135-ce391730fb2c",
  chefPlating: "1583394293214-28ded15ee548",
  sommelier: "1595273670150-bd0c3c392e46",

  /* ── Drinks ───────────────────────────────────────────────── */
  cocktail: "1470337458703-46ad1756a187",
  wineGlasses: "1541544181051-e46607bc22a4",
  wineBottles: "1568213816046-0ee1c42bd559",
  spritz: "1495521821757-a1efb6729352",

  /* ── Plates ───────────────────────────────────────────────── */
  tomatoTartare: "1512621776951-a57141f2eefd",
  veloute: "1476718406336-bb5a9690ee2a",
  parfait: "1540189549336-e6e99c3679fe",
  burrata: "1546069901-ba9599a7e63c",
  charredLeek: "1490645935967-10de6ba17061",

  oysters: "1498654896293-37aacf113fd9",
  scallopCrudo: "1559339352-11d035aa65de",
  turbot: "1467003909585-2f8a72700288",
  lobsterLinguine: "1559847844-5315695dadae",
  caviar: "1615141982883-c7ad0e69fd62",

  tournedos: "1600891964092-4316c288032e",
  lamb: "1544025162-d76694265947",
  duck: "1504674900247-0877df9cc836",
  iberico: "1555939594-58d7cb561ad1",
  ribeye: "1543007630-9710e4a00a20",

  risotto: "1476124369491-e7addf5db371",
  celeriac: "1606787366850-de6330128bfc",
  tagliatelle: "1473093295043-cdd812d0e601",
  agnolotti: "1476224203421-9ac39bcb3327",
  chickenSupreme: "1482049016688-2d3e1b311543",

  fondant: "1551024506-0bccd828d307",
  milleFeuille: "1563805042-7684c019e1cb",
  cremeBrulee: "1432139555190-58524dae6a55",
  souffle: "1551218808-94e220e084d2",
  cheeseTrolley: "1600565193348-f74bd3c7ccdf",

  /* ── Atmosphere / texture ─────────────────────────────────── */
  tableSetting: "1600891964599-f61ba0e24092",
  produce: "1504754524776-8f4f37790ca0",
  platedGreen: "1466637574441-749b8f19452f",
  serviceDetail: "1587899897387-091ebd01a6b2",
  pastryDetail: "1607013251379-e6eecfffe234",
  breadService: "1567620905732-2d1ec7ab7445",
  grill: "1551782450-a2132b4ba21d",
} as const;

export type ImageKey = keyof typeof IMAGES;

/** Resolve a registry key to a CDN URL. Accepts raw URLs unchanged. */
export function photo(key: ImageKey | string, width = 1200) {
  if (/^https?:\/\//.test(key)) return key;
  const id = (IMAGES as Record<string, string>)[key] ?? IMAGES.heroInterior;
  return img(id, width);
}

/** Stable, deterministic blur placeholder so every card has the film-grain look. */
export function blurFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  const h = hash;
  return `linear-gradient(135deg, hsl(${h} 12% 12%) 0%, hsl(${(h + 40) % 360} 10% 7%) 100%)`;
}
