import { jest } from '@jest/globals';
import { ApproveVendorApprovalHandler } from '../../../../src/module/application/commands/approval/approve-vendor-approval.handler.js';
import { ApproveVendorApprovalCommand } from '../../../../src/module/application/commands/approval/approve-vendor-approval.command.js';
import { RejectVendorApprovalHandler } from '../../../../src/module/application/commands/approval/reject-vendor-approval.handler.js';
import { RejectVendorApprovalCommand } from '../../../../src/module/application/commands/approval/reject-vendor-approval.command.js';
import { ResubmitApprovalHandler } from '../../../../src/module/application/commands/approval/resubmit-approval.handler.js';
import { ResubmitApprovalCommand } from '../../../../src/module/application/commands/approval/resubmit-approval.command.js';
import type { IVendorApprovalService } from '../../../../src/module/application/services/interfaces/vendor-approval.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeServiceMock(): jest.Mocked<IVendorApprovalService> {
  return {
    approve: jest.fn().mockResolvedValue({ id: UUID } as never),
    reject: jest.fn().mockResolvedValue({ id: UUID } as never),
    requestInfo: jest.fn(),
    resubmit: jest.fn().mockResolvedValue({ id: UUID } as never),
    fileAppeal: jest.fn(),
    getByVendorId: jest.fn(),
  } as unknown as jest.Mocked<IVendorApprovalService>;
}

describe('Approval command handlers', () => {
  let service: jest.Mocked<IVendorApprovalService>;

  beforeEach(() => {
    service = makeServiceMock();
  });

  it('ApproveVendorApprovalHandler delegates', async () => {
    const handler = new ApproveVendorApprovalHandler(service);
    await handler.execute(new ApproveVendorApprovalCommand({ vendorId: UUID } as never, UUID));
    expect(service.approve).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('RejectVendorApprovalHandler delegates', async () => {
    const handler = new RejectVendorApprovalHandler(service);
    await handler.execute(new RejectVendorApprovalCommand({ vendorId: UUID } as never, UUID));
    expect(service.reject).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('ResubmitApprovalHandler delegates', async () => {
    const handler = new ResubmitApprovalHandler(service);
    await handler.execute(new ResubmitApprovalCommand(UUID, UUID));
    expect(service.resubmit).toHaveBeenCalledWith(UUID, UUID);
  });
});
