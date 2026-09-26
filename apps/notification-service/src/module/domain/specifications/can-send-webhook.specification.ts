import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { WebhookEntity } from '../entities/webhook.entity';

export interface CanSendWebhookCandidate {
  readonly webhook: WebhookEntity;
  readonly event: string;
}

export class CanSendWebhookSpecification extends Specification<CanSendWebhookCandidate> {
  isSatisfiedBy(candidate: CanSendWebhookCandidate): boolean {
    if (candidate.webhook.status.value !== 'active') return false;
    if (!candidate.webhook.events.includes(candidate.event)) return false;
    return true;
  }
}
