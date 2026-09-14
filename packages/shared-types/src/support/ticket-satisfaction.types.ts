/**
 * Ticket Satisfaction Types
 * @module shared-types/support
 */

export interface TicketSatisfaction {
  readonly ticketId: string;
  readonly rating: number;
  readonly scale: 'csat' | 'nps' | 'ces';
  readonly comment?: string;
  readonly feedback?: readonly string[];
  readonly ratedBy: string;
  readonly ratedAt: string;
}

export interface SatisfactionStats {
  readonly period: string;
  readonly averageRating: number;
  readonly totalResponses: number;
  readonly csat: number;
  readonly nps: number;
  readonly ces: number;
}
