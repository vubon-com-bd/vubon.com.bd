/**
 * Database configuration
 * Provides database connection configuration and utilities
 */
import { env } from '@vubon/auth-shared-config';

export interface DatabaseConfig {
  url: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  schema: string;
  ssl: boolean | DatabaseSslConfig;
  pool: DatabasePoolConfig;
  connection: DatabaseConnectionConfig;
}

export interface DatabaseSslConfig {
  rejectUnauthorized: boolean;
  ca?: string;
  key?: string;
  cert?: string;
}

export interface DatabasePoolConfig {
  min: number;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
  acquireTimeoutMillis: number;
  evictionRunIntervalMillis: number;
  maxLifetimeMillis: number;
}

export interface DatabaseConnectionConfig {
  timeout: number;
  keepAlive: boolean;
  keepAliveInitialDelayMillis: number;
  statementTimeout: number;
  queryTimeout: number;
  applicationName: string;
}

export class DatabaseConfigLoader {
  public static load(): DatabaseConfig {
    const databaseUrl = env.DATABASE_URL;
    const parsedUrl = this.parseDatabaseUrl(databaseUrl);

    return {
      url: databaseUrl,
      host: parsedUrl.host || 'localhost',
      port: parsedUrl.port || 5432,
      user: parsedUrl.user || 'postgres',
      password: parsedUrl.password || '',
      database: parsedUrl.database || 'auth_db',
      schema: 'public',
      ssl: this.getSslConfig(),
      pool: this.getPoolConfig(),
      connection: this.getConnectionConfig(),
    };
  }

  private static parseDatabaseUrl(url: string): {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  } {
    try {
      const parsed = new URL(url);
      return {
        host: parsed.hostname || 'localhost',
        port: parseInt(parsed.port, 10) || 5432,
        user: parsed.username || 'postgres',
        password: parsed.password || '',
        database: parsed.pathname.replace(/^\//, '') || 'auth_db',
      };
    } catch {
      return {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '',
        database: 'auth_db',
      };
    }
  }

  private static getSslConfig(): boolean | DatabaseSslConfig {
    const sslMode = env.DATABASE_SSL || 'false';
    const ssl = sslMode === 'true' || sslMode === '1';

    if (!ssl) {
      return false;
    }

    return {
      rejectUnauthorized: env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
      ca: env.DATABASE_SSL_CA,
      key: env.DATABASE_SSL_KEY,
      cert: env.DATABASE_SSL_CERT,
    };
  }

  private static getPoolConfig(): DatabasePoolConfig {
    return {
      min: parseInt(env.DATABASE_POOL_MIN || '2', 10),
      max: parseInt(env.DATABASE_MAX_CONNECTIONS || '20', 10),
      idleTimeoutMillis: parseInt(env.DATABASE_IDLE_TIMEOUT || '30000', 10),
      connectionTimeoutMillis: parseInt(env.DATABASE_CONNECTION_TIMEOUT || '5000', 10),
      acquireTimeoutMillis: parseInt(env.DATABASE_ACQUIRE_TIMEOUT || '10000', 10),
      evictionRunIntervalMillis: parseInt(env.DATABASE_EVICTION_INTERVAL || '60000', 10),
      maxLifetimeMillis: parseInt(env.DATABASE_MAX_LIFETIME || '3600000', 10),
    };
  }

  private static getConnectionConfig(): DatabaseConnectionConfig {
    return {
      timeout: parseInt(env.DATABASE_QUERY_TIMEOUT || '30000', 10),
      keepAlive: env.DATABASE_KEEP_ALIVE !== 'false',
      keepAliveInitialDelayMillis: parseInt(env.DATABASE_KEEP_ALIVE_DELAY || '10000', 10),
      statementTimeout: parseInt(env.DATABASE_STATEMENT_TIMEOUT || '30000', 10),
      queryTimeout: parseInt(env.DATABASE_QUERY_TIMEOUT || '30000', 10),
      applicationName: env.APP_NAME || 'auth-service',
    };
  }

  public static getConnectionString(): string {
    return env.DATABASE_URL;
  }

  public static getPoolSize(): number {
    return parseInt(env.DATABASE_MAX_CONNECTIONS || '20', 10);
  }

  public static getConnectionTimeout(): number {
    return parseInt(env.DATABASE_CONNECTION_TIMEOUT || '5000', 10);
  }

  public static getIdleTimeout(): number {
    return parseInt(env.DATABASE_IDLE_TIMEOUT || '30000', 10);
  }

  public static isSslEnabled(): boolean {
    const ssl = env.DATABASE_SSL || 'false';
    return ssl === 'true' || ssl === '1';
  }

  public static getDatabaseName(): string {
    try {
      const url = new URL(env.DATABASE_URL);
      return url.pathname.replace(/^\//, '');
    } catch {
      return 'auth_db';
    }
  }

  public static getHost(): string {
    try {
      const url = new URL(env.DATABASE_URL);
      return url.hostname;
    } catch {
      return 'localhost';
    }
  }

  public static getPort(): number {
    try {
      const url = new URL(env.DATABASE_URL);
      return parseInt(url.port, 10) || 5432;
    } catch {
      return 5432;
    }
  }

  public static getUsername(): string {
    try {
      const url = new URL(env.DATABASE_URL);
      return url.username;
    } catch {
      return 'postgres';
    }
  }

  public static getPassword(): string {
    try {
      const url = new URL(env.DATABASE_URL);
      return url.password || '';
    } catch {
      return '';
    }
  }
}

export const databaseConfig = DatabaseConfigLoader.load();

export default databaseConfig;
