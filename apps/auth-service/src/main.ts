/**
 * Auth Service - Main Entry Point
 * Bootstraps the NestJS application
 */

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getEnv } from '@vubon/auth-shared-config';
import { AppModule } from './app.module.js';

/**
 * Bootstrap the NestJS application
 * @returns Promise<void>
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('AuthService');
  const env = getEnv();

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Enable CORS
  app.enableCors({
    origin: env.CORS_ORIGINS || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  const port = env.PORT || 3001;
  await app.listen(port);

  logger.log(`🚀 Auth Service is running on: http://localhost:${port}/api/v1`);
  logger.log(`📚 Environment: ${env.NODE_ENV}`);
}

// Bootstrap the application
void bootstrap().catch((error: unknown) => {
  console.error('Failed to start Auth Service:', error);
  process.exit(1);
});
