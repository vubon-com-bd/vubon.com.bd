import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'down';
  uptime: number;
  timestamp: string;
  services: {
    database: 'up' | 'down';
    redis: 'up' | 'down';
    cache: 'up' | 'down';
    queue: 'up' | 'down';
  };
  version: string;
}

export interface HealthCheckOptions {
  includeDetails: boolean;
  services: string[];
  timeout: number;
}

export class HealthEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async getHealth(options?: Partial<HealthCheckOptions>): Promise<HealthStatus> {
    const params: Record<string, string> = {};
    if (options?.includeDetails !== undefined) {
      params.details = String(options.includeDetails);
    }
    if (options?.services) {
      params.services = options.services.join(',');
    }
    if (options?.timeout) {
      params.timeout = String(options.timeout);
    }

    return this.client.get<HealthStatus>('/health', { params });
  }

  async getLiveness(): Promise<{ status: string }> {
    return this.client.get<{ status: string }>('/health/live');
  }

  async getReadiness(): Promise<{ status: string; services: Record<string, boolean> }> {
    return this.client.get<{ status: string; services: Record<string, boolean> }>('/health/ready');
  }

  async getMetrics(): Promise<{
    memory: { used: number; total: number; percentage: number };
    cpu: { usage: number; cores: number };
    requests: { total: number; rate: number };
    errors: { total: number; rate: number };
  }> {
    return this.client.get('/health/metrics');
  }

  async ping(): Promise<{ pong: string }> {
    return this.client.get<{ pong: string }>('/ping');
  }
}
