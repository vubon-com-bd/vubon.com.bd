/**
 * Analytics Service — Application Layer Barrel
 * @module analytics-service/application
 *
 * Application Layer:
 * - DTOs (requests + responses)
 * - Services (interfaces + implementations)
 * - Commands (CQRS write)
 * - Queries (CQRS read)
 * - Sagas (long-running processes)
 * - Mappers (entity → DTO)
 * - Validators (Zod schema validation)
 * - Errors (application-level)
 */
// ─── DTOs ─────────────────────────────────────────
export * from './dtos/index.js';

// ─── Services ─────────────────────────────────────
export * from './services/index.js';

// ─── Commands (CQRS Write) ────────────────────────
export * from './commands/index.js';

// ─── Queries (CQRS Read) ──────────────────────────
export * from './queries/index.js';

// ─── Sagas (Long-running) ─────────────────────────
export * from './sagas/index.js';

// ─── Mappers ──────────────────────────────────────
export * from './mappers/index.js';

// ─── Validators ───────────────────────────────────
export * from './validators/index.js';

// ─── Errors ───────────────────────────────────────
export * from './errors/index.js';
