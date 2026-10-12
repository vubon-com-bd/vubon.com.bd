import { jest } from '@jest/globals';
import { VendorDocumentPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-document.prisma.repository.js';
import {
  createMockPrisma,
  makeDocumentRow,
} from '@helpers/prisma-test-harness';
import { DocumentIdVO } from '../../../../../../src/module/domain/value-objects/primitives/document-id.vo.js';
import { DocumentTypeVO } from '../../../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/document-status.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('VendorDocumentPrismaRepository', () => {
  let repo: VendorDocumentPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorDocumentPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorDocument.findFirst.mockResolvedValue(makeDocumentRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorDocument.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findByVendorIdAndType', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    const r = await repo.findByVendorIdAndType(UUID, DocumentTypeVO.create('business_license'));
    expect(r.length).toBe(1);
  });

  it('findByStatus', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    expect((await repo.findByStatus(DocumentStatusVO.pending())).length).toBe(1);
  });

  it('findLatestForVendorAndType', async () => {
    prisma.mock.vendorDocument.findFirst.mockResolvedValue(makeDocumentRow());
    expect(await repo.findLatestForVendorAndType(UUID, DocumentTypeVO.create('business_license'))).not.toBeNull();
  });

  it('search with filters', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    const r = await repo.search({
      vendorId: UUID,
      type: 'business_license',
      status: 'pending',
      expiringInDays: 30,
    });
    expect(r.length).toBe(1);
  });

  it('search without filters', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([]);
    expect(await repo.search({})).toEqual([]);
  });

  it('findExpiring', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    expect((await repo.findExpiring(30)).length).toBe(1);
  });

  it('findExpired', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    expect((await repo.findExpired()).length).toBe(1);
  });

  it('findPendingReview', async () => {
    prisma.mock.vendorDocument.findMany.mockResolvedValue([makeDocumentRow()]);
    expect((await repo.findPendingReview()).length).toBe(1);
  });

  it('save updates', async () => {
    prisma.mock.vendorDocument.findFirst.mockResolvedValue(makeDocumentRow());
    prisma.mock.vendorDocument.update.mockResolvedValue(makeDocumentRow());
    const { VendorDocumentEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-document.entity.js'
    );
    const { DocumentUrlVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/document-url.vo.js'
    );
    const { DocumentMimeTypeVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js'
    );
    const { DocumentFileSizeVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js'
    );
    const entity = VendorDocumentEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        type: DocumentTypeVO.create('business_license'),
        fileUrl: DocumentUrlVO.create('https://cdn.example.com/doc.pdf'),
        fileName: 'doc.pdf',
        mimeType: DocumentMimeTypeVO.create('application/pdf'),
        fileSize: DocumentFileSizeVO.create(1024),
        expiresAt: '2027-01-01T00:00:00.000Z',
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorDocument.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorDocument.delete.mockResolvedValue(makeDocumentRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorDocument.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorDocument.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('countByVendor', async () => {
    prisma.mock.vendorDocument.count.mockResolvedValue(5);
    expect(await repo.countByVendor(UUID)).toBe(5);
  });

  it('countByStatus', async () => {
    prisma.mock.vendorDocument.count.mockResolvedValue(3);
    expect(await repo.countByStatus(DocumentStatusVO.pending())).toBe(3);
  });

  it('existsByVendorIdAndType', async () => {
    prisma.mock.vendorDocument.count.mockResolvedValue(1);
    expect(await repo.existsByVendorIdAndType(UUID, DocumentTypeVO.create('business_license'))).toBe(true);
  });

  it('deleteByVendorId', async () => {
    prisma.mock.vendorDocument.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorDocument.updateMany).toHaveBeenCalled();
  });

  it('findByIdVO uses id.value', async () => {
    prisma.mock.vendorDocument.findFirst.mockResolvedValue(null);
    await repo.findByIdVO(DocumentIdVO.create(UUID));
    expect(prisma.mock.vendorDocument.findFirst).toHaveBeenCalledWith({
      where: { id: UUID, deletedAt: null },
    });
  });
});
