import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors();
  app.setGlobalPrefix('api/v1/marketing');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Marketing Service API')
    .setDescription('Vubon Marketing Service — campaigns, promotions, loyalty, leads')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/marketing/docs', app, document);

  const port = getOptionalEnvInt('PORT', 3010);
  await app.listen(port);

  logger.log(`🚀 Marketing Service running on http://localhost:${port}/api/v1/marketing`);
  logger.log(`📚 Swagger on http://localhost:${port}/api/v1/marketing/docs`);
}

void bootstrap();
