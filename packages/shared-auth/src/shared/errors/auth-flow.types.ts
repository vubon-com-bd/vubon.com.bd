export type AuthFlowKind = 'login' | 'logout' | 'refresh' | 'register' | 'mfa';

export type AuthFlowStep =
  'start' | 'validate' | 'mfa' | 'token-issue' | 'session-create' | 'complete';
