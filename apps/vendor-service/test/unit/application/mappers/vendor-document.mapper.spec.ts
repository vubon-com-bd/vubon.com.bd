import { VendorDocumentMapper } from '../../../../src/module/application/mappers/vendor-document.mapper.js';
import { VendorDocumentEntity } from '../../../../src/module/domain/entities/vendor-document.entity.js';
import { DocumentTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentUrlVO } from '../../../../src/module/domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2027-01-01T00:00:00.000Z';

function makeDoc(): VendorDocumentEntity {
  return VendorDocumentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      type: DocumentTypeVO.create('business_license'),
      fileUrl: DocumentUrlVO.create('https://cdn.example.com/doc.pdf'),
      fileName: 'doc.pdf',
      mimeType: DocumentMimeTypeVO.create('application/pdf'),
      fileSize: DocumentFileSizeVO.create(1024),
      expiresAt: FUTURE,
    },
  });
}

describe('VendorDocumentMapper', () => {
  it('toResponse maps all fields', () => {
    const r = VendorDocumentMapper.toResponse(makeDoc());
    expect(r.id).toBe(UUID);
    expect(r.type).toBe('business_license');
    expect(r.status).toBe('pending');
    expect(r.fileName).toBe('doc.pdf');
    expect(r.mimeType).toBe('application/pdf');
    expect(r.fileSize).toBe(1024);
  });

  it('toPublic maps public fields', () => {
    const r = VendorDocumentMapper.toPublic(makeDoc());
    expect(r.id).toBe(UUID);
    expect(r.type).toBe('business_license');
  });

  it('toResponseList maps multiple', () => {
    expect(VendorDocumentMapper.toResponseList([makeDoc()])).toHaveLength(1);
  });

  it('toPublicList maps multiple', () => {
    expect(VendorDocumentMapper.toPublicList([makeDoc()])).toHaveLength(1);
  });
});
