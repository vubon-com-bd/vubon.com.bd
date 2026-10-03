export interface DashboardWidget {
  readonly id: string;
  readonly type: 'chart' | 'table' | 'metric' | 'list';
  readonly title: string;
  readonly config: Record<string, unknown>;
  readonly data?: unknown;
}

export interface Dashboard {
  readonly id: string;
  readonly name: string;
  readonly widgets: readonly DashboardWidget[];
  readonly updatedAt: string;
}
