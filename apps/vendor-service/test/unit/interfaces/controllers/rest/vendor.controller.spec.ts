/**
 * VendorController — unit tests with mocked CQRS buses
 * @module vendor-service/test/unit/interfaces/controllers
 */
import { jest } from '@jest/globals';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { VendorController } from '../../../../../src/module/interfaces/controllers/rest/vendor.controller.js';
import { RegisterVendorCommand } from '../../../../../src/module/application/commands/vendor/register-vendor.command.js';
import { UpdateVendorCommand } from '../../../../../src/module/application/commands/vendor/update-vendor.command.js';
import { ApproveVendorCommand } from '../../../../../src/module/application/commands/vendor/approve-vendor.command.js';
import { RejectVendorCommand } from '../../../../../src/module/application/commands/vendor/reject-vendor.command.js';
import { DeleteVendorCommand } from '../../../../../src/module/application/commands/vendor/delete-vendor.command.js';
import { ActivateVendorCommand } from '../../../../../src/module/application/commands/lifecycle/activate-vendor.command.js';
import { SuspendVendorCommand } from '../../../../../src/module/application/commands/lifecycle/suspend-vendor.command.js';
import { GetVendorQuery } from '../../../../../src/module/application/queries/vendor/get-vendor.query.js';
import { ListVendorsQuery } from '../../../../../src/module/application/queries/vendor/list-vendors.query.js';
import { CheckVendorSlugQuery } from '../../../../../src/module/application/queries/vendor/check-vendor-slug.query.js';
import { SuggestVendorSlugQuery } from '../../../../../src/module/application/queries/vendor/suggest-vendor-slug.query.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = { userId: UUID, sessionId: 'sess-1' };

function makeCommandBus(): jest.Mocked<CommandBus> {
  return { execute: jest.fn().mockResolvedValue({ id: UUID }) } as unknown as jest.Mocked<CommandBus>;
}
function makeQueryBus(): jest.Mocked<QueryBus> {
  return { execute: jest.fn().mockResolvedValue({ id: UUID }) } as unknown as jest.Mocked<QueryBus>;
}

describe('VendorController', () => {
  let controller: VendorController;
  let commandBus: jest.Mocked<CommandBus>;
  let queryBus: jest.Mocked<QueryBus>;

  beforeEach(() => {
    commandBus = makeCommandBus();
    queryBus = makeQueryBus();
    controller = new VendorController(commandBus, queryBus);
  });

  describe('register()', () => {
    it('dispatches RegisterVendorCommand', async () => {
      await controller.register(
        { businessName: 'Acme Store', displayName: 'Acme' } as never,
        USER,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(RegisterVendorCommand));
    });
  });

  describe('list()', () => {
    it('dispatches ListVendorsQuery', async () => {
      await controller.list({ page: 1, limit: 20 });
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListVendorsQuery));
    });
  });

  describe('checkSlug()', () => {
    it('dispatches CheckVendorSlugQuery', async () => {
      await controller.checkSlug('acme');
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(CheckVendorSlugQuery));
    });
  });

  describe('suggestSlug()', () => {
    it('dispatches SuggestVendorSlugQuery', async () => {
      await controller.suggestSlug('Acme');
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(SuggestVendorSlugQuery));
    });
  });

  describe('getById()', () => {
    it('dispatches GetVendorQuery', async () => {
      await controller.getById(UUID);
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetVendorQuery));
    });
  });

  describe('update()', () => {
    it('dispatches UpdateVendorCommand', async () => {
      await controller.update(UUID, { name: 'New Name' }, USER);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateVendorCommand));
    });
  });

  describe('approve()', () => {
    it('dispatches ApproveVendorCommand', async () => {
      await controller.approve(UUID, { note: 'ok' }, USER);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(ApproveVendorCommand));
    });
  });

  describe('reject()', () => {
    it('dispatches RejectVendorCommand', async () => {
      await controller.reject(UUID, { reason: 'invalid_documents' }, USER);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(RejectVendorCommand));
    });
  });

  describe('activate()', () => {
    it('dispatches ActivateVendorCommand', async () => {
      await controller.activate(UUID, {}, USER, undefined);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(ActivateVendorCommand));
    });
  });

  describe('suspend()', () => {
    it('dispatches SuspendVendorCommand', async () => {
      await controller.suspend(UUID, { reason: 'poor_performance', durationDays: 30 }, USER);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(SuspendVendorCommand));
    });
  });

  describe('remove()', () => {
    it('dispatches DeleteVendorCommand', async () => {
      await controller.remove(UUID, 'test', USER);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteVendorCommand));
    });
  });
});
