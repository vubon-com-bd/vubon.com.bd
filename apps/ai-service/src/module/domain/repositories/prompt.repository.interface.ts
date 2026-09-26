import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PromptEntity } from '../entities/prompt.entity';
import { PromptIdVO } from '../value-objects/primitives/prompt-id.vo';

export interface PromptRepository
  extends BaseRepository<PromptEntity, PromptIdVO> {
  findByType(type: string): Promise<readonly PromptEntity[]>;
  findByRole(role: string): Promise<readonly PromptEntity[]>;
  findFromTemplate(): Promise<readonly PromptEntity[]>;
  findRecent(limit: number): Promise<readonly PromptEntity[]>;
}
