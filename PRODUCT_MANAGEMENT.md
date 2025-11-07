# Product Management Guide

## Overview

The product data structure has been refactored to support:
- **Multiple categories** per product
- **Tags** for flexible filtering (gifts-for-him, anniversary, under-50, etc.)
- **Primary category** for display purposes
- **Helper functions** for filtering and searching

## Data Structure

```typescript
export interface Product {
  name: string;
  description: string;
  image: string;
  url: string;
  categories: string[];        // Multiple categories (e.g., ["🔥 Trending", "🧠 Smart Finds"])
  primaryCategory?: string;    // Main category to display on card
  tags?: string[];            // Additional tags for filtering
  price?: string;             // Optional: for future use
  featured?: boolean;          // Optional: for featured products
}
```

## Adding Products

### Example: Product with Multiple Categories

```typescript
{
  name: "Wireless Earbuds Pro",
  description: "Premium noise-cancelling earbuds that everyone's raving about.",
  image: "https://example.com/image.jpg",
  url: "https://amazon.com/product",
  categories: ["🔥 Trending", "🧠 Smart Finds", "🏠 Home & Office"],
  primaryCategory: "🔥 Trending", // This is what shows on the card
  tags: ["electronics", "gifts-for-him", "gifts-for-her", "anniversary", "birthday", "under-100"],
  featured: true, // Optional: for featured section
}
```

### Example: Gift Product with Multiple Tags

```typescript
{
  name: "Smart Watch",
  description: "The perfect gift for tech lovers.",
  image: "https://example.com/watch.jpg",
  url: "https://amazon.com/product",
  categories: ["🔥 Trending", "🧠 Smart Finds"],
  primaryCategory: "🔥 Trending",
  tags: [
    "electronics",
    "gifts-for-him",
    "gifts-for-her",
    "anniversary",
    "valentines",
    "birthday",
    "under-200"
  ],
}
```

## Filtering Products

### By Category

```typescript
import { products } from '@data/products';
import { getProductsByCategory } from '@utils/productFilters';

// Get all trending products
const trending = getProductsByCategory(products, "🔥 Trending");

// Get all smart finds
const smartFinds = getProductsByCategory(products, "🧠 Smart Finds");
```

### By Tag

```typescript
import { getProductsByTag, getProductsByTags, getProductsByAnyTag } from '@utils/productFilters';

// Get all products tagged "gifts-for-him"
const giftsForHim = getProductsByTag(products, "gifts-for-him");

// Get products that are BOTH "gifts-for-him" AND "anniversary" (AND logic)
const anniversaryGiftsForHim = getProductsByTags(products, ["gifts-for-him", "anniversary"]);

// Get products that are EITHER "gifts-for-him" OR "gifts-for-her" (OR logic)
const giftsForAnyone = getProductsByAnyTag(products, ["gifts-for-him", "gifts-for-her"]);
```

### Search

```typescript
import { searchProducts } from '@utils/productFilters';

// Search by name or description
const results = searchProducts(products, "phone");
```

## Best Practices

### 1. Categories vs Tags

- **Categories**: Main navigation groupings (🔥 Trending, 🧠 Smart Finds, etc.)
- **Tags**: Flexible attributes for filtering (gifts-for-him, anniversary, under-50, etc.)

### 2. Primary Category

Always set a `primaryCategory` - this is what displays on the product card. Choose the most relevant/main category.

### 3. Tag Naming Convention

Use lowercase with hyphens for consistency:
- ✅ `gifts-for-him`, `gifts-for-her`
- ✅ `under-50`, `under-100`
- ✅ `anniversary`, `birthday`, `valentines`
- ❌ `Gifts For Him`, `under_50`

### 4. Common Tags to Use

- **Recipient**: `gifts-for-him`, `gifts-for-her`, `gifts-for-kids`
- **Occasion**: `anniversary`, `birthday`, `valentines`, `christmas`, `graduation`
- **Price Range**: `under-20`, `under-50`, `under-100`, `under-200`
- **Type**: `electronics`, `home-decor`, `self-care`, `office-supplies`
- **Special**: `tiktok-finds`, `viral`, `trending-now`

## Future Enhancements

### Option 1: Markdown Files (Recommended for 50+ products)

Create individual markdown files in `src/data/products/`:

```markdown
---
name: "Wireless Earbuds Pro"
description: "Premium noise-cancelling earbuds."
image: "https://example.com/image.jpg"
url: "https://amazon.com/product"
categories:
  - "🔥 Trending"
  - "🧠 Smart Finds"
primaryCategory: "🔥 Trending"
tags:
  - "electronics"
  - "gifts-for-him"
  - "anniversary"
featured: true
---
```

### Option 2: CMS Integration

For 100+ products, consider:
- **Contentful** or **Sanity** for headless CMS
- **Airtable** with API integration
- **Google Sheets** with API (simple but effective)

### Option 3: Database

For very large catalogs:
- **SQLite** for local development
- **PostgreSQL** for production
- Use Astro's database integration

## Example: Category Page

Create `src/pages/category/[category].astro`:

```typescript
---
import { products } from '@data/products';
import { getProductsByCategory } from '@utils/productFilters';
import ProductCard from '@components/home/ProductCard.astro';

const { category } = Astro.params;
const filteredProducts = getProductsByCategory(products, decodeURIComponent(category));
---

<Layout title={`${category} Products`}>
  <h1>{category}</h1>
  <div class="grid">
    {filteredProducts.map((product) => (
      <ProductCard {...product} />
    ))}
  </div>
</Layout>
```

## Example: Tag Filtering Page

Create `src/pages/tags/[tag].astro`:

```typescript
---
import { products } from '@data/products';
import { getProductsByTag } from '@utils/productFilters';

const { tag } = Astro.params;
const filteredProducts = getProductsByTag(products, tag);
---

<Layout title={`${tag} Products`}>
  <h1>Products tagged: {tag}</h1>
  <!-- Display products -->
</Layout>
```

