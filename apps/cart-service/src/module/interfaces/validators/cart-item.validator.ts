import { plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';
import { AddItemRequestDto } from '../dtos/requests/cart-item.request.dto';

export class CartItemValidator {
  static validateAdd(input: unknown): AddItemRequestDto {
    const dto = plainToInstance(AddItemRequestDto, input);
    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new Error(CartItemValidator.format(errors));
    }
    return dto;
  }

  private static format(errors: readonly ValidationError[]): string {
    return errors
      .map((e) => Object.values(e.constraints ?? {}).join(', '))
      .join('; ');
  }
}
