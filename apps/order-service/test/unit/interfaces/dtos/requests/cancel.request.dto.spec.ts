/**
 * Cancel HTTP Request DTOs
 * @module order-service/test/unit/interfaces/dtos/requests
 */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  RequestCancelHttpDTO,
  RejectCancelHttpDTO,
} from '@interfaces/dtos/requests/cancel.request.dto.js';

async function validateDto<T extends object>(
  cls: new () => T,
  plain: Record<string, unknown>,
): Promise<string[]> {
  const i = plainToInstance(cls, plain);
  const errs = await validate(i as object, { forbidUnknownValues: false, whitelist: false });
  return errs.map((e) => e.property);
}

describe('RequestCancelHttpDTO', () => {
  it('should pass valid', async () => {
    const errs = await validateDto(RequestCancelHttpDTO, {
      orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      reason: 'customer_request',
    });
    expect(errs).toEqual([]);
  });

  it('should reject missing orderId', async () => {
    const errs = await validateDto(RequestCancelHttpDTO, { reason: 'customer_request' });
    expect(errs).toContain('orderId');
  });
});

describe('RejectCancelHttpDTO', () => {
  it('should pass valid reason', async () => {
    expect(await validateDto(RejectCancelHttpDTO, { reason: 'too late' })).toEqual([]);
  });

  it('should reject short reason', async () => {
    const errs = await validateDto(RejectCancelHttpDTO, { reason: 'x' });
    expect(errs).toContain('reason');
  });
});
