import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SeoMarketingIdVO } from '../primitives/seo-marketing-id.vo';
import { SeoElementVO } from '../primitives/seo-element.vo';

export interface SeoMarketingProps {
  readonly id: SeoMarketingIdVO;
  readonly pageUrl: string;
  readonly title: SeoElementVO | null;
  readonly description: SeoElementVO | null;
  readonly score: number;
}

export class SeoMarketingVO extends BaseVO<SeoMarketingProps> {
  private constructor(props: SeoMarketingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SeoMarketingProps): SeoMarketingVO {
    return new SeoMarketingVO(props);
  }

  get id(): SeoMarketingIdVO { return this.value.id; }
  get pageUrl(): string { return this.value.pageUrl; }
  get title(): SeoElementVO | null { return this.value.title; }
  get description(): SeoElementVO | null { return this.value.description; }
  get score(): number { return this.value.score; }
}
