import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class KnowledgeArticleIdVO extends BaseIdVO {
  static create(value: string): KnowledgeArticleIdVO {
    return new KnowledgeArticleIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
