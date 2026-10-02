/**
 * Env helpers for cart-service config
 * @module cart-service/infrastructure/config
 */

export function getOptionalEnv(name: string, fallback: string): string {
  const v = process.env[name];
  return v && v.length > 0 ? v : fallback;
}

export function getOptionalEnvInt(name: string, fallback: number): number {
  const v = process.env[name];
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function getOptionalEnvBool(name: string, fallback: boolean): boolean {
  const v = process.env[name];
  if (!v) return fallback;
  return v === 'true' || v === '1';
}
