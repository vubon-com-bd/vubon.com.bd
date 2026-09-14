/**
 * Load & validate environment (fail-fast)
 * @module shared-config/common/env
 */
import { EnvSchema, type EnvSchemaType } from './env.schema';

let cachedEnv: EnvSchemaType | null = null;

export function loadEnv(): EnvSchemaType {
  if (cachedEnv) return cachedEnv;

  const source = typeof process !== 'undefined' && process.env ? process.env : {};

  const result = EnvSchema.safeParse(source);

  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Environment validation failed:\n${issues}`);
  }

  cachedEnv = result.data;
  return cachedEnv;
}

export function resetEnvCache(): void {
  cachedEnv = null;
}
