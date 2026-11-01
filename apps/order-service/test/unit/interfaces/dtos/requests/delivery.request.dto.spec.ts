/**
 * Delivery HTTP Request DTOs
 * @module order-service/test/unit/interfaces/dtos/requests
 */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  ScheduleDeliveryHttpDTO,
  RescheduleDeliveryHttpDTO,
} from '@interfaces/dtos/requests/delivery.request.dto.js';

async function validateDto<T extends object>(
  cls: new () => T,
  plain: Record<string, unknown>,
): Promise<string[]> {
  const i = plainToInstance(cls, plain);
  const errs = await validate(i as object, { forbidUnknownValues: false, whitelist: false });
  return errs.map((e) => e.property);
}

describe('ScheduleDeliveryHttpDTO', () => {
  it('should pass minimal', async () => {
    expect(
      await validateDto(ScheduleDeliveryHttpDTO, {
        orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      }),
    ).toEqual([]);
  });

  it('should reject missing orderId', async () => {
    const errs = await validateDto(ScheduleDeliveryHttpDTO, {});
    expect(errs).toContain('orderId');
  });
});

describe('RescheduleDeliveryHttpDTO', () => {
  it('should pass valid reason', async () => {
    const errs = await validateDto(RescheduleDeliveryHttpDTO, {
      reason: 'customer unavailable',
    });
    expect(errs).toEqual([]);
  });

  it('should reject short reason', async () => {
    const errs = await validateDto(RescheduleDeliveryHttpDTO, { reason: 'x' });
    expect(errs).toContain('reason');
  });
});
