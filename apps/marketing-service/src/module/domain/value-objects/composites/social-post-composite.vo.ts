import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SocialMediaIdVO } from '../primitives/social-media-id.vo';
import { SocialPlatformVO } from '../primitives/social-platform.vo';
import { SocialPostVO } from '../primitives/social-post.vo';

export interface SocialPostCompositeProps {
  readonly socialMediaId: SocialMediaIdVO;
  readonly platform: SocialPlatformVO;
  readonly content: SocialPostVO;
  readonly status: string;
  readonly scheduledAt: Date | null;
  readonly publishedAt: Date | null;
}

export class SocialPostCompositeVO extends BaseVO<SocialPostCompositeProps> {
  private constructor(props: SocialPostCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SocialPostCompositeProps): SocialPostCompositeVO {
    return new SocialPostCompositeVO(props);
  }

  get socialMediaId(): SocialMediaIdVO { return this.value.socialMediaId; }
  get platform(): SocialPlatformVO { return this.value.platform; }
  get content(): SocialPostVO { return this.value.content; }
  get status(): string { return this.value.status; }
  get scheduledAt(): Date | null { return this.value.scheduledAt; }
  get publishedAt(): Date | null { return this.value.publishedAt; }
}
