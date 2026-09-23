import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SocialMediaIdVO } from '../primitives/social-media-id.vo';
import { SocialPlatformVO } from '../primitives/social-platform.vo';

export interface SocialMediaProps {
  readonly id: SocialMediaIdVO;
  readonly name: string;
  readonly platform: SocialPlatformVO;
  readonly status: string;
}

export class SocialMediaVO extends BaseVO<SocialMediaProps> {
  private constructor(props: SocialMediaProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SocialMediaProps): SocialMediaVO {
    return new SocialMediaVO(props);
  }

  get id(): SocialMediaIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get platform(): SocialPlatformVO { return this.value.platform; }
  get status(): string { return this.value.status; }
}
