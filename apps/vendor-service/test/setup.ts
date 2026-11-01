/**
 * Test Setup — Global test configuration
 * @module vendor-service/test
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/module/modules/app.module.js';

let app: INestApplication | undefined;

/**
 * Get or create the shared test app instance.
 */
export async function getTestApp(): Promise<INestApplication> {
  if (app) return app;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.init();
  return app;
}

export async function closeTestApp(): Promise<void> {
  if (app) {
    await app.close();
    app = undefined;
  }
}

export function resetAllMocks(): void {
  // Placeholder
}
