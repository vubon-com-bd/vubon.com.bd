import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { BrandIdVO } from '../primitives/brand-id.vo';
import { BrandNameVO } from '../primitives/brand-name.vo';
import { BrandSlugVO } from '../primitives/brand-slug.vo';
import { BrandLogoVO } from '../primitives/brand-logo.vo';

export interface BrandProps {
  readonly id: BrandIdVO;
  readonly name: BrandNameVO;
  readonly slug: BrandSlugVO;
  readonly logo: BrandLogoVO | null;
}

export class BrandVO extends BaseVO<BrandProps> {
  private constructor(props: BrandProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: BrandProps): BrandVO {
    return new BrandVO(props);
  }

  get id(): BrandIdVO { return this.value.id; }
  get name(): BrandNameVO { return this.value.name; }
  get slug(): BrandSlugVO { return this.value.slug; }
  get logo(): BrandLogoVO | null { return this.value.logo; }
}
