// packages/shared-constants/src/index.ts — Root barrel (FINAL)

// ─────────────────────────────────────────────
// Level 1 — Foundation
// ─────────────────────────────────────────────
export * from './common';

// ─────────────────────────────────────────────
// Level 2 — Infrastructure + Security
// ─────────────────────────────────────────────
export * from './infrastructure';
export * from './security';

// ─────────────────────────────────────────────
// Level 3 — Domain
// ─────────────────────────────────────────────
export * from './auth';
export * from './user';
export * from './business';

// ─────────────────────────────────────────────
// Level 4 — Platform
// ─────────────────────────────────────────────
export * from './platform';

// ─────────────────────────────────────────────
// Cross-cutting Domains
// ─────────────────────────────────────────────
export * from './ai';
export * from './marketing';
export * from './support';
export * from './logistics';
