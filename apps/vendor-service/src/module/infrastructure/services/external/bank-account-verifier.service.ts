/**
 * BankAccountVerifierService — verify bank & mobile-banking accounts
 * @module vendor-service/infrastructure/services/external
 *
 * In production, this calls the actual bank API or a KYC provider.
 * Sandbox mode: deterministic success based on account number pattern.
 */
import { Injectable, Logger } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface BankVerificationResult {
  readonly verified: boolean;
  readonly accountHolderName?: string;
  readonly bankName?: string;
  readonly reason?: string;
  readonly referenceId: string;
  readonly verifiedAt: string;
}

export interface MobileBankingVerificationResult {
  readonly verified: boolean;
  readonly provider: string;
  readonly accountHolderName?: string;
  readonly reason?: string;
  readonly referenceId: string;
  readonly verifiedAt: string;
}

@Injectable()
export class BankAccountVerifierService {
  private readonly logger = new Logger(BankAccountVerifierService.name);

  async verifyBankAccount(input: {
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;
    bankName: string;
  }): Promise<BankVerificationResult> {
    const now = new Date().toISOString();
    const refId = `bav_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    if (input.accountNumber.length < 8) {
      return {
        verified: false,
        reason: 'account_number_too_short',
        referenceId: refId,
        verifiedAt: now,
      };
    }
    if (!/^\d{9}$/.test(input.routingNumber)) {
      return {
        verified: false,
        reason: 'invalid_routing_number',
        referenceId: refId,
        verifiedAt: now,
      };
    }

    this.logger.log(`Bank verification requested: ${refId}`);
    // Sandbox: always succeed if format valid
    return {
      verified: true,
      accountHolderName: input.accountHolderName,
      bankName: input.bankName,
      referenceId: refId,
      verifiedAt: now,
    };
  }

  async verifyMobileBanking(input: {
    number: string;
    provider: 'bkash' | 'nagad' | 'rocket';
    accountHolderName: string;
  }): Promise<MobileBankingVerificationResult> {
    const now = new Date().toISOString();
    const refId = `mbv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const digits = input.number.replace(/\D+/g, '');

    if (!/^01[3-9]\d{8}$/.test(digits) && !/^8801[3-9]\d{8}$/.test(digits)) {
      return {
        verified: false,
        provider: input.provider,
        reason: 'invalid_mobile_number',
        referenceId: refId,
        verifiedAt: now,
      };
    }

    this.logger.log(`Mobile banking verification: ${input.provider} ${refId}`);
    return {
      verified: true,
      provider: input.provider,
      accountHolderName: input.accountHolderName,
      referenceId: refId,
      verifiedAt: now,
    };
  }

  async assertVerified(input: {
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;
    bankName: string;
  }): Promise<void> {
    const result = await this.verifyBankAccount(input);
    if (!result.verified) {
      throw new BusinessRuleError(
        `Bank account verification failed: ${result.reason}`,
        'BANK_ACCOUNT_VERIFICATION_FAILED',
        { referenceId: result.referenceId, reason: result.reason },
      );
    }
  }
}
