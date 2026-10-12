/**
 * Vendor command handlers — bulk unit tests with mocked services
 * @module vendor-service/test/unit/application/commands
 */
import { jest } from '@jest/globals';
import { RegisterVendorHandler } from '../../../../src/module/application/commands/vendor/register-vendor.handler.js';
import { RegisterVendorCommand } from '../../../../src/module/application/commands/vendor/register-vendor.command.js';
import { UpdateVendorHandler } from '../../../../src/module/application/commands/vendor/update-vendor.handler.js';
import { UpdateVendorCommand } from '../../../../src/module/application/commands/vendor/update-vendor.command.js';
import { UpdateVendorProfileHandler } from '../../../../src/module/application/commands/vendor/update-vendor-profile.handler.js';
import { UpdateVendorProfileCommand } from '../../../../src/module/application/commands/vendor/update-vendor-profile.command.js';
import { UpdateVendorBusinessHandler } from '../../../../src/module/application/commands/vendor/update-vendor-business.handler.js';
import { UpdateVendorBusinessCommand } from '../../../../src/module/application/commands/vendor/update-vendor-business.command.js';
import { ApproveVendorHandler } from '../../../../src/module/application/commands/vendor/approve-vendor.handler.js';
import { ApproveVendorCommand } from '../../../../src/module/application/commands/vendor/approve-vendor.command.js';
import { RejectVendorHandler } from '../../../../src/module/application/commands/vendor/reject-vendor.handler.js';
import { RejectVendorCommand } from '../../../../src/module/application/commands/vendor/reject-vendor.command.js';
import { DeleteVendorHandler } from '../../../../src/module/application/commands/vendor/delete-vendor.handler.js';
import { DeleteVendorCommand } from '../../../../src/module/application/commands/vendor/delete-vendor.command.js';
import type { IVendorService } from '../../../../src/module/application/services/interfaces/vendor.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeServiceMock(): jest.Mocked<IVendorService> {
  return {
    register: jest.fn(),
    update: jest.fn(),
    updateProfile: jest.fn(),
    updateBusiness: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    suspend: jest.fn(),
    reinstate: jest.fn(),
    approve: jest.fn(),
    reject: jest.fn(),
    softDelete: jest.fn(),
    getById: jest.fn(),
    getPublic: jest.fn(),
    getBySlug: jest.fn(),
    getSummary: jest.fn(),
    list: jest.fn(),
    getStats: jest.fn(),
  } as unknown as jest.Mocked<IVendorService>;
}

describe('Vendor command handlers', () => {
  let service: jest.Mocked<IVendorService>;

  beforeEach(() => {
    service = makeServiceMock();
    service.register.mockResolvedValue({ id: UUID } as never);
    service.update.mockResolvedValue({ id: UUID } as never);
    service.updateProfile.mockResolvedValue({ id: UUID } as never);
    service.updateBusiness.mockResolvedValue({ id: UUID } as never);
    service.approve.mockResolvedValue({ id: UUID } as never);
    service.reject.mockResolvedValue({ id: UUID } as never);
    service.softDelete.mockResolvedValue(undefined);
  });

  describe('RegisterVendorHandler', () => {
    it('delegates to service.register', async () => {
      const handler = new RegisterVendorHandler(service);
      const result = await handler.execute(
        new RegisterVendorCommand({ ownerId: UUID } as never, UUID),
      );
      expect(service.register).toHaveBeenCalledWith({ ownerId: UUID }, UUID);
      expect(result).toEqual({ id: UUID });
    });

    it('propagates service errors', async () => {
      service.register.mockRejectedValue(new Error('boom'));
      const handler = new RegisterVendorHandler(service);
      await expect(
        handler.execute(new RegisterVendorCommand({ ownerId: UUID } as never, UUID)),
      ).rejects.toThrow('boom');
    });
  });

  describe('UpdateVendorHandler', () => {
    it('delegates to service.update', async () => {
      const handler = new UpdateVendorHandler(service);
      await handler.execute(new UpdateVendorCommand({ vendorId: UUID } as never, UUID));
      expect(service.update).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
    });
  });

  describe('UpdateVendorProfileHandler', () => {
    it('delegates to service.updateProfile', async () => {
      const handler = new UpdateVendorProfileHandler(service);
      await handler.execute(new UpdateVendorProfileCommand({ vendorId: UUID } as never, UUID));
      expect(service.updateProfile).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
    });
  });

  describe('UpdateVendorBusinessHandler', () => {
    it('delegates to service.updateBusiness', async () => {
      const handler = new UpdateVendorBusinessHandler(service);
      await handler.execute(new UpdateVendorBusinessCommand({ vendorId: UUID } as never, UUID));
      expect(service.updateBusiness).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
    });
  });

  describe('ApproveVendorHandler', () => {
    it('delegates to service.approve', async () => {
      const handler = new ApproveVendorHandler(service);
      await handler.execute(new ApproveVendorCommand({ vendorId: UUID } as never, UUID));
      expect(service.approve).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
    });
  });

  describe('RejectVendorHandler', () => {
    it('delegates to service.reject', async () => {
      const handler = new RejectVendorHandler(service);
      await handler.execute(new RejectVendorCommand({ vendorId: UUID } as never, UUID));
      expect(service.reject).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
    });
  });

  describe('DeleteVendorHandler', () => {
    it('delegates to service.softDelete', async () => {
      const handler = new DeleteVendorHandler(service);
      await handler.execute(new DeleteVendorCommand({ vendorId: UUID } as never, UUID));
      expect(service.softDelete).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
    });
  });
});
