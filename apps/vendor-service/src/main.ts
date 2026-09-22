import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const port = Number(process.env.PORT ?? 3002);
  await app.listen(port);

  logger.log(`🚀 Vendor Service running on http://localhost:${port}/api/v1`);
}

void bootstrap();
