/**
 * Mock PrismaService with all delegates used by order-service repos
 */
import { jest } from '@jest/globals';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export function mockDelegate() {
  return {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  };
}

export function mockPrisma(): Record<string, ReturnType<typeof mockDelegate>> & { $queryRaw: jest.Mock; $connect: jest.Mock; $disconnect: jest.Mock } {
  return {
    order: mockDelegate(),
    orderItem: mockDelegate(),
    checkout: mockDelegate(),
    checkoutSession: mockDelegate(),
    delivery: mockDelegate(),
    deliveryMethod: mockDelegate(),
    shippingAddress: mockDelegate(),
    billingAddress: mockDelegate(),
    orderCancel: mockDelegate(),
    orderReturn: mockDelegate(),
    orderFulfillment: mockDelegate(),
    orderHistory: mockDelegate(),
    orderTracking: mockDelegate(),
    $queryRaw: jest.fn(),
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };
}

export type MockPrisma = ReturnType<typeof mockPrisma>;

export const NOW_DATE = new Date('2026-01-01T10:00:00Z');
export const NOW_ISO = NOW_DATE.toISOString();
export const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
export const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
export const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';
export const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
export const UUID_VENDOR = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

export function orderRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_ORDER,
    orderNumber: 'ORD-2026-000001',
    customerId: UUID_CUSTOMER,
    vendorIds: [],
    type: 'regular',
    status: 'pending',
    priority: 'normal',
    subtotal: 100,
    discountAmount: 0,
    taxAmount: 0,
    shippingAmount: 0,
    total: 100,
    currency: 'BDT',
    paymentId: null,
    paymentStatus: null,
    paymentMethod: null,
    shippingMethod: null,
    trackingNumber: null,
    notes: null,
    customerNotes: null,
    confirmedAt: null,
    shippedAt: null,
    deliveredAt: null,
    cancelledAt: null,
    completedAt: null,
    version: 1,
    createdAt: NOW_DATE,
    updatedAt: NOW_DATE,
    deletedAt: null,
    items: [],
    ...overrides,
  };
}
