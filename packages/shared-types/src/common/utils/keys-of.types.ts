/**
 * KeysOf Utility
 * @module shared-types/common/utils
 */

export type KeysOf<T> = keyof T;

export type StringKeysOf<T> = Extract<keyof T, string>;

export type RequiredKeysOf<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeysOf<T> = Exclude<keyof T, RequiredKeysOf<T>>;
