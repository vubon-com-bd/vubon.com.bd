import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class KnowledgeArticleTitleVO extends BaseNameVO {
  static create(value: string): KnowledgeArticleTitleVO {
    const trimmed = value.trim();
    if (trimmed.length < 3 || trimmed.length > 200) {
      throw new Error('Knowledge article title must be between 3 and 200 characters');
    }
    return new KnowledgeArticleTitleVO(trimmed);
  }
  private constructor(value: string) {
    super(value);
  }
}
