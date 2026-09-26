import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Global validation pipe (validates via class-validator or Zod in DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Vubon Analytics Service')
    .setDescription('Analytics API — events, metrics, KPIs, dashboards, reports, cohorts, funnels')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const port = Number(process.env.PORT ?? 3004);
  await app.listen(port);

  logger.log(`📊 Analytics Service running on http://localhost:${port}/api/v1`);
  logger.log(`📚 Swagger docs: http://localhost:${port}/api/v1/docs`);
}

void bootstrap();
