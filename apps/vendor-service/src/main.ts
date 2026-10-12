/**
 * vendor-service Bootstrap (ESM-compatible)
 */
import 'reflect-metadata';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as dotenv from 'dotenv';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from monorepo root, then override with service-local
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './module/modules/app.module.js';

const SERVICE_NAME = 'vendor-service';
const SERVICE_VERSION = '1.0.0';
const DEFAULT_PORT = 4006;
const API_PREFIX = 'api/v1';

async function bootstrap(): Promise<void> {
  const logger = new Logger(SERVICE_NAME);
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vubon Vendor Service')
    .setDescription(
      'Vendor onboarding, profiles, settings, verification, payouts, and performance analytics APIs',
    )
    .setVersion(SERVICE_VERSION)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', in: 'header' },
      'bearer',
    )
    .addTag('vendors')
    .addTag('vendor-profiles')
    .addTag('vendor-settings')
    .addTag('vendor-verifications')
    .addTag('vendor-payouts')
    .addTag('vendor-analytics')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.enableShutdownHooks();
  const port = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port);

  logger.log(`🚀 ${SERVICE_NAME} listening on http://localhost:${port}/${API_PREFIX}`);
  logger.log(`📚 Swagger docs at http://localhost:${port}/${API_PREFIX}/docs`);
}

bootstrap().catch((err) => {
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});
