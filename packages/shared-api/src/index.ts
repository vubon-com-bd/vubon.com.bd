/**
 * @package @vubon/shared-api
 *
 * Shared HTTP API layer.
 *
 * Rules:
 *  - Transport only. No business logic.
 *  - No auth logic. Interceptors handle it.
 *  - No React / no UI.
 *  - All values come from shared-constants.
 *  - All shapes come from shared-schemas.
 *  - All types come from shared-types.
 */

export * from './common';
export * from './infrastructure';
export * from './auth';
export * from './user';
export * from './business';
export * from './platform';
export * from './ai';
export * from './marketing';
export * from './support';
export * from './logistics';
export * from './upload';
