export interface TicketPublicResponseDTO {
  readonly id: string;
  readonly number: string;
  readonly subject: string;
  readonly status: string;
  readonly priority: string;
  readonly createdAt: string;
}
