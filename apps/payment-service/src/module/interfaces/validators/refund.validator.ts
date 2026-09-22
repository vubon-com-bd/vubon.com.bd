import { plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';
import { RequestRefundRequestDto } from '../dtos/requests/refund.request.dto';

export class RefundValidator {
  static validateRequest(input: unknown): RequestRefundRequestDto {
    const dto = plainToInstance(RequestRefundRequestDto, input);
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
