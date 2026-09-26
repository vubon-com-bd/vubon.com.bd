import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

const VALID_CHART_TYPES = new Set<string>([
  'line', 'bar', 'column', 'pie', 'donut', 'area', 'scatter',
  'heatmap', 'funnel', 'treemap', 'sankey', 'radar',
]);

export interface ChartConfigProps {
  readonly chartType: string;
  readonly xAxis: string | null;
  readonly yAxis: string | null;
  readonly showLegend: boolean;
  readonly showGrid: boolean;
  readonly stacked: boolean;
}

export class ChartConfigVO extends BaseVO<ChartConfigProps> {
  static create(props: ChartConfigProps): ChartConfigVO {
    if (!VALID_CHART_TYPES.has(props.chartType)) {
      throw new Error(`Invalid chart type: ${props.chartType}`);
    }
    return new ChartConfigVO(Object.freeze({ ...props }));
  }

  private constructor(value: ChartConfigProps) {
    super(value);
  }

  get chartType(): string { return this.value.chartType; }
  get xAxis(): string | null { return this.value.xAxis; }
  get yAxis(): string | null { return this.value.yAxis; }
  get showLegend(): boolean { return this.value.showLegend; }
  get showGrid(): boolean { return this.value.showGrid; }
  get stacked(): boolean { return this.value.stacked; }

  get requiresXY(): boolean {
    return ['line', 'bar', 'column', 'area', 'scatter'].includes(
      this.value.chartType,
    );
  }

  isValid(): boolean {
    if (!this.requiresXY) return true;
    return this.value.xAxis !== null && this.value.yAxis !== null;
  }
}
