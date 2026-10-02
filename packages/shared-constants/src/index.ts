// packages/shared-constants/src/index.ts — Root barrel (FINAL)

// ─────────────────────────────────────────────
// Level 1 — Foundation
// ─────────────────────────────────────────────
export * from './common/index.js';

// ─────────────────────────────────────────────
// Level 2 — Infrastructure + Security
// ─────────────────────────────────────────────
export * from './infrastructure/index.js';
export * from './security/index.js';

// ─────────────────────────────────────────────
// Level 3 — Domain
// ─────────────────────────────────────────────
export * from './auth/index.js';
export * from './user/index.js';
export * from './business/index.js';

// ─────────────────────────────────────────────
// Level 4 — Platform
// ─────────────────────────────────────────────
export * from './platform/index.js';

// ─────────────────────────────────────────────
// Cross-cutting Domains
// ─────────────────────────────────────────────
export * from './ai/index.js';
export * from './marketing/index.js';
export * from './support/index.js';
export * from './logistics/index.js';
