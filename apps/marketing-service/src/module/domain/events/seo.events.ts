import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class SeoKeywordTrackedEvent extends BaseDomainEvent<
  'marketing.seo.keyword_tracked',
  { seoId: string; keyword: string }
> {
  constructor(aggregateId: string, keyword: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.seo.keyword_tracked',
      aggregateId,
      aggregateType: 'SeoMarketing',
      payload: { seoId: aggregateId, keyword },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
