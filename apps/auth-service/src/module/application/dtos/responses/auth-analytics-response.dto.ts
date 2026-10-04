/**
 * AuthAnalyticsResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface AuthAnalyticsResponseDTO {
  readonly period: 'day' | 'week' | 'month' | 'year';
  readonly totalLogins: number;
  readonly successfulLogins: number;
  readonly failedLogins: number;
  readonly uniqueUsers: number;
  readonly mfaChallenges: number;
  readonly accountLocks: number;
  readonly topProviders: readonly { provider: string; count: number }[];
  readonly from: string;
  readonly to: string;
}
