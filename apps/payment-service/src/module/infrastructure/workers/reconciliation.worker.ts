import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QueryBus } from '@nestjs/cqrs';
import { ListPaymentsQuery } from '../../application/queries/payment/list-payments.query';

@Injectable()
export class ReconciliationWorker implements OnModuleInit {
  private readonly logger = new Logger(ReconciliationWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ windowHours: number }>(
      'payment',
      async (payload) => {
        this.logger.log(`Starting reconciliation (window=${payload.windowHours}h)`);
        try {
          await this.queryBus.execute(new ListPaymentsQuery(1, 1000));
        } catch (error) {
          this.logger.error('Reconciliation failed', error);
          throw error;
        }
      },
      1,
    );
  }
}
