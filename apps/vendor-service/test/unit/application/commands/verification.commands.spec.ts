import { jest } from '@jest/globals';
import { SubmitVerificationHandler } from '../../../../src/module/application/commands/verification/submit-verification.handler.js';
import { SubmitVerificationCommand } from '../../../../src/module/application/commands/verification/submit-verification.command.js';
import { ApproveVerificationHandler } from '../../../../src/module/application/commands/verification/approve-verification.handler.js';
import { ApproveVerificationCommand } from '../../../../src/module/application/commands/verification/approve-verification.command.js';
import type { IVendorVerificationService } from '../../../../src/module/application/services/interfaces/vendor-verification.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeServiceMock(): jest.Mocked<IVendorVerificationService> {
  return {
    submit: jest.fn().mockResolvedValue({ id: UUID } as never),
    approve: jest.fn().mockResolvedValue({ id: UUID } as never),
    startReview: jest.fn(),
    reject: jest.fn(),
    getByVendorId: jest.fn(),
  } as unknown as jest.Mocked<IVendorVerificationService>;
}

describe('Verification command handlers', () => {
  let service: jest.Mocked<IVendorVerificationService>;

  beforeEach(() => {
    service = makeServiceMock();
  });

  it('SubmitVerificationHandler delegates', async () => {
    const handler = new SubmitVerificationHandler(service);
    await handler.execute(new SubmitVerificationCommand({ vendorId: UUID, documents: [] }, UUID));
    expect(service.submit).toHaveBeenCalledWith({ vendorId: UUID, documents: [] }, UUID);
  });

  it('ApproveVerificationHandler delegates', async () => {
    const handler = new ApproveVerificationHandler(service);
    await handler.execute(new ApproveVerificationCommand(UUID, UUID, UUID));
    expect(service.approve).toHaveBeenCalledWith(UUID, UUID, UUID);
  });
});
