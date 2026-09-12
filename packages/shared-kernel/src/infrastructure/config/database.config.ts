export interface DatabaseConfig {
  url: string;
  ssl: boolean;
  pool: {
    min: number;
    max: number;
  };
  synchronize: boolean;
  logging: boolean;
  migrations: {
    run: boolean;
    tableName: string;
  };
}

export const getDatabaseConfig = (): DatabaseConfig => ({
  url: process.env.DATABASE_URL || 'postgresql://localhost:5432/vubon_db',
  ssl: process.env.DATABASE_SSL === 'true',
  pool: {
    min: parseInt(process.env.DATABASE_POOL_MIN || '2'),
    max: parseInt(process.env.DATABASE_POOL_MAX || '10'),
  },
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  migrations: {
    run: process.env.DATABASE_MIGRATIONS_RUN === 'true',
    tableName: 'migrations',
  },
});
