import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { KnowledgeArticleIdVO } from '../primitives/knowledge-article-id.vo';
import { KnowledgeArticleTitleVO } from '../primitives/knowledge-article-title.vo';
import { KnowledgeArticleBodyVO } from '../primitives/knowledge-article-body.vo';
import { KnowledgeStatusVO } from '../primitives/knowledge-status.vo';

export interface KnowledgeArticleProps {
  readonly id: KnowledgeArticleIdVO;
  readonly title: KnowledgeArticleTitleVO;
  readonly body: KnowledgeArticleBodyVO;
  readonly status: KnowledgeStatusVO;
  readonly categoryId: string | null;
}

export class KnowledgeArticleVO extends BaseVO<KnowledgeArticleProps> {
  private constructor(props: KnowledgeArticleProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: KnowledgeArticleProps): KnowledgeArticleVO {
    return new KnowledgeArticleVO(props);
  }

  get id(): KnowledgeArticleIdVO { return this.value.id; }
  get title(): KnowledgeArticleTitleVO { return this.value.title; }
  get body(): KnowledgeArticleBodyVO { return this.value.body; }
  get status(): KnowledgeStatusVO { return this.value.status; }
  get categoryId(): string | null { return this.value.categoryId; }
}
