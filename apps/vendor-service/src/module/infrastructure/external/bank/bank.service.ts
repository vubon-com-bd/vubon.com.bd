/**
 * BankService — dispatch to correct provider
 * @module vendor-service/infrastructure/external/bank
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  BankProvider,
  type BankTransferInput,
  type BankTransferResult,
} from './providers/base.provider.js';

export const BANK_PROVIDERS = Symbol('BANK_PROVIDERS');

@Injectable()
export class BankService {
  private readonly logger = new Logger(BankService.name);
  private readonly registry: Map<string, BankProvider>;

  constructor(
    providers: readonly BankProvider[],
  ) {
    this.registry = new Map(providers.map((p) => [p.providerId, p]));
  }

  resolve(providerId: string): BankProvider | null {
    const p = this.registry.get(providerId);
    if (!p) {
      this.logger.warn(`Bank provider "${providerId}" not registered`);
      return null;
    }
    return p;
  }

  async transfer(providerId: string, input: BankTransferInput): Promise<BankTransferResult> {
    const provider = this.resolve(providerId);
    if (!provider) {
      return { success: false, error: 'provider-not-found', errorCode: 'NOT_REGISTERED' };
    }
    if (!provider.isEnabled()) {
      return { success: false, error: `${providerId} disabled`, errorCode: 'DISABLED' };
    }
    return provider.transfer(input);
  }

  enabledProviders(): readonly string[] {
    return [...this.registry.values()].filter((p) => p.isEnabled()).map((p) => p.providerId);
  }
}
