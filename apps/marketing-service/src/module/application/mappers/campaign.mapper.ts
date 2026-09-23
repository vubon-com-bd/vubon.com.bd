import { Injectable } from '@nestjs/common';
import { CampaignEntity } from '../../domain/entities/campaign.entity';
import type { CampaignResponseDTO } from '../dtos/responses/campaign-response.dto';

@Injectable()
export class CampaignMapper {
  toDTO(entity: CampaignEntity): CampaignResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      status: entity.status.value,
      type: entity.type.value,
      slug: entity.name.value.toLowerCase().replace(/\s+/g, '-'),
      createdBy: entity.createdBy.value,
      channels: [
        {
          enabled: true,
          channel: entity.channel.value as never,
        },
      ],
      startAt: entity.startDate?.toISOString() ?? entity.createdAt,
      budget: 0,
      audiences: [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as CampaignResponseDTO;
  }
}
