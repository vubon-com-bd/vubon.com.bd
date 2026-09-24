export interface SupportClient {
  getTicket(ticketId: string): Promise<{
    readonly ticketId: string;
    readonly status: string;
    readonly resolvedAt: string | null;
  } | null>;
}
