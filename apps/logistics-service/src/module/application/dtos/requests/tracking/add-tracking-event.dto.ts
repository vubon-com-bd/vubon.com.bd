export interface AddTrackingEventRequestDTO {
  readonly trackingId: string;
  readonly eventId: string;
  readonly eventType: string;
  readonly eventStatus: string;
  readonly currentLocation?: string;
}
