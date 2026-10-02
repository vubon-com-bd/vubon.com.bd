/**
 * User Service — Bootstrap Entry Point
 * @module @vubon/user-service
 *
 * Env loading order:
 *   1. Root .env (shared vars)      ← ../../../.env
 *   2. user-service .env (overrides) ← ../.env
 *
 * Uses explicit dotenv.config() rather than @nestjs/config defaults
 * so we control the precedence precisely.
 */
import 'reflect-metadata';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as dotenv from 'dotenv';

// ─── ESM-safe __dirname ────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── 1. Load root .env (shared) ────────────────────────────────
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// ─── 2. Load user-service .env (overrides) ─────────────────────
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './module/modules/app.module.js';

const SERVICE_NAME = 'user-service';
const SERVICE_VERSION = '1.0.0';
const DEFAULT_PORT = 4001;
const API_PREFIX = 'api/v1';

async function bootstrap(): Promise<void> {
  const logger = new Logger(SERVICE_NAME);
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // ─── Global prefix ───────────────────────────────────────────
  app.setGlobalPrefix(API_PREFIX);

  // ─── CORS ────────────────────────────────────────────────────
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ─── Validation ──────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── Swagger ─────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vubon User Service')
    .setDescription('User identity, profile, KYC, and activity APIs')
    .setVersion(SERVICE_VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'bearer',
    )
    .addTag('users')
    .addTag('user-profile')
    .addTag('user-settings')
    .addTag('user-preferences')
    .addTag('user-address')
    .addTag('user-contact')
    .addTag('user-kyc')
    .addTag('user-activity')
    .addTag('public-profile')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // ─── Graceful shutdown ───────────────────────────────────────
  app.enableShutdownHooks();

  // ─── Listen ──────────────────────────────────────────────────
  const port = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port);

  logger.log(`🚀 ${SERVICE_NAME} listening on http://localhost:${port}/${API_PREFIX}`);
  logger.log(`📚 Swagger docs at http://localhost:${port}/${API_PREFIX}/docs`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});
