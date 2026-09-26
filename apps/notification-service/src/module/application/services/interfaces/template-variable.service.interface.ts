import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TemplateVariableEntity } from '../../../domain/entities/template-variable.entity';

export interface TemplateVariableServiceInterface
  extends BaseServiceInterface<TemplateVariableEntity, string> {
  findByTemplateId(templateId: string): Promise<readonly TemplateVariableEntity[]>;
}
