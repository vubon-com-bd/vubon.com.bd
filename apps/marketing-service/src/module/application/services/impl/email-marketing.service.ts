import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { EmailMarketingServiceInterface } from '../interfaces/email-marketing.service.interface';
import type { EmailMarketingRepository } from '../../../domain/repositories/email-marketing.repository.interface';
import { EmailMarketingEntity } from '../../../domain/entities/email-marketing.entity';
import { EmailMarketingIdVO } from '../../../domain/value-objects/primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../../../domain/value-objects/primitives/email-campaign-status.vo';
import { EmailMarketingNotFoundAppError } from '../../errors/email.errors';
import type { CreateEmailCampaignRequestDTO } from '../../dtos/requests/email-marketing/create-email-campaign.dto';
import type { EmailCampaignResponseDTO } from '../../dtos/responses/email-campaign-response.dto';

@Injectable()
export class EmailMarketingService
  extends BaseService<EmailMarketingEntity, string>
  implements EmailMarketingServiceInterface
{
  readonly name = 'EmailMarketingService';

  constructor(
    private readonly repo: EmailMarketingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateEmailCampaignRequestDTO): Promise<EmailCampaignResponseDTO> {
    const entity = EmailMarketingEntity.create({
      name: input.name,
      subject: input.subject,
      content: input.content,
      status: EmailCampaignStatusVO.create('draft'),
      templateId: null,
      scheduledAt: null,
      sentAt: null,
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async send(campaignId: string, recipientIds?: readonly string[]): Promise<EmailCampaignResponseDTO> {
    const entity = await this.repo.findById(EmailMarketingIdVO.create(campaignId));
    if (!entity) throw new EmailMarketingNotFoundAppError(campaignId);
    const count = recipientIds?.length ?? 0;
    const sent = entity.send(count);
    await this.repo.save(sent);
    const events = sent.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(sent);
  }

  async schedule(campaignId: string, scheduledAt: string): Promise<EmailCampaignResponseDTO> {
    const entity = await this.repo.findById(EmailMarketingIdVO.create(campaignId));
    if (!entity) throw new EmailMarketingNotFoundAppError(campaignId);
    void scheduledAt;
    return this.toDTO(entity);
  }

  private toDTO(entity: EmailMarketingEntity): EmailCampaignResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name,
      subject: entity.subject,
      content: entity.content,
      status: entity.status.value,
      templateId: entity.templateId?.value,
      scheduledAt: entity.scheduledAt?.toISOString(),
      sentAt: entity.sentAt?.toISOString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as EmailCampaignResponseDTO;
  }
}
