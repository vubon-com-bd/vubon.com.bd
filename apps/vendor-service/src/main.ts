/**
 * Vendor Service — Bootstrap
 * @module vendor-service
 */
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './module/modules/app.module.js';

// ─── Global Filters (exception handling) ────
import { DomainExceptionFilter } from '@vubon/shared-kernel/interfaces/filters';
import { HttpExceptionFilter } from '@vubon/shared-kernel/interfaces/filters';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // ─── Global Pipes ─────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── Global Filters (ORDER MATTERS!) ──────
  // 1. DomainExceptionFilter — catches DomainError / ApplicationError
  // 2. HttpExceptionFilter — catches NestJS HttpException
  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new HttpExceptionFilter(),
  );

  // ─── Swagger Setup ────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vubon Vendor Service API')
    .setDescription('Enterprise Vendor Management Microservice API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearer')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // ─── Start server ─────────────────────────
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3004;

  await app.listen(port);

  logger.log(`🚀 Vendor Service is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  // eslint-disable-next-line no-console
  console.error('❌ Bootstrap failed:', msg);
  process.exit(1);
});
