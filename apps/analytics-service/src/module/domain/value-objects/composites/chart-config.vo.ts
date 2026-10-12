/**
 * Chart Config Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Chart-specific configuration।
 * Business Rule:
 * - Chart type determines required axes
 * - Line/bar/column need x + y
 * - Pie/donut need labels + values
 * - Max 10 series
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { ANALYTICS_CHART_TYPE } from '@vubon/shared-constants/platform/analytics';

type ChartType = (typeof ANALYTICS_CHART_TYPE)[keyof typeof ANALYTICS_CHART_TYPE];

const VALID_CHART_TYPES: readonly string[] = Object.values(ANALYTICS_CHART_TYPE);
const MAX_SERIES = 10;

export interface ChartSeries {
  readonly key: string;
  readonly label: string;
  readonly color?: string;
}

export interface ChartConfigVOProps {
  readonly type: ChartType;
  readonly series: readonly ChartSeries[];
  readonly showLegend: boolean;
  readonly showGrid: boolean;
  readonly stacked: boolean;
  readonly xAxisLabel?: string;
  readonly yAxisLabel?: string;
}

export class ChartConfigVO extends BaseVO<ChartConfigVOProps> {
  private constructor(props: ChartConfigVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ChartConfigVOProps): ChartConfigVO {
    if (!props.type) {
      throw new Error('ChartConfigVO requires type');
    }
    if (!VALID_CHART_TYPES.includes(props.type)) {
      throw new Error(`Invalid chart type: "${props.type}"`);
    }
    if (props.series.length > MAX_SERIES) {
      throw new Error(`ChartConfigVO supports max ${MAX_SERIES} series`);
    }

    // Unique series keys
    const keys = props.series.map((s) => s.key);
    if (new Set(keys).size !== keys.length) {
      throw new Error('ChartConfigVO series keys must be unique');
    }

    return new ChartConfigVO(props);
  }

  get type(): ChartType {
    return this.value.type;
  }

  get series(): readonly ChartSeries[] {
    return this.value.series;
  }

  get showLegend(): boolean {
    return this.value.showLegend;
  }

  get showGrid(): boolean {
    return this.value.showGrid;
  }

  get stacked(): boolean {
    return this.value.stacked;
  }

  get xAxisLabel(): string | undefined {
    return this.value.xAxisLabel;
  }

  get yAxisLabel(): string | undefined {
    return this.value.yAxisLabel;
  }

  isLine(): boolean {
    return this.type === ANALYTICS_CHART_TYPE.LINE;
  }

  isBar(): boolean {
    return this.type === ANALYTICS_CHART_TYPE.BAR;
  }

  isColumn(): boolean {
    return this.type === ANALYTICS_CHART_TYPE.COLUMN;
  }

  isPie(): boolean {
    return this.type === ANALYTICS_CHART_TYPE.PIE;
  }

  isDonut(): boolean {
    return this.type === ANALYTICS_CHART_TYPE.DONUT;
  }

  isArea(): boolean {
    return this.type === ANALYTICS_CHART_TYPE.AREA;
  }

  isScatter(): boolean {
    return this.value.type === ANALYTICS_CHART_TYPE.SCATTER;
  }

  /** Supports stacking? */
  supportsStacking(): boolean {
    return this.isBar() || this.isColumn() || this.isArea();
  }

  /** Needs x-axis label? */
  needsXAxis(): boolean {
    return this.isLine() || this.isBar() || this.isColumn() || this.isArea() || this.isScatter();
  }

  /** Needs y-axis label? */
  needsYAxis(): boolean {
    return this.needsXAxis();
  }

  /** Pie-like (labels + values)? */
  isPieLike(): boolean {
    return this.isPie() || this.isDonut();
  }

  /** Multi-series capable? */
  supportsMultiSeries(): boolean {
    return this.isLine() || this.isBar() || this.isColumn() || this.isArea();
  }

  seriesCount(): number {
    return this.series.length;
  }
}
