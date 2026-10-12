/**
 * analytics-service Bootstrap (ESM-compatible)
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

const SERVICE_NAME = 'analytics-service';
const SERVICE_VERSION = '1.0.0';
const DEFAULT_PORT = 4008;
const API_PREFIX = 'api/v1';

async function bootstrap(): Promise<void> {
  const logger = new Logger(SERVICE_NAME);

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vubon Analytics Service')
    .setDescription(
      'Real-time event tracking, metrics, dashboards, reports, and analytics APIs'
    )
    .setVersion(SERVICE_VERSION)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', in: 'header' },
      'bearer'
    )
    .addTag('events')
    .addTag('metrics')
    .addTag('dashboards')
    .addTag('reports')
    .addTag('real-time-analytics')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // Kafka — OPTIONAL (only if env var says enabled)
  const kafkaEnabled = process.env['KAFKA_ENABLED'] === 'true';
  if (kafkaEnabled) {
    try {
      const { Transport } = await import('@nestjs/microservices');
      const kafkaBrokers = (process.env['KAFKA_BROKERS'] ?? 'localhost:9092').split(',');
      app.connectMicroservice({
        transport: Transport.KAFKA,
        options: {
          client: { brokers: kafkaBrokers, clientId: 'analytics-service' },
          consumer: { groupId: 'analytics-service-group' },
        },
      });
      await app.startAllMicroservices();
      logger.log(`📨 Kafka consumer connected: ${kafkaBrokers.join(', ')}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn(`⚠️ Kafka disabled (${msg.slice(0, 120)})`);
    }
  } else {
    logger.log('ℹ️ Kafka disabled (set KAFKA_ENABLED=true to enable)');
  }

  app.enableShutdownHooks();

  const port = Number(process.env['PORT']) || DEFAULT_PORT;
  await app.listen(port);

  logger.log(`🚀 ${SERVICE_NAME} listening on http://localhost:${port}/${API_PREFIX}`);
  logger.log(`📚 Swagger docs at http://localhost:${port}/${API_PREFIX}/docs`);
}

bootstrap().catch((err) => {
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});
