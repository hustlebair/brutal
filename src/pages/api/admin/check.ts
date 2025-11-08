import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies }) => {
  const session = cookies.get('admin_session');
  
  return new Response(JSON.stringify({ 
    authenticated: !!session?.value 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

