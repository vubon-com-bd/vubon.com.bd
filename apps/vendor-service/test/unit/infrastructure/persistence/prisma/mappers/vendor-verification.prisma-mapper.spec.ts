import { VendorVerificationPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-verification.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): never {
  return {
    id: UUID,
    vendorId: UUID,
    overallStatus: 'pending',
    checks: [
      { type: 'email', status: 'approved', verifiedAt: NOW.toISOString() },
      { type: 'phone', status: 'pending' },
    ],
    submittedAt: NOW,
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
    expiresAt: null,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  } as never;
}

describe('VendorVerificationPrismaMapper', () => {
  it('maps all fields', () => {
    const e = VendorVerificationPrismaMapper.toDomain(makeRow());
    expect(e.id).toBe(UUID);
    expect(e.vendorId).toBe(UUID);
    expect(e.overallStatus.value).toBe('pending');
    expect(e.checks).toHaveLength(2);
  });

  it('maps checks correctly', () => {
    const e = VendorVerificationPrismaMapper.toDomain(makeRow());
    expect(e.checks[0]?.type.value).toBe('email');
    expect(e.checks[0]?.status.value).toBe('approved');
    expect(e.checks[1]?.type.value).toBe('phone');
  });

  it('handles empty checks', () => {
    const e = VendorVerificationPrismaMapper.toDomain(makeRow({ checks: [] }));
    expect(e.checks).toHaveLength(0);
  });

  it('handles null submittedAt', () => {
    const e = VendorVerificationPrismaMapper.toDomain(makeRow({ submittedAt: null }));
    expect(e.submittedAt).toBeUndefined();
  });

  it('toPersistence roundtrip', () => {
    const domain = VendorVerificationPrismaMapper.toDomain(makeRow());
    const persisted = VendorVerificationPrismaMapper.toPersistence(domain);
    expect(persisted.id).toBe(UUID);
    expect(persisted.overallStatus).toBe('pending');
  });
});
