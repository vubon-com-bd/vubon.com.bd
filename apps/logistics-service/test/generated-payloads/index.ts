/**
 * Generated Payloads — request payload factories for E2E tests
 * @module logistics-service/test/generated-payloads
 *
 * NOTE: In logistics-service, payloads are inlined in endpoints.mjs.
 * This file exists for parity with identity-service pattern.
 */

export const createProductPayload = (): Record<string, unknown> => ({
  name: 'E2E Product',
  slug: `e2e-product-${Date.now()}`,
  sku: `E2E-SKU-${Date.now()}`,
  type: 'physical',
  categoryId: '00000000-0000-0000-0000-000000000001',
  price: 1000,
  currency: 'BDT',
});

export const createVariantPayload = (): Record<string, unknown> => ({
  productId: '00000000-0000-0000-0000-000000000001',
  name: 'E2E Variant',
  sku: `E2E-VAR-${Date.now()}`,
  type: 'size',
  options: [{ name: 'size', value: 'M' }],
  price: 1000,
});

export const createBrandPayload = (): Record<string, unknown> => ({
  name: 'E2E Brand',
  slug: `e2e-brand-${Date.now()}`,
});

export const createCategoryPayload = (): Record<string, unknown> => ({
  name: 'E2E Category',
  slug: `e2e-category-${Date.now()}`,
});

export const createCollectionPayload = (): Record<string, unknown> => ({
  name: 'E2E Collection',
  slug: `e2e-collection-${Date.now()}`,
  type: 'manual',
});

export const submitReviewPayload = (): Record<string, unknown> => ({
  productId: '00000000-0000-0000-0000-000000000001',
  rating: 5,
  title: 'E2E review title',
  comment: 'This is an E2E test review comment.',
});
