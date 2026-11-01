/**
 * HTTP Headers Types
 * @module shared-types/common/api
 */

export interface RequestHeaders {
  readonly authorization?: string;
  readonly contentType?: string;
  readonly accept?: string;
  readonly acceptLanguage?: string;
  readonly userAgent?: string;
  readonly xRequestId?: string;
  readonly xApiKey?: string;
  readonly xCsrfToken?: string;
  readonly xForwardedFor?: string;
  readonly [key: string]: string | undefined;
}

export interface ResponseHeaders {
  readonly contentType?: string;
  readonly contentLength?: string;
  readonly cacheControl?: string;
  readonly xRequestId?: string;
  readonly xRateLimitLimit?: string;
  readonly xRateLimitRemaining?: string;
  readonly xRateLimitReset?: string;
  readonly [key: string]: string | undefined;
}
