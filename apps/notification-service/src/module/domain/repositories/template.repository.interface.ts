import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TemplateEntity } from '../entities/template.entity';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';
import { TemplateNameVO } from '../value-objects/primitives/template-name.vo';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo';

export interface TemplateRepository extends BaseRepository<TemplateEntity, TemplateIdVO> {
  findByName(name: TemplateNameVO): Promise<TemplateEntity | null>;
  findByChannel(channel: NotificationChannelVO): Promise<readonly TemplateEntity[]>;
  findByLanguage(language: string): Promise<readonly TemplateEntity[]>;
  findByNameAndLanguage(name: TemplateNameVO, language: string): Promise<TemplateEntity | null>;
}
