import { Injectable } from '@nestjs/common';
import type { PromotionSchemaType } from '@vubon/shared-schemas/marketing';

@Injectable()
export class PromotionControllerMapper {
  toResponse(dto: PromotionSchemaType): PromotionSchemaType {
    return dto;
  }
}
