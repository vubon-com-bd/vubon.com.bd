export { EventProcessorService, type RawEvent, type ProcessedEvent } from './event-processor.service';
export { SessionBuilderService, type RawPageView, type BuiltSession } from './session-builder.service';
export { MetricAggregatorService, type AggregationResult } from './metric-aggregator.service';
export { TimeSeriesAggregatorService, type TimeSeriesPoint } from './time-series-aggregator.service';
export {
  CohortCalculatorService,
  type CohortRecord,
  type CohortResult,
} from './cohort-calculator.service';
export {
  FunnelCalculatorService,
  type FunnelEvent,
  type FunnelResult,
} from './funnel-calculator.service';
export { RetentionCalculatorService } from './retention-calculator.service';
export {
  AttributionComputerService,
  type TouchpointRecord,
  type AttributionCredit,
} from './attribution-computer.service';
export { AnomalyDetectorService, type AnomalyResult } from './anomaly-detector.service';
export { TrendDetectorService, type TrendResult } from './trend-detector.service';
export { ReportRendererService, type RenderInput } from './report-renderer.service';
export { ChartRendererService, type ChartData, type ChartConfig } from './chart-renderer.service';
export { ExportService, type ExportResult } from './export.service';
export { StatsCalculatorService, type DescriptiveStats } from './stats-calculator.service';
