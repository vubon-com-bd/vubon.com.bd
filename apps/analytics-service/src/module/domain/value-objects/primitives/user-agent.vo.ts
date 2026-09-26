import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class UserAgentVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 1000;

  static create(raw: string): UserAgentVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('UserAgent cannot be empty');
    }
    if (trimmed.length > UserAgentVO.MAX_LENGTH) {
      throw new Error(`UserAgent too long: ${trimmed.length}`);
    }
    return new UserAgentVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }

  get isMobile(): boolean {
    return /Mobile|Android|iPhone|iPad/i.test(this.value);
  }

  get isDesktop(): boolean {
    return !this.isMobile;
  }

  get isBot(): boolean {
    return /bot|crawler|spider|scraper/i.test(this.value);
  }

  get browser(): string | null {
    const ua = this.value;
    if (/Edg\//.test(ua)) return 'Edge';
    if (/Chrome\//.test(ua) && !/Edg/.test(ua)) return 'Chrome';
    if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return 'Safari';
    if (/Firefox\//.test(ua)) return 'Firefox';
    return null;
  }

  get os(): string | null {
    const ua = this.value;
    if (/Windows NT/.test(ua)) return 'Windows';
    if (/Macintosh|Mac OS X/.test(ua)) return 'macOS';
    if (/Android/.test(ua)) return 'Android';
    if (/iPhone|iPad/.test(ua)) return 'iOS';
    if (/Linux/.test(ua)) return 'Linux';
    return null;
  }
}
