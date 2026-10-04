/**
 * Environment variable types
 * @module shared-config/common/env
 */

export type EnvValue = string | number | boolean;

export interface EnvSource {
  readonly get: (key: string) => string | undefined;
}

export class EnvMissingError extends Error {
  public readonly code = 'ENV_MISSING';
  public readonly key: string;

  constructor(key: string) {
    super(`Required environment variable "${key}" is missing`);
    this.name = 'EnvMissingError';
    this.key = key;
  }
}

export class EnvParseError extends Error {
  public readonly code = 'ENV_PARSE';
  public readonly key: string;
  public readonly rawValue: string;

  constructor(key: string, rawValue: string, reason: string) {
    super(`Cannot parse environment variable "${key}" (value="${rawValue}"): ${reason}`);
    this.name = 'EnvParseError';
    this.key = key;
    this.rawValue = rawValue;
  }
}
