import type { Product } from '@data/products';

/**
 * Filter products by a specific category
 * @param products - Array of products
 * @param category - Category name to filter by
 * @returns Filtered array of products
 */
export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter((product) => 
    product.categories.includes(category) || 
    product.primaryCategory === category
  );
}

/**
 * Filter products by a specific tag
 * @param products - Array of products
 * @param tag - Tag name to filter by (case-insensitive)
 * @returns Filtered array of products
 */
export function getProductsByTag(products: Product[], tag: string): Product[] {
  return products.filter((product) => 
    product.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Filter products by multiple tags (AND logic - product must have all tags)
 * @param products - Array of products
 * @param tags - Array of tag names
 * @returns Filtered array of products
 */
export function getProductsByTags(products: Product[], tags: string[]): Product[] {
  return products.filter((product) => 
    tags.every((tag) => 
      product.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
  );
}

/**
 * Filter products by multiple tags (OR logic - product must have at least one tag)
 * @param products - Array of products
 * @param tags - Array of tag names
 * @returns Filtered array of products
 */
export function getProductsByAnyTag(products: Product[], tags: string[]): Product[] {
  return products.filter((product) => 
    tags.some((tag) => 
      product.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
  );
}

/**
 * Get all unique categories from products
 * @param products - Array of products
 * @returns Sorted array of unique category names
 */
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

/**
 * Get all unique tags from products
 * @param products - Array of products
 * @returns Sorted array of unique tag names
 */
export function getAllTags(products: Product[]): string[] {
  const tags = new Set<string>();
  products.forEach((product) => {
    product.tags?.forEach((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags).sort();
}

/**
 * Get featured products
 * @param products - Array of products
 * @returns Array of featured products
 */
export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((product) => product.featured === true);
}

/**
 * Search products by name or description
 * @param products - Array of products
 * @param query - Search query
 * @returns Filtered array of products matching the query
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter((product) => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
}

