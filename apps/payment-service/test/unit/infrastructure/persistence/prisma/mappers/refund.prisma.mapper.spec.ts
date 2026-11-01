/**
 * RefundPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { RefundPrismaMapper } from '@infrastructure/mappers/refund.prisma.mapper';
import { makePrismaRefundRow } from '@test-infra/entity-makers';
import { RefundEntity } from '@domain/entities/refund.entity';

describe('RefundPrismaMapper', () => {
  it('maps a requested refund', () => {
    const row = makePrismaRefundRow();
    const entity = RefundPrismaMapper.toDomain(row);
    expect(entity).toBeInstanceOf(RefundEntity);
    expect(entity.status.isRequested()).toBe(true);
    expect(entity.amount.amount).toBe(500);
    expect(entity.amount.currency).toBe('BDT');
    expect(entity.reason.reason).toBe('customer_request');
  });

  it('maps an approved refund with approvedBy', () => {
    const row = makePrismaRefundRow({
      status: 'approved',
      approvedBy: 'admin-1',
    });
    const entity = RefundPrismaMapper.toDomain(row);
    expect(entity.status.isApproved()).toBe(true);
    expect(entity.approvedBy).toBe('admin-1');
  });

  it('maps a completed refund with completedAt', () => {
    const row = makePrismaRefundRow({
      status: 'completed',
      completedAt: new Date('2025-01-15T10:00:00.000Z'),
      approvedBy: 'admin-1',
    });
    const entity = RefundPrismaMapper.toDomain(row);
    expect(entity.isCompleted()).toBe(true);
    expect(entity.completedAt).toBe('2025-01-15T10:00:00.000Z');
  });

  it('maps failure reason', () => {
    const row = makePrismaRefundRow({
      status: 'failed',
      failureReason: 'gateway_error',
    });
    const entity = RefundPrismaMapper.toDomain(row);
    expect(entity.failureReason).toBe('gateway_error');
  });

  it('round-trips via toPersistence', () => {
    const row = makePrismaRefundRow();
    const entity = RefundPrismaMapper.toDomain(row);
    const data = RefundPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe(row.id);
    expect(data['paymentId']).toBe(row.paymentId);
    expect(data['amount']).toBe(500);
    expect(data['status']).toBe('requested');
  });
});
