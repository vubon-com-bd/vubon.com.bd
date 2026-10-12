import { VendorDocumentInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-document-info.vo.js';
import { DocumentIdVO } from '../../../../../src/module/domain/value-objects/primitives/document-id.vo.js';
import { DocumentTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/document-status.vo.js';
import { DocumentUrlVO } from '../../../../../src/module/domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2027-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

function makeInfo(overrides: {
  type?: string;
  status?: string;
  expiresAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
} = {}): VendorDocumentInfoVO {
  return VendorDocumentInfoVO.create({
    id: DocumentIdVO.create(UUID),
    type: DocumentTypeVO.create(overrides.type ?? 'business_license'),
    status: DocumentStatusVO.create(overrides.status ?? 'pending'),
    fileUrl: DocumentUrlVO.create('https://cdn.example.com/doc.pdf'),
    fileName: 'doc.pdf',
    mimeType: DocumentMimeTypeVO.create('application/pdf'),
    fileSize: DocumentFileSizeVO.create(1024 * 500),
    expiresAt: overrides.expiresAt ?? FUTURE,
    verifiedAt: overrides.verifiedAt,
    rejectionReason: overrides.rejectionReason,
  });
}

describe('VendorDocumentInfoVO', () => {
  describe('create()', () => {
    it('creates valid document info', () => {
      const v = makeInfo();
      expect(v.id.value).toBe(UUID);
      expect(v.type.value).toBe('business_license');
    });

    it('throws when type requires expiry but expiresAt missing', () => {
      expect(() =>
        VendorDocumentInfoVO.create({
          id: DocumentIdVO.create(UUID),
          type: DocumentTypeVO.create('business_license'),
          status: DocumentStatusVO.create('pending'),
          fileUrl: DocumentUrlVO.create('https://cdn.example.com/doc.pdf'),
          fileName: 'doc.pdf',
          mimeType: DocumentMimeTypeVO.create('application/pdf'),
          fileSize: DocumentFileSizeVO.create(1024),
        }),
      ).toThrow(ValidationError);
    });

    it('throws when verified status missing verifiedAt', () => {
      expect(() => makeInfo({ status: 'verified', verifiedAt: undefined })).toThrow(
        ValidationError,
      );
    });

    it('throws when rejected status missing reason', () => {
      expect(() => makeInfo({ status: 'rejected', rejectionReason: undefined })).toThrow(
        ValidationError,
      );
    });
  });

  describe('isExpired / isExpiringSoon', () => {
    it('isExpired true for past', () => {
      const v = makeInfo({ expiresAt: PAST });
      expect(v.isExpired()).toBe(true);
    });

    it('isExpired false for future', () => {
      expect(makeInfo().isExpired()).toBe(false);
    });

    it('isExpiringSoon within threshold', () => {
      const soon = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
      expect(makeInfo({ expiresAt: soon }).isExpiringSoon(30)).toBe(true);
    });

    it('isExpiringSoon false beyond threshold', () => {
      const far = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      expect(makeInfo({ expiresAt: far }).isExpiringSoon(30)).toBe(false);
    });
  });

  describe('isValidDocument', () => {
    it('true when verified + not expired', () => {
      const v = makeInfo({
        status: 'verified',
        verifiedAt: NOW,
        expiresAt: FUTURE,
      });
      expect(v.isValidDocument()).toBe(true);
    });

    it('false when expired', () => {
      const v = makeInfo({
        status: 'verified',
        verifiedAt: NOW,
        expiresAt: PAST,
      });
      expect(v.isValidDocument()).toBe(false);
    });

    it('false when not verified', () => {
      expect(makeInfo().isValidDocument()).toBe(false);
    });
  });
});
