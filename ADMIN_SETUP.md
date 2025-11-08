# Admin Quick-Add Setup

## Installation

The admin tool requires React integration. Install the following dependencies:

```bash
npm install react react-dom @astrojs/react
# or
pnpm add react react-dom @astrojs/react
# or
yarn add react react-dom @astrojs/react
```

## Environment Variables (Required)

Create a `.env` file in the project root with your admin credentials:

```
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-secure-password
```

**Important:** 
- Never commit the `.env` file to version control
- Use a strong, unique password
- In production, set these as environment variables in your hosting platform

## Usage

1. **Access the admin tool:**
   - Visit `/admin` in your browser
   - You'll be prompted to enter your username and password
   - After successful login, you'll have access to the admin panel

2. **Adding a product:**
   - Fill in product details (required fields marked with *)
   - Upload an image or enter an image URL
   - Select categories (click to toggle)
   - Choose a primary category
   - Add tags (type and press Enter, or click suggested tags)
   - Click **"🚀 Publish Product"** to automatically add the product to the site
   - The product will be saved as a markdown file in `src/data/products/`
   - The page will reload to show the new product

3. **Alternative actions:**
   - Click "Generate Markdown" to create the front-matter (for manual file creation)
   - Use "Copy" or "Download .md" to save the file manually

4. **Logout:**
   - Click the "Logout" button in the admin bar
   - Your session will be cleared and you'll need to login again

## How It Works

- Products are saved as markdown files in `src/data/products/` with format: `YYYY-MM-DD-slug.md`
- The homepage automatically loads products from both:
  - Static products in `src/data/products.ts` (legacy)
  - Markdown files in `src/data/products/` (new products)
- In development mode, new products appear immediately after publishing
- In production, you may need to rebuild the site for new products to appear

## Security Notes

- The admin page is not linked from any public navigation
- Admin access requires username and password authentication
- Sessions are stored in httpOnly cookies (secure and not accessible via JavaScript)
- API routes are protected and require valid admin session
- In production, ensure `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set as environment variables
- Sessions expire after 24 hours

## File Structure

- `src/utils/makeProductMarkdown.ts` - Markdown generation utility
- `src/components/admin/AdminGate.tsx` - Admin authentication component
- `src/components/admin/AdminQuickAdd.tsx` - Main admin form component
- `src/pages/admin.astro` - Admin page route
- `src/pages/api/admin/login.ts` - Login API endpoint
- `src/pages/api/admin/logout.ts` - Logout API endpoint
- `src/pages/api/admin/check.ts` - Session check endpoint

