import { AuthFlowError } from '../errors/auth-flow.error';

export interface MfaFlowDeps {
  readonly challenge: (userId: string, method: string) => Promise<{ readonly challengeId: string }>;
  readonly verify: (
    userId: string,
    challengeId: string,
    code: string
  ) => Promise<{ readonly ok: boolean }>;
}

export async function mfaFlow(
  userId: string,
  method: string,
  code: string,
  deps: MfaFlowDeps
): Promise<void> {
  const { challengeId } = await deps.challenge(userId, method);
  const { ok } = await deps.verify(userId, challengeId, code);
  if (!ok) throw new AuthFlowError('mfa', 'validate', 'Invalid MFA code');
}
