/**
 * Auth Service — Infrastructure Layer Barrel
 * @module identity-service/infrastructure
 *
 * Order: persistence → queues → workers → external → services → config → modules
 */

// Persistence
export * from './persistence/prisma/index.js';
export * from './persistence/cache/index.js';

// Queues + Workers
export * from './queues/index.js';
export * from './workers/index.js';

// External integrations
export * from './external/index.js';

// Internal services
export * from './services/index.js';

// Config
export * from './config/index.js';

// Modules
export * from './queues-workers.module.js';
export * from './infrastructure.module.js';
