/**
 * E2E test bootstrap — builds HTTP app with real controllers + mocked buses + permit-all guards.
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { jest } from '@jest/globals';

import { ProductController } from '../../src/module/interfaces/controllers/rest/product.controller.js';
import { PublicProductController } from '../../src/module/interfaces/controllers/rest/public-product.controller.js';
import { ProductInventoryController } from '../../src/module/interfaces/controllers/rest/product-inventory.controller.js';

import { createMockCommandBus, createMockQueryBus } from '../mocks/buses.js';

export interface E2EApp {
  readonly app: INestApplication;
  readonly commandBus: ReturnType<typeof createMockCommandBus>;
  readonly queryBus: ReturnType<typeof createMockQueryBus>;
  close(): Promise<void>;
}

export async function createE2EApp(): Promise<E2EApp> {
  const commandBus = createMockCommandBus();
  const queryBus = createMockQueryBus();

  const moduleRef = await Test.createTestingModule({
    imports: [CqrsModule],
    controllers: [
      ProductController,
      PublicProductController,
      ProductInventoryController,
    ],
  })
    .overrideProvider(CommandBus)
    .useValue(commandBus)
    .overrideProvider(QueryBus)
    .useValue(queryBus)
    .overrideGuard(
      (await import('@vubon/shared-kernel/interfaces/guards')).JwtAuthGuard,
    )
    .useValue({ canActivate: () => true })
    .overrideGuard(
      (await import('@vubon/shared-kernel/interfaces/guards')).RolesGuard,
    )
    .useValue({ canActivate: () => true })
    .compile();

  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api/v1');
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
    commandBus,
    queryBus,
    async close() {
      try {
        await app.close();
      } catch {
        /* ignore */
      }
    },
  };
}

export const jestMock = jest;
