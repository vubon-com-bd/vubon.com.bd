/**
 * InsuranceClaimSaga
 * Events: logistics.insurance.claim_submitted, claim_reviewed, claim_approved, claim_rejected, claim_paid
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { ProcessRefundCommand } from './commands/process-refund.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

interface EvtLike {
  readonly type: string;
  readonly payload?: {
    readonly insuranceId?: string;
    readonly claimId?: string;
    readonly claimNumber?: string;
    readonly amount?: number;
    readonly approvedAmount?: number;
    readonly currency?: string;
    readonly reason?: string;
    readonly [k: string]: unknown;
  };
}

@Injectable()
export class InsuranceClaimSaga implements OnModuleInit {
  private readonly logger = new Logger(InsuranceClaimSaga.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('logistics.insurance.claim_submitted', async (e) => {
      try { await this.onSubmitted(e as EvtLike); }
      catch (err) { this.logError('insurance.submitted', err); }
    });
    this.eventBus.registerHandler('logistics.insurance.claim_approved', async (e) => {
      try { await this.onApproved(e as EvtLike); }
      catch (err) { this.logError('insurance.approved', err); }
    });
    this.eventBus.registerHandler('logistics.insurance.claim_rejected', async (e) => {
      try { await this.onRejected(e as EvtLike); }
      catch (err) { this.logError('insurance.rejected', err); }
    });
    this.eventBus.registerHandler('logistics.insurance.claim_paid', async (e) => {
      try { await this.onPaid(e as EvtLike); }
      catch (err) { this.logError('insurance.paid', err); }
    });
    this.logger.log('✅ InsuranceClaimSaga registered (4 events)');
  }

  private async onSubmitted(evt: EvtLike): Promise<void> {
    const id = evt.payload?.insuranceId;
    if (!id) return;
    this.logger.log(`[saga] insurance.claim_submitted — insuranceId=${id}, claimId=${evt.payload?.claimId}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'insurance.claim_submitted', insuranceId: id, claimId: evt.payload?.claimId },
      }),
    );
  }

  private async onApproved(evt: EvtLike): Promise<void> {
    const id = evt.payload?.insuranceId;
    if (!id) return;
    this.logger.log(`[saga] insurance.claim_approved — insuranceId=${id}, amount=${evt.payload?.approvedAmount}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'insurance.claim_approved', insuranceId: id, claimId: evt.payload?.claimId },
      }),
    );
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'insurance.claim_approved', insuranceId: id },
      }),
    );
  }

  private async onRejected(evt: EvtLike): Promise<void> {
    const id = evt.payload?.insuranceId;
    if (!id) return;
    this.logger.log(`[saga] insurance.claim_rejected — insuranceId=${id}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'insurance.claim_rejected', insuranceId: id, reason: evt.payload?.reason },
      }),
    );
  }

  private async onPaid(evt: EvtLike): Promise<void> {
    const id = evt.payload?.insuranceId;
    if (!id) return;
    this.logger.log(`[saga] insurance.claim_paid — insuranceId=${id}`);
    await this.commandBus.execute(
      new ProcessRefundCommand({
        sagaId: id,
        metadata: {
          type: 'insurance.claim_paid',
          insuranceId: id,
          claimId: evt.payload?.claimId,
          refundAmount: evt.payload?.approvedAmount,
          refundCurrency: evt.payload?.currency,
        },
      }),
    );
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'insurance.claim_paid', insuranceId: id },
      }),
    );
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'insurance.claim_paid', insuranceId: id },
      }),
    );
  }

  private logError(action: string, err: unknown): void {
    const msg = err instanceof Error ? err.message : 'unknown';
    this.logger.error(`[saga] ${action} failed: ${msg}`);
  }
}
