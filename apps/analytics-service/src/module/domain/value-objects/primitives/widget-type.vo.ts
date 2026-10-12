/**
 * Widget Type Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Dashboard widget-এর type (chart, table, metric, text, funnel, heatmap, gauge)।
 * Business Rule:
 * - ANALYTICS_WIDGET_TYPE constants থেকে হতে হবে
 * - Chart-family widget: chart, funnel, heatmap, gauge (data visualization)
 * - Non-chart widget: table, metric, text (content)
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_WIDGET_TYPE } from '@vubon/shared-constants/platform/analytics';

const VALID_TYPES: readonly string[] = Object.values(ANALYTICS_WIDGET_TYPE);

export class WidgetTypeVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WidgetTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('WidgetType must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_TYPES.includes(normalized)) {
      throw new Error(
        `Invalid WidgetType: "${normalized}". Valid: ${VALID_TYPES.join(', ')}`
      );
    }

    return new WidgetTypeVO(normalized);
  }

  isChart(): boolean {
    return this.value === ANALYTICS_WIDGET_TYPE.CHART;
  }

  isTable(): boolean {
    return this.value === ANALYTICS_WIDGET_TYPE.TABLE;
  }

  isMetric(): boolean {
    return this.value === ANALYTICS_WIDGET_TYPE.METRIC;
  }

  isText(): boolean {
    return this.value === ANALYTICS_WIDGET_TYPE.TEXT;
  }

  isFunnel(): boolean {
    return this.value === ANALYTICS_WIDGET_TYPE.FUNNEL;
  }

  isHeatmap(): boolean {
    return this.value === ANALYTICS_WIDGET_TYPE.HEATMAP;
  }

  isGauge(): boolean {
    return this.value === ANALYTICS_WIDGET_TYPE.GAUGE;
  }

  /** Data visualization widget কিনা */
  isVisualization(): boolean {
    return (
      this.isChart() ||
      this.isFunnel() ||
      this.isHeatmap() ||
      this.isGauge()
    );
  }

  /** Query-based widget কিনা (analytics data লাগে) */
  requiresDataQuery(): boolean {
    return !this.isText();
  }

  /** KPI/gauge widget কিনা (single value display) */
  isSingleValue(): boolean {
    return this.isMetric() || this.isGauge();
  }

  /** Aggregate data লাগে কিনা */
  requiresAggregation(): boolean {
    return this.isChart() || this.isMetric() || this.isGauge() || this.isHeatmap();
  }
}
