/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return */
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
    const databaseUrl =
      typeof env.DATABASE_URL === 'string'
        ? env.DATABASE_URL
        : 'postgresql://postgres:postgres@localhost:5432/auth_db';
    const parsedUrl = this.parseDatabaseUrl(databaseUrl);

    return {
      url: databaseUrl,
      host: parsedUrl.host,
      port: parsedUrl.port,
      user: parsedUrl.user,
      password: parsedUrl.password,
      database: parsedUrl.database,
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
    const rawSsl = (env as Record<string, unknown>).DATABASE_SSL;
    const sslMode = typeof rawSsl === 'string' ? rawSsl : 'false';
    const ssl = sslMode === 'true' || sslMode === '1';

    if (!ssl) {
      return false;
    }

    const rawReject = (env as Record<string, unknown>).DATABASE_SSL_REJECT_UNAUTHORIZED;
    const rejectUnauthorized = typeof rawReject === 'string' ? rawReject !== 'false' : true;

    return {
      rejectUnauthorized,
      ca:
        typeof (env as Record<string, unknown>).DATABASE_SSL_CA === 'string'
          ? ((env as Record<string, unknown>).DATABASE_SSL_CA as string)
          : undefined,
      key:
        typeof (env as Record<string, unknown>).DATABASE_SSL_KEY === 'string'
          ? ((env as Record<string, unknown>).DATABASE_SSL_KEY as string)
          : undefined,
      cert:
        typeof (env as Record<string, unknown>).DATABASE_SSL_CERT === 'string'
          ? ((env as Record<string, unknown>).DATABASE_SSL_CERT as string)
          : undefined,
    };
  }

  private static getPoolConfig(): DatabasePoolConfig {
    const envObj = env as Record<string, unknown>;
    const minVal =
      typeof envObj.DATABASE_POOL_MIN === 'number'
        ? envObj.DATABASE_POOL_MIN
        : parseInt(
            typeof envObj.DATABASE_POOL_MIN === 'string' ? envObj.DATABASE_POOL_MIN : '2',
            10
          );
    const maxVal =
      typeof env.DATABASE_MAX_CONNECTIONS === 'number'
        ? env.DATABASE_MAX_CONNECTIONS
        : parseInt(
            typeof env.DATABASE_MAX_CONNECTIONS === 'string' ? env.DATABASE_MAX_CONNECTIONS : '20',
            10
          );
    const idleVal =
      typeof env.DATABASE_IDLE_TIMEOUT === 'number'
        ? env.DATABASE_IDLE_TIMEOUT
        : parseInt(
            typeof env.DATABASE_IDLE_TIMEOUT === 'string' ? env.DATABASE_IDLE_TIMEOUT : '30000',
            10
          );
    const connTimeoutVal =
      typeof env.DATABASE_CONNECTION_TIMEOUT === 'number'
        ? env.DATABASE_CONNECTION_TIMEOUT
        : parseInt(
            typeof env.DATABASE_CONNECTION_TIMEOUT === 'string'
              ? env.DATABASE_CONNECTION_TIMEOUT
              : '5000',
            10
          );

    const acquireVal =
      typeof envObj.DATABASE_ACQUIRE_TIMEOUT === 'string'
        ? parseInt(envObj.DATABASE_ACQUIRE_TIMEOUT, 10)
        : typeof envObj.DATABASE_ACQUIRE_TIMEOUT === 'number'
          ? envObj.DATABASE_ACQUIRE_TIMEOUT
          : 10000;
    const evictionVal =
      typeof envObj.DATABASE_EVICTION_INTERVAL === 'string'
        ? parseInt(envObj.DATABASE_EVICTION_INTERVAL, 10)
        : typeof envObj.DATABASE_EVICTION_INTERVAL === 'number'
          ? envObj.DATABASE_EVICTION_INTERVAL
          : 60000;
    const maxLifeVal =
      typeof envObj.DATABASE_MAX_LIFETIME === 'string'
        ? parseInt(envObj.DATABASE_MAX_LIFETIME, 10)
        : typeof envObj.DATABASE_MAX_LIFETIME === 'number'
          ? envObj.DATABASE_MAX_LIFETIME
          : 3600000;

    return {
      min: minVal,
      max: maxVal,
      idleTimeoutMillis: idleVal,
      connectionTimeoutMillis: connTimeoutVal,
      acquireTimeoutMillis: acquireVal,
      evictionRunIntervalMillis: evictionVal,
      maxLifetimeMillis: maxLifeVal,
    };
  }

  private static getConnectionConfig(): DatabaseConnectionConfig {
    const envObj = env as Record<string, unknown>;
    const timeoutVal =
      typeof envObj.DATABASE_QUERY_TIMEOUT === 'string'
        ? parseInt(envObj.DATABASE_QUERY_TIMEOUT, 10)
        : typeof envObj.DATABASE_QUERY_TIMEOUT === 'number'
          ? envObj.DATABASE_QUERY_TIMEOUT
          : 30000;
    const keepAliveVal =
      typeof envObj.DATABASE_KEEP_ALIVE === 'string'
        ? envObj.DATABASE_KEEP_ALIVE !== 'false'
        : true;
    const delayVal =
      typeof envObj.DATABASE_KEEP_ALIVE_DELAY === 'string'
        ? parseInt(envObj.DATABASE_KEEP_ALIVE_DELAY, 10)
        : 10000;
    const stmtTimeoutVal =
      typeof envObj.DATABASE_STATEMENT_TIMEOUT === 'string'
        ? parseInt(envObj.DATABASE_STATEMENT_TIMEOUT, 10)
        : 30000;

    return {
      timeout: timeoutVal,
      keepAlive: keepAliveVal,
      keepAliveInitialDelayMillis: delayVal,
      statementTimeout: stmtTimeoutVal,
      queryTimeout: timeoutVal,
      applicationName: typeof env.APP_NAME === 'string' ? env.APP_NAME : 'auth-service',
    };
  }

  public static getConnectionString(): string {
    return typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
  }

  public static getPoolSize(): number {
    return typeof env.DATABASE_MAX_CONNECTIONS === 'number'
      ? env.DATABASE_MAX_CONNECTIONS
      : parseInt(
          typeof env.DATABASE_MAX_CONNECTIONS === 'string' ? env.DATABASE_MAX_CONNECTIONS : '20',
          10
        );
  }

  public static getConnectionTimeout(): number {
    return typeof env.DATABASE_CONNECTION_TIMEOUT === 'number'
      ? env.DATABASE_CONNECTION_TIMEOUT
      : parseInt(
          typeof env.DATABASE_CONNECTION_TIMEOUT === 'string'
            ? env.DATABASE_CONNECTION_TIMEOUT
            : '5000',
          10
        );
  }

  public static getIdleTimeout(): number {
    return typeof env.DATABASE_IDLE_TIMEOUT === 'number'
      ? env.DATABASE_IDLE_TIMEOUT
      : parseInt(
          typeof env.DATABASE_IDLE_TIMEOUT === 'string' ? env.DATABASE_IDLE_TIMEOUT : '30000',
          10
        );
  }

  public static isSslEnabled(): boolean {
    const rawSsl = (env as Record<string, unknown>).DATABASE_SSL;
    const ssl = typeof rawSsl === 'string' ? rawSsl : 'false';
    return ssl === 'true' || ssl === '1';
  }

  public static getDatabaseName(): string {
    try {
      const urlStr = typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
      const url = new URL(urlStr);
      return url.pathname.replace(/^\//, '') || 'auth_db';
    } catch {
      return 'auth_db';
    }
  }

  public static getHost(): string {
    try {
      const urlStr = typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
      const url = new URL(urlStr);
      return url.hostname || 'localhost';
    } catch {
      return 'localhost';
    }
  }

  public static getPort(): number {
    try {
      const urlStr = typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
      const url = new URL(urlStr);
      return parseInt(url.port, 10) || 5432;
    } catch {
      return 5432;
    }
  }

  public static getUsername(): string {
    try {
      const urlStr = typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
      const url = new URL(urlStr);
      return url.username || 'postgres';
    } catch {
      return 'postgres';
    }
  }

  public static getPassword(): string {
    try {
      const urlStr = typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
      const url = new URL(urlStr);
      return url.password || '';
    } catch {
      return '';
    }
  }
}

export const databaseConfig = DatabaseConfigLoader.load();

export default databaseConfig;
