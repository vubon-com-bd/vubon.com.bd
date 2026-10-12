import { VendorDocumentEntity } from '../../../../src/module/domain/entities/vendor-document.entity.js';
import { DocumentTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentUrlVO } from '../../../../src/module/domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2027-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';
const URL = 'https://cdn.example.com/doc.pdf';

function makeDoc(expiresAt?: string, type: string = 'business_license'): VendorDocumentEntity {
  return VendorDocumentEntity.create({
    id: UUID, now: NOW,
    props: {
      vendorId: UUID,
      type: DocumentTypeVO.create(type),
      fileUrl: DocumentUrlVO.create(URL),
      fileName: 'doc.pdf',
      mimeType: DocumentMimeTypeVO.create('application/pdf'),
      fileSize: DocumentFileSizeVO.create(1024 * 500),
      expiresAt,
    },
  });
}

describe('VendorDocumentEntity — branches', () => {
  describe('isExpired / isExpiringSoon', () => {
    it('isExpired true past', () => {
      expect(makeDoc(PAST).isExpired()).toBe(true);
    });

    it('isExpired false future', () => {
      expect(makeDoc(FUTURE).isExpired()).toBe(false);
    });

    it('isExpiringSoon true within threshold', () => {
      const soon = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
      expect(makeDoc(soon).isExpiringSoon(30)).toBe(true);
    });

    it('isExpiringSoon false beyond threshold', () => {
      const far = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      expect(makeDoc(far).isExpiringSoon(30)).toBe(false);
    });

    it('isExpired false without expiresAt', () => {
      // Use type that doesn't require expiry
      expect(makeDoc(undefined, 'identity_proof').isExpired()).toBe(false);
    });

    it('isExpiringSoon false without expiresAt', () => {
      expect(makeDoc(undefined, 'identity_proof').isExpiringSoon()).toBe(false);
    });
  });

  describe('verify — all paths', () => {
    it('pending → verified', () => {
      const d = makeDoc(FUTURE);
      d.verify(UUID, NOW);
      expect(d.status.isVerified()).toBe(true);
    });

    it('throws on expired doc', () => {
      const d = makeDoc(PAST);
      expect(() => d.verify(UUID, NOW)).toThrow();
    });

    it('throws from rejected', () => {
      const d = makeDoc(FUTURE);
      d.reject('bad scan', NOW);
      expect(() => d.verify(UUID, NOW)).toThrow();
    });
  });

  describe('reject — all paths', () => {
    it('pending → rejected', () => {
      const d = makeDoc(FUTURE);
      d.reject('Illegible', NOW);
      expect(d.status.isRejected()).toBe(true);
    });

    it('throws on empty reason', () => {
      const d = makeDoc(FUTURE);
      expect(() => d.reject('', NOW)).toThrow();
    });

    it('throws from verified', () => {
      const d = makeDoc(FUTURE);
      d.verify(UUID, NOW);
      expect(() => d.reject('x', NOW)).toThrow();
    });
  });

  describe('resubmit — all paths', () => {
    it('rejected → resubmitted', () => {
      const d = makeDoc(FUTURE);
      d.reject('bad', NOW);
      d.resubmit(DocumentUrlVO.create('https://cdn.example.com/new.pdf'), NOW);
      expect(d.status.isResubmitted()).toBe(true);
    });

    it('throws when not rejected', () => {
      const d = makeDoc(FUTURE);
      expect(() => d.resubmit(DocumentUrlVO.create(URL), NOW)).toThrow();
    });
  });

  describe('markExpired — all paths', () => {
    it('verified → expired', () => {
      const d = makeDoc(FUTURE);
      d.verify(UUID, NOW);
      d.markExpired(NOW);
      expect(d.status.isExpired()).toBe(true);
    });

    it('no-op when not verified', () => {
      const d = makeDoc(FUTURE);
      d.markExpired(NOW);
      expect(d.status.isPending()).toBe(true);
    });
  });

  describe('isValid', () => {
    it('true when verified + future', () => {
      const d = makeDoc(FUTURE);
      d.verify(UUID, NOW);
      expect(d.isValid()).toBe(true);
    });

    it('false when expired', () => {
      expect(makeDoc(PAST).isValid()).toBe(false);
    });

    it('false when not verified', () => {
      expect(makeDoc(FUTURE).isValid()).toBe(false);
    });
  });

  describe('optional getters', () => {
    it('documentNumber undefined', () => {
      expect(makeDoc(undefined, 'identity_proof').documentNumber).toBeUndefined();
    });
    it('issuedAt undefined', () => {
      expect(makeDoc(undefined, 'identity_proof').issuedAt).toBeUndefined();
    });
    it('verifiedAt undefined', () => {
      expect(makeDoc(undefined, 'identity_proof').verifiedAt).toBeUndefined();
    });
    it('verifiedBy undefined', () => {
      expect(makeDoc(undefined, 'identity_proof').verifiedBy).toBeUndefined();
    });
    it('rejectionReason undefined', () => {
      expect(makeDoc(undefined, 'identity_proof').rejectionReason).toBeUndefined();
    });
    it('notes undefined', () => {
      expect(makeDoc(undefined, 'identity_proof').notes).toBeUndefined();
    });
  });

  describe('reconstitute', () => {
    it('restores version', () => {
      const d = VendorDocumentEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW,
        props: {
          vendorId: UUID,
          type: DocumentTypeVO.create('business_license'),
          status: makeDoc(FUTURE).status,
          fileUrl: DocumentUrlVO.create(URL),
          fileName: 'doc.pdf',
          mimeType: DocumentMimeTypeVO.create('application/pdf'),
          fileSize: DocumentFileSizeVO.create(1024),
          expiresAt: FUTURE,
        },
      });
      expect(d.id).toBe(UUID);
    });
  });
});
