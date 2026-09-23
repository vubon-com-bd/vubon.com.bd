import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Campaign';

export class CampaignCreatedEvent extends BaseDomainEvent<
  'marketing.campaign.created',
  { campaignId: string; name: string }
> {
  constructor(
    aggregateId: string,
    name: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.campaign.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { campaignId: aggregateId, name },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class CampaignLaunchedEvent extends BaseDomainEvent<
  'marketing.campaign.launched',
  { campaignId: string }
> {
  constructor(
    aggregateId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.campaign.launched',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { campaignId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class CampaignCompletedEvent extends BaseDomainEvent<
  'marketing.campaign.completed',
  { campaignId: string }
> {
  constructor(
    aggregateId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.campaign.completed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { campaignId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
