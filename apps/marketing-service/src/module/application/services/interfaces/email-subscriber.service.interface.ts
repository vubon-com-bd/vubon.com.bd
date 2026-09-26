import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EmailSubscriberEntity } from '../../../domain/entities/email-subscriber.entity';

export interface EmailSubscriberServiceInterface
  extends BaseServiceInterface<EmailSubscriberEntity, string> {
  subscribe(email: string): Promise<void>;
  unsubscribe(email: string): Promise<void>;
  findActive(): Promise<readonly EmailSubscriberEntity[]>;
}
