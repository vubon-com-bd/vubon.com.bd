import { Injectable } from '@nestjs/common';
import type { PayoutResponseDto } from '../dtos/responses/payout.response.dto';

@Injectable()
export class PayoutControllerMapper {
  toResponse(input: {
    id: string;
    vendorId: string;
    bankAccountId: string;
    amount: number;
    currency: string;
    status: string;
    requestedAt: string;
    processedAt: string | null;
    failureReason: string | null;
  }): PayoutResponseDto {
    return {
      id: input.id,
      vendorId: input.vendorId,
      bankAccountId: input.bankAccountId,
      amount: input.amount,
      currency: input.currency,
      status: input.status,
      requestedAt: input.requestedAt,
      processedAt: input.processedAt,
      failureReason: input.failureReason,
    };
  }
}
