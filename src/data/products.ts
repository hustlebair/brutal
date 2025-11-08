export interface Product {
  name: string;
  description: string;
  image: string;
  url: string;
  categories: string[]; // Changed from single category to array
  primaryCategory?: string; // Optional: for display purposes
  tags?: string[]; // Additional tags for filtering (e.g., "gifts-for-him", "anniversary", "under-50")
  price?: string; // Optional: for future use
  featured?: boolean; // Optional: for featured products
}

// Helper function to filter products by category
export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter((product) => 
    product.categories.includes(category) || 
    product.primaryCategory === category
  );
}

// Helper function to filter products by tag
export function getProductsByTag(products: Product[], tag: string): Product[] {
  return products.filter((product) => 
    product.tags?.includes(tag.toLowerCase())
  );
}

// Helper function to get all unique categories
export function getAllCategories(products: Product[]): string[] {
  const categories = new Set<string>();
  products.forEach((product) => {
    product.categories.forEach((cat) => categories.add(cat));
    if (product.primaryCategory) {
      categories.add(product.primaryCategory);
    }
  });
  return Array.from(categories).sort();
}

// Static products (legacy - can be migrated to markdown files)
const staticProducts: Product[] = [
  {
    name: "Mini Fridge for Your Desk",
    description: "Keep your drinks cold without leaving your desk. The ultimate WFH flex that everyone's talking about.",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🏠 Home & Office", "🔥 Trending"],
    primaryCategory: "🏠 Home & Office",
    tags: ["desk-accessories", "gifts-for-him", "office-supplies"],
  },
  {
    name: "Electric Lighter That Never Runs Out",
    description: "No more running out of fuel. This rechargeable lighter is the coolest thing you didn't know you needed.",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🎁 Funny Gifts", "🔥 Trending"],
    primaryCategory: "🎁 Funny Gifts",
    tags: ["gifts-for-him", "anniversary", "birthday", "under-50"],
  },
  {
    name: "Phone Case with PopSocket Built-In",
    description: "The case that makes your phone easier to hold and impossible to drop. TikTok made this one famous.",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🔥 Trending"],
    primaryCategory: "🔥 Trending",
    tags: ["electronics", "gifts-for-her", "gifts-for-him", "under-30"],
  },
  {
    name: "Morf Fidget Worm Toy",
    description: "The Morf Fidget Worm flexes, collapses, and twists for endless play. A fun versatile slug toy designed to keep hands busy, minds calm, and focus sharp wherever you are.",
    image: "/products/morf.jpg",
    url: "https://amzn.to/4qN06vx",
    categories: ["🔥 Trending"],
    primaryCategory: "🔥 Trending",
    tags: ["gifts-for-her", "gifts-for-him", "under-30"],
  },
];

// Helper function to normalize image URLs
// Keeps relative paths as-is (Astro serves /public/ files correctly)
// Only handles edge cases for non-standard paths
function normalizeImageUrl(imageUrl: string): string {
  // If it's already a full URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path starting with /, keep it as-is
  // Astro will serve files from /public/ correctly in both dev and production
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // Otherwise return as-is (might be a relative path without leading /)
  return imageUrl;
}

// Load products from markdown files (content collection)
export async function getProductsFromFiles(): Promise<Product[]> {
  try {
    const { getCollection } = await import('astro:content');
    const productEntries = await getCollection('products');
    return productEntries.map(entry => ({
      name: entry.data.name,
      description: entry.data.description,
      image: normalizeImageUrl(entry.data.image),
      url: entry.data.url,
      categories: entry.data.categories,
      primaryCategory: entry.data.primaryCategory,
      tags: entry.data.tags,
      price: entry.data.price,
      featured: entry.data.featured,
    }));
  } catch (error) {
    console.warn('Could not load products from files:', error);
    return [];
  }
}

// Combined products (static + from files)
// Note: In Astro pages, use getProducts() instead of products array
export async function getProducts(): Promise<Product[]> {
  const fileProducts = await getProductsFromFiles();
  // Normalize static product images too
  const normalizedStaticProducts = staticProducts.map(product => ({
    ...product,
    image: normalizeImageUrl(product.image),
  }));
  return [...normalizedStaticProducts, ...fileProducts];
}

// For backward compatibility, export static products
// Pages should use getProducts() for full list including markdown files
export const products = staticProducts;
