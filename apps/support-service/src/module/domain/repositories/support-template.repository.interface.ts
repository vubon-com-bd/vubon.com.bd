import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportTemplateEntity } from '../entities/support-template.entity';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../value-objects/primitives/template-type.vo';

export interface SupportTemplateRepository extends BaseRepository<SupportTemplateEntity, TemplateIdVO> {
  findByType(type: TemplateTypeVO): Promise<readonly SupportTemplateEntity[]>;
  findActive(): Promise<readonly SupportTemplateEntity[]>;
}
