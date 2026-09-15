import { AuthError } from '../../common/errors/auth-error';

/** Error during a multi-step auth flow (login, refresh, MFA, ...). */
export class AuthFlowError extends AuthError {
  public readonly flow: string;
  public readonly step: string;

  constructor(flow: string, step: string, message: string, cause?: unknown) {
    super(message, {
      code: `AUTH_FLOW_${flow.toUpperCase()}`,
      statusCode: 401,
      cause,
      meta: { flow, step },
    });
    this.name = 'AuthFlowError';
    this.flow = flow;
    this.step = step;
  }
}
