import { jest } from '@jest/globals';
import { VendorDocumentService } from '../../../../src/module/application/services/impl/vendor-document.service.js';
import type { VendorDocumentRepository } from '../../../../src/module/domain/repositories/vendor-document.repository.interface.js';
import { VendorDocumentEntity } from '../../../../src/module/domain/entities/vendor-document.entity.js';
import { DocumentIdVO } from '../../../../src/module/domain/value-objects/primitives/document-id.vo.js';
import { DocumentTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../src/module/domain/value-objects/primitives/document-status.vo.js';
import { DocumentUrlVO } from '../../../../src/module/domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';
import { DocumentNotFoundError } from '../../../../src/module/application/errors/verification.errors.js';

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

function makeRepoMock(): jest.Mocked<VendorDocumentRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByVendorIdAndType: jest.fn(),
    findByStatus: jest.fn(),
    findLatestForVendorAndType: jest.fn(),
    search: jest.fn(),
    findExpiring: jest.fn(),
    findExpired: jest.fn(),
    findPendingReview: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    countByVendor: jest.fn(),
    countByStatus: jest.fn(),
    existsByVendorIdAndType: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorDocumentRepository>;
}

describe('VendorDocumentService', () => {
  let service: VendorDocumentService;
  let repo: jest.Mocked<VendorDocumentRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorDocumentService(repo);
  });

  describe('upload()', () => {
    it('uploads document and saves', async () => {
      const saved = makeDoc();
      repo.save.mockResolvedValue(saved);
      const r = await service.upload({
        vendorId: UUID,
        type: 'business_license',
        fileUrl: 'https://cdn.example.com/doc.pdf',
        fileName: 'doc.pdf',
        mimeType: 'application/pdf',
        fileSize: 1024,
        expiresAt: FUTURE,
      });
      expect(r.id).toBe(UUID);
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('verify()', () => {
    it('verifies pending document', async () => {
      const d = makeDoc();
      repo.findByIdVO.mockResolvedValue(d);
      repo.save.mockResolvedValue(d);
      const r = await service.verify(UUID, UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.verify(UUID, UUID)).rejects.toThrow(DocumentNotFoundError);
    });
  });

  describe('reject()', () => {
    it('rejects pending document', async () => {
      const d = makeDoc();
      repo.findByIdVO.mockResolvedValue(d);
      repo.save.mockResolvedValue(d);
      const r = await service.reject(UUID, 'illegible');
      expect(r.id).toBe(UUID);
    });
  });

  describe('resubmit()', () => {
    it('resubmits rejected document', async () => {
      const d = makeDoc();
      d.reject('bad', NOW);
      repo.findByIdVO.mockResolvedValue(d);
      repo.save.mockResolvedValue(d);
      const r = await service.resubmit(UUID, 'https://cdn.example.com/new.pdf');
      expect(r.id).toBe(UUID);
    });
  });

  describe('getById()', () => {
    it('returns document', async () => {
      repo.findByIdVO.mockResolvedValue(makeDoc());
      const r = await service.getById(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow(DocumentNotFoundError);
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makeDoc()]);
      const r = await service.listByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });

  describe('listPublicByVendor()', () => {
    it('returns public list', async () => {
      repo.findByVendorId.mockResolvedValue([makeDoc()]);
      const r = await service.listPublicByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });
});
