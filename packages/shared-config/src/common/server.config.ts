/**
 * Server Configuration
 * সার্ভার কনফিগারেশন
 */
export type Environment = 'development' | 'production' | 'test';

export interface ServerConfig {
  port: number;
  host: string;
  env: Environment;
  name: string;
  version: string;
  timezone: string;
  baseUrl: string;
  apiPrefix: string;
  debug: boolean;
}

export const serverConfig = (): ServerConfig => ({
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',
  env: (process.env.NODE_ENV as Environment) || 'development',
  name: process.env.APP_NAME || 'Vubon Platform',
  version: process.env.APP_VERSION || '1.0.0',
  timezone: process.env.TIMEZONE || 'Asia/Dhaka',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  apiPrefix: process.env.API_PREFIX || '/api',
  debug: process.env.DEBUG === 'true',
});
