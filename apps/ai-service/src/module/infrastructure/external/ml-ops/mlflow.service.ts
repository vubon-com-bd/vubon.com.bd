import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export interface MlflowRunInput {
  readonly experimentName: string;
  readonly runName: string;
  readonly params: Readonly<Record<string, string | number>>;
  readonly metrics: Readonly<Record<string, number>>;
}

@Injectable()
export class MlflowService {
  private readonly logger = new Logger(MlflowService.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('MLFLOW_URL', 'http://localhost:5000'),
      timeout: getOptionalEnvInt('MLFLOW_TIMEOUT_MS', 10000),
    });
  }

  async logRun(input: MlflowRunInput): Promise<string> {
    try {
      this.logger.log(`MLflow log: ${input.experimentName}/${input.runName}`);
      return `run-${Date.now()}`;
    } catch (error) {
      this.logger.warn('MLflow log failed', error);
      return '';
    }
  }

  async logMetric(runId: string, key: string, value: number): Promise<void> {
    this.logger.log(`MLflow metric: ${runId} ${key}=${value}`);
  }

  async logArtifact(runId: string, artifactPath: string): Promise<void> {
    this.logger.log(`MLflow artifact: ${runId} ${artifactPath}`);
  }
}
