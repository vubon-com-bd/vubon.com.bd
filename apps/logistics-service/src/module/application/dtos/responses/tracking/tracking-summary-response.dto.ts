import type { TrackingStatusValue } from '@domain/primitives/tracking-status.vo';

export interface TrackingSummaryResponseDTO {
  readonly id: string;
  readonly trackingNumber: string;
  readonly status: TrackingStatusValue;
  readonly eventCount: number;
  readonly lastUpdatedAt: string;
}
