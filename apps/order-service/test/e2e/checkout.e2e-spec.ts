import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, UUID_CHECKOUT, UUID_CUSTOMER, NOW } from './_setup.js';
import type { MockPrisma } from './_setup.js';

function checkoutRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_CHECKOUT, customerId: UUID_CUSTOMER, cartId: null,
    status: 'pending', step: 'cart_review', type: 'registered',
    subtotal: 0, discountAmount: 0, taxAmount: 0, shippingAmount: 0,
    total: 0, currency: 'BDT',
    shippingAddressId: null, billingAddressId: null,
    shippingMethodId: null, paymentMethod: null, orderId: null,
    expiresAt: new Date('2027-01-01'),
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('Checkout API (e2e)', () => {
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
    prisma.checkout.findUnique.mockResolvedValue(checkoutRow());
    prisma.checkout.findFirst.mockResolvedValue(checkoutRow());
    prisma.checkout.create.mockResolvedValue(checkoutRow());
    prisma.checkout.update.mockResolvedValue(checkoutRow());
  });

  it('401 without token', async () => {
    await request(app.getHttpServer()).post('/api/v1/checkouts').send({}).expect(401);
  });

  it('201 start checkout', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/checkouts')
      .set(AUTH.customer)
      .send({ email: 'c@example.com', cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
      .expect(201);
    expect(res.body.id).toBe(UUID_CHECKOUT);
  });

  it('200 get checkout by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/checkouts/${UUID_CHECKOUT}`).set(AUTH.customer).expect(200);
    expect(res.body.id).toBe(UUID_CHECKOUT);
  });

  it('404 checkout not found', async () => {
    prisma.checkout.findUnique.mockResolvedValue(null);
    await request(app.getHttpServer())
      .get(`/api/v1/checkouts/${UUID_CHECKOUT}`).set(AUTH.customer).expect(404);
  });

  it('200 select address', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/checkouts/${UUID_CHECKOUT}/address`)
      .set(AUTH.customer)
      .send({
        shippingAddress: {
          fullName: 'John', phone: '01700000000',
          line1: '123 Main', city: 'Dhaka', country: 'BD',
        },
      })
      .expect(200);
    expect(res.body.id).toBe(UUID_CHECKOUT);
  });

  it('200 abandon checkout', async () => {
    await request(app.getHttpServer())
      .post(`/api/v1/checkouts/${UUID_CHECKOUT}/abandon`)
      .set(AUTH.customer).send({ reason: 'changed mind' }).expect(200);
  });
});
