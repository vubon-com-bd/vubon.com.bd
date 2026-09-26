import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class ReferrerVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 2000;

  static create(raw: string): ReferrerVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('Referrer cannot be empty');
    }
    if (trimmed.length > ReferrerVO.MAX_LENGTH) {
      throw new Error(`Referrer too long: ${trimmed.length}`);
    }
    return new ReferrerVO(trimmed);
  }

  static direct(): ReferrerVO {
    return new ReferrerVO('direct');
  }

  private constructor(value: string) {
    super(value);
  }

  get isDirect(): boolean {
    return this.value === 'direct';
  }

  get hostname(): string | null {
    try {
      return new URL(this.value).hostname;
    } catch {
      return null;
    }
  }

  isExternal(ownHost: string): boolean {
    const host = this.hostname;
    if (host === null) return false;
    return host !== ownHost;
  }
}
