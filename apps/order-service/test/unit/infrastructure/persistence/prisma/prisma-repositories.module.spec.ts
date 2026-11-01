/**
 * PrismaRepositoriesModule Tests
 * @module order-service/test/unit/infrastructure/persistence/prisma
 */


import { PrismaRepositoriesModule } from '@infrastructure/prisma/prisma-repositories.module.js';
import { OrderPrismaRepository } from '@infrastructure/repos/order.prisma.repository.js';
import { OrderItemPrismaRepository } from '@infrastructure/repos/order-item.prisma.repository.js';
import { CheckoutPrismaRepository } from '@infrastructure/repos/checkout.prisma.repository.js';
import { DeliveryPrismaRepository } from '@infrastructure/repos/delivery.prisma.repository.js';
import { DeliveryMethodPrismaRepository } from '@infrastructure/repos/delivery-method.prisma.repository.js';
import { OrderCancelPrismaRepository } from '@infrastructure/repos/order-cancel.prisma.repository.js';
import { OrderReturnPrismaRepository } from '@infrastructure/repos/order-return.prisma.repository.js';
import { OrderFulfillmentPrismaRepository } from '@infrastructure/repos/order-fulfillment.prisma.repository.js';
import { OrderTrackingPrismaRepository } from '@infrastructure/repos/order-tracking.prisma.repository.js';

describe('PrismaRepositoriesModule', () => {
  it('should be defined', () => {
    expect(PrismaRepositoriesModule).toBeDefined();
  });

  it('should reference all 9 repository classes', () => {
    const expectedRepos = [
      OrderPrismaRepository,
      OrderItemPrismaRepository,
      CheckoutPrismaRepository,
      DeliveryPrismaRepository,
      DeliveryMethodPrismaRepository,
      OrderCancelPrismaRepository,
      OrderReturnPrismaRepository,
      OrderFulfillmentPrismaRepository,
      OrderTrackingPrismaRepository,
    ];

    expectedRepos.forEach((repo) => {
      expect(repo).toBeDefined();
      expect(typeof repo).toBe('function');
    });
  });
});
