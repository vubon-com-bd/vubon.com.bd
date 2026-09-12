import { getOptionalEnv } from '../env/env.validation';

const originsFromEnv = getOptionalEnv(
  'CORS_ORIGINS',
  'http://localhost:3000,http://localhost:3001'
);

export const corsConfig = {
  origin: originsFromEnv
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['X-Total-Count', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
} as const;
