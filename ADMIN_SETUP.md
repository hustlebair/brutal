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

## Environment Variables (Optional)

To add passcode protection, create a `.env` file in the project root:

```
PUBLIC_ADMIN_PASS=your-secret-passcode-here
```

## Usage

1. **Access the admin tool:**
   - Visit `/admin?admin=on` to enable admin mode
   - Or set `localStorage.hl_admin = 'true'` in browser console

2. **Adding a product:**
   - Fill in product details (required fields marked with *)
   - Select categories (click to toggle)
   - Choose a primary category
   - Add tags (type and press Enter, or click suggested tags)
   - Click **"🚀 Publish Product"** to automatically add the product to the site
   - The product will be saved as a markdown file in `src/data/products/`
   - The page will reload to show the new product

3. **Alternative actions:**
   - Click "Generate Markdown" to create the front-matter (for manual file creation)
   - Use "Copy" or "Download .md" to save the file manually

4. **Disable admin mode:**
   - Click "Disable Admin" button in the admin bar
   - Or visit `/admin?admin=off`

## How It Works

- Products are saved as markdown files in `src/data/products/` with format: `YYYY-MM-DD-slug.md`
- The homepage automatically loads products from both:
  - Static products in `src/data/products.ts` (legacy)
  - Markdown files in `src/data/products/` (new products)
- In development mode, new products appear immediately after publishing
- In production, you may need to rebuild the site for new products to appear

## Security Notes

- The admin page is not linked from any public navigation
- Admin access is controlled via localStorage and URL params
- Optional passcode protection via `PUBLIC_ADMIN_PASS` environment variable
- In production, ensure `PUBLIC_ADMIN_PASS` is set for additional security

## File Structure

- `src/utils/makeProductMarkdown.ts` - Markdown generation utility
- `src/components/admin/AdminGate.tsx` - Admin access gate component
- `src/components/admin/AdminQuickAdd.tsx` - Main admin form component
- `src/pages/admin.astro` - Admin page route

