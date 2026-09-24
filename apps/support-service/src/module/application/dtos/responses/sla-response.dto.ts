export interface SlaResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly target: number;
  readonly priority: string;
  readonly status: string;
  readonly businessHoursOnly: boolean;
}

export interface SlaStatusResponseDTO {
  readonly ticketId: string;
  readonly slaId: string;
  readonly breached: boolean;
  readonly remainingMinutes: number;
  readonly elapsedMinutes: number;
}
