import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EmailTemplateEntity } from '../entities/email-template.entity';

export interface EmailTemplateRepository
  extends BaseRepository<EmailTemplateEntity, string> {
  findByName(name: string): Promise<EmailTemplateEntity | null>;
}
