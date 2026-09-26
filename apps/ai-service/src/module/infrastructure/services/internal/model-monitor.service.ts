import { Injectable, Logger } from '@nestjs/common';

interface MetricEntry {
  readonly metric: string;
  readonly value: number;
  readonly timestamp: Date;
}

@Injectable()
export class ModelMonitorService {
  private readonly logger = new Logger(ModelMonitorService.name);
  private readonly history = new Map<string, MetricEntry[]>();

  record(modelId: string, metric: string, value: number): void {
    const list = this.history.get(modelId) ?? [];
    list.push({ metric, value, timestamp: new Date() });
    if (list.length > 1000) list.shift();
    this.history.set(modelId, list);
  }

  getHistory(modelId: string): readonly MetricEntry[] {
    return this.history.get(modelId) ?? [];
  }

  getAverage(modelId: string, metric: string): number {
    const list = (this.history.get(modelId) ?? []).filter((e) => e.metric === metric);
    if (list.length === 0) return 0;
    return list.reduce((s, e) => s + e.value, 0) / list.length;
  }
}
