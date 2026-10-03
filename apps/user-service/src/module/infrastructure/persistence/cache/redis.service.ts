/**
 * Redis Service re-export
 * @module user-service/infrastructure/persistence/cache
 *
 * The kernel's RedisService is a fully DI-ready @Injectable.
 * We re-export it so user-service DI can inject it directly.
 */
export { RedisService } from '@vubon/shared-kernel/infrastructure';
