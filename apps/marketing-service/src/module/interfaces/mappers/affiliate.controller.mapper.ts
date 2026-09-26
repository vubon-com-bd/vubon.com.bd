import { Injectable } from '@nestjs/common';
import type { AffiliateSchemaType } from '@vubon/shared-schemas/marketing';

@Injectable()
export class AffiliateControllerMapper {
  toResponse(dto: AffiliateSchemaType): AffiliateSchemaType {
    return dto;
  }
}
