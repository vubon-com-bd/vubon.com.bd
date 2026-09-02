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

export const createCorsConfig = (env: {
  CORS_ORIGIN?: string;
  CORS_MAX_AGE?: number;
}): CorsConfig => ({
  origin: env.CORS_ORIGIN
    ? env.CORS_ORIGIN.split(',')
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
  maxAge: env.CORS_MAX_AGE || 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
