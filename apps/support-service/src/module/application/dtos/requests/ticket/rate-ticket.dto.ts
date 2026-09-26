/**
 * RateTicketRequestDTO — CSAT submission
 * @module support-service/application/dtos/requests/ticket
 */
export interface RateTicketRequestDTO {
  readonly ticketId: string;
  readonly score: number;
  readonly comment?: string;
  readonly ratedBy?: string;
}
