/**
 * Inventory Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { UpdateInventoryHandler } from '../../../../src/module/application/commands/inventory/update-inventory.handler.js';
import { UpdateInventoryCommand } from '../../../../src/module/application/commands/inventory/update-inventory.command.js';
import { AdjustInventoryHandler } from '../../../../src/module/application/commands/inventory/adjust-inventory.handler.js';
import { AdjustInventoryCommand } from '../../../../src/module/application/commands/inventory/adjust-inventory.command.js';
import { ReserveInventoryHandler } from '../../../../src/module/application/commands/inventory/reserve-inventory.handler.js';
import { ReserveInventoryCommand } from '../../../../src/module/application/commands/inventory/reserve-inventory.command.js';
import { ReleaseInventoryHandler } from '../../../../src/module/application/commands/inventory/release-inventory.handler.js';
import { ReleaseInventoryCommand } from '../../../../src/module/application/commands/inventory/release-inventory.command.js';
import { createMockInventoryService, type MockedInventoryService } from '../../../mocks/services.js';
import { mockInventoryResponse } from '../../../mocks/responses.js';
import { INVENTORY_ID, USER_ID } from '../../../helpers.js';

describe('Inventory Command Handlers', () => {
  let service: MockedInventoryService;

  beforeEach(() => {
    service = createMockInventoryService();
    service.update.mockResolvedValue(mockInventoryResponse());
    service.adjust.mockResolvedValue(mockInventoryResponse());
    service.reserve.mockResolvedValue(mockInventoryResponse());
    service.release.mockResolvedValue(mockInventoryResponse());
  });

  describe('UpdateInventoryHandler', () => {
    it('should call service.update with dto, actorId', async () => {
      const handler = new UpdateInventoryHandler(service);
      const dto = { inventoryId: INVENTORY_ID, delta: 10, reason: 'restock', adjustedBy: USER_ID };
      await handler.execute(new UpdateInventoryCommand(dto as never, USER_ID));
      expect(service.update).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('AdjustInventoryHandler', () => {
    it('should call service.adjust', async () => {
      const handler = new AdjustInventoryHandler(service);
      const dto = {
        inventoryId: INVENTORY_ID,
        delta: 5,
        reason: 'manual',
        adjustedBy: USER_ID,
      };
      await handler.execute(new AdjustInventoryCommand(dto));
      expect(service.adjust).toHaveBeenCalledWith(dto);
    });
  });

  describe('ReserveInventoryHandler', () => {
    it('should call service.reserve', async () => {
      const handler = new ReserveInventoryHandler(service);
      const dto = { inventoryId: INVENTORY_ID, amount: 3, reference: 'ORDER-1' };
      await handler.execute(new ReserveInventoryCommand(dto));
      expect(service.reserve).toHaveBeenCalledWith(dto);
    });
  });

  describe('ReleaseInventoryHandler', () => {
    it('should call service.release', async () => {
      const handler = new ReleaseInventoryHandler(service);
      const dto = { inventoryId: INVENTORY_ID, amount: 3, reason: 'cancel' };
      await handler.execute(new ReleaseInventoryCommand(dto));
      expect(service.release).toHaveBeenCalledWith(dto);
    });
  });
});
