import {
  GatewayTimeoutError,
  GatewayUnavailableError,
  SignatureVerificationError,
} from '../../../domain/errors';

export { GatewayTimeoutError, GatewayUnavailableError, SignatureVerificationError };

export class PaymentGatewayOperationError extends Error {
  constructor(
    public readonly gateway: string,
    public readonly reason: string,
    public readonly code?: string,
  ) {
    super(`Gateway operation failed [${gateway}]: ${reason}`);
    this.name = 'PaymentGatewayOperationError';
  }
}
