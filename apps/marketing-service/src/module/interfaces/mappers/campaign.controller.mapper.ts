import { Injectable } from '@nestjs/common';
import type { CampaignSchemaType } from '@vubon/shared-schemas/marketing';

@Injectable()
export class CampaignControllerMapper {
  toResponse(dto: CampaignSchemaType): CampaignSchemaType {
    return dto;
  }

  toPublicResponse(dto: CampaignSchemaType): { id: string; name: string; status: string; type: string } {
    return {
      id: dto.id,
      name: dto.name,
      status: dto.status,
      type: dto.type,
    };
  }
}
