/**
 * CORS Configuration
 * সিওআরএস কনফিগারেশন
 */
export interface CorsConfig {
  origin: string | string[] | boolean;
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
  preflightContinue: boolean;
  optionsSuccessStatus: number;
}

export const corsConfig = (): CorsConfig => ({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Origin',
  ],
  exposedHeaders: ['X-Total-Count', 'X-Pagination', 'Content-Disposition'],
  credentials: true,
  maxAge: parseInt(process.env.CORS_MAX_AGE || '86400'), // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
