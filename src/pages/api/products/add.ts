import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { generateFilename } from '@utils/makeProductMarkdown';
import type { Product } from '@data/products';

export const POST: APIRoute = async ({ request, cookies }) => {
  // Security check - verify admin session
  const session = cookies.get('admin_session');
  const isDev = import.meta.env.DEV;
  
  // Allow in dev mode, or if valid admin session exists
  if (!isDev && !session?.value) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const product: Product = await request.json();

    // Validate required fields
    if (!product.name || !product.description || !product.image || !product.url || !product.categories?.length || !product.primaryCategory) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate filename
    const filename = generateFilename(product.name);
    const productsDir = join(process.cwd(), 'src', 'data', 'products');
    
    // Ensure directory exists
    await mkdir(productsDir, { recursive: true });

    // Generate markdown content
    const markdown = generateProductMarkdown(product);

    // Write file
    const filePath = join(productsDir, filename);
    await writeFile(filePath, markdown, 'utf-8');

    return new Response(JSON.stringify({ 
      success: true, 
      filename,
      message: 'Product added successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error adding product:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to add product',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function generateProductMarkdown(product: Product): string {
  const lines: string[] = ['---'];
  
  lines.push(`name: "${product.name.replace(/"/g, '\\"')}"`);
  lines.push(`description: "${product.description.replace(/"/g, '\\"')}"`);
  lines.push(`image: "${product.image}"`);
  lines.push(`url: "${product.url}"`);
  
  if (product.categories && product.categories.length > 0) {
    lines.push('categories:');
    product.categories.forEach(cat => {
      lines.push(`  - "${cat.replace(/"/g, '\\"')}"`);
    });
  }
  
  if (product.primaryCategory) {
    lines.push(`primaryCategory: "${product.primaryCategory.replace(/"/g, '\\"')}"`);
  }
  
  if (product.tags && product.tags.length > 0) {
    lines.push('tags:');
    product.tags.forEach(tag => {
      lines.push(`  - "${tag.replace(/"/g, '\\"')}"`);
    });
  }
  
  if (product.price) {
    lines.push(`price: "${product.price.replace(/"/g, '\\"')}"`);
  }
  
  if (product.featured === true) {
    lines.push('featured: true');
  }
  
  lines.push('---');
  
  return lines.join('\n');
}

