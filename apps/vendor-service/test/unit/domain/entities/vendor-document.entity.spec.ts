/**
 * VendorDocumentEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorDocumentEntity } from '../../../../src/module/domain/entities/vendor-document.entity.js';
import { DocumentTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../src/module/domain/value-objects/primitives/document-status.vo.js';
import { DocumentUrlVO } from '../../../../src/module/domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const VERIFIER = '33333333-3333-4333-8333-333333333333';
const NOW = '2025-01-01T00:00:00.000Z';
const FUTURE = '2030-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

function makeDocument(overrides: {
  type?: string;
  fileName?: string;
  expiresAt?: string;
} = {}) {
  return VendorDocumentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: VENDOR,
      type: DocumentTypeVO.create(overrides.type ?? 'identity_proof'),
      fileUrl: DocumentUrlVO.create('https://cdn.example.com/doc.pdf'),
      fileName: overrides.fileName ?? 'doc.pdf',
      mimeType: DocumentMimeTypeVO.create('application/pdf'),
      fileSize: DocumentFileSizeVO.create(1024),
      expiresAt: overrides.expiresAt,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { deletedAt, ...propsOverrides } = overrides as {
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorDocumentEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      type: DocumentTypeVO.create('identity_proof'),
      status: DocumentStatusVO.pending(),
      fileUrl: DocumentUrlVO.create('https://cdn.example.com/doc.pdf'),
      fileName: 'doc.pdf',
      mimeType: DocumentMimeTypeVO.create('application/pdf'),
      fileSize: DocumentFileSizeVO.create(1024),
      ...propsOverrides,
    } as never,
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorDocumentEntity — creation', () => {
  it('creates pending document', () => {
    const d = makeDocument();
    expect(d.vendorId).toBe(VENDOR);
    expect(d.status.isPending()).toBe(true);
    expect(d.fileName).toBe('doc.pdf');
  });

  it('creates business_license with expiresAt', () => {
    const d = makeDocument({ type: 'business_license', expiresAt: FUTURE });
    expect(d.type.requiresExpiry()).toBe(true);
    expect(d.expiresAt).toBe(FUTURE);
  });
});

describe('VendorDocumentEntity — invariants', () => {
  it('rejects empty fileName', () => {
    expect(() => reconstitute({ fileName: '' })).toThrow();
    expect(() => reconstitute({ fileName: '   ' })).toThrow();
  });

  it('rejects fileName > 255 chars', () => {
    expect(() => reconstitute({ fileName: 'x'.repeat(256) })).toThrow();
  });

  it('rejects types requiring expiry without expiresAt', () => {
    expect(() =>
      reconstitute({
        type: DocumentTypeVO.create('business_license'),
        expiresAt: undefined,
      }),
    ).toThrow();
  });
});

describe('VendorDocumentEntity — getters', () => {
  it('returns scalar getters', () => {
    const d = makeDocument();
    expect(d.vendorId).toBe(VENDOR);
    expect(d.type.value).toBe('identity_proof');
    expect(d.status.isPending()).toBe(true);
    expect(d.fileUrl.value).toBe('https://cdn.example.com/doc.pdf');
    expect(d.fileName).toBe('doc.pdf');
    expect(d.mimeType.isPdf()).toBe(true);
    expect(d.fileSize.bytes).toBe(1024);
  });
});

describe('VendorDocumentEntity — expiry', () => {
  it('isExpired false when no expiresAt', () => {
    expect(makeDocument().isExpired()).toBe(false);
  });

  it('isExpired false when future', () => {
    const d = reconstitute({ expiresAt: FUTURE });
    expect(d.isExpired(new Date(NOW))).toBe(false);
  });

  it('isExpired true when past', () => {
    const d = reconstitute({ expiresAt: PAST });
    expect(d.isExpired(new Date(NOW))).toBe(true);
  });

  it('isExpiringSoon false when no expiresAt', () => {
    expect(makeDocument().isExpiringSoon(30)).toBe(false);
  });

  it('isExpiringSoon true when within threshold', () => {
    const soonDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
    const d = reconstitute({ expiresAt: soonDate });
    expect(d.isExpiringSoon(30)).toBe(true);
  });

  it('isExpiringSoon false when far away', () => {
    const d = reconstitute({ expiresAt: FUTURE });
    expect(d.isExpiringSoon(30)).toBe(false);
  });

  it('isExpiringSoon false when already expired', () => {
    const d = reconstitute({ expiresAt: PAST });
    expect(d.isExpiringSoon(30, new Date(NOW))).toBe(false);
  });

  it('isValid true for verified + not expired', () => {
    const d = reconstitute({
      status: DocumentStatusVO.verified(),
      expiresAt: FUTURE,
    });
    expect(d.isValid()).toBe(true);
  });

  it('isValid false when expired', () => {
    const d = reconstitute({
      status: DocumentStatusVO.verified(),
      expiresAt: PAST,
    });
    expect(d.isValid(new Date(NOW))).toBe(false);
  });
});

describe('VendorDocumentEntity — verify', () => {
  it('verifies pending document', () => {
    const d = makeDocument();
    d.verify(VERIFIER, NOW);
    expect(d.status.isVerified()).toBe(true);
    expect(d.verifiedAt).toBe(NOW);
    expect(d.verifiedBy).toBe(VERIFIER);
  });

  it('verifies resubmitted document', () => {
    const d = reconstitute({ status: DocumentStatusVO.resubmitted() });
    d.verify(VERIFIER, NOW);
    expect(d.status.isVerified()).toBe(true);
  });

  it('throws when already verified', () => {
    const d = reconstitute({ status: DocumentStatusVO.verified() });
    expect(() => d.verify(VERIFIER, NOW)).toThrow();
  });

  it('throws when expired', () => {
    const d = reconstitute({
      status: DocumentStatusVO.pending(),
      expiresAt: PAST,
    });
    expect(() => d.verify(VERIFIER, NOW)).toThrow();
  });
});

describe('VendorDocumentEntity — reject', () => {
  it('rejects pending document', () => {
    const d = makeDocument();
    d.reject('File is blurry', NOW);
    expect(d.status.isRejected()).toBe(true);
    expect(d.rejectionReason).toBe('File is blurry');
  });

  it('rejects resubmitted document', () => {
    const d = reconstitute({ status: DocumentStatusVO.resubmitted() });
    d.reject('Still blurry', NOW);
    expect(d.status.isRejected()).toBe(true);
  });

  it('throws on invalid status', () => {
    const d = reconstitute({ status: DocumentStatusVO.verified() });
    expect(() => d.reject('reason', NOW)).toThrow();
  });

  it('throws on empty reason', () => {
    const d = makeDocument();
    expect(() => d.reject('', NOW)).toThrow();
  });

  it('throws on reason > 500 chars', () => {
    const d = makeDocument();
    expect(() => d.reject('x'.repeat(501), NOW)).toThrow();
  });
});

describe('VendorDocumentEntity — resubmit', () => {
  it('resubmits rejected document', () => {
    const d = reconstitute({ status: DocumentStatusVO.rejected() });
    d.resubmit(DocumentUrlVO.create('https://cdn.example.com/new.pdf'), NOW);
    expect(d.status.isResubmitted()).toBe(true);
    expect(d.fileUrl.value).toBe('https://cdn.example.com/new.pdf');
  });

  it('throws when status is not rejected', () => {
    const d = makeDocument();
    expect(() =>
      d.resubmit(DocumentUrlVO.create('https://cdn.example.com/new.pdf'), NOW),
    ).toThrow();
  });

  it('throws when fileUrl is not VO', () => {
    const d = reconstitute({ status: DocumentStatusVO.rejected() });
    expect(() => d.resubmit('not-vo' as never, NOW)).toThrow();
  });
});

describe('VendorDocumentEntity — markExpired', () => {
  it('marks verified document as expired', () => {
    const d = reconstitute({ status: DocumentStatusVO.verified() });
    d.markExpired(NOW);
    expect(d.status.isExpired()).toBe(true);
  });

  it('no-op when not verified (idempotent early return)', () => {
    const d = makeDocument();
    d.markExpired(NOW);
    expect(d.status.isPending()).toBe(true);
  });
});

describe('VendorDocumentEntity — reconstitute coverage', () => {
  it('reconstitute with deletedAt', () => {
    const d = reconstitute({ deletedAt: NOW });
    expect(d.deletedAt).toBe(NOW);
  });
});
