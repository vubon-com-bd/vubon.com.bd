import { jest } from '@jest/globals';
import { ProductAttributeController } from '../../../src/module/interfaces/controllers/rest/product-attribute.controller.js';
import { AddAttributeCommand } from '../../../src/module/application/commands/attribute/add-attribute.command.js';
import { UpdateAttributeCommand } from '../../../src/module/application/commands/attribute/update-attribute.command.js';
import { RemoveAttributeCommand } from '../../../src/module/application/commands/attribute/remove-attribute.command.js';
import { ListAttributesByProductQuery } from '../../../src/module/application/queries/attribute/list-attributes-by-product.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockUser } from '../../mocks/users.js';
import { PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('ProductAttributeController', () => {
  let controller: ProductAttributeController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductAttributeController(commandBus, queryBus);
  });

  it('add should dispatch AddAttributeCommand with productId + actorId', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.add(
      PRODUCT_ID,
      { name: 'Color', slug: 'color', type: 'select' } as never,
      mockUser() as never,
    );
    const cmd = commandBus.execute.mock.calls[0][0] as AddAttributeCommand;
    expect(cmd.dto.productId).toBe(PRODUCT_ID);
    expect(cmd.actorId).toBe(USER_ID);
  });

  it('list should dispatch ListAttributesByProductQuery', async () => {
    queryBus.execute.mockResolvedValueOnce([]);
    await controller.list(PRODUCT_ID);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListAttributesByProductQuery));
  });

  it('update should dispatch UpdateAttributeCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.update('attr-1', { name: 'Updated' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateAttributeCommand));
  });

  it('remove should dispatch RemoveAttributeCommand', async () => {
    commandBus.execute.mockResolvedValueOnce(undefined);
    await controller.remove('attr-1', mockUser() as never);
    const cmd = commandBus.execute.mock.calls[0][0] as RemoveAttributeCommand;
    expect(cmd.attributeId).toBe('attr-1');
  });
});
