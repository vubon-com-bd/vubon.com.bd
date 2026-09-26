import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EmailSubscriberEntity } from '../entities/email-subscriber.entity';
import { LeadEmailVO } from '../value-objects/primitives/lead-email.vo';

export interface EmailSubscriberRepository
  extends BaseRepository<EmailSubscriberEntity, string> {
  findByEmail(email: LeadEmailVO): Promise<EmailSubscriberEntity | null>;
  findActive(): Promise<readonly EmailSubscriberEntity[]>;
}
