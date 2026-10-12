/**
 * Auth Service — Bootstrap
 * @module identity-service
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Global prefix
  const apiPrefix = process.env['API_PREFIX'] ?? 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // CORS
  app.enableCors({
    origin: process.env['CORS_ORIGIN']?.split(',') ?? true,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Identity Service API')
    .setDescription('Vubon.com.bd — Identity, Authentication & User Management APIs')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .addTag('auth', 'Authentication')
    .addTag('users', 'User management')
    .addTag('auth-mfa', 'Multi-factor authentication')
    .addTag('auth-session', 'Sessions')
    .addTag('health', 'Health checks')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  const port = Number(process.env['PORT'] ?? 3001);
  await app.listen(port);

  logger.log(`🚀 Identity Service running on http://localhost:${port}`);
  logger.log(`📚 Swagger docs: http://localhost:${port}/${apiPrefix}/docs`);
}

void bootstrap();
