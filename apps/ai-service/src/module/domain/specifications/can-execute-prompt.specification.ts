import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PromptEntity } from '../entities/prompt.entity';

export class CanExecutePromptSpecification extends Specification<PromptEntity> {
  private static readonly MAX_TOKENS = 128000;

  isSatisfiedBy(candidate: PromptEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.text.trim().length === 0) return false;
    if (candidate.tokenCount.value > CanExecutePromptSpecification.MAX_TOKENS) {
      return false;
    }
    return true;
  }
}
