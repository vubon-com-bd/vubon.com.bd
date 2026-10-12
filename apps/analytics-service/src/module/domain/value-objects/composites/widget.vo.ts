/**
 * Widget Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Complete widget definition।
 * Business Rule:
 * - type + config + position
 * - Chart widget-এ metric লাগবে
 * - Metric widget-এ single value
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { WidgetIdVO } from '../primitives/widget-id.vo.js';
import { WidgetTypeVO } from '../primitives/widget-type.vo.js';
import { WidgetConfigVO } from '../primitives/widget-config.vo.js';
import { MetricNameVO } from '../primitives/metric-name.vo.js';

export interface WidgetPosition {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface WidgetVOProps {
  readonly id: WidgetIdVO;
  readonly type: WidgetTypeVO;
  readonly title: string;
  readonly config: WidgetConfigVO;
  readonly position: WidgetPosition;
  readonly metrics?: readonly MetricNameVO[];
}

export class WidgetVO extends BaseVO<WidgetVOProps> {
  private constructor(props: WidgetVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: WidgetVOProps): WidgetVO {
    if (!props.id || !props.type || !props.config || !props.position) {
      throw new Error('WidgetVO requires id, type, config, position');
    }

    // Position valid
    if (props.position.x < 0 || props.position.y < 0 || props.position.w <= 0 || props.position.h <= 0) {
      throw new Error('WidgetVO position must be non-negative with positive w/h');
    }

    // Chart widget requires metrics
    if (props.type.isVisualization() && (!props.metrics || props.metrics.length === 0)) {
      throw new Error('Visualization widget requires at least one metric');
    }

    // Metric widget requires exactly one metric
    if (props.type.isSingleValue() && props.metrics && props.metrics.length > 1) {
      throw new Error('Single-value widget requires exactly one metric');
    }

    return new WidgetVO(props);
  }

  get id(): WidgetIdVO {
    return this.value.id;
  }

  get type(): WidgetTypeVO {
    return this.value.type;
  }

  get title(): string {
    return this.value.title;
  }

  get config(): WidgetConfigVO {
    return this.value.config;
  }

  get position(): WidgetPosition {
    return this.value.position;
  }

  get metrics(): readonly MetricNameVO[] | undefined {
    return this.value.metrics;
  }

  isChart(): boolean {
    return this.type.isChart();
  }

  isTable(): boolean {
    return this.type.isTable();
  }

  isMetric(): boolean {
    return this.type.isMetric();
  }

  isText(): boolean {
    return this.type.isText();
  }

  requiresData(): boolean {
    return this.type.requiresDataQuery();
  }

  /** Visual widget কিনা (chart, funnel, heatmap, gauge) */
  isVisual(): boolean {
    return this.type.isVisualization();
  }

  /** Metric count */
  metricCount(): number {
    return this.metrics?.length ?? 0;
  }

  /** Chart type (from config) */
  chartType(): string | undefined {
    const ct = this.config.get<string>('chartType');
    return typeof ct === 'string' ? ct : undefined;
  }
}
