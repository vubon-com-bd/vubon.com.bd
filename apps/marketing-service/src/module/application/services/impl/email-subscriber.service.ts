import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { EmailSubscriberServiceInterface } from '../interfaces/email-subscriber.service.interface';
import type { EmailSubscriberRepository } from '../../../domain/repositories/email-subscriber.repository.interface';
import { EmailSubscriberEntity } from '../../../domain/entities/email-subscriber.entity';
import { LeadEmailVO } from '../../../domain/value-objects/primitives/lead-email.vo';

@Injectable()
export class EmailSubscriberService
  extends BaseService<EmailSubscriberEntity, string>
  implements EmailSubscriberServiceInterface
{
  readonly name = 'EmailSubscriberService';

  constructor(private readonly repo: EmailSubscriberRepository) {
    super();
  }

  async subscribe(email: string): Promise<void> {
    const existing = await this.repo.findByEmail(LeadEmailVO.create(email));
    if (existing) return;
    const entity = EmailSubscriberEntity.create({
      email: LeadEmailVO.create(email),
      userId: null,
      status: 'active',
      subscribedAt: new Date(),
      unsubscribedAt: null,
    });
    await this.repo.save(entity);
  }

  async unsubscribe(email: string): Promise<void> {
    const entity = await this.repo.findByEmail(LeadEmailVO.create(email));
    if (!entity) return;
    void entity;
  }

  async findActive(): Promise<readonly EmailSubscriberEntity[]> {
    return this.repo.findActive();
  }
}
