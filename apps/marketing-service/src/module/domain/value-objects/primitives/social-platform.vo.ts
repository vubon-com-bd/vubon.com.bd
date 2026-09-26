import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube', 'pinterest', 'threads',
]);

export class SocialPlatformVO extends BaseTypeVO<string> {
  static create(raw: string): SocialPlatformVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid SocialPlatform: ${raw}`);
    }
    return new SocialPlatformVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
