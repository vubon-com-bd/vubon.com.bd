import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './module/modules/app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Global prefix + version
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Graceful shutdown
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 3008);
  await app.listen(port);

  logger.log(`🚀 Notification Service running on http://localhost:${port}/api/v1`);
}

void bootstrap();
