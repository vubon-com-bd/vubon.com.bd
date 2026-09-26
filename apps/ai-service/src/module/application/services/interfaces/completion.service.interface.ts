import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CompletionEntity } from '../../../domain/entities/completion.entity';
import type { CompletionIdVO } from '../../../domain/value-objects/primitives/completion-id.vo';

export interface CompletionServiceInterface
  extends BaseServiceInterface<CompletionEntity, CompletionIdVO> {
  findByPromptId(promptId: string): Promise<readonly CompletionEntity[]>;
  validate(completionId: string): Promise<{ readonly valid: boolean; readonly reasons: readonly string[] }>;
}
