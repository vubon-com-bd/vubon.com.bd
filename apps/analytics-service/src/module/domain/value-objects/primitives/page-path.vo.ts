import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class PagePathVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 2000;

  static create(raw: string): PagePathVO {
    let path = raw.trim();
    if (path.length === 0) {
      throw new Error('PagePath cannot be empty');
    }
    if (path.length > PagePathVO.MAX_LENGTH) {
      throw new Error(`PagePath too long: ${path.length}`);
    }
    // Normalize leading slash
    if (!path.startsWith('/')) path = '/' + path;
    // Strip trailing slash (except root)
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return new PagePathVO(path);
  }

  private constructor(value: string) {
    super(value);
  }

  get segments(): readonly string[] {
    return this.value.split('/').filter(Boolean);
  }

  get depth(): number {
    return this.segments.length;
  }

  get isRoot(): boolean {
    return this.value === '/';
  }

  matches(pattern: RegExp): boolean {
    return pattern.test(this.value);
  }

  get queryString(): string | null {
    const idx = this.value.indexOf('?');
    return idx >= 0 ? this.value.slice(idx + 1) : null;
  }

  get pathname(): string {
    const idx = this.value.indexOf('?');
    return idx >= 0 ? this.value.slice(0, idx) : this.value;
  }
}
