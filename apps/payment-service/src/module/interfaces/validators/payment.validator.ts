import { plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';
import {
  InitiatePaymentRequestDto,
  ConfirmPaymentRequestDto,
} from '../dtos/requests/payment.request.dto';

export class PaymentValidator {
  static validateInitiate(input: unknown): InitiatePaymentRequestDto {
    const dto = plainToInstance(InitiatePaymentRequestDto, input);
    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new Error(this.formatErrors(errors));
    }
    return dto;
  }

  static validateConfirm(input: unknown): ConfirmPaymentRequestDto {
    const dto = plainToInstance(ConfirmPaymentRequestDto, input);
    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new Error(this.formatErrors(errors));
    }
    return dto;
  }

  private static formatErrors(errors: readonly ValidationError[]): string {
    return errors
      .map((e) => Object.values(e.constraints ?? {}).join(', '))
      .join('; ');
  }
}
