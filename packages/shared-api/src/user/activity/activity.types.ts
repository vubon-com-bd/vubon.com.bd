export type ActivityType =
  'login' | 'logout' | 'password_change' | 'profile_update' | 'order_placed';

export interface ActivityEntry {
  readonly id: string;
  readonly type: ActivityType;
  readonly description: string;
  readonly ip?: string;
  readonly userAgent?: string;
  readonly createdAt: string;
}

export interface ActivityListResponse {
  readonly activities: readonly ActivityEntry[];
  readonly total: number;
}
