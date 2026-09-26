import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WidgetIdVO } from '../primitives/widget-id.vo';
import { WidgetTypeVO } from '../primitives/widget-type.vo';
import { WidgetConfigVO } from '../primitives/widget-config.vo';

export interface WidgetProps {
  readonly widgetId: WidgetIdVO;
  readonly type: WidgetTypeVO;
  readonly config: WidgetConfigVO;
  readonly position: number;
  readonly metricName: string;
}

export class WidgetVO extends BaseVO<WidgetProps> {
  static create(props: WidgetProps): WidgetVO {
    if (props.position < 0) {
      throw new Error('Widget position cannot be negative');
    }
    return new WidgetVO(Object.freeze({ ...props }));
  }

  private constructor(value: WidgetProps) {
    super(value);
  }

  get widgetId(): WidgetIdVO { return this.value.widgetId; }
  get type(): WidgetTypeVO { return this.value.type; }
  get config(): WidgetConfigVO { return this.value.config; }
  get position(): number { return this.value.position; }
  get metricName(): string { return this.value.metricName; }

  isVisual(): boolean {
    return this.value.type.isVisual;
  }

  comesBefore(other: WidgetVO): boolean {
    return this.value.position < other.value.position;
  }
}
