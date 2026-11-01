import 'reflect-metadata';
import { config as loadEnvFile } from 'dotenv';
import { resolve } from 'node:path';

// Load .env BEFORE anything else
loadEnvFile({ path: resolve(process.cwd(), 'apps/cart-service/.env') });
loadEnvFile({ path: resolve(process.cwd(), '.env') });
loadEnvFile();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './module/modules/app.module.js';

/**
 * Resolve NestJS log levels from LOG_LEVEL env var.
 * Maps: fatal | error | warn | info | debug | verbose → LogLevel[]
 *
 * Default: 'info' → ['fatal', 'error', 'warn', 'log']  (production-safe)
 */
function resolveLogLevels(): LogLevel[] {
  const raw = (process.env['LOG_LEVEL'] ?? 'info').toLowerCase();
  const all: LogLevel[] = ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'];

  const map: Record<string, LogLevel[]> = {
    error: ['fatal', 'error'],
    warn: ['fatal', 'error', 'warn'],
    info: ['fatal', 'error', 'warn', 'log'],
    log: ['fatal', 'error', 'warn', 'log'],
    debug: ['fatal', 'error', 'warn', 'log', 'debug'],
    verbose: all,
    trace: all,
  };

  return map[raw] ?? ['fatal', 'error', 'warn', 'log'];
}

async function bootstrap() {
  const logLevels = resolveLogLevels();

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Vubon Cart Service API')
    .setDescription('Enterprise Shopping Cart Microservice API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3003;

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Cart Service running on: http://localhost:${port}`);
  logger.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
  logger.log(`📊 Log level: ${process.env['LOG_LEVEL'] ?? 'info'}`);
  logger.log(`💾 DB mode: ${process.env['DB_MODE'] ?? 'prisma'}`);
}

bootstrap();
