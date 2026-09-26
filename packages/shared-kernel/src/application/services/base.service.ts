/**
 * Base Service
 * @module shared-kernel/application/services
 *
 * Uses shared-utils helpers.
 */
import { pick, omit } from '@vubon/shared-utils/common';
import type { BaseServiceInterface } from './base.service.interface';

/**
 * Base Domain Service
 *
 * Domain services extend this — implement multiple use-case methods।
 * Entity + Id bind domain context।
 */
export abstract class BaseService<
  TEntity = unknown,
  TId = string,
> implements BaseServiceInterface<TEntity, TId> {
  abstract readonly name: string;

  protected pickFields<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[],
  ): Pick<T, K> {
    return pick(obj, keys);
  }

  protected omitFields<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[],
  ): Omit<T, K> {
    return omit(obj, keys);
  }
}
