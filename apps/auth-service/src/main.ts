import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  DomainExceptionFilter,
  ValidationExceptionFilter,
  AllExceptionsFilter,
} from '@vubon/shared-kernel/interfaces';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Global exception filters (order matters — specific first)
  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new DomainExceptionFilter(),
    new AllExceptionsFilter(),
  );

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);

  logger.log(`🚀 Auth Service running on http://localhost:${port}/api/v1`);
}

void bootstrap();
