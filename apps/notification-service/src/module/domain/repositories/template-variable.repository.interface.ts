/**
 * TemplateVariable Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { TemplateVariableEntity } from '@domain/entities/template-variable.entity.js';
import type { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

export const TEMPLATE_VARIABLE_REPOSITORY = Symbol('TEMPLATE_VARIABLE_REPOSITORY');

export interface TemplateVariableRepository
  extends BaseRepository<TemplateVariableEntity, string> {
  findByTemplate(templateId: TemplateIdVO | string): Promise<readonly TemplateVariableEntity[]>;
  findRequired(templateId: string): Promise<readonly TemplateVariableEntity[]>;
  findByName(templateId: string, name: string): Promise<TemplateVariableEntity | null>;
  countByTemplate(templateId: string): Promise<number>;
  deleteByTemplate(templateId: string): Promise<number>;
}
