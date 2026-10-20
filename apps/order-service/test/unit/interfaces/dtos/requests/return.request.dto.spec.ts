/**
 * Return HTTP Request DTOs
 * @module order-service/test/unit/interfaces/dtos/requests
 */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  RequestReturnHttpDTO,
  CompleteReturnHttpDTO,
} from '@interfaces/dtos/requests/return.request.dto.js';

async function validateDto<T extends object>(
  cls: new () => T,
  plain: Record<string, unknown>,
): Promise<string[]> {
  const i = plainToInstance(cls, plain);
  const errs = await validate(i as object, { forbidUnknownValues: false, whitelist: false });
  return errs.map((e) => e.property);
}

describe('RequestReturnHttpDTO', () => {
  it('should pass valid', async () => {
    const errs = await validateDto(RequestReturnHttpDTO, {
      orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      reason: 'defective',
      itemIds: ['7c9e6679-7425-40de-944b-e07fc1f90ae7'],
    });
    expect(errs).toEqual([]);
  });

  it('should reject missing itemIds', async () => {
    const errs = await validateDto(RequestReturnHttpDTO, {
      orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      reason: 'defective',
    });
    expect(errs).toContain('itemIds');
  });
});

describe('CompleteReturnHttpDTO', () => {
  it('should pass', async () => {
    expect(await validateDto(CompleteReturnHttpDTO, { refundAmount: 100 })).toEqual([]);
  });
});
