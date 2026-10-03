import { AuthError } from './auth-error';

export class VerificationRequiredError extends AuthError {
  public readonly channel: 'email' | 'phone' | 'both' | undefined;

  constructor(channel?: 'email' | 'phone' | 'both', cause?: unknown) {
    super('Account verification required', {
      code: 'VERIFICATION_REQUIRED',
      statusCode: 403,
      cause,
      meta: channel ? { channel } : undefined,
    });
    this.name = 'VerificationRequiredError';
    this.channel = channel;
  }
}
