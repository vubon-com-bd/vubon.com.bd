import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './module/modules/app.module.js';
import { AllExceptionsFilter } from '@vubon/shared-kernel/interfaces/filters';

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
  const app = await NestFactory.create(AppModule, { logger: logLevels });

  app.enableCors();

  // Dev auth bypass
  if (process.env['DISABLE_AUTH'] === 'true') {
    app.use((req: any, _res: any, next: any) => {
      if (!req.user) {
        req.user = {
          userId: 'dev-user-1',
          roles: ['admin', 'super_admin'],
          permissions: ['*'],
        };
      }
      next();
    });
    const logger = new Logger('Bootstrap');
    logger.warn('⚠️  DISABLE_AUTH=true — test user injected on every request');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ─── Global exception filter (unified: handles Http + Domain + Generic) ───
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vubon Order Service API')
    .setDescription('Enterprise Order Microservice API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3005;

  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Order Service running on: http://localhost:${port}`);
  logger.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
  logger.log(`📊 Log level: ${process.env['LOG_LEVEL'] ?? 'info'}`);
  logger.log(`💾 DB mode: ${process.env['DB_MODE'] ?? 'prisma'}`);
}

bootstrap();
