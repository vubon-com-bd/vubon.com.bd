import { Injectable } from '@nestjs/common';
import type { LoyaltySchemaType } from '@vubon/shared-schemas/marketing';

@Injectable()
export class LoyaltyControllerMapper {
  toResponse(dto: LoyaltySchemaType): LoyaltySchemaType {
    return dto;
  }
}
