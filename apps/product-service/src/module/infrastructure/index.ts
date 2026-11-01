/**
 * Product Service — Infrastructure Layer Barrel
 * @module product-service/infrastructure
 *
 * ⚠️ Order: persistence → queues → workers → external → services → config → modules
 */
export * from './persistence/index.js';
export * from './queues/index.js';
export * from './workers/index.js';
export * from './external/index.js';
export * from './services/index.js';
export * from './config/index.js';
export * from './queues-workers.module.js';
export * from './infrastructure.module.js';
