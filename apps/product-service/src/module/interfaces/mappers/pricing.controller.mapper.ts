import { Injectable } from '@nestjs/common';
import type { PricingResponseDTO } from '../../application/dtos/responses/pricing-response.dto';
import type { PricingHttpResponseDto } from '../dtos/responses/pricing.response.dto';

@Injectable()
export class PricingControllerMapper {
  toHttp(dto: PricingResponseDTO): PricingHttpResponseDto {
    const p = dto as unknown as {
      productId: string;
      currency: string;
      sellingPrice?: number;
      basePrice?: number;
    };
    return {
      productId: p.productId,
      amount: p.sellingPrice ?? p.basePrice ?? 0,
      currency: p.currency,
    } as unknown as PricingHttpResponseDto;
  }
}
