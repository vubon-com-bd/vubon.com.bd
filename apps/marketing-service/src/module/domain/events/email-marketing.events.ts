import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class EmailCampaignSentEvent extends BaseDomainEvent<
  'marketing.email_campaign.sent',
  { campaignId: string; recipientCount: number }
> {
  constructor(aggregateId: string, recipientCount: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.email_campaign.sent',
      aggregateId,
      aggregateType: 'EmailCampaign',
      payload: { campaignId: aggregateId, recipientCount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
