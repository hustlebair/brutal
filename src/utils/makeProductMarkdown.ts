import type { Product } from '@data/products';

/**
 * Generates a markdown front-matter string from a Product object
 * @param product - Product object to convert to markdown
 * @returns Markdown front-matter string
 */
export function makeProductMarkdown(product: Product): string {
  const lines: string[] = ['---'];
  
  // Required fields
  lines.push(`name: "${product.name.replace(/"/g, '\\"')}"`);
  lines.push(`description: "${product.description.replace(/"/g, '\\"')}"`);
  lines.push(`image: "${product.image}"`);
  lines.push(`url: "${product.url}"`);
  
  // Categories array
  if (product.categories && product.categories.length > 0) {
    lines.push('categories:');
    product.categories.forEach(cat => {
      lines.push(`  - "${cat.replace(/"/g, '\\"')}"`);
    });
  }
  
  // Primary category
  if (product.primaryCategory) {
    lines.push(`primaryCategory: "${product.primaryCategory.replace(/"/g, '\\"')}"`);
  }
  
  // Tags array
  if (product.tags && product.tags.length > 0) {
    lines.push('tags:');
    product.tags.forEach(tag => {
      lines.push(`  - "${tag.replace(/"/g, '\\"')}"`);
    });
  }
  
  // Optional fields (only include if present)
  if (product.price) {
    lines.push(`price: "${product.price.replace(/"/g, '\\"')}"`);
  }
  
  if (product.featured === true) {
    lines.push('featured: true');
  }
  
  lines.push('---');
  
  return lines.join('\n');
}

/**
 * Generates a slug from a product name
 * @param name - Product name
 * @returns URL-friendly slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a filename with date prefix
 * @param name - Product name
 * @returns Filename in format YYYY-MM-DD-slug.md
 */
export function generateFilename(name: string): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const slug = generateSlug(name);
  return `${year}-${month}-${day}-${slug}.md`;
}

