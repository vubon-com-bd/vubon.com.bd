import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SmsMarketingServiceInterface } from '../interfaces/sms-marketing.service.interface';
import type { SmsMarketingRepository } from '../../../domain/repositories/sms-marketing.repository.interface';
import { SmsMarketingEntity } from '../../../domain/entities/sms-marketing.entity';
import { SmsMarketingIdVO } from '../../../domain/value-objects/primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../../../domain/value-objects/primitives/sms-campaign-status.vo';
import { SmsContentVO } from '../../../domain/value-objects/primitives/sms-content.vo';
import type { CreateSmsCampaignRequestDTO } from '../../dtos/requests/sms-marketing/create-sms-campaign.dto';
import type { SmsCampaignResponseDTO } from '../../dtos/responses/sms-campaign-response.dto';

@Injectable()
export class SmsMarketingService
  extends BaseService<SmsMarketingEntity, string>
  implements SmsMarketingServiceInterface
{
  readonly name = 'SmsMarketingService';

  constructor(
    private readonly repo: SmsMarketingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateSmsCampaignRequestDTO): Promise<SmsCampaignResponseDTO> {
    const entity = SmsMarketingEntity.create({
      name: input.name,
      content: SmsContentVO.create(input.content),
      status: SmsCampaignStatusVO.create('draft'),
      scheduledAt: null,
      sentAt: null,
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async send(campaignId: string, recipientIds?: readonly string[]): Promise<SmsCampaignResponseDTO> {
    const entity = await this.repo.findById(SmsMarketingIdVO.create(campaignId));
    if (!entity) throw new Error(`SMS campaign not found: ${campaignId}`);
    const count = recipientIds?.length ?? 0;
    const sent = entity.send(count);
    await this.repo.save(sent);
    const events = sent.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(sent);
  }

  private toDTO(entity: SmsMarketingEntity): SmsCampaignResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name,
      content: entity.content.value,
      status: entity.status.value,
      scheduledAt: entity.scheduledAt?.toISOString(),
      sentAt: entity.sentAt?.toISOString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as SmsCampaignResponseDTO;
  }
}
