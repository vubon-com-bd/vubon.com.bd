import { VendorApprovalPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-approval.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const FUTURE = new Date('2026-02-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): never {
  return {
    id: UUID,
    vendorId: UUID,
    status: 'pending',
    reason: null,
    reviewerNote: null,
    submittedAt: NOW,
    reviewedAt: null,
    reviewedBy: null,
    resubmissionCount: 0,
    appealDeadline: null,
    appealSubmittedAt: null,
    slaDeadline: FUTURE,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  } as never;
}

describe('VendorApprovalPrismaMapper', () => {
  it('maps all fields', () => {
    const e = VendorApprovalPrismaMapper.toDomain(makeRow());
    expect(e.id).toBe(UUID);
    expect(e.vendorId).toBe(UUID);
    expect(e.status.value).toBe('pending');
    expect(e.resubmissionCount).toBe(0);
  });

  it('maps reason when present', () => {
    const e = VendorApprovalPrismaMapper.toDomain(
      makeRow({ status: 'rejected', reason: 'invalid_documents', reviewedAt: NOW }),
    );
    expect(e.reason?.value).toBe('invalid_documents');
  });

  it('maps slaDeadline', () => {
    const e = VendorApprovalPrismaMapper.toDomain(makeRow());
    expect(e.slaDeadline).toBe(FUTURE.toISOString());
  });

  it('toPersistence roundtrip', () => {
    const domain = VendorApprovalPrismaMapper.toDomain(makeRow());
    const persisted = VendorApprovalPrismaMapper.toPersistence(domain);
    expect(persisted.id).toBe(UUID);
    expect(persisted.status).toBe('pending');
  });
});
