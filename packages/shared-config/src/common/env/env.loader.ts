/**
 * Load & validate environment (fail-fast)
 * @module shared-config/common/env
 *
 * Hybrid loading order:
 *  1. Monorepo root `.env` (shared baseline)
 *  2. Service `.env` (service default)
 *  3. Service `.env.local` (service-specific, overrides root)
 *  4. Runtime `process.env` (always wins)
 */
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { config as dotenvConfig } from 'dotenv';
import { EnvSchema, type EnvSchemaType } from './env.schema';

let cachedEnv: EnvSchemaType | null = null;
let envLoaded = false;

/**
 * Find monorepo root by walking up until `pnpm-workspace.yaml`.
 */
function findMonorepoRoot(startDir: string): string {
  let current = startDir;
  for (let i = 0; i < 10; i++) {
    if (existsSync(resolve(current, 'pnpm-workspace.yaml'))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return startDir;
}

/**
 * Load .env files in priority order (later overrides earlier).
 * `quiet: true` suppresses dotenv v17+ injection banners in stdout.
 */
function loadEnvFiles(): void {
  if (envLoaded) return;
  envLoaded = true;

  const cwd = process.cwd();
  const monorepoRoot = findMonorepoRoot(cwd);

  // 1. Monorepo root .env (shared baseline)
  const rootEnv = resolve(monorepoRoot, '.env');
  if (existsSync(rootEnv)) {
    dotenvConfig({ path: rootEnv, override: false, quiet: true });
  }

  // 2. Service .env (default per service)
  const serviceEnv = resolve(cwd, '.env');
  if (existsSync(serviceEnv) && serviceEnv !== rootEnv) {
    dotenvConfig({ path: serviceEnv, override: true, quiet: true });
  }

  // 3. Service .env.local (service-specific, highest override)
  const serviceLocalEnv = resolve(cwd, '.env.local');
  if (existsSync(serviceLocalEnv)) {
    dotenvConfig({ path: serviceLocalEnv, override: true, quiet: true });
  }
}

/**
 * Load & validate environment (fail-fast).
 * Cached after first call.
 */
export function loadEnv(): EnvSchemaType {
  if (cachedEnv) return cachedEnv;
  loadEnvFiles();

  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
