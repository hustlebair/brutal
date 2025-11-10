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
    name: "2 in 1 Magnetic Splittable Bluetooth Speaker",
    description: "These two speakers can be connected and paired to produce surround sound, providing a 360-degree audio experience. However, when separated, they deliver superior left and right stereo sound, making them ideal for parties. The speakers are user-friendly and offer the option to split them for optimal sound performance.",
    image: "https://www.highestliked.com/2in1speaker.jpg",
    url: "https://amzn.to/3WHyMkC",
    categories: ["🔥 Trending", "🏠 Home & Office"],
    primaryCategory: "🏠 Home & Office",
    tags: ["gifts-for-him", "christmas", "under-50", "tiktok-finds"],
  },
  {
    name: "Corner Lamp Ambient Vibe Light",
    description: "LED floor lamp offers a wide range of colors to suit your mood and preference. Choose from over 16 million vibrant colors or adjust the brightness to create the perfect ambiance for any room in your home.",
    image: "https://www.highestliked.com/cornerlamp.jpg",
    url: "https://amzn.to/4hVrxiS",
    categories: ["🏠 Home & Office", "🔥 Trending"],
    primaryCategory: "🏠 Home & Office",
    tags: ["gifts-for-her", "gifts-for-him", "home-decor", "viral"],
  },
  {
    name: "The Gecko RC Wall Crawler",
    description: "A Fresh and Fun Toy Experience: Easily control this realistic gecko as it climbs along the wall toward your family or friends. With its realistic movements, it's perfect for playful pranks and bringing pure, joyful laughter.",
    image: "https://www.highestliked.com/gecko.jpg",
    url: "https://amzn.to/4p0n5l9",
    categories: ["🔥 Trending"],
    primaryCategory: "🔥 Trending",
    tags: ["gifts-for-kids", "christmas", "under-50", "tiktok-finds", "electronics", "birthday"],
  },
  {
    name: "2-in-1 Wireless CarPlay Adapter",
    description: "Enjoy both Wireless CarPlay and HDMI streaming in one compact Car TV Mate Pro. This upgraded wireless CarPlay adapter effortlessly transforms your factory-wired CarPlay into a wireless setup for a clutter-free driving environment. Seamlessly access iPhone apps like Maps, Music, Phone, and Siri directly on your car's display, while maintaining full control through your car's original buttons",
    image: "https://www.highestliked.com/carplay.jpg",
    url: "https://amzn.to/4qP4ZEd",
    categories: ["🧠 Smart Finds"],
    primaryCategory: "🧠 Smart Finds",
    tags: ["gifts-for-him", "under-100", "electronics"],
  },
  {
    name: "Quick Install Window Camera",
    description: "Immerse yourself in stunning visuals with Girafit's 3MP Ultra-HD camera, utilizing ChroMax Al color night vision to bring day-like clarity even in the darkest nights.",
    image: "https://www.highestliked.com/windowcamera.jpg",
    url: "https://amzn.to/4hL2ezG",
    categories: ["🏠 Home & Office", "🔥 Trending", "🚀 TikTok Finds"],
    primaryCategory: "🏠 Home & Office",
    tags: ["gifts-for-him", "under-50", "electronics"],
  },
  {
    name: "Remote Control Dinosaur Toys for Kids",
    description: "Unleash the Jurassic World with Moskiddo RC Dinosaur! The T-Rex brings prehistoric playtime to life, featuring realistic walking, ferocious roars, mist spraying, and a LED light.",
    image: "https://www.highestliked.com/dino.jpg",
    url: "https://amzn.to/3WJRMz1",
    categories: ["🔥 Trending"],
    primaryCategory: "🔥 Trending",
    tags: ["gifts-for-kids", "under-50", "birthday"],
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
