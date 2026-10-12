import { VendorDocumentPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-document.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const FUTURE = new Date('2027-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): never {
  return {
    id: UUID,
    vendorId: UUID,
    type: 'business_license',
    status: 'pending',
    fileUrl: 'https://cdn.example.com/doc.pdf',
    fileName: 'doc.pdf',
    mimeType: 'application/pdf',
    fileSize: 1024,
    documentNumber: 'BL-2024-001',
    issuedAt: NOW,
    expiresAt: FUTURE,
    verifiedAt: null,
    verifiedBy: null,
    rejectionReason: null,
    notes: null,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  } as never;
}

describe('VendorDocumentPrismaMapper', () => {
  describe('toDomain()', () => {
    it('maps all fields', () => {
      const e = VendorDocumentPrismaMapper.toDomain(makeRow());
      expect(e.id).toBe(UUID);
      expect(e.vendorId).toBe(UUID);
      expect(e.type.value).toBe('business_license');
      expect(e.status.value).toBe('pending');
      expect(e.fileName).toBe('doc.pdf');
      expect(e.mimeType.value).toBe('application/pdf');
      expect(e.fileSize.bytes).toBe(1024);
    });

    it('maps dates to ISO strings', () => {
      const e = VendorDocumentPrismaMapper.toDomain(makeRow());
      expect(e.issuedAt).toBe(NOW.toISOString());
      expect(e.expiresAt).toBe(FUTURE.toISOString());
    });

    it('maps document number', () => {
      const e = VendorDocumentPrismaMapper.toDomain(makeRow());
      expect(e.documentNumber).toBe('BL-2024-001');
    });

    it('handles nulls with non-expiry type', () => {
      const e = VendorDocumentPrismaMapper.toDomain(
        makeRow({
          type: 'identity_proof',
          documentNumber: null,
          issuedAt: null,
          expiresAt: null,
        }),
      );
      expect(e.documentNumber).toBeUndefined();
      expect(e.issuedAt).toBeUndefined();
      expect(e.expiresAt).toBeUndefined();
    });
  });

  describe('toPersistence()', () => {
    it('returns object with expected keys', () => {
      const domain = VendorDocumentPrismaMapper.toDomain(makeRow());
      const persisted = VendorDocumentPrismaMapper.toPersistence(domain);
      expect(persisted.id).toBe(UUID);
      expect(persisted.vendorId).toBe(UUID);
      expect(persisted.type).toBe('business_license');
      expect(persisted.fileUrl).toBe('https://cdn.example.com/doc.pdf');
    });

    it('roundtrips through toDomain/toPersistence', () => {
      const domain = VendorDocumentPrismaMapper.toDomain(makeRow());
      const persisted = VendorDocumentPrismaMapper.toPersistence(domain);
      const back = VendorDocumentPrismaMapper.toDomain(persisted as never);
      expect(back.id).toBe(domain.id);
    });
  });
});
