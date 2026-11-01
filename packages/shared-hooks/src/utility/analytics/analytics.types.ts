export interface AnalyticsEvent {
  readonly name: string;
  readonly properties?: Record<string, unknown>;
  readonly timestamp?: number;
}

export interface AnalyticsAdapter {
  track(event: AnalyticsEvent): void;
  pageView(path: string, properties?: Record<string, unknown>): void;
  timing(category: string, variable: string, ms: number): void;
}
