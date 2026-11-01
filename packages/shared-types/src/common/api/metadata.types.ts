/**
 * API Metadata Types
 * @module shared-types/common/api
 */

export interface ResponseMetadata {
  readonly requestId?: string;
  readonly timestamp: string;
  readonly duration: number;
  readonly version?: string;
  readonly cached?: boolean;
}

export interface RateLimitInfo {
  readonly limit: number;
  readonly remaining: number;
  readonly resetAt: string;
  readonly retryAfter?: number;
}

export interface ApiVersion {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
  readonly label: string;
}
