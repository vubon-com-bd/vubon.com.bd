export interface SessionInfo {
  readonly id: string;
  readonly deviceId: string;
  readonly userAgent: string;
  readonly ip: string;
  readonly createdAt: string;
  readonly lastActiveAt: string;
  readonly current: boolean;
}

export interface SessionListResponse {
  readonly sessions: readonly SessionInfo[];
}
