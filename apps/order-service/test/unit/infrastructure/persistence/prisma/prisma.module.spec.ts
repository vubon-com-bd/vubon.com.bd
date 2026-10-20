/**
 * OrderPrismaModule Tests
 * @module order-service/test/unit/infrastructure/persistence/prisma
 */
import { Test } from '@nestjs/testing';
import { OrderPrismaModule } from '@infrastructure/prisma/prisma.module.js';
import { OrderPrismaService } from '@infrastructure/prisma/prisma.service.js';

// ⚠️ Force degraded mode BEFORE any module compile


describe('OrderPrismaModule', () => {
  it('should be defined', () => {
    expect(OrderPrismaModule).toBeDefined();
  });

  it('should provide OrderPrismaService', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrderPrismaModule],
    }).compile();

    const service = moduleRef.get(OrderPrismaService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(OrderPrismaService);

    await moduleRef.close();
  });

  it('should export OrderPrismaService', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrderPrismaModule],
    }).compile();

    const service = moduleRef.get(OrderPrismaService);
    expect(service).toBeDefined();

    await moduleRef.close();
  });
});
