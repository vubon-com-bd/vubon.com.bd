import { AuthFlowError } from '../errors/auth-flow.error';

export interface RefreshFlowDeps {
  readonly refresh: (refreshToken: string) => Promise<{
    readonly accessToken: string;
    readonly refreshToken?: string;
  }>;
}

export async function refreshFlow(
  refreshToken: string,
  deps: RefreshFlowDeps
): Promise<{ readonly accessToken: string; readonly refreshToken?: string }> {
  try {
    return await deps.refresh(refreshToken);
  } catch (err) {
    throw new AuthFlowError(
      'refresh',
      'token-issue',
      err instanceof Error ? err.message : 'Refresh failed',
      err
    );
  }
}
