import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_LAYOUTS = new Set<string>([
  'grid', 'masonry', 'flex', 'freeform',
]);

export class DashboardLayoutVO extends BaseTypeVO<string> {
  static create(raw: string): DashboardLayoutVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_LAYOUTS.has(normalized)) {
      throw new Error(`Invalid dashboard layout: ${raw}`);
    }
    return new DashboardLayoutVO(normalized);
  }

  static grid(): DashboardLayoutVO {
    return new DashboardLayoutVO('grid');
  }

  private constructor(value: string) {
    super(value);
  }

  get isFixed(): boolean {
    return this.value === 'grid' || this.value === 'flex';
  }

  get isFreeform(): boolean {
    return this.value === 'freeform';
  }
}
