import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CampaignServiceInterface } from '../interfaces/campaign.service.interface';
import type { CampaignRepository } from '../../../domain/repositories/campaign.repository.interface';
import { CampaignEntity } from '../../../domain/entities/campaign.entity';
import { CampaignIdVO } from '../../../domain/value-objects/primitives/campaign-id.vo';
import { CampaignNameVO } from '../../../domain/value-objects/primitives/campaign-name.vo';
import { CampaignStatusVO } from '../../../domain/value-objects/primitives/campaign-status.vo';
import { CampaignTypeVO } from '../../../domain/value-objects/primitives/campaign-type.vo';
import { CampaignChannelVO } from '../../../domain/value-objects/primitives/campaign-channel.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { CampaignNotFoundAppError } from '../../errors/campaign.errors';
import type { CreateCampaignRequestDTO } from '../../dtos/requests/campaign/create-campaign.dto';
import type { LaunchCampaignRequestDTO } from '../../dtos/requests/campaign/launch-campaign.dto';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';
import { CampaignMapper } from '../../mappers/campaign.mapper';

@Injectable()
export class CampaignService
  extends BaseService<CampaignEntity, string>
  implements CampaignServiceInterface
{
  readonly name = 'CampaignService';

  constructor(
    private readonly campaignRepo: CampaignRepository,
    private readonly eventBus: EventBus,
    private readonly mapper: CampaignMapper,
  ) {
    super();
  }

  async create(input: CreateCampaignRequestDTO): Promise<CampaignResponseDTO> {
    const primaryChannel = input.channels[0];
    const entity = CampaignEntity.create({
      name: CampaignNameVO.create(input.name),
      status: CampaignStatusVO.create('draft'),
      type: CampaignTypeVO.create(input.type),
      channel: CampaignChannelVO.create(primaryChannel?.channel ?? 'email'),
      goal: null,
      createdBy: UserIdVO.create(crypto.randomUUID()),
      startDate: input.startAt ? new Date(input.startAt) : null,
      endDate: input.endAt ? new Date(input.endAt) : null,
      launchedAt: null,
      completedAt: null,
    });
    await this.campaignRepo.save(entity);
    await this.publishEvents(entity);
    return this.mapper.toDTO(entity);
  }

  async launch(input: LaunchCampaignRequestDTO): Promise<CampaignResponseDTO> {
    const entity = await this.campaignRepo.findById(
      CampaignIdVO.create(input.campaignId),
    );
    if (!entity) throw new CampaignNotFoundAppError(input.campaignId);
    const launched = entity.launch();
    await this.campaignRepo.save(launched);
    await this.publishEvents(launched);
    return this.mapper.toDTO(launched);
  }

  async pause(campaignId: string, reason?: string): Promise<CampaignResponseDTO> {
    const entity = await this.campaignRepo.findById(CampaignIdVO.create(campaignId));
    if (!entity) throw new CampaignNotFoundAppError(campaignId);
    void reason;
    await this.campaignRepo.save(entity);
    return this.mapper.toDTO(entity);
  }

  async complete(campaignId: string): Promise<CampaignResponseDTO> {
    const entity = await this.campaignRepo.findById(CampaignIdVO.create(campaignId));
    if (!entity) throw new CampaignNotFoundAppError(campaignId);
    const completed = entity.complete();
    await this.campaignRepo.save(completed);
    await this.publishEvents(completed);
    return this.mapper.toDTO(completed);
  }

  async findById(campaignId: string): Promise<CampaignResponseDTO | null> {
    const entity = await this.campaignRepo.findById(CampaignIdVO.create(campaignId));
    return entity ? this.mapper.toDTO(entity) : null;
  }

  private async publishEvents(entity: CampaignEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) this.eventBus.publish(event as never);
  }
}
