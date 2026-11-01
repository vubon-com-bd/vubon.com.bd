/**
 * Test Fixtures — static test data
 * @module product-service/test/helpers
 */

export const FIXTURES = {
  validProduct: {
    name: 'Test Product',
    slug: 'test-product',
    sku: 'TEST-SKU-001',
    type: 'physical',
    categoryId: '00000000-0000-0000-0000-000000000001',
    price: 1000,
    currency: 'BDT',
  },

  validBrand: {
    name: 'Test Brand',
    slug: 'test-brand',
  },

  validCategory: {
    name: 'Test Category',
    slug: 'test-category',
  },

  validVariant: {
    productId: '00000000-0000-0000-0000-000000000001',
    name: 'Test Variant',
    sku: 'TEST-VAR-001',
    type: 'size',
    options: [{ name: 'size', value: 'M' }],
    price: 1000,
  },

  validCollection: {
    name: 'Test Collection',
    slug: 'test-collection',
    type: 'manual',
  },

  validReview: {
    productId: '00000000-0000-0000-0000-000000000001',
    rating: 5,
    title: 'Great product',
    comment: 'This is a test review.',
  },

  validPagination: {
    page: 1,
    limit: 20,
  },

  invalidUuid: 'not-a-uuid',
  invalidPage: -1,
  invalidLimit: 10000,
} as const;
