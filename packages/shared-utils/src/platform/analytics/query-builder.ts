export interface QueryFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface AnalyticsQueryData {
  queryId: string;
  analyticsId: string;
  type: string;
  metric: string;
  dimensions: string[];
  granularity: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class AnalyticsQueryBuilder {
  private dimensions: string[] = [];
  private metrics: string[] = [];
  private filters: QueryFilter[] = [];
  private granularity = 'day';
  private startDate: Date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  private endDate: Date = new Date();

  addDimension(dimension: string): this {
    this.dimensions.push(dimension);
    return this;
  }

  addMetric(metric: string): this {
    this.metrics.push(metric);
    return this;
  }

  addFilter(field: string, operator: string, value: unknown): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  setGranularity(granularity: string): this {
    this.granularity = granularity;
    return this;
  }

  setDateRange(start: Date, end: Date): this {
    this.startDate = start;
    this.endDate = end;
    return this;
  }

  build(): AnalyticsQueryData {
    return {
      queryId: crypto.randomUUID(),
      analyticsId: '',
      type: 'metric',
      metric: 'sum',
      dimensions: this.dimensions,
      granularity: this.granularity,
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: true,
      metadata: { metrics: this.metrics, filters: this.filters },
    };
  }
}
