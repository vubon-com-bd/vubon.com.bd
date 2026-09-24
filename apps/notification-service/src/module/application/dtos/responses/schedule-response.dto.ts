export interface ScheduleResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly frequency: string;
  readonly status: string;
  readonly nextRunAt: string;
  readonly lastRunAt: string | null;
  readonly createdAt: string;
}
