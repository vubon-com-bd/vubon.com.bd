/**
 * logistics-service Bootstrap (ESM-compatible)
 * @module logistics-service/main
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

import { NestFactory, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './module/modules/app.module.js';
import { LogisticsExceptionFilter } from './module/interfaces/filters/logistics-exception.filter.js';

const SERVICE_NAME = 'logistics-service';
const SERVICE_VERSION = '1.0.0';
const DEFAULT_PORT = 4006;
const API_PREFIX = 'api/v1';

async function bootstrap(): Promise<void> {
  const logger = new Logger(SERVICE_NAME);
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Global catch-all filter — duck-types HttpException (works even with
  // duplicate @nestjs/common copies in the monorepo) and maps Prisma
  // engine errors to 503.
  app.useGlobalFilters(new LogisticsExceptionFilter());

  app.setGlobalPrefix(API_PREFIX);

  // Global JwtAuthGuard — protects all routes; @Public() opts out
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.enableCors({ origin: true, credentials: true });

  // protected controller. Health & Public controllers omit the guard to
  // stay unauthenticated. (Registering it globally would block @Public()
  // routes because the kernel guard does not consult the @Public metadata.)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vubon Logistics Service')
    .setDescription(
      'Shipments, couriers, real-time tracking, warehouse management, delivery scheduling, and return logistics APIs',
    )
    .setVersion(SERVICE_VERSION)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', in: 'header' },
      'bearer',
    )
    .addTag('shipments')
    .addTag('couriers')
    .addTag('warehouses')
    .addTag('vehicles')
    .addTag('drivers')
    .addTag('zones')
    .addTag('shipping-methods')
    .addTag('packagings')
    .addTag('deliveries')
    .addTag('tracking')
    .addTag('routes')
    .addTag('fulfillments')
    .addTag('dispatches')
    .addTag('return-shipments')
    .addTag('insurances')
    .addTag('public-logistics')
    .addTag('webhooks')
    .addTag('health')
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
