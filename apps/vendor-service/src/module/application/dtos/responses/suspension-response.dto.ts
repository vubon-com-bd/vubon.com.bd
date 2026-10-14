/**
 * Suspension Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface SuspensionResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly status: string;
  readonly reason: string;
  readonly description?: string;
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly durationDays?: number;
  readonly liftedAt?: string;
  readonly liftedBy?: string;
  readonly liftReason?: string;
  readonly appealDeadline?: string;
  readonly expectedLiftDate: string | null;
  readonly daysRemaining: number | null;
  readonly canAppeal: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SuspensionListResponseDTO {
  readonly items: readonly SuspensionResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
