export type AnalyticsEventName =
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'checkout_start'
  | 'purchase'
  | 'search'
  | 'signup'
  | 'login';

export interface AnalyticsTrackRequest {
  readonly event: AnalyticsEventName;
  readonly properties?: Record<string, unknown>;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly timestamp?: string;
}

export interface AnalyticsTrackResponse {
  readonly accepted: boolean;
  readonly eventId: string;
}

export interface AnalyticsReportRequest {
  readonly from: string;
  readonly to: string;
  readonly metrics: readonly string[];
  readonly dimensions?: readonly string[];
  readonly filters?: Record<string, unknown>;
}

export interface AnalyticsReportResponse {
  readonly rows: readonly Record<string, unknown>[];
  readonly totals: Record<string, number>;
}
