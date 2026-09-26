import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DashboardIdVO } from '../primitives/dashboard-id.vo';
import { DashboardNameVO } from '../primitives/dashboard-name.vo';
import { DashboardLayoutVO } from '../primitives/dashboard-layout.vo';

export interface DashboardProps {
  readonly dashboardId: DashboardIdVO;
  readonly name: DashboardNameVO;
  readonly layout: DashboardLayoutVO;
  readonly widgetCount: number;
  readonly ownerId: string;
}

export class DashboardVO extends BaseVO<DashboardProps> {
  static create(props: DashboardProps): DashboardVO {
    if (props.widgetCount < 0) {
      throw new Error('Widget count cannot be negative');
    }
    return new DashboardVO(Object.freeze({ ...props }));
  }

  private constructor(value: DashboardProps) {
    super(value);
  }

  get dashboardId(): DashboardIdVO { return this.value.dashboardId; }
  get name(): DashboardNameVO { return this.value.name; }
  get layout(): DashboardLayoutVO { return this.value.layout; }
  get widgetCount(): number { return this.value.widgetCount; }
  get ownerId(): string { return this.value.ownerId; }

  isOwnedBy(userId: string): boolean {
    return this.value.ownerId === userId;
  }

  get isFull(): boolean {
    return this.value.widgetCount >= 20;
  }

  canAddWidget(): boolean {
    return !this.isFull;
  }
}
