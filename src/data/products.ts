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
    name: "Morf Fidget Worm Toy",
    description: "The Morf Fidget Worm flexes, collapses, and twists for endless play. A fun versatile slug toy designed to keep hands busy, minds calm, and focus sharp wherever you are.",
    image: "https://www.highestliked.com/morf.jpg",
    url: "https://amzn.to/4qN06vx",
    categories: ["🔥 Trending"],
    primaryCategory: "🔥 Trending",
    tags: ["gifts-for-her", "gifts-for-him", "under-30"],
  },
  {
    name: "Loop Lasso NANO",
    description: "The Ultimate Interactive Light Toy - The Loop Lasso combines physics and technology to shoot a glowing string at over 40+ mph to create a mind-blowing levitating effect. Move your hand and watch it as it follows your every motion through the air to create colorful, illuminated shapes.",
    image: "https://www.highestliked.com/looplasso.jpg",
    url: "https://amzn.to/47uwo6X",
    categories: ["🔥 Trending", "🚀 TikTok Finds"],
    primaryCategory: "🚀 TikTok Finds",
    tags: ["gifts-for-him", "gifts-for-her", "under-50", "viral", "christmas"],
  },
  {
    name: "Mini 4K Portable Projector",
    description: "Turn any wall into a home theater! Project your desktop, PC, Gaming Console or laptop with HDMI. 180 degree rotation and built in web apps like Netflix.",
    image: "https://www.highestliked.com/projector.jpg",
    url: "https://amzn.to/47Oi1cC",
    categories: ["🏠 Home & Office"],
    primaryCategory: "🏠 Home & Office",
    tags: ["gifts-for-him", "under-50", "tiktok-finds", "birthday"],
  },
  {
    name: "2 in 1 Magnetic Dual Splittable Bluetooth Speaker",
    description: "These two speakers can be connected and paired to produce surround sound, providing a 360-degree audio experience. However, when separated, they deliver superior left and right stereo sound, making them ideal for parties. The speakers are user-friendly and offer the option to split them for optimal sound performance.",
    image: "https://www.highestliked.com/2in1speaker.jpg",
    url: "https://amzn.to/3WHyMkC",
    categories: ["🔥 Trending", "🏠 Home & Office"],
    primaryCategory: "🏠 Home & Office",
    tags: ["gifts-for-him", "christmas", "under-50", "tiktok-finds"],
  },
];

// Helper function to normalize image URLs
// Converts relative paths to absolute URLs for production compatibility
// Keeps relative paths as-is in development (Astro serves /public/ files correctly)
function normalizeImageUrl(imageUrl: string, baseUrl?: string): string {
  // If it's already a full URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Strip /public/ prefix if present (files in /public/ are served at root)
  if (imageUrl.startsWith('/public/')) {
    imageUrl = imageUrl.replace(/^\/public/, '');
  }
  
  // If it's a relative path starting with /, convert to absolute URL if baseUrl is provided
  // This ensures images work in production deployments
  if (imageUrl.startsWith('/')) {
    if (baseUrl) {
      // Ensure baseUrl doesn't have trailing slash
      const cleanBaseUrl = baseUrl.replace(/\/$/, '');
      return `${cleanBaseUrl}${imageUrl}`;
    }
    // If no baseUrl, keep as relative (works in dev)
    return imageUrl;
  }
  
  // Otherwise return as-is (might be a relative path without leading /)
  return imageUrl;
}

// Load products from markdown files (content collection)
export async function getProductsFromFiles(baseUrl?: string): Promise<Product[]> {
  try {
    const { getCollection } = await import('astro:content');
    const productEntries = await getCollection('products');
    return productEntries.map(entry => ({
      name: entry.data.name,
      description: entry.data.description,
      image: normalizeImageUrl(entry.data.image, baseUrl),
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
export async function getProducts(baseUrl?: string): Promise<Product[]> {
  const fileProducts = await getProductsFromFiles(baseUrl);
  // Normalize static product images too
  const normalizedStaticProducts = staticProducts.map(product => ({
    ...product,
    image: normalizeImageUrl(product.image, baseUrl),
  }));
  return [...normalizedStaticProducts, ...fileProducts];
}

// For backward compatibility, export static products
// Pages should use getProducts() for full list including markdown files
export const products = staticProducts;
