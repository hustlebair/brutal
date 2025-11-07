import { useState, useMemo } from 'react';
import type { Product } from '@data/products';
import { makeProductMarkdown, generateFilename } from '@utils/makeProductMarkdown';

const DEFAULT_CATEGORIES = [
  '🔥 Trending',
  '🧠 Smart Finds',
  '🏠 Home & Office',
  '🎁 Funny Gifts',
  '🚀 TikTok Finds',
];

const SUGGESTED_TAGS = [
  'gifts-for-him',
  'gifts-for-her',
  'gifts-for-kids',
  'anniversary',
  'birthday',
  'valentines',
  'christmas',
  'under-20',
  'under-50',
  'under-100',
  'electronics',
  'home-decor',
  'office-supplies',
  'viral',
  'tiktok-finds',
  'trending-now',
];

export default function AdminQuickAdd() {
  const [draft, setDraft] = useState<Partial<Product>>({
    categories: [],
    tags: [],
    featured: false,
  });
  const [newCategory, setNewCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [toast, setToast] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const updateDraft = (field: keyof Product, value: any) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (category: string) => {
    setDraft(prev => {
      const current = prev.categories || [];
      if (current.includes(category)) {
        return {
          ...prev,
          categories: current.filter(c => c !== category),
          primaryCategory: prev.primaryCategory === category ? undefined : prev.primaryCategory,
        };
      } else {
        return { ...prev, categories: [...current, category] };
      }
    });
  };

  const addCustomCategory = () => {
    if (newCategory.trim() && !draft.categories?.includes(newCategory.trim())) {
      setDraft(prev => ({
        ...prev,
        categories: [...(prev.categories || []), newCategory.trim()],
      }));
      setNewCategory('');
    }
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !draft.tags?.includes(trimmed)) {
      setDraft(prev => ({
        ...prev,
        tags: [...(prev.tags || []), trimmed],
      }));
    }
  };

  const removeTag = (tag: string) => {
    setDraft(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || [],
    }));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
      tags.forEach(addTag);
      setTagInput('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Invalid file type. Only images are allowed.');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      showToast('File too large. Maximum size is 10MB.');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/products/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Update draft with the uploaded image path
        const imagePath = result.path;
        updateDraft('image', imagePath);
        // Update preview to use the uploaded image URL
        setImagePreview(imagePath);
        showToast('Image uploaded successfully!');
      } else {
        showToast(`Error: ${result.error || 'Failed to upload image'}`);
        setImagePreview(null);
      }
    } catch (error: any) {
      showToast(`Error: ${error.message || 'Failed to upload image'}`);
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const validate = (): boolean => {
    return !!(
      draft.name &&
      draft.description &&
      draft.image &&
      draft.url &&
      draft.categories &&
      draft.categories.length > 0 &&
      draft.primaryCategory
    );
  };

  const generateMarkdown = () => {
    if (!validate()) {
      showToast('Please fill in all required fields');
      return;
    }

    const product: Product = {
      name: draft.name!,
      description: draft.description!,
      image: draft.image!,
      url: draft.url!,
      categories: draft.categories!,
      primaryCategory: draft.primaryCategory,
      tags: draft.tags && draft.tags.length > 0 ? draft.tags : undefined,
      price: draft.price || undefined,
      featured: draft.featured || false,
    };

    const md = makeProductMarkdown(product);
    setMarkdown(md);
    showToast('Markdown ready.');
  };

  const copyToClipboard = async () => {
    if (!markdown) {
      generateMarkdown();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    try {
      await navigator.clipboard.writeText(markdown || makeProductMarkdown(draft as Product));
      showToast('Copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy');
    }
  };

  const downloadMarkdown = () => {
    if (!markdown) {
      generateMarkdown();
      setTimeout(() => {
        if (markdown) {
          doDownload();
        }
      }, 100);
      return;
    }
    doDownload();
  };

  const doDownload = () => {
    const filename = generateFilename(draft.name || 'product');
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded!');
  };

  const publishProduct = async () => {
    if (!validate()) {
      showToast('Please fill in all required fields');
      return;
    }

    const product: Product = {
      name: draft.name!,
      description: draft.description!,
      image: draft.image!,
      url: draft.url!,
      categories: draft.categories!,
      primaryCategory: draft.primaryCategory,
      tags: draft.tags && draft.tags.length > 0 ? draft.tags : undefined,
      price: draft.price || undefined,
      featured: draft.featured || false,
    };

    try {
      showToast('Publishing product...');
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const result = await response.json();

      if (response.ok) {
        showToast(`Product published! File: ${result.filename}`);
        // Clear form after successful publish
        setTimeout(() => {
          clearForm();
          // Reload page to show new product (or use client-side navigation)
          window.location.reload();
        }, 2000);
      } else {
        showToast(`Error: ${result.error || 'Failed to publish'}`);
      }
    } catch (error: any) {
      showToast(`Error: ${error.message || 'Failed to publish product'}`);
    }
  };

  const clearForm = () => {
    setDraft({
      categories: [],
      tags: [],
      featured: false,
    });
    setMarkdown('');
    setTagInput('');
    setNewCategory('');
    setImagePreview(null);
  };

  const previewProduct: Product = {
    name: draft.name || 'Product Name',
    description: draft.description || 'Product description will appear here...',
    image: draft.image || 'https://via.placeholder.com/800x800?text=Product+Image',
    url: draft.url || '#',
    categories: draft.categories || [],
    primaryCategory: draft.primaryCategory,
    tags: draft.tags,
    price: draft.price,
    featured: draft.featured,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {toast && (
        <div className="fixed top-4 right-4 bg-[#FF9900] text-black px-6 py-3 rounded-lg shadow-lg font-bold z-50">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Admin Quick-Add Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Column */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-bold">Product Details</h2>

            {/* Name */}
            <div>
              <label className="block font-semibold mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={draft.name || ''}
                onChange={(e) => updateDraft('name', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                placeholder="Product name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={draft.description || ''}
                onChange={(e) => updateDraft('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                placeholder="Product description"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#FF9900] transition-colors text-center font-semibold bg-gray-50"
                  >
                    {uploadingImage ? 'Uploading...' : '📤 Upload Image'}
                  </label>
                  <input
                    type="url"
                    value={draft.image || ''}
                    onChange={(e) => {
                      updateDraft('image', e.target.value);
                      setImagePreview(e.target.value || null);
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                    placeholder="Or enter image URL"
                  />
                </div>
                {(imagePreview || draft.image) && (
                  <div className="relative">
                    <img
                      src={imagePreview || draft.image || ''}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {draft.image && (
                      <button
                        type="button"
                        onClick={() => {
                          updateDraft('image', '');
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg font-bold hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Affiliate URL */}
            <div>
              <label className="block font-semibold mb-2">
                Affiliate URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={draft.url || ''}
                onChange={(e) => updateDraft('url', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                placeholder="https://amazon.com/product"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block font-semibold mb-2">
                Categories <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {DEFAULT_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1 rounded-lg border-2 transition-colors ${
                      draft.categories?.includes(cat)
                        ? 'bg-[#FF9900] border-[#FF9900] text-black font-semibold'
                        : 'bg-white border-gray-300 hover:border-[#FF9900]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomCategory())}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                  placeholder="Add custom category"
                />
                <button
                  type="button"
                  onClick={addCustomCategory}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Primary Category */}
            <div>
              <label className="block font-semibold mb-2">
                Primary Category <span className="text-red-500">*</span>
              </label>
              <select
                value={draft.primaryCategory || ''}
                onChange={(e) => updateDraft('primaryCategory', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
              >
                <option value="">Select primary category</option>
                {draft.categories?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block font-semibold mb-2">Tags</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none mb-2"
                placeholder="Type tags separated by commas, press Enter"
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {SUGGESTED_TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {draft.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#FF9900] text-black rounded-lg flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block font-semibold mb-2">Price (optional)</label>
              <input
                type="text"
                value={draft.price || ''}
                onChange={(e) => updateDraft('price', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                placeholder="$29.99"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={draft.featured || false}
                onChange={(e) => updateDraft('featured', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="font-semibold">
                Featured Product
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4">
              <button
                onClick={publishProduct}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                🚀 Publish Product
              </button>
              <button
                onClick={generateMarkdown}
                className="px-6 py-3 bg-[#FF9900] text-black rounded-lg font-bold hover:bg-[#ff8800] transition-colors"
              >
                Generate Markdown
              </button>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
              >
                Copy
              </button>
              <button
                onClick={downloadMarkdown}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                Download .md
              </button>
              <button
                onClick={clearForm}
                className="px-6 py-3 bg-gray-200 text-black rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Markdown Output */}
            {markdown && (
              <div className="mt-6">
                <label className="block font-semibold mb-2">Generated Markdown:</label>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm max-h-64">
                  {markdown}
                </pre>
              </div>
            )}
          </div>

          {/* Preview Column */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
              <div className="max-w-sm mx-auto">
                <ProductCardPreview product={previewProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Preview Component (simplified version matching ProductCard.astro)
function ProductCardPreview({ product }: { product: Product }) {
  const displayCategory = product.primaryCategory || product.categories?.[0];

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100">
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-sm md:text-base font-bold text-black truncate" title={product.name}>
          {product.name}
        </h3>
      </div>
      <div className="aspect-square w-full overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 md:p-6">
        <p className="text-gray-700 text-sm md:text-base mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          {displayCategory && (
            <span className="text-xs font-semibold text-[#FF9900] uppercase tracking-wide">
              {displayCategory}
            </span>
          )}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="ml-auto bg-[#FF9900] text-black px-4 py-2 rounded-lg font-bold text-sm md:text-base hover:bg-[#ff8800] hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            CHECK IT OUT
            <span>→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

