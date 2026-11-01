export type TrainingStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export interface TrainingStartRequest {
  readonly modelId: string;
  readonly datasetId: string;
  readonly hyperparams?: Record<string, unknown>;
}

export interface TrainingStartResponse {
  readonly jobId: string;
  readonly status: TrainingStatus;
  readonly startedAt: string;
}

export interface TrainingJob {
  readonly jobId: string;
  readonly modelId: string;
  readonly status: TrainingStatus;
  readonly progress: number;
  readonly startedAt: string;
  readonly finishedAt?: string;
  readonly error?: string;
}
