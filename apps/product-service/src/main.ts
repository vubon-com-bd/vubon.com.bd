/**
 * product-service Bootstrap (ESM-compatible)
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

const SERVICE_NAME = 'product-service';
const SERVICE_VERSION = '1.0.0';
const DEFAULT_PORT = 4002;
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
    .setTitle('Vubon Product Service')
    .setDescription('Product catalog, variants, inventory, pricing, brand, category, and collection APIs')
    .setVersion(SERVICE_VERSION)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', in: 'header' },
      'bearer',
    )
    .addTag('products')
    .addTag('product-variants')
    .addTag('product-attributes')
    .addTag('inventory')
    .addTag('pricing')
    .addTag('collections')
    .addTag('reviews')
    .addTag('media')
    .addTag('brands')
    .addTag('categories')
    .addTag('public-products')
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
