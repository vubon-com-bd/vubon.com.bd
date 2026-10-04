/**
 * @package @vubon/shared-auth
 *
 * Subpath entrypoints:
 *   @vubon/shared-auth/common   → cross-cutting helpers (client + server safe)
 *   @vubon/shared-auth/client   → browser-only helpers
 *   @vubon/shared-auth/server   → Node.js-only services
 *   @vubon/shared-auth/react    → React providers/hooks/guards
 *   @vubon/shared-auth/nestjs   → NestJS decorators/guards/modules
 *   @vubon/shared-auth/nextjs   → Next.js middleware/actions
 *   @vubon/shared-auth/shared   → cross-framework flows
 *
 * Root entry ONLY re-exports `common` + `client`.
 * Server / react / nestjs / nextjs / shared are accessed via
 * their explicit subpaths so bundles stay clean.
 */

export * from './common';
export * from './client';
