import { Injectable } from '@nestjs/common';
import type { LeadSchemaType } from '@vubon/shared-schemas/marketing';

@Injectable()
export class LeadControllerMapper {
  toResponse(dto: LeadSchemaType): LeadSchemaType {
    return dto;
  }
}
