export interface Report {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly createdAt: string;
  readonly createdBy: string;
}

export interface ReportListResponse {
  readonly reports: readonly Report[];
  readonly total: number;
}
