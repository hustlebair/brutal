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

export const products: Product[] = [
  {
    name: "Portable Phone Stand with Wireless Charger",
    description: "The TikTok-famous stand that keeps your phone charged while you scroll. Game changer for desk setups.",
    image: "https://images.unsplash.com/photo-1601972602237-8a1533279334?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🔥 Trending", "🧠 Smart Finds"],
    primaryCategory: "🔥 Trending",
    tags: ["electronics", "desk-accessories", "gifts-for-him", "gifts-for-her"],
  },
  {
    name: "LED Strip Lights with Music Sync",
    description: "Transform your room into a vibe. These lights sync to your music and make every video look professional.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🔥 Trending", "🏠 Home & Office"],
    primaryCategory: "🔥 Trending",
    tags: ["home-decor", "room-aesthetic", "tiktok-finds"],
  },
  {
    name: "Smart Ring Light for Content Creators",
    description: "The secret weapon behind every viral TikTok. Professional lighting that fits on your desk.",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🧠 Smart Finds", "🔥 Trending"],
    primaryCategory: "🧠 Smart Finds",
    tags: ["creator-tools", "electronics", "gifts-for-creators"],
  },
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
    name: "Cord Organizer That Actually Works",
    description: "Finally, a cable management solution that doesn't look like a mess. Your desk will thank you.",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🧠 Smart Finds", "🏠 Home & Office"],
    primaryCategory: "🧠 Smart Finds",
    tags: ["desk-accessories", "organization", "under-20"],
  },
  {
    name: "Weighted Blanket for Better Sleep",
    description: "The weighted blanket that went viral for actually helping people sleep. Science-backed comfort.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🏠 Home & Office"],
    primaryCategory: "🏠 Home & Office",
    tags: ["self-care", "gifts-for-her", "anniversary", "valentines"],
  },
  {
    name: "Fidget Spinner That's Actually Useful",
    description: "The upgraded fidget toy that helps with focus. Perfect for ADHD-friendly workspaces.",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🎁 Funny Gifts"],
    primaryCategory: "🎁 Funny Gifts",
    tags: ["gifts-for-him", "gifts-for-her", "under-20", "office-supplies"],
  },
  {
    name: "Portable Projector for Movie Nights",
    description: "Turn any wall into a cinema. This mini projector is perfect for dorm rooms and small spaces.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🧠 Smart Finds", "🏠 Home & Office"],
    primaryCategory: "🧠 Smart Finds",
    tags: ["electronics", "gifts-for-him", "anniversary", "birthday"],
  },
  {
    name: "Self-Stirring Coffee Mug",
    description: "The mug that stirs your coffee for you. Because why not make your morning routine easier?",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🎁 Funny Gifts", "🔥 Trending"],
    primaryCategory: "🎁 Funny Gifts",
    tags: ["gifts-for-him", "gifts-for-her", "anniversary", "under-30"],
  },
  {
    name: "Ergonomic Laptop Stand",
    description: "Raise your laptop to eye level and save your neck. The ergonomic upgrade your setup needs.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
    url: "https://amazon.com",
    categories: ["🏠 Home & Office", "🧠 Smart Finds"],
    primaryCategory: "🏠 Home & Office",
    tags: ["desk-accessories", "gifts-for-him", "office-supplies"],
  },
];
