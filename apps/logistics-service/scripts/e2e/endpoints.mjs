/**
 * E2E Endpoint Registry — Product Service
 * @module product-service/scripts/e2e
 *
 * Central metadata for all REST endpoints.
 * Used by generate-e2e-tests.mjs to auto-generate E2E specs.
 */

export const ENDPOINTS = [
  // ═══════════════════════════════════════════════
  // HEALTH
  // ═══════════════════════════════════════════════
  {
    group: 'health',
    method: 'GET',
    path: '/health',
    name: 'Health Check',
    auth: false,
    expect: {
      status: 200,
      hasFields: ['service', 'status', 'timestamp'],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCTS
  // ═══════════════════════════════════════════════
  {
    group: 'products',
    method: 'POST',
    path: '/products',
    name: 'Create Product',
    auth: true,
    request: {
      name: 'E2E Test T-Shirt',
      slug: 'e2e-test-tshirt',
      sku: 'E2E-TSHIRT-001',
      type: 'physical',
      categoryId: '00000000-0000-0000-0000-000000000001',
      price: 1250,
      currency: 'BDT',
    },
    expect: {
      statuses: [201, 400, 409, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products',
    name: 'List Products',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/search',
    name: 'Search Products',
    auth: true,
    query: { q: 'shirt', limit: 10 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/featured',
    name: 'Get Featured Products',
    auth: true,
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/stats',
    name: 'Get Product Stats',
    auth: true,
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/by-slug/:slug',
    name: 'Get Product By Slug',
    auth: true,
    params: { slug: 'e2e-test-tshirt' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/:id',
    name: 'Get Product By ID',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/:id/detail',
    name: 'Get Product Detail',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/:id/public',
    name: 'Get Public Product',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'products',
    method: 'GET',
    path: '/products/:id/related',
    name: 'Get Related Products',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PUBLIC PRODUCTS (no auth)
  // ═══════════════════════════════════════════════
  {
    group: 'public-products',
    method: 'GET',
    path: '/public/products/featured',
    name: 'Public Featured Products',
    auth: false,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'public-products',
    method: 'GET',
    path: '/public/products/search',
    name: 'Public Search Products',
    auth: false,
    query: { q: 'shirt' },
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'public-products',
    method: 'GET',
    path: '/public/products/:id',
    name: 'Public Get Product',
    auth: false,
    params: { id: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT VARIANTS
  // ═══════════════════════════════════════════════
  {
    group: 'variants',
    method: 'POST',
    path: '/product-variants',
    name: 'Add Variant',
    auth: true,
    request: {
      productId: '00000000-0000-0000-0000-000000000001',
      name: 'E2E Variant - Medium',
      sku: 'E2E-VAR-M-001',
      type: 'size',
      options: [{ name: 'size', value: 'M' }],
      price: 1250,
    },
    expect: {
      statuses: [201, 400, 409, 500, 503],
    },
  },
  {
    group: 'variants',
    method: 'GET',
    path: '/product-variants',
    name: 'List Variants',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'variants',
    method: 'GET',
    path: '/product-variants/stats',
    name: 'Variant Stats',
    auth: true,
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'variants',
    method: 'GET',
    path: '/product-variants/:id',
    name: 'Get Variant',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000002' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT ATTRIBUTES
  // ═══════════════════════════════════════════════
  {
    group: 'attributes',
    method: 'POST',
    path: '/products/:productId/attributes',
    name: 'Add Attribute',
    auth: true,
    params: { productId: '00000000-0000-0000-0000-000000000001' },
    request: {
      name: 'Color',
      type: 'text',
      values: [{ value: 'Red', label: 'Red' }],
    },
    expect: {
      statuses: [201, 400, 500, 503],
    },
  },
  {
    group: 'attributes',
    method: 'GET',
    path: '/products/:productId/attributes',
    name: 'List Attributes',
    auth: true,
    params: { productId: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT INVENTORY
  // ═══════════════════════════════════════════════
  {
    group: 'inventory',
    method: 'GET',
    path: '/product-inventory/check-stock',
    name: 'Check Stock',
    auth: true,
    query: { productId: '00000000-0000-0000-0000-000000000001', quantity: 1 },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'inventory',
    method: 'GET',
    path: '/product-inventory/stats',
    name: 'Inventory Stats',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'inventory',
    method: 'GET',
    path: '/product-inventory/by-product/:productId',
    name: 'Get Inventory By Product',
    auth: true,
    params: { productId: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'inventory',
    method: 'GET',
    path: '/product-inventory/:id',
    name: 'Get Inventory',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000003' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT PRICING
  // ═══════════════════════════════════════════════
  {
    group: 'pricing',
    method: 'GET',
    path: '/product-pricing/stats',
    name: 'Pricing Stats',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'pricing',
    method: 'GET',
    path: '/product-pricing/by-product/:productId',
    name: 'Get Pricing By Product',
    auth: true,
    params: { productId: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'pricing',
    method: 'GET',
    path: '/product-pricing/by-product/:productId/public',
    name: 'Public Pricing By Product',
    auth: true,
    params: { productId: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'pricing',
    method: 'POST',
    path: '/product-pricing/calculate',
    name: 'Calculate Price',
    auth: true,
    request: {
      productId: '00000000-0000-0000-0000-000000000001',
      quantity: 1,
    },
    expect: {
      statuses: [200, 400, 404, 500, 503],
    },
  },
  {
    group: 'pricing',
    method: 'GET',
    path: '/product-pricing/:id',
    name: 'Get Pricing',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000004' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT PRICING RULES
  // ═══════════════════════════════════════════════
  {
    group: 'pricing-rules',
    method: 'GET',
    path: '/product-pricing-rules',
    name: 'List Pricing Rules',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'pricing-rules',
    method: 'GET',
    path: '/product-pricing-rules/active',
    name: 'List Active Pricing Rules',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'pricing-rules',
    method: 'GET',
    path: '/product-pricing-rules/:id',
    name: 'Get Pricing Rule',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000005' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT COLLECTIONS
  // ═══════════════════════════════════════════════
  {
    group: 'collections',
    method: 'POST',
    path: '/product-collections',
    name: 'Create Collection',
    auth: true,
    request: {
      name: 'E2E Summer Collection',
      slug: 'e2e-summer-collection',
      type: 'manual',
    },
    expect: {
      statuses: [201, 400, 409, 500, 503],
    },
  },
  {
    group: 'collections',
    method: 'GET',
    path: '/product-collections',
    name: 'List Collections',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'collections',
    method: 'GET',
    path: '/product-collections/stats',
    name: 'Collection Stats',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'collections',
    method: 'GET',
    path: '/product-collections/by-slug/:slug',
    name: 'Get Collection By Slug',
    auth: true,
    params: { slug: 'e2e-summer-collection' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'collections',
    method: 'GET',
    path: '/product-collections/:id',
    name: 'Get Collection',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000006' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT REVIEWS
  // ═══════════════════════════════════════════════
  {
    group: 'reviews',
    method: 'POST',
    path: '/product-reviews',
    name: 'Submit Review',
    auth: true,
    request: {
      productId: '00000000-0000-0000-0000-000000000001',
      rating: 5,
      title: 'Great product',
      comment: 'This is an E2E test review comment.',
    },
    expect: {
      statuses: [201, 400, 409, 500, 503],
    },
  },
  {
    group: 'reviews',
    method: 'GET',
    path: '/product-reviews',
    name: 'List Reviews',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'reviews',
    method: 'GET',
    path: '/product-reviews/stats/:productId',
    name: 'Review Stats',
    auth: true,
    params: { productId: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'reviews',
    method: 'GET',
    path: '/product-reviews/:id',
    name: 'Get Review',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000007' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // PRODUCT MEDIA
  // ═══════════════════════════════════════════════
  {
    group: 'media',
    method: 'GET',
    path: '/products/:productId/media',
    name: 'Get Product Media',
    auth: true,
    params: { productId: '00000000-0000-0000-0000-000000000001' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // BRANDS
  // ═══════════════════════════════════════════════
  {
    group: 'brands',
    method: 'POST',
    path: '/brands',
    name: 'Create Brand',
    auth: true,
    request: {
      name: 'E2E Test Brand',
      slug: 'e2e-test-brand',
    },
    expect: {
      statuses: [201, 400, 409, 500, 503],
    },
  },
  {
    group: 'brands',
    method: 'GET',
    path: '/brands',
    name: 'List Brands',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'brands',
    method: 'GET',
    path: '/brands/stats',
    name: 'Brand Stats',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'brands',
    method: 'GET',
    path: '/brands/by-slug/:slug',
    name: 'Get Brand By Slug',
    auth: true,
    params: { slug: 'e2e-test-brand' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'brands',
    method: 'GET',
    path: '/brands/:id',
    name: 'Get Brand',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000008' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },

  // ═══════════════════════════════════════════════
  // CATEGORIES
  // ═══════════════════════════════════════════════
  {
    group: 'categories',
    method: 'POST',
    path: '/categories',
    name: 'Create Category',
    auth: true,
    request: {
      name: 'E2E Test Category',
      slug: 'e2e-test-category',
    },
    expect: {
      statuses: [201, 400, 409, 500, 503],
    },
  },
  {
    group: 'categories',
    method: 'GET',
    path: '/categories',
    name: 'List Categories',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: {
      statuses: [200, 400, 500, 503],
    },
  },
  {
    group: 'categories',
    method: 'GET',
    path: '/categories/tree',
    name: 'Get Category Tree',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'categories',
    method: 'GET',
    path: '/categories/roots',
    name: 'List Root Categories',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'categories',
    method: 'GET',
    path: '/categories/stats',
    name: 'Category Stats',
    auth: true,
    expect: {
      statuses: [200, 500, 503],
    },
  },
  {
    group: 'categories',
    method: 'GET',
    path: '/categories/by-slug/:slug',
    name: 'Get Category By Slug',
    auth: true,
    params: { slug: 'e2e-test-category' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
  {
    group: 'categories',
    method: 'GET',
    path: '/categories/:id',
    name: 'Get Category',
    auth: true,
    params: { id: '00000000-0000-0000-0000-000000000009' },
    expect: {
      statuses: [200, 404, 500, 503],
    },
  },
];
