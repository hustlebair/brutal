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
    categories: ["cat-cool-tech"],
    primaryCategory: "cat-cool-techs",
    tags: ["gifts-for-him", "gifts-for-her", "under-50", "viral", "christmas"],
  },
  {
    name: "Mini 4K Portable Projector",
    description: "Turn any wall into a home theater! Project your desktop, PC, Gaming Console or laptop with HDMI. 180 degree rotation and built in web apps like Netflix.",
    image: "https://www.highestliked.com/projector.jpg",
    url: "https://amzn.to/47Oi1cC",
    categories: ["cat-home-stuff"],
    primaryCategory: "cat-home-stuff",
    tags: ["gifts-for-him", "under-50", "tiktok-finds", "birthday"],
  },
  {
    name: "2 in 1 Magnetic Splittable Bluetooth Speaker",
    description: "These two speakers can be connected and paired to produce surround sound, providing a 360-degree audio experience. However, when separated, they deliver superior left and right stereo sound, making them ideal for parties. The speakers are user-friendly and offer the option to split them for optimal sound performance.",
    image: "https://www.highestliked.com/2in1speaker.jpg",
    url: "https://amzn.to/3WHyMkC",
    categories: ["cat-cool-tech"],
    primaryCategory: "cat-cool-tech",
    tags: ["gifts-for-him", "christmas", "under-50", "tiktok-finds"],
  },
  {
    name: "Corner Lamp Ambient Vibe Light",
    description: "LED floor lamp offers a wide range of colors to suit your mood and preference. Choose from over 16 million vibrant colors or adjust the brightness to create the perfect ambiance for any room in your home.",
    image: "https://www.highestliked.com/cornerlamp.jpg",
    url: "https://amzn.to/4hVrxiS",
    categories: ["cat-home-stuff"],
    primaryCategory: "cat-home-stuff",
    tags: ["gifts-for-her", "gifts-for-him", "home-decor","under-50", "viral"],
  },
  {
    name: "The Gecko RC Wall Crawler",
    description: "A Fresh and Fun Toy Experience: Easily control this realistic gecko as it climbs along the wall toward your family or friends. With its realistic movements, it's perfect for playful pranks and bringing pure, joyful laughter.",
    image: "https://www.highestliked.com/gecko.jpg",
    url: "https://amzn.to/4p0n5l9",
    categories: ["cat-home-stuff"],
    primaryCategory: "cat-home-stuff",
    tags: ["gifts-for-kids", "christmas", "under-50", "tiktok-finds", "electronics", "birthday"],
  },
  {
    name: "2-in-1 Wireless CarPlay Adapter",
    description: "Enjoy both Wireless CarPlay and HDMI streaming in one compact Car TV Mate Pro. This upgraded wireless CarPlay adapter effortlessly transforms your factory-wired CarPlay into a wireless setup for a clutter-free driving environment. Seamlessly access iPhone apps like Maps, Music, Phone, and Siri directly on your car's display, while maintaining full control through your car's original buttons",
    image: "https://www.highestliked.com/carplay.jpg",
    url: "https://amzn.to/4qP4ZEd",
    categories: ["cat-cool-tech"],
    primaryCategory: "cat-cool-tech",
    tags: ["gifts-for-him", "under-100", "electronics"],
  },
  {
    name: "Quick Install Window Camera",
    description: "Immerse yourself in stunning visuals with Girafit's 3MP Ultra-HD camera, utilizing ChroMax Al color night vision to bring day-like clarity even in the darkest nights.",
    image: "https://www.highestliked.com/windowcamera.jpg",
    url: "https://amzn.to/4hL2ezG",
    categories: ["cat-home-stuff"],
    primaryCategory: "cat-home-stuff",
    tags: ["gifts-for-him", "under-50", "electronics"],
  },
  {
    name: "Remote Control Dinosaur Toys for Kids",
    description: "Unleash the Jurassic World with Moskiddo RC Dinosaur! The T-Rex brings prehistoric playtime to life, featuring realistic walking, ferocious roars, mist spraying, and a LED light.",
    image: "https://www.highestliked.com/dino.jpg",
    url: "https://amzn.to/3WJRMz1",
    categories: ["cat-home-stuff"],
    primaryCategory: "cat-home-stuff",
    tags: ["gifts-for-kids", "under-50", "birthday"],
  },
  {
    name: "Govee Smart Table Lamp",
    description: "The Govee Smart Table Lamp packs serious lighting power into a compact, modern design. Whether you're setting the vibe for late-night relaxation, gaming, or productivity, this lamp looks premium, performs flawlessly, and feels way more advanced than its size suggests. Highly recommended if you want a stylish smart lamp with rich lighting effects that just works.",
    image: "https://www.highestliked.com/smartlampgovee.jpg",
    url: "https://amzn.to/4p1nUKq",
    categories: ["cat-home-stuff"],
    primaryCategory: "cat-home-stuff",
    tags: ["gifts-for-him", "gifts-for-her", "under-100", "home-decor"],
  },
  {
    name: "Mini Archery Compound Bow",
    description: "Not for children! This is a high powered mini compound bow that comes with 10 steel tipped arrows that can pierce through a cardboard box. A great gift for anyone who likes to shoot things.",
    image: "https://www.highestliked.com/compoundbow.jpg",
    url: "https://amzn.to/49bfdZj",
    categories: ["🔥 Trending", "🚀 TikTok Finds"],
    primaryCategory: "🚀 TikTok Finds",
    tags: ["gifts-for-him", "under-20", "tiktok-finds"],
  },
  {
    name: "1000X Handheld Microscope for Kids",
    description: "The Portable Microscope gives kids a wild 200x–1000x zoom range, meaning they can examine insects, plants, fabrics, coins, or anything they find in the backyard with real lab-style clarity.",
    image: "https://www.highestliked.com/magnifier.jpg",
    url: "https://amzn.to/49HNnUG",
    categories: ["🚀 TikTok Finds"],
    primaryCategory: "🚀 TikTok Finds",
    tags: ["gifts-for-kids", "under-50", "tiktok-finds"],
  },
  {
    name: "Original Aztec Death Whistle",
    description: "This Aztec Death Whistle produces human-like screams so realistic it's legitimately unsettling, engineered from years of studying real Aztec whistles, human vocal tones, and premium materials. Lab-tested at over 125+ decibels, it's one of the loudest on the market, perfect for pranks, Halloween, Day of the Dead, or scaring friends from far away on hikes",
    image: "https://www.highestliked.com/aztec.jpg",
    url: "https://amzn.to/4qWkRFk",
    categories: ["cat-lol-gifts"],
    primaryCategory: "cat-lol-gifts",
    tags: ["gifts-for-him", "under-50", "birthday"],
  },
  {
    name: "Smart LED Light Bars",
    description: "Increase the vibes with 2 smart LED bars with up to 16 million colors to choose from. Works with Alex and Google assistant and also sync with your music. Lay it flat, vertical or mount behind your monitor or TV. Group with other Govee Lights with the app.",
    image: "https://www.highestliked.com/lightbar.jpg",
    url: "https://amzn.to/4nMpH4Q",
    categories: ["cat-home-stuff"],
    primaryCategory: "cat-home-stuff",
    tags: ["gifts-for-him", "under-50", "home-decor"],
  },
  {
    name: "Bubble Machine Gun For Kids",
    description: "This Bubble Gun with 69 holes can generate more than thousands bubbles per minute with four colorful lights to bring you amazing effects, whatever day or night, you can see rich colorful bubbles are blown out when pressing the trigger, the fantastic lights render colorful bubbles, and you can enjoy a colorful scene at night day.",
    image: "https://www.highestliked.com/bubblegun.jpg",
    url: "https://amzn.to/4p9ok1z",
    categories: ["🔥 Trending"],
    primaryCategory: "🔥 Trending",
    tags: ["gifts-for-kids", "under-20"],
  },
  {
    name: "7ft Wacky Wailing Inflatable Tube Man",
    description: "Hi, I'm Al Harrington, President and CEO of Al Harrington's Wacky Waving Inflatable Arm Flailing Tube Man Emporium and Warehouse! Thanks to a shipping error I am now currently overstocked on wacky waving inflatable arm flailing tube men, and I am passing the savings on to you!",
    image: "https://www.highestliked.com/tubeman.jpg",
    url: "https://amzn.to/4qYdu04",
    categories: ["cat-lol-gifts"],
    primaryCategory: "cat-lol-gifts",
    tags: ["gifts-for-him", "office-supplies", "birthday"],
  },
  {
    name: "Nex Playground - The Ultimate Family Time",
    description: "The Nex Playground is an interactive family gaming device that turns your living room into a motion-controlled adventure zone — no controllers needed. Using AI body tracking, it lets everyone jump, dance, and compete together through fun, high-energy games. It's built for all ages, combining fitness, laughter, and connection in one sleek setup. Perfect for family nights, parties, or just getting the kids moving again.",
    image: "https://www.highestliked.com/nexplayground.jpg",
    url: "https://amzn.to/3JNDrhS",
    categories: ["cat-cool-tech", "cat-home-stuff"],
    primaryCategory: "cat-cool-tech",
    tags: ["birthday", "electronics", "viral", "gifts-for-kids"],
  },
  {
    name: "Overnighter SUV Window Tent",
    description: "Solves 3 problems in one. Keep the bugs out, keep the rain out, and allow airflow. Installs easily by stretching around the perimeter of the door using the built-in elastic band (Fits both sides). No tools required. And you can still operate the side power windows.",
    image: "https://www.highestliked.com/roadie.jpg",
    url: "https://amzn.to/4qRBZvN",
    categories: ["cat-adventure"],
    primaryCategory: "cat-adventure",
    tags: ["under-50"],
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
  // Migrate categories/tags to canonical sets at runtime
  const { migrateProducts } = await import('@utils/migrateProducts');
  const merged = [...normalizedStaticProducts, ...fileProducts];
  return migrateProducts(merged as any);
}

// For backward compatibility, export static products
// Pages should use getProducts() for full list including markdown files
export const products = staticProducts;
