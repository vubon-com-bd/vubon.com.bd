import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PromptTemplateEntity } from '../entities/prompt-template.entity';
import { PromptIdVO } from '../value-objects/primitives/prompt-id.vo';

export interface PromptTemplateRepository
  extends BaseRepository<PromptTemplateEntity, PromptIdVO> {
  findByPromptId(promptId: PromptIdVO): Promise<PromptTemplateEntity | null>;
  findWithVariable(variable: string): Promise<readonly PromptTemplateEntity[]>;
}
