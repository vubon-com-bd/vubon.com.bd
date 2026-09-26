export interface BroadcastResponseDTO {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly target: string;
  readonly content: string;
  readonly scheduledAt: string | null;
  readonly startedAt: string | null;
  readonly completedAt: string | null;
  readonly createdAt: string;
}
