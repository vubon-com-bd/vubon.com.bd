// product-service/infrastructure/workers/index.ts
// Barrel — base worker + 5 concrete workers

export * from './base.worker.js';
export * from './product-processor.worker.js';
export * from './inventory-sync.worker.js';
export * from './search-index.worker.js';
export * from './media-processor.worker.js';
export * from './analytics-processor.worker.js';
