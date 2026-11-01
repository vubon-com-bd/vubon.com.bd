import { ApiError } from './api-error';

/** Network failure: DNS, connection refused, offline, CORS preflight fail. */
export class NetworkError extends ApiError {
  constructor(message = 'Network request failed', cause?: unknown) {
    super(message, { code: 'NETWORK_ERROR', cause });
    this.name = 'NetworkError';
  }
}
