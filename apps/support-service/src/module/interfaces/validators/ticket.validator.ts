/**
 * TicketValidator — schema-based validation at interface layer
 * @module support-service/interfaces/validators
 *
 * Rule: uses class-validator through DTO + optional Zod schema bridge
 */
import { Injectable, BadRequestException } from '@nestjs/common';
import { TicketCreateInputSchema } from '@vubon/shared-schemas/support';

@Injectable()
export class TicketValidator {
  validateCreate(input: unknown): void {
    const result = TicketCreateInputSchema.safeParse(input);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: result.error.issues,
      });
    }
  }
}
