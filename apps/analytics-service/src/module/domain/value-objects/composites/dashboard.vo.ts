/**
 * Dashboard Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Complete dashboard definition।
 * Business Rule:
 * - Max 50 widgets per dashboard
 * - Layout required
 * - Widget IDs unique
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { DashboardIdVO } from '../primitives/dashboard-id.vo.js';
import { DashboardNameVO } from '../primitives/dashboard-name.vo.js';
import { DashboardLayoutVO } from '../primitives/dashboard-layout.vo.js';
import { WidgetIdVO } from '../primitives/widget-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { EventTimestampVO } from '../primitives/event-timestamp.vo.js';

const MAX_WIDGETS = 50;

export interface DashboardVOProps {
  readonly id: DashboardIdVO;
  readonly name: DashboardNameVO;
  readonly layout: DashboardLayoutVO;
  readonly widgetIds: readonly WidgetIdVO[];
  readonly ownerId: UserIdVO;
  readonly isPublic: boolean;
  readonly createdAt: EventTimestampVO;
}

export class DashboardVO extends BaseVO<DashboardVOProps> {
  private constructor(props: DashboardVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DashboardVOProps): DashboardVO {
    if (!props.id || !props.name || !props.layout || !props.ownerId || !props.createdAt) {
      throw new Error('DashboardVO requires id, name, layout, ownerId, createdAt');
    }
    if (props.widgetIds.length > MAX_WIDGETS) {
      throw new Error(`DashboardVO supports max ${MAX_WIDGETS} widgets`);
    }

    // Unique widget IDs
    const ids = props.widgetIds.map((w) => w.value);
    if (new Set(ids).size !== ids.length) {
      throw new Error('DashboardVO widget IDs must be unique');
    }

    return new DashboardVO(props);
  }

  get id(): DashboardIdVO {
    return this.value.id;
  }

  get name(): DashboardNameVO {
    return this.value.name;
  }

  get layout(): DashboardLayoutVO {
    return this.value.layout;
  }

  get widgetIds(): readonly WidgetIdVO[] {
    return this.value.widgetIds;
  }

  get ownerId(): UserIdVO {
    return this.value.ownerId;
  }

  get isPublic(): boolean {
    return this.value.isPublic;
  }

  get createdAt(): EventTimestampVO {
    return this.value.createdAt;
  }

  widgetCount(): number {
    return this.widgetIds.length;
  }

  isEmpty(): boolean {
    return this.widgetIds.length === 0;
  }

  isFull(): boolean {
    return this.widgetIds.length >= MAX_WIDGETS;
  }

  hasWidget(widgetId: WidgetIdVO): boolean {
    return this.widgetIds.some((w) => w.equals(widgetId));
  }

  canAddWidget(): boolean {
    return !this.isFull();
  }

  /** Owned by user কিনা */
  isOwnedBy(userId: UserIdVO): boolean {
    return this.ownerId.equals(userId);
  }

  /** Accessible by user (public or owner) */
  isAccessibleBy(userId: UserIdVO): boolean {
    return this.isPublic || this.isOwnedBy(userId);
  }
}
