/**
 * Base Request Types
 * @module shared-types/common/api
 */

export interface BaseRequest {
  readonly requestId?: string;
  readonly timestamp?: string;
  readonly locale?: string;
  readonly timezone?: string;
}

export interface AuthenticatedRequest extends BaseRequest {
  readonly userId: string;
  readonly sessionId: string;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
}

export interface RequestContext extends BaseRequest {
  readonly ip?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly tenantId?: string;
}
