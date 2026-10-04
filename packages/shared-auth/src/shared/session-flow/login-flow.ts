import { AuthFlowError } from '../errors/auth-flow.error';
import { AuthFlowMachine } from '../hooks/use-flow';

export interface LoginFlowInput {
  readonly identifier: string;
  readonly password: string;
  readonly mfaCode?: string;
}

export interface LoginFlowDeps {
  readonly validateCredentials: (
    identifier: string,
    password: string
  ) => Promise<{ readonly userId: string; readonly requiresMfa: boolean }>;
  readonly verifyMfa: (userId: string, code: string) => Promise<{ readonly ok: boolean }>;
  readonly issueTokens: (userId: string) => Promise<{
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly sessionId: string;
  }>;
}

export interface LoginFlowResult {
  readonly userId: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly sessionId: string;
}

/**
 * Cross-platform login flow.
 * The `deps` are provided by the calling platform (server, react, ...).
 */
export async function loginFlow(
  input: LoginFlowInput,
  deps: LoginFlowDeps,
  machine: AuthFlowMachine = new AuthFlowMachine()
): Promise<LoginFlowResult> {
  machine.actions.start();
  try {
    machine.actions.advance('validate');
    const { userId, requiresMfa } = await deps.validateCredentials(
      input.identifier,
      input.password
    );

    if (requiresMfa) {
      if (!input.mfaCode) {
        machine.actions.fail('MFA code required');
        throw new AuthFlowError('login', 'mfa', 'MFA code required');
      }
      machine.actions.advance('mfa');
      const { ok } = await deps.verifyMfa(userId, input.mfaCode);
      if (!ok) {
        machine.actions.fail('Invalid MFA code');
        throw new AuthFlowError('login', 'mfa', 'Invalid MFA code');
      }
    }

    machine.actions.advance('token-issue');
    const tokens = await deps.issueTokens(userId);
    machine.actions.advance('complete');

    return { userId, ...tokens };
  } catch (err) {
    if (err instanceof AuthFlowError) throw err;
    machine.actions.fail(err instanceof Error ? err.message : 'Login failed');
    throw new AuthFlowError(
      'login',
      'unknown',
      err instanceof Error ? err.message : 'Login failed',
      err
    );
  }
}
