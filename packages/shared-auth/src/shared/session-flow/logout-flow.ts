export interface LogoutFlowDeps {
  readonly revokeSession: (sessionId: string) => Promise<void>;
  readonly clearClient: () => void;
}

export async function logoutFlow(sessionId: string, deps: LogoutFlowDeps): Promise<void> {
  try {
    await deps.revokeSession(sessionId);
  } finally {
    deps.clearClient();
  }
}
