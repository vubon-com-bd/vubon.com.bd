/**
 * Environment variable getters (SSR-safe, no direct process.env access)
 * @module shared-config/common/env
 *
 * ⚠️ Always use these helpers. Do NOT read process.env directly in config files.
 */
import { EnvMissingError, EnvParseError } from './env.types';

function source(): Record<string, string | undefined> {
  if (typeof process !== 'undefined' && process.env) return process.env;
  return {};
}

/**
 * Get a required env variable. Throws if missing.
 */
export function getEnv(key: string): string {
  const value = source()[key];
  if (value === undefined || value === '') {
    throw new EnvMissingError(key);
  }
  return value;
}

/**
 * Get an optional env variable with a fallback.
 * Accepts string | number | boolean fallback.
 */
export function getOptionalEnv<T extends string | number | boolean>(
  key: string,
  fallback: T
): string | T {
  const value = source()[key];
  if (value === undefined || value === '') return fallback;
  return value;
}

/**
 * Get env variable as integer.
 */
export function getEnvInt(key: string): number {
  return parseIntEnv(key, getEnv(key));
}

/**
 * Get env variable as integer with fallback.
 */
export function getOptionalEnvInt(key: string, fallback: number): number {
  const value = source()[key];
  if (value === undefined || value === '') return fallback;
  return parseIntEnv(key, value);
}

function parseIntEnv(key: string, value: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    throw new EnvParseError(key, value, 'not an integer');
  }
  return parsed;
}

/**
 * Get env variable as boolean. Accepted truthy: 'true', '1', 'yes', 'on'.
 */
export function getEnvBool(key: string): boolean {
  return parseBoolEnv(key, getEnv(key));
}

/**
 * Get env variable as boolean with fallback.
 */
export function getOptionalEnvBool(key: string, fallback: boolean): boolean {
  const value = source()[key];
  if (value === undefined || value === '') return fallback;
  return parseBoolEnv(key, value);
}

function parseBoolEnv(key: string, value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
  if (['false', '0', 'no', 'off'].includes(normalized)) return false;
  throw new EnvParseError(key, value, 'not a boolean');
}

/**
 * Get env variable as a comma-separated string array.
 */
export function getEnvList(key: string, separator = ','): string[] {
  return getEnv(key)
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * Get optional env variable as a comma-separated string array.
 */
export function getOptionalEnvList(key: string, fallback: string[], separator = ','): string[] {
  const value = source()[key];
  if (value === undefined || value === '') return fallback;
  return value
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
}
