import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp, orderRow, AUTH,
  UUID_ORDER, UUID_CANCEL, UUID_RETURN, UUID_CUSTOMER, UUID_ITEM, NOW,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

function cancelRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_CANCEL, orderId: UUID_ORDER, reason: 'customer_request',
    status: 'requested', requestedBy: UUID_CUSTOMER, approvedBy: null,
    notes: null, refundAmount: null, currency: 'BDT', restockInventory: true,
    requestedAt: NOW, processedAt: null,
    createdAt: NOW, updatedAt: NOW, ...o,
  };
}
function returnRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_RETURN, orderId: UUID_ORDER, customerId: UUID_CUSTOMER,
    status: 'requested', reason: 'defective',
    itemIds: [UUID_ITEM], images: [], notes: null,
    refundAmount: null, restockFee: null, currency: 'BDT',
    requestedAt: NOW, approvedAt: null, pickedUpAt: null,
    receivedAt: null, refundedAt: null, closedAt: null,
    createdAt: NOW, updatedAt: NOW, ...o,
  };
}

describe('Cancel + Return API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Full order row so OrderEntity.reconstitute works.
    // createdAt must be fresh — cancel window (24h) otherwise expires.
    const freshOrder = orderRow({
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    prisma.order.findUnique.mockResolvedValue(freshOrder);

    prisma.orderCancel.findUnique.mockResolvedValue(cancelRow());
    prisma.orderCancel.findFirst.mockResolvedValue(cancelRow());
    prisma.orderCancel.findMany.mockResolvedValue([cancelRow()]);
    prisma.orderCancel.create.mockResolvedValue(cancelRow());
    prisma.orderCancel.update.mockResolvedValue(cancelRow());

    prisma.orderReturn.findUnique.mockResolvedValue(returnRow());
    prisma.orderReturn.findMany.mockResolvedValue([returnRow()]);
    prisma.orderReturn.create.mockResolvedValue(returnRow());
    prisma.orderReturn.update.mockResolvedValue(returnRow());
  });

  describe('Cancel', () => {
    it('201 request cancel', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/order-cancels/request')
        .set(AUTH.customer)
        .send({ orderId: UUID_ORDER, reason: 'customer_request' })
        .expect(201);
      expect(res.body.id).toBe(UUID_CANCEL);
    });

    it('200 get cancel by id', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/order-cancels/${UUID_CANCEL}`)
        .set(AUTH.customer).expect(200);
    });

    it('200 approve (admin)', async () => {
      prisma.orderCancel.update.mockResolvedValue(cancelRow({ status: 'approved' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/order-cancels/${UUID_CANCEL}/approve`)
        .set(AUTH.admin)
        .send({ orderId: UUID_ORDER, refundAmount: 200 })
        .expect(200);
      expect(res.body.status).toBe('approved');
    });

    it('200 reject (admin)', async () => {
      prisma.orderCancel.update.mockResolvedValue(cancelRow({ status: 'rejected' }));
      await request(app.getHttpServer())
        .post(`/api/v1/order-cancels/${UUID_CANCEL}/reject`)
        .set(AUTH.admin)
        .send({ orderId: UUID_ORDER, reason: 'already shipped' })
        .expect(200);
    });
  });

  describe('Return', () => {
    it('200 get return by id', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/order-returns/${UUID_RETURN}`)
        .set(AUTH.customer).expect(200);
    });

    it('200 list returns by order', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/order-returns/order/${UUID_ORDER}`)
        .set(AUTH.customer).expect(200);
    });
  });
});
