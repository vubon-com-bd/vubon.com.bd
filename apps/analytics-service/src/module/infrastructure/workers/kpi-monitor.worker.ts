import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class KpiMonitorWorker implements OnModuleInit {
  private readonly logger = new Logger(KpiMonitorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ kpiIds: string[] }>(
      'analytics:kpi:monitor',
      async (payload) => {
        this.logger.log(`Monitoring ${payload.kpiIds.length} KPIs`);
      },
      1,
    );
  }
}
