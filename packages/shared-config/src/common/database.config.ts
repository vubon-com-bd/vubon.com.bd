import { getRequiredEnv, getOptionalEnv } from './env/env.validation';

export const databaseConfig = {
  host: getOptionalEnv('DB_HOST', 'localhost'),
  port: Number(getOptionalEnv('DB_PORT', '5432')),
  user: getOptionalEnv('DB_USER', 'postgres'),
  /** @required — no fallback for security */
  password: getRequiredEnv('DB_PASSWORD'),
  database: getOptionalEnv('DB_NAME', 'vubon'),
  ssl: getOptionalEnv('DB_SSL', 'false') === 'true',
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  migrations: {
    tableName: 'migrations',
    directory: 'src/database/migrations',
  },
  seeds: {
    directory: 'src/database/seeds',
  },
} as const;
