import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SeoKeywordVO } from '../primitives/seo-keyword.vo';

export interface SeoKeywordCompositeProps {
  readonly keyword: SeoKeywordVO;
  readonly volume: number | null;
  readonly difficulty: number | null;
  readonly rank: number | null;
}

export class SeoKeywordCompositeVO extends BaseVO<SeoKeywordCompositeProps> {
  private constructor(props: SeoKeywordCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SeoKeywordCompositeProps): SeoKeywordCompositeVO {
    return new SeoKeywordCompositeVO(props);
  }

  get keyword(): SeoKeywordVO { return this.value.keyword; }
  get volume(): number | null { return this.value.volume; }
  get difficulty(): number | null { return this.value.difficulty; }
  get rank(): number | null { return this.value.rank; }
}
