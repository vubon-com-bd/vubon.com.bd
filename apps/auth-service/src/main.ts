/**
 * Auth Service — Bootstrap Entry Point
 * @module auth-service
 *
 * Env loading order:
 *   1. Root .env (shared vars)   ← ../../.env
 *   2. Auth-service .env (overrides) ← ./.env
 *
 * Uses explicit dotenv.config() rather than @nestjs/config defaults
 * so we control the precedence precisely.
 */
import * as path from 'node:path';
import * as dotenv from 'dotenv';

// ─── 1. Load root .env (shared) ───────────────────────────────────
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
});

// ─── 2. Load auth-service .env (overrides) ───────────────────────
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  override: true,
});

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './module/modules/app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // ─── Global prefix ─────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── Global validation pipe ────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── CORS ──────────────────────────────────────────────────────
  const corsOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
    credentials: true,
  });

  // ─── Swagger (dev only) ────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Vubon Auth Service')
      .setDescription('Authentication & authorization microservice')
      .setVersion(process.env.APP_VERSION ?? '1.0.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log('Swagger enabled at /api/docs');
  }

  // ─── Graceful shutdown ─────────────────────────────────────────
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);

  logger.log(`🚀 auth-service listening on http://localhost:${port}`);
  logger.log(`📚 Swagger: http://localhost:${port}/api/docs`);
  logger.log(`🔧 Env: ${process.env.NODE_ENV ?? 'development'}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});
