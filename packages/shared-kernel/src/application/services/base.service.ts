/**
 * Base Service
 * @module shared-kernel/application/services
 *
 * Uses shared-utils helpers.
 */
import { pick, omit } from '@vubon/shared-utils/common';
import type { BaseServiceInterface } from './base.service.interface';

export abstract class BaseService<
  TInput = unknown,
  TOutput = unknown,
> implements BaseServiceInterface<TInput, TOutput> {
  abstract readonly name: string;

  abstract execute(input: TInput): Promise<TOutput>;

  protected pickFields<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[]
  ): Pick<T, K> {
    return pick(obj, keys);
  }

  protected omitFields<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[]
  ): Omit<T, K> {
    return omit(obj, keys);
  }
}
