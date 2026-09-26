import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TemplateVariableEntity } from '../entities/template-variable.entity';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';

export interface TemplateVariableRepository extends BaseRepository<TemplateVariableEntity, string> {
  findByTemplateId(templateId: TemplateIdVO): Promise<readonly TemplateVariableEntity[]>;
  deleteByTemplateId(templateId: TemplateIdVO): Promise<void>;
}
