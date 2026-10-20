/**
 * OrderItem HTTP Request DTOs
 * @module order-service/test/unit/interfaces/dtos/requests
 */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  AddOrderItemHttpDTO,
  UpdateOrderItemHttpDTO,
} from '@interfaces/dtos/requests/order-item.request.dto.js';

async function validateDto<T extends object>(
  cls: new () => T,
  plain: Record<string, unknown>,
): Promise<string[]> {
  const i = plainToInstance(cls, plain);
  const errs = await validate(i as object, { forbidUnknownValues: false, whitelist: false });
  return errs.map((e) => e.property);
}

describe('AddOrderItemHttpDTO', () => {
  const valid = {
    orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    sku: 'SKU-1',
    name: 'Product Name',
    quantity: 2,
    unitPrice: 100,
  };

  it('should pass for valid', async () => {
    expect(await validateDto(AddOrderItemHttpDTO, valid)).toEqual([]);
  });

  it('should reject missing orderId', async () => {
    const errs = await validateDto(AddOrderItemHttpDTO, { ...valid, orderId: undefined });
    expect(errs).toContain('orderId');
  });

  it('should reject quantity=0', async () => {
    const errs = await validateDto(AddOrderItemHttpDTO, { ...valid, quantity: 0 });
    expect(errs).toContain('quantity');
  });

  it('should reject quantity > 999', async () => {
    const errs = await validateDto(AddOrderItemHttpDTO, { ...valid, quantity: 1000 });
    expect(errs).toContain('quantity');
  });
});

describe('UpdateOrderItemHttpDTO', () => {
  it('should pass for empty', async () => {
    expect(await validateDto(UpdateOrderItemHttpDTO, {})).toEqual([]);
  });

  it('should reject quantity=0', async () => {
    const errs = await validateDto(UpdateOrderItemHttpDTO, { quantity: 0 });
    expect(errs).toContain('quantity');
  });
});
