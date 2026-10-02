/**
 * E2E Test Helpers
 *
 * Boots full NestJS app with auth guard stubbed.
 * NOTE: ValidationPipe whitelist is disabled here because HTTP DTOs carry
 * only @ApiProperty (Swagger) metadata, not class-validator decorators.
 * Real validation happens at domain layer (VO.create) → 422.
 */
import { ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { AllExceptionsFilter } from '@vubon/shared-kernel/interfaces/filters';
import { AppModule } from '../../src/module/modules/app.module.js';

export const TEST_USER = {
  userId: '00000000-0000-0000-0000-000000000001',
  role: 'customer',
  roles: ['customer'],
};

export const TEST_ADMIN = {
  userId: '00000000-0000-0000-0000-000000000099',
  role: 'admin',
  roles: ['admin'],
};

export async function createTestApp(
  options: { asAdmin?: boolean } = {},
): Promise<INestApplication> {
  const user = options.asAdmin ? TEST_ADMIN : TEST_USER;

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (ctx: unknown) => {
        const req = (ctx as {
          switchToHttp: () => { getRequest: () => { user?: unknown } };
        })
          .switchToHttp()
          .getRequest();
        req.user = user;
        return true;
      },
    })
    .compile();

  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.init();
  return app;
}
