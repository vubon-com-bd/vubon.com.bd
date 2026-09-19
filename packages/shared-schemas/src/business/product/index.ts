// shared-schemas/business/product/index.ts
// Product sub-domain barrel export

// Base
export * from './product.schema';
export * from './product-status.schema';
export * from './product-type.schema';
export * from './category.schema';
export * from './brand.schema';
export * from './variant.schema';
export * from './attribute.schema';
export * from './inventory.schema';
export * from './pricing.schema';
export * from './review.schema';
export * from './collection.schema';

// Requests
export * from './create-product.schema';
export * from './update-product.schema';
export * from './add-variant.schema';
export * from './submit-review.schema';
export * from './update-inventory.schema';

// Responses
export * from './product-response.schema';
export * from './list-response.schema';
