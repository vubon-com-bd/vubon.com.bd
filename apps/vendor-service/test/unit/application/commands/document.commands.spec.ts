import { jest } from '@jest/globals';
import { UploadVendorDocumentHandler } from '../../../../src/module/application/commands/document/upload-vendor-document.handler.js';
import { UploadVendorDocumentCommand } from '../../../../src/module/application/commands/document/upload-vendor-document.command.js';
import { VerifyVendorDocumentHandler } from '../../../../src/module/application/commands/document/verify-vendor-document.handler.js';
import { VerifyVendorDocumentCommand } from '../../../../src/module/application/commands/document/verify-vendor-document.command.js';
import { RejectVendorDocumentHandler } from '../../../../src/module/application/commands/document/reject-vendor-document.handler.js';
import { RejectVendorDocumentCommand } from '../../../../src/module/application/commands/document/reject-vendor-document.command.js';
import type { IVendorDocumentService } from '../../../../src/module/application/services/interfaces/vendor-document.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeServiceMock(): jest.Mocked<IVendorDocumentService> {
  return {
    upload: jest.fn().mockResolvedValue({ id: UUID } as never),
    verify: jest.fn().mockResolvedValue({ id: UUID } as never),
    reject: jest.fn().mockResolvedValue({ id: UUID } as never),
    resubmit: jest.fn(),
    getById: jest.fn(),
    listByVendor: jest.fn(),
    listPublicByVendor: jest.fn(),
  } as unknown as jest.Mocked<IVendorDocumentService>;
}

describe('Document command handlers', () => {
  let service: jest.Mocked<IVendorDocumentService>;

  beforeEach(() => {
    service = makeServiceMock();
  });

  it('UploadVendorDocumentHandler delegates', async () => {
    const handler = new UploadVendorDocumentHandler(service);
    await handler.execute(new UploadVendorDocumentCommand({ vendorId: UUID } as never, UUID));
    expect(service.upload).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('VerifyVendorDocumentHandler delegates', async () => {
    const handler = new VerifyVendorDocumentHandler(service);
    await handler.execute(new VerifyVendorDocumentCommand(UUID, UUID, UUID));
    expect(service.verify).toHaveBeenCalledWith(UUID, UUID, UUID);
  });

  it('RejectVendorDocumentHandler delegates', async () => {
    const handler = new RejectVendorDocumentHandler(service);
    await handler.execute(new RejectVendorDocumentCommand(UUID, 'bad scan', UUID));
    expect(service.reject).toHaveBeenCalledWith(UUID, 'bad scan', UUID);
  });
});
