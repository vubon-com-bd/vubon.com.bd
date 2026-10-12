/**
 * InsuranceClaimSaga — reacts to insurance claim events
 * @module logistics-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface InsuranceClaimContext {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly amount: number;
  readonly currency: string;
}

@Injectable()
export class InsuranceClaimSaga extends BaseSaga<InsuranceClaimContext> {
  readonly name = 'insurance-claim';
  private readonly logger = new Logger(InsuranceClaimSaga.name);

  async execute(input: InsuranceClaimContext): Promise<void> {
    this.setContext(input);
    this.logger.log(`Insurance claim saga started for ${input.insuranceId} (claim ${input.claimId})`);
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    this.logger.warn(`Insurance claim saga compensated for ${ctx?.insuranceId}`);
  }
}
