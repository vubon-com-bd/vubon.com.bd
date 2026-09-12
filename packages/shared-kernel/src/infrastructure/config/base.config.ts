export interface BaseConfig {
  env: 'development' | 'production' | 'test';
  appName: string;
  appVersion: string;
  port: number;
  host: string;
  timezone: string;
  baseUrl: string;
  apiPrefix: string;
  debug: boolean;
}

export const getBaseConfig = (): BaseConfig => ({
  env: (process.env.NODE_ENV as BaseConfig['env']) || 'development',
  appName: process.env.APP_NAME || 'Vubon Platform',
  appVersion: process.env.APP_VERSION || '1.0.0',
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',
  timezone: process.env.TIMEZONE || 'Asia/Dhaka',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  apiPrefix: process.env.API_PREFIX || '/api',
  debug: process.env.DEBUG === 'true',
});
