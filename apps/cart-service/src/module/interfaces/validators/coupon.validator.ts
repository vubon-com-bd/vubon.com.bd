import { plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';
import {
  ApplyCouponRequestDto,
  ValidateCouponRequestDto,
} from '../dtos/requests/coupon.request.dto';

export class CouponValidator {
  static validateApply(input: unknown): ApplyCouponRequestDto {
    return this.validate(ApplyCouponRequestDto, input);
  }

  static validateCheck(input: unknown): ValidateCouponRequestDto {
    return this.validate(ValidateCouponRequestDto, input);
  }

  private static validate<T extends object>(
    cls: new () => T,
    input: unknown,
  ): T {
    const dto = plainToInstance(cls, input);
    const errors = validateSync(dto as object);
    if (errors.length > 0) {
      throw new Error(CouponValidator.format(errors));
    }
    return dto;
  }

  private static format(errors: readonly ValidationError[]): string {
    return errors
      .map((e) => Object.values(e.constraints ?? {}).join(', '))
      .join('; ');
  }
}
