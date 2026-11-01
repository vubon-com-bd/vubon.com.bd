/**
 * Logistics Service — Bootstrap
 * @module logistics-service
 *
 * ⚠️ dotenv MUST be loaded BEFORE any other import
 * ⚠️ 6 filters in strict order: Validation → Prisma → Domain(kernel) → Domain(app) → App → Http
 */
import 'reflect-metadata';
import { config as loadEnvFile } from 'dotenv';
import { resolve } from 'node:path';

// ✅ MUST BE BEFORE ANY OTHER IMPORT
loadEnvFile({ path: resolve(process.cwd(), '.env'), override: true });

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './module/modules/app.module.js';

// ─── Shared-kernel filters ───
import {
  DomainExceptionFilter as KernelDomainFilter,
  HttpExceptionFilter,
  ValidationExceptionFilter,
} from '@vubon/shared-kernel/interfaces/filters';

// ─── Logistics-specific filters ───
import { DomainExceptionFilter } from './module/infrastructure/filters/domain-exception.filter.js';
import { ApplicationExceptionFilter } from './module/infrastructure/filters/application-exception.filter.js';
import { PrismaUnavailableFilter } from './module/infrastructure/filters/prisma-unavailable.filter.js';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ⚠️ ORDER: Validation → Prisma → Domain(kernel) → Domain(app) → App → Http
  // DEBUG_EXCEPTION_LOGGER
  const httpAdapter = app.getHttpAdapter();
  const originalHandle = httpAdapter.getInstance();
  if (originalHandle && typeof originalHandle.use === 'function') {
    originalHandle.use((err: unknown, _req: any, res: any, next: any) => {
      const e = err as Error;
      console.error('[DEBUG_RAW_ERROR]', e?.name, '|', e?.message);
      if (e?.stack) console.error(e.stack.split('\n').slice(0, 8).join('\n'));
      if (res.headersSent) return next(err);
      res.status(500).json({ debug: true, name: e?.name, message: e?.message });
    });
  }

  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new PrismaUnavailableFilter(),
    new KernelDomainFilter(),
    new DomainExceptionFilter(),
    new ApplicationExceptionFilter(),
    new HttpExceptionFilter(),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vubon Logistics Service API')
    .setDescription('Enterprise Logistics & Delivery Microservice API')
    .setVersion('1.0')
    .addBearerAuth({ name: 'bearer', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearer')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3007;

  await app.listen(port);

  logger.log(`🚀 Logistics Service is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
  logger.log(`🔧 SERVICE_NAME: ${configService.get<string>('SERVICE_NAME')}`);
  logger.log(`💾 DB_MODE: ${configService.get<string>('DB_MODE')}`);
}

bootstrap().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  console.error('❌ Bootstrap failed:', msg);
  process.exit(1);
});
