import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '@vubon/shared-config';
import { logger } from '@vubon/shared-utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const port = env.server.PORT || 5000;
  await app.listen(port);

  logger.info(`🚀 Server running on http://localhost:${port}`);
  logger.info(`📚 Environment: ${env.server.NODE_ENV}`);
}
bootstrap();
