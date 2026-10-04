export interface MetricsResponse {
  readonly counters: Record<string, number>;
  readonly gauges: Record<string, number>;
  readonly histograms?: Record<
    string,
    { readonly count: number; readonly sum: number; readonly buckets?: Record<string, number> }
  >;
  readonly collectedAt: string;
}
