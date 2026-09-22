import { Injectable } from '@nestjs/common';
import type { CommissionResponseDto } from '../dtos/responses/commission.response.dto';

@Injectable()
export class CommissionControllerMapper {
  toResponse(input: {
    id: string;
    vendorId: string;
    orderId: string;
    rate: number;
    type: string;
    orderAmount: number;
    commissionAmount: number;
    currency: string;
    isSettled: boolean;
    calculatedAt: string;
  }): CommissionResponseDto {
    return {
      id: input.id,
      vendorId: input.vendorId,
      orderId: input.orderId,
      rate: input.rate,
      type: input.type,
      orderAmount: input.orderAmount,
      commissionAmount: input.commissionAmount,
      currency: input.currency,
      isSettled: input.isSettled,
      calculatedAt: input.calculatedAt,
    };
  }
}
