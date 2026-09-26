import { AuthFlowError } from '../errors/auth-flow.error';

export interface RegisterFlowInput {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}

export interface RegisterFlowDeps {
  readonly createAccount: (input: RegisterFlowInput) => Promise<{
    readonly userId: string;
    readonly verificationRequired: boolean;
  }>;
  readonly sendVerification?: (userId: string) => Promise<void>;
}

export async function registerFlow(
  input: RegisterFlowInput,
  deps: RegisterFlowDeps
): Promise<{ readonly userId: string; readonly verificationRequired: boolean }> {
  try {
    const result = await deps.createAccount(input);
    if (result.verificationRequired && deps.sendVerification) {
      await deps.sendVerification(result.userId);
    }
    return result;
  } catch (err) {
    throw new AuthFlowError(
      'register',
      'validate',
      err instanceof Error ? err.message : 'Registration failed',
      err
    );
  }
}
