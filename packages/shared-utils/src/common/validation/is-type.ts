/**
 * Type discriminator check
 * @module shared-utils/common/validation
 */
export type TypeName =
  'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export function isType<T extends TypeName>(
  value: unknown,
  type: T
): value is T extends 'object'
  ? object | null
  : T extends 'function'
    ? (...args: readonly unknown[]) => unknown
    : T extends 'string'
      ? string
      : T extends 'number'
        ? number
        : T extends 'boolean'
          ? boolean
          : T extends 'bigint'
            ? bigint
            : T extends 'symbol'
              ? symbol
              : T extends 'undefined'
                ? undefined
                : unknown {
  return typeof value === type;
}
