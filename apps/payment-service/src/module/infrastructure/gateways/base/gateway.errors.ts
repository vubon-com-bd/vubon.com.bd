/**
 * Gateway Adapter — Errors
 * @module payment-service/infrastructure/gateways/base
 */

export class GatewayNotConfiguredError extends Error {
  readonly code = 'GATEWAY_NOT_CONFIGURED';
  readonly httpStatus = 503;

  constructor(gatewayId: string) {
    super(`Gateway "${gatewayId}" is not configured (missing credentials or disabled)`);
    this.name = 'GatewayNotConfiguredError';
  }
}

export class GatewayDisabledError extends Error {
  readonly code = 'GATEWAY_DISABLED';
  readonly httpStatus = 503;

  constructor(gatewayId: string) {
    super(`Gateway "${gatewayId}" is disabled by configuration`);
    this.name = 'GatewayDisabledError';
  }
}

export class GatewayNotSupportedError extends Error {
  readonly code = 'GATEWAY_NOT_SUPPORTED';
  readonly httpStatus = 501;

  constructor(gatewayId: string, operation: string) {
    super(`Gateway "${gatewayId}" does not support "${operation}"`);
    this.name = 'GatewayNotSupportedError';
  }
}

export class GatewayOperationError extends Error {
  readonly code = 'GATEWAY_OPERATION_FAILED';
  readonly httpStatus = 502;

  constructor(
    gatewayId: string,
    operation: string,
    reason: string,
    public readonly rawResponse?: unknown,
  ) {
    super(`Gateway "${gatewayId}" ${operation} failed: ${reason}`);
    this.name = 'GatewayOperationError';
  }
}

export class GatewayTimeoutError extends Error {
  readonly code = 'GATEWAY_TIMEOUT';
  readonly httpStatus = 504;

  constructor(gatewayId: string, operation: string, timeoutMs: number) {
    super(`Gateway "${gatewayId}" ${operation} timed out after ${timeoutMs}ms`);
    this.name = 'GatewayTimeoutError';
  }
}

export class GatewaySignatureInvalidError extends Error {
  readonly code = 'GATEWAY_SIGNATURE_INVALID';
  readonly httpStatus = 401;

  constructor(gatewayId: string) {
    super(`Gateway "${gatewayId}" signature is invalid`);
    this.name = 'GatewaySignatureInvalidError';
  }
}
