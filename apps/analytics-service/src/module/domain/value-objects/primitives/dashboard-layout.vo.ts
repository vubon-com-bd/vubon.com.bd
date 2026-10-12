/**
 * Dashboard Layout Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Dashboard-এর visual layout type (grid, masonry, flex, freeform)।
 * Business Rule:
 * - ANALYTICS_DASHBOARD_LAYOUT constants থেকে হতে হবে
 * - Grid → fixed columns
 * - Masonry → variable heights
 * - Flex → flow-based
 * - Freeform → absolute positioning
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_DASHBOARD_LAYOUT } from '@vubon/shared-constants/platform/analytics';

const VALID_LAYOUTS: readonly string[] = Object.values(ANALYTICS_DASHBOARD_LAYOUT);

export class DashboardLayoutVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DashboardLayoutVO {
    if (typeof raw !== 'string') {
      throw new Error('DashboardLayout must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_LAYOUTS.includes(normalized)) {
      throw new Error(
        `Invalid DashboardLayout: "${normalized}". Valid: ${VALID_LAYOUTS.join(', ')}`
      );
    }

    return new DashboardLayoutVO(normalized);
  }

  isGrid(): boolean {
    return this.value === ANALYTICS_DASHBOARD_LAYOUT.GRID;
  }

  isMasonry(): boolean {
    return this.value === ANALYTICS_DASHBOARD_LAYOUT.MASONRY;
  }

  isFlex(): boolean {
    return this.value === ANALYTICS_DASHBOARD_LAYOUT.FLEX;
  }

  isFreeform(): boolean {
    return this.value === ANALYTICS_DASHBOARD_LAYOUT.FREEFORM;
  }

  /** Fixed-column layout কিনা (grid only) */
  hasFixedColumns(): boolean {
    return this.isGrid();
  }

  /** Widget repositioning user-driven কিনা */
  isUserConfigurable(): boolean {
    return this.isFreeform() || this.isMasonry();
  }

  /** Responsive-friendly layout কিনা */
  isResponsiveFriendly(): boolean {
    return this.isGrid() || this.isFlex();
  }
}
