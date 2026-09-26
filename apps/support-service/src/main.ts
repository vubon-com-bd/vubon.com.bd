/**
 * support-service entry point
 * @module support-service/main
 *
 * Rule: bootstrapEnvFiles() BEFORE NestFactory — loads root + service .env
 * Rule: global pipes, filters, middlewares — no business logic
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { bootstrapEnvFiles } from '@vubon/shared-config/common';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from '@vubon/shared-kernel/interfaces/filters';

// ⚠️ MUST run before NestFactory — loads root + service + service.local env
bootstrapEnvFiles();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGINS?.split(',') ?? '*',
      credentials: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new DomainExceptionFilter());

  const port = Number(process.env.PORT ?? 3007);
  await app.listen(port);

  Logger.log(`support-service running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`, 'Bootstrap');
  Logger.log(
    `Database host: ${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] ?? 'unknown'}`,
    'Bootstrap',
  );
}

void bootstrap();
