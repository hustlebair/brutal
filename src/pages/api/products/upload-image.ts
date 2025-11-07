import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
  // Security check - verify admin access via referer
  const referer = request.headers.get('referer');
  const isDev = import.meta.env.DEV;
  
  // Allow in dev mode, or if referer includes /admin
  if (!isDev && referer && !referer.includes('/admin')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type. Only images are allowed.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: 'File too large. Maximum size is 10MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '-')
      .toLowerCase();
    const extension = sanitizedName.split('.').pop() || 'jpg';
    const filename = `${timestamp}-${sanitizedName.replace(/\.[^/.]+$/, '')}.${extension}`;

    // Ensure directory exists
    const productsDir = join(process.cwd(), 'public', 'products');
    await mkdir(productsDir, { recursive: true });

    // Convert file to buffer and save
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = join(productsDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL path
    const publicPath = `/products/${filename}`;

    return new Response(JSON.stringify({ 
      success: true, 
      path: publicPath,
      filename,
      message: 'Image uploaded successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to upload image',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

