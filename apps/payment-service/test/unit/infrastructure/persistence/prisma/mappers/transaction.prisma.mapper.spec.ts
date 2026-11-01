/**
 * TransactionPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { TransactionPrismaMapper } from '@infrastructure/mappers/transaction.prisma.mapper';
import { makePrismaTransactionRow } from '@test-infra/entity-makers';
import { TransactionEntity } from '@domain/entities/transaction.entity';

describe('TransactionPrismaMapper', () => {
  it('maps a pending transaction', () => {
    const row = makePrismaTransactionRow();
    const entity = TransactionPrismaMapper.toDomain(row);
    expect(entity).toBeInstanceOf(TransactionEntity);
    expect(entity.paymentId.value).toBe(row.paymentId);
    expect(entity.type.isPayment()).toBe(true);
    expect(entity.status.isPending()).toBe(true);
    expect(entity.amount.amount).toBe(1000);
    expect(entity.amount.currency).toBe('BDT');
  });

  it('maps a settled transaction', () => {
    const row = makePrismaTransactionRow({
      status: 'settled',
      settledAt: new Date('2025-01-15T10:00:00.000Z'),
    });
    const entity = TransactionPrismaMapper.toDomain(row);
    expect(entity.isSettled()).toBe(true);
    expect(entity.settledAt).toBe('2025-01-15T10:00:00.000Z');
  });

  it('maps gatewayReference', () => {
    const row = makePrismaTransactionRow({ gatewayReference: 'txn_ref_123' });
    const entity = TransactionPrismaMapper.toDomain(row);
    expect(entity.gatewayReference?.value).toBe('txn_ref_123');
  });

  it('maps failure reason', () => {
    const row = makePrismaTransactionRow({
      status: 'failed',
      failureReason: 'network_error',
    });
    const entity = TransactionPrismaMapper.toDomain(row);
    expect(entity.failureReason).toBe('network_error');
  });

  it('round-trips via toPersistence', () => {
    const row = makePrismaTransactionRow();
    const entity = TransactionPrismaMapper.toDomain(row);
    const data = TransactionPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe(row.id);
    expect(data['paymentId']).toBe(row.paymentId);
    expect(data['type']).toBe('payment');
    expect(data['status']).toBe('pending');
  });
});
