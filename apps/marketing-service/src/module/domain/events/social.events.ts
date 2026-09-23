import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class SocialPostPublishedEvent extends BaseDomainEvent<
  'marketing.social_post.published',
  { postId: string; platform: string }
> {
  constructor(aggregateId: string, platform: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.social_post.published',
      aggregateId,
      aggregateType: 'SocialPost',
      payload: { postId: aggregateId, platform },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
