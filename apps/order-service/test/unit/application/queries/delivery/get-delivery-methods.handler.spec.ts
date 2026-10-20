import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetDeliveryMethodsHandler } from '@application/queries/delivery/get-delivery-methods.handler.js';
import { GetDeliveryMethodsQuery } from '@application/queries/delivery/get-delivery-methods.query.js';
import type { IDeliveryMethodService } from '@application/services/interfaces/delivery-method.service.interface.js';

describe('GetDeliveryMethodsHandler', () => {
  let handler: GetDeliveryMethodsHandler;
  let service: jest.Mocked<IDeliveryMethodService>;
  beforeEach(() => {
    service = {
      listActive: jest.fn(),
      listAll: jest.fn(),
    } as unknown as jest.Mocked<IDeliveryMethodService>;
    handler = new GetDeliveryMethodsHandler(service);
  });
  it('calls listActive when onlyActive is true', async () => {
    service.listActive.mockResolvedValue([]);
    await handler.execute(new GetDeliveryMethodsQuery(true));
    expect(service.listActive).toHaveBeenCalled();
  });
  it('calls listAll when onlyActive is false', async () => {
    service.listAll.mockResolvedValue([]);
    await handler.execute(new GetDeliveryMethodsQuery(false));
    expect(service.listAll).toHaveBeenCalled();
  });
});
