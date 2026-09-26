import { plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';
import {
  CreateCartRequestDto,
  UpdateCartRequestDto,
  RecoverCartRequestDto,
} from '../dtos/requests/cart.request.dto';

export class CartValidator {
  static validateCreate(input: unknown): CreateCartRequestDto {
    return this.validate(CreateCartRequestDto, input);
  }

  static validateUpdate(input: unknown): UpdateCartRequestDto {
    return this.validate(UpdateCartRequestDto, input);
  }

  static validateRecover(input: unknown): RecoverCartRequestDto {
    return this.validate(RecoverCartRequestDto, input);
  }

  private static validate<T extends object>(
    cls: new () => T,
    input: unknown,
  ): T {
    const dto = plainToInstance(cls, input);
    const errors = validateSync(dto as object);
    if (errors.length > 0) {
      throw new Error(CartValidator.format(errors));
    }
    return dto;
  }

  private static format(errors: readonly ValidationError[]): string {
    return errors
      .map((e) => Object.values(e.constraints ?? {}).join(', '))
      .join('; ');
  }
}
