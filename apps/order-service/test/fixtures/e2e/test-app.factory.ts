/**
 * E2E Test App Factory
 * @module order-service/test/fixtures/e2e
 *
 * Bootstraps a NestJS test app with mocked dependencies.
 * ⚠️ Replace with real AppModule once infrastructure is ready.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

export interface TestAppContext {
  readonly app: INestApplication;
  readonly close: () => Promise<void>;
}

/**
 * Build a minimal test app with global pipes.
 * Modules/controllers to be provided by each spec.
 */
export async function createTestApp(
  providers: ReadonlyArray<unknown> = [],
  controllers: ReadonlyArray<unknown> = [],
): Promise<TestAppContext> {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: controllers as never[],
    providers: providers as never[],
  }).compile();

  const app = moduleRef.createNestApplication({
    logger: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();

  return {
    app,
    close: async () => {
      await app.close();
    },
  };
}
