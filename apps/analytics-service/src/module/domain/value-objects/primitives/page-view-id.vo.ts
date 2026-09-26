import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class PageViewIdVO extends BaseIdVO {
  static create(raw: string): PageViewIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('PageViewId cannot be empty');
    }
    return new PageViewIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
