/**
 * Test Setup — Global test configuration
 * @module identity-service/test
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

let app: INestApplication | undefined;

/**
 * Get or create the shared test app instance.
 * Reuses existing app for speed across tests.
 */
export async function getTestApp(): Promise<INestApplication> {
  if (app) return app;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  // Apply same global setup as main.ts
  app.setGlobalPrefix(process.env['API_PREFIX'] ?? 'api/v1');
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

/**
 * Close the test app after all tests.
 */
export async function closeTestApp(): Promise<void> {
  if (app) {
    await app.close();
    app = undefined;
  }
}

/**
 * Reset all mocks between tests.
 */
export function resetAllMocks(): void {
  // Placeholder — override in specific tests if needed
}
