/**
 * SupportTemplateRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportTemplateEntity } from '../entities/support-template.entity';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../value-objects/primitives/template-type.vo';

export interface SupportTemplateRepository
  extends BaseRepository<SupportTemplateEntity, TemplateIdVO> {
  findActive(): Promise<readonly SupportTemplateEntity[]>;
  findByType(type: TemplateTypeVO): Promise<readonly SupportTemplateEntity[]>;
  findByLanguage(language: string): Promise<readonly SupportTemplateEntity[]>;
  findByTypeAndLanguage(
    type: TemplateTypeVO,
    language: string,
  ): Promise<readonly SupportTemplateEntity[]>;
  findCustomerFacing(): Promise<readonly SupportTemplateEntity[]>;
}
