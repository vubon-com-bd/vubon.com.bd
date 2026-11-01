// shared-schemas/business/product/index.ts
// Product sub-domain barrel export

// Base
export * from './product.schema.js';
export * from './product-status.schema.js';
export * from './product-type.schema.js';
export * from './category.schema.js';
export * from './brand.schema.js';
export * from './variant.schema.js';
export * from './attribute.schema.js';
export * from './inventory.schema.js';
export * from './pricing.schema.js';
export * from './review.schema.js';
export * from './collection.schema.js';

// Requests
export * from './create-product.schema.js';
export * from './update-product.schema.js';
export * from './add-variant.schema.js';
export * from './submit-review.schema.js';
export * from './update-inventory.schema.js';

// Responses
export * from './product-response.schema.js';
export * from './list-response.schema.js';
