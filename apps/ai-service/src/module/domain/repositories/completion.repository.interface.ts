import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CompletionEntity } from '../entities/completion.entity';
import { CompletionIdVO } from '../value-objects/primitives/completion-id.vo';
import { PromptIdVO } from '../value-objects/primitives/prompt-id.vo';

export interface CompletionRepository
  extends BaseRepository<CompletionEntity, CompletionIdVO> {
  findByPromptId(promptId: PromptIdVO): Promise<readonly CompletionEntity[]>;
  findByModel(model: string): Promise<readonly CompletionEntity[]>;
  findComplete(): Promise<readonly CompletionEntity[]>;
}
