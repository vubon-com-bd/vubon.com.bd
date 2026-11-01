export interface UpdateCourierRequestDTO {
  readonly courierId: string;
  readonly displayName?: string;
  readonly logoUrl?: string;
  readonly website?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly trackingUrlTemplate?: string;
  readonly apiEnabled?: boolean;
  readonly coverageZones?: readonly string[];
  readonly supportsCOD?: boolean;
  readonly supportsInsurance?: boolean;
  readonly supportsInternational?: boolean;
  readonly averageDeliveryDays?: number;
  readonly isDefault?: boolean;
  readonly priority?: number;
}
