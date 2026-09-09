import { getEnv } from './env/env.validation';

export const databaseConfig = {
  host: getEnv('DB_HOST', 'localhost'),
  port: getEnv('DB_PORT', 5432),
  user: getEnv('DB_USER', 'postgres'),
  password: getEnv('DB_PASSWORD', 'password'),
  database: getEnv('DB_NAME', 'vubon'),
  ssl: getEnv('DB_SSL', false),
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
};
