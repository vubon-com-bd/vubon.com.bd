export interface AnalyticsTrackOptions {
  readonly eventName: string;
  readonly properties: Readonly<Record<string, unknown>>;
}

export interface AnalyticsProvider {
  track(options: AnalyticsTrackOptions): Promise<void>;
}
