/**
 * OrderPrismaMapper tests
 * @module order-service/test/unit/infrastructure/persistence/prisma/mappers
 */
import { describe, it, expect } from '@jest/globals';
import {
  OrderPrismaMapper,
  toNum,
  toIso,
} from '@infrastructure/mappers/order.prisma.mapper';
import type { PrismaOrderRow } from '@infrastructure/mappers/order.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderRow> = {}): PrismaOrderRow => ({
  id: 'order-1',
  orderNumber: 'ORD-2024-000001',
  customerId: 'cust-1',
  vendorIds: ['vendor-1'],
  type: 'regular',
  status: 'pending',
  priority: 'normal',
  subtotal: 1000,
  discountAmount: 50,
  taxAmount: 150,
  shippingAmount: 100,
  total: 1200,
  currency: 'BDT',
  paymentId: null,
  paymentStatus: null,
  paymentMethod: 'bkash',
  shippingMethod: 'standard',
  trackingNumber: null,
  notes: 'Test note',
  customerNotes: null,
  confirmedAt: null,
  shippedAt: null,
  deliveredAt: null,
  cancelledAt: null,
  completedAt: null,
  version: 1,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('OrderPrismaMapper', () => {
  describe('toDomain', () => {
    it('maps row to OrderEntity', () => {
      const entity = OrderPrismaMapper.toDomain(makeRow());
      expect(entity.id).toBe('order-1');
      expect(entity.orderNumber.value).toBe('ORD-2024-000001');
      expect(entity.customerId.value).toBe('cust-1');
      expect(entity.status.value).toBe('pending');
      expect(entity.total.amount).toBe(1200);
      expect(entity.total.currency).toBe('BDT');
      expect(entity.paymentMethod).toBe('bkash');
    });

    it('handles Decimal as object with toNumber (consistent total)', () => {
      const row = makeRow({
        subtotal: { toNumber: () => 1000 },
        discountAmount: { toNumber: () => 50 },
        taxAmount: { toNumber: () => 150 },
        shippingAmount: { toNumber: () => 100 },
        total: { toNumber: () => 1200 },
      });
      const entity = OrderPrismaMapper.toDomain(row);
      expect(entity.total.amount).toBe(1200);
      expect(entity.subtotal.amount).toBe(1000);
    });

    it('handles Decimal as string (consistent total)', () => {
      // subtotal=1000.5, discount=50, tax=150, shipping=100 → total=1200.5
      const row = makeRow({
        subtotal: '1000.50' as unknown,
        discountAmount: '50.00' as unknown,
        taxAmount: '150.00' as unknown,
        shippingAmount: '100.00' as unknown,
        total: '1200.50' as unknown,
      });
      const entity = OrderPrismaMapper.toDomain(row);
      expect(entity.total.amount).toBe(1200.5);
    });

    it('sets null timestamps properly', () => {
      const entity = OrderPrismaMapper.toDomain(makeRow());
      expect(entity.confirmedAt).toBeUndefined();
      expect(entity.shippedAt).toBeUndefined();
    });

    it('sets confirmedAt when present', () => {
      const confirmedAt = new Date('2024-01-02T10:00:00Z');
      const entity = OrderPrismaMapper.toDomain(makeRow({ confirmedAt }));
      expect(entity.confirmedAt).toBe(confirmedAt.toISOString());
    });
  });

  describe('toPersistence', () => {
    it('maps entity to persistence object', () => {
      const entity = OrderPrismaMapper.toDomain(makeRow());
      const data = OrderPrismaMapper.toPersistence(entity);
      expect(data['id']).toBe('order-1');
      expect(data['orderNumber']).toBe('ORD-2024-000001');
      expect(data['customerId']).toBe('cust-1');
      expect(data['status']).toBe('pending');
      expect(data['total']).toBe(1200);
      expect(data['currency']).toBe('BDT');
      expect(data['paymentMethod']).toBe('bkash');
      expect(data['version']).toBe(1);
    });

    it('converts ISO dates to Date objects', () => {
      const entity = OrderPrismaMapper.toDomain(
        makeRow({ confirmedAt: new Date('2024-01-02T10:00:00Z') }),
      );
      const data = OrderPrismaMapper.toPersistence(entity);
      expect(data['confirmedAt']).toBeInstanceOf(Date);
    });
  });

  describe('helpers', () => {
    it('toNum handles number', () => {
      expect(toNum(42)).toBe(42);
    });
    it('toNum handles string', () => {
      expect(toNum('42.5')).toBe(42.5);
    });
    it('toNum handles Decimal-like object', () => {
      expect(toNum({ toNumber: () => 99.9 })).toBe(99.9);
    });
    it('toIso handles null', () => {
      expect(toIso(null)).toBeUndefined();
    });
    it('toIso handles Date', () => {
      const d = new Date('2024-01-01T00:00:00Z');
      expect(toIso(d)).toBe(d.toISOString());
    });
  });
});
