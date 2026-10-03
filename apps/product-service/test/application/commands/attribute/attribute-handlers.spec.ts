/**
 * Attribute Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { AddAttributeHandler } from '../../../../src/module/application/commands/attribute/add-attribute.handler.js';
import { AddAttributeCommand } from '../../../../src/module/application/commands/attribute/add-attribute.command.js';
import { UpdateAttributeHandler } from '../../../../src/module/application/commands/attribute/update-attribute.handler.js';
import { UpdateAttributeCommand } from '../../../../src/module/application/commands/attribute/update-attribute.command.js';
import { RemoveAttributeHandler } from '../../../../src/module/application/commands/attribute/remove-attribute.handler.js';
import { RemoveAttributeCommand } from '../../../../src/module/application/commands/attribute/remove-attribute.command.js';
import { createMockAttributeService, type MockedAttributeService } from '../../../mocks/services.js';
import { PRODUCT_ID, USER_ID } from '../../../helpers.js';

describe('Attribute Command Handlers', () => {
  let service: MockedAttributeService;

  beforeEach(() => {
    service = createMockAttributeService();
    service.add.mockResolvedValue({} as never);
    service.update.mockResolvedValue({} as never);
    service.remove.mockResolvedValue(undefined);
  });

  describe('AddAttributeHandler', () => {
    it('should call service.add with dto + actorId', async () => {
      const handler = new AddAttributeHandler(service);
      const dto = {
        productId: PRODUCT_ID,
        name: 'Color',
        slug: 'color',
        type: 'select',
      };

      await handler.execute(new AddAttributeCommand(dto as never, USER_ID));

      expect(service.add).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('UpdateAttributeHandler', () => {
    it('should call service.update with dto', async () => {
      const handler = new UpdateAttributeHandler(service);
      const dto = { attributeId: 'attr-1', name: 'Updated' };

      await handler.execute(new UpdateAttributeCommand(dto as never));

      expect(service.update).toHaveBeenCalledWith(dto);
    });
  });

  describe('RemoveAttributeHandler', () => {
    it('should call service.remove with attributeId + actorId', async () => {
      const handler = new RemoveAttributeHandler(service);

      await handler.execute(new RemoveAttributeCommand('attr-1', USER_ID));

      expect(service.remove).toHaveBeenCalledWith('attr-1', USER_ID);
    });
  });
});
