// utils/migrateProducts.ts

export type Product = {
  name: string;
  description: string;
  image: string;
  url: string;
  categories: string[];
  primaryCategory?: string;
  tags?: string[];
  price?: string;
  featured?: boolean;
};

// === Your current canonical filters ===
export const CATEGORY_OPTIONS = [
  { id: 'cat-cool-tech', label: 'Cool Tech' },
  { id: 'cat-home-stuff', label: 'Home Stuff' },
  { id: 'cat-self-care', label: 'Self Care' },
  { id: 'cat-lol-gifts', label: 'LOL Gifts' },
  { id: 'cat-adventure', label: 'Adventure' },
  { id: 'cat-seasonal', label: 'Seasonal' },
] as const;

export const ALLOWED_TAGS = new Set([
  // price
  'under-20', '20-50', '50-100', 'over-100',
  // recipient
  'gifts-for-him', 'gifts-for-her', 'gifts-for-kids', 'for-everyone',
  // context/occasion
  'viral', 'funny', 'aesthetic', 'useful',
  'birthday', 'christmas', 'valentines', 'anniversary',
  'mothers-day', 'fathers-day', 'white-elephant',
]);

// === Price tag mapping rules ===
const PRICE_NORMALIZE: Record<string, string> = {
  'under-30': 'under-20',
  'under-50': '20-50',
  'under-100': '50-100',
};

// Detect any price tag present (after normalization)
const PRICE_TAGS = new Set(['under-20', '20-50', '50-100', 'over-100']);

// === Optional: map old categories to new ===
const CATEGORY_MAP: Record<string, string> = {
  '🔥 Trending': 'Cool Tech',
  '🚀 TikTok Finds': 'Cool Tech',
  '🧠 Smart Finds': 'Cool Tech',
  '🏠 Home & Office': 'Home Stuff',
  '🎁 Funny Gifts': 'LOL Gifts',
  Outdoor: 'Adventure',
  Outdoors: 'Adventure',
  Seasonal: 'Seasonal',
};

export function normalizeCategories(cats: string[]): string[] {
  const mapped = cats
    .map((c) => CATEGORY_MAP[c] ?? c)
    .filter((c) => CATEGORY_OPTIONS.some((opt) => opt.label === c));
  // dedupe and cap to first two
  return Array.from(new Set(mapped)).slice(0, 2);
}

export function normalizePrimaryCategory(primary: string | undefined, cats: string[]): string | undefined {
  if (!primary) return cats[0];
  const mapped = CATEGORY_MAP[primary] ?? primary;
  return cats.includes(mapped) ? mapped : cats[0];
}

export function migrateTags(oldTags: string[] | undefined): string[] {
  const input = oldTags ?? [];
  // normalize price tags
  const normalized = input.map((t) => PRICE_NORMALIZE[t] ?? t);

  // filter to allowed set
  const filtered = normalized.filter((t) => ALLOWED_TAGS.has(t));

  // ensure 1 price tag exists
  const hasPrice = filtered.some((t) => PRICE_TAGS.has(t));
  if (!hasPrice) filtered.push('over-100');

  // dedupe
  const deduped = Array.from(new Set(filtered));
  return deduped;
}

// --- RUN MIGRATION ---
export function migrateProducts(products: Product[]): Product[] {
  return products.map((p) => {
    const categories = normalizeCategories(p.categories || []);
    const primaryCategory = normalizePrimaryCategory(p.primaryCategory, categories);
    const tags = migrateTags(p.tags);

    return {
      ...p,
      categories: categories.length ? categories : ['Cool Tech'], // fallback
      primaryCategory: primaryCategory,
      tags,
    };
  });
}


