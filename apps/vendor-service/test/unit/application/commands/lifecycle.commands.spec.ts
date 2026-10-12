import { jest } from '@jest/globals';
import { ActivateVendorHandler } from '../../../../src/module/application/commands/lifecycle/activate-vendor.handler.js';
import { ActivateVendorCommand } from '../../../../src/module/application/commands/lifecycle/activate-vendor.command.js';
import { DeactivateVendorHandler } from '../../../../src/module/application/commands/lifecycle/deactivate-vendor.handler.js';
import { DeactivateVendorCommand } from '../../../../src/module/application/commands/lifecycle/deactivate-vendor.command.js';
import { SuspendVendorHandler } from '../../../../src/module/application/commands/lifecycle/suspend-vendor.handler.js';
import { SuspendVendorCommand } from '../../../../src/module/application/commands/lifecycle/suspend-vendor.command.js';
import { ReinstateVendorHandler } from '../../../../src/module/application/commands/lifecycle/reinstate-vendor.handler.js';
import { ReinstateVendorCommand } from '../../../../src/module/application/commands/lifecycle/reinstate-vendor.command.js';
import type { IVendorService } from '../../../../src/module/application/services/interfaces/vendor.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeServiceMock(): jest.Mocked<IVendorService> {
  return {
    activate: jest.fn().mockResolvedValue({ id: UUID } as never),
    deactivate: jest.fn().mockResolvedValue({ id: UUID } as never),
    suspend: jest.fn().mockResolvedValue({ id: UUID } as never),
    reinstate: jest.fn().mockResolvedValue({ id: UUID } as never),
  } as unknown as jest.Mocked<IVendorService>;
}

describe('Lifecycle command handlers', () => {
  let service: jest.Mocked<IVendorService>;

  beforeEach(() => {
    service = makeServiceMock();
  });

  it('ActivateVendorHandler delegates to activate', async () => {
    const handler = new ActivateVendorHandler(service);
    await handler.execute(new ActivateVendorCommand({ vendorId: UUID } as never, UUID));
    expect(service.activate).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('DeactivateVendorHandler delegates to deactivate', async () => {
    const handler = new DeactivateVendorHandler(service);
    await handler.execute(new DeactivateVendorCommand({ vendorId: UUID } as never, UUID));
    expect(service.deactivate).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('SuspendVendorHandler delegates to suspend', async () => {
    const handler = new SuspendVendorHandler(service);
    await handler.execute(new SuspendVendorCommand({ vendorId: UUID } as never, UUID));
    expect(service.suspend).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('ReinstateVendorHandler delegates to reinstate', async () => {
    const handler = new ReinstateVendorHandler(service);
    await handler.execute(new ReinstateVendorCommand({ vendorId: UUID } as never, UUID));
    expect(service.reinstate).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });
});
