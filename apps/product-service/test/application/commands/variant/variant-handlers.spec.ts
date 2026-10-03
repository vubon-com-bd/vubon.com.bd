/**
 * Variant Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { AddVariantHandler } from '../../../../src/module/application/commands/variant/add-variant.handler.js';
import { AddVariantCommand } from '../../../../src/module/application/commands/variant/add-variant.command.js';
import { UpdateVariantHandler } from '../../../../src/module/application/commands/variant/update-variant.handler.js';
import { UpdateVariantCommand } from '../../../../src/module/application/commands/variant/update-variant.command.js';
import { RemoveVariantHandler } from '../../../../src/module/application/commands/variant/remove-variant.handler.js';
import { RemoveVariantCommand } from '../../../../src/module/application/commands/variant/remove-variant.command.js';
import { RegenerateVariantMatrixHandler } from '../../../../src/module/application/commands/variant/regenerate-variant-matrix.handler.js';
import { RegenerateVariantMatrixCommand } from '../../../../src/module/application/commands/variant/regenerate-variant-matrix.command.js';
import { createMockVariantService, type MockedVariantService } from '../../../mocks/services.js';
import { mockVariantResponse } from '../../../mocks/responses.js';
import { PRODUCT_ID, VARIANT_ID, USER_ID } from '../../../helpers.js';

describe('Variant Command Handlers', () => {
  let service: MockedVariantService;

  beforeEach(() => {
    service = createMockVariantService();
    service.add.mockResolvedValue(mockVariantResponse());
    service.update.mockResolvedValue(mockVariantResponse());
    service.remove.mockResolvedValue(undefined);
    service.regenerateMatrix.mockResolvedValue([mockVariantResponse()]);
  });

  describe('AddVariantHandler', () => {
    it('should call service.add with dto and actorId', async () => {
      const handler = new AddVariantHandler(service);
      const dto = {
        productId: PRODUCT_ID,
        name: 'Red / L',
        sku: 'RED-L',
        type: 'color',
        options: [{ name: 'Color', value: 'Red' }],
        price: 1200,
      };

      await handler.execute(new AddVariantCommand(dto as never, USER_ID));
      expect(service.add).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('UpdateVariantHandler', () => {
    it('should call service.update', async () => {
      const handler = new UpdateVariantHandler(service);
      const dto = { variantId: VARIANT_ID, price: 1500 };
      await handler.execute(new UpdateVariantCommand(dto));
      expect(service.update).toHaveBeenCalledWith(dto);
    });
  });

  describe('RemoveVariantHandler', () => {
    it('should call service.remove', async () => {
      const handler = new RemoveVariantHandler(service);
      await handler.execute(new RemoveVariantCommand(VARIANT_ID, USER_ID));
      expect(service.remove).toHaveBeenCalledWith(VARIANT_ID, USER_ID);
    });
  });

  describe('RegenerateVariantMatrixHandler', () => {
    it('should call service.regenerateMatrix', async () => {
      const handler = new RegenerateVariantMatrixHandler(service);
      await handler.execute(new RegenerateVariantMatrixCommand(PRODUCT_ID, USER_ID));
      expect(service.regenerateMatrix).toHaveBeenCalledWith(PRODUCT_ID, USER_ID);
    });
  });
});
