import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Cart Service API')
    .setDescription('Cart, items, coupons, vouchers, saved items, abandoned carts')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT ?? 3003);
  await app.listen(port);

  logger.log(`🛒 Cart Service running on http://localhost:${port}/api`);
  logger.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}

void bootstrap();
