/**
 * WalletAddress Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * For mobile wallets (bKash/Nagad/Rocket) and crypto wallets.
 * Format varies by wallet type — validated by caller-supplied regex.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface WalletAddressValue {
  readonly address: string;
  readonly network: string;
}

const MIN_LENGTH = 6;
const MAX_LENGTH = 128;

export class WalletAddressVO extends BaseVO<WalletAddressValue> {
  private constructor(value: WalletAddressValue) {
    super(value);
  }

  static create(address: string, network = 'generic'): WalletAddressVO {
    if (typeof address !== 'string' || address.trim().length === 0) {
      throw new ValidationError('WalletAddress cannot be empty', 'address');
    }
    const trimmed = address.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `WalletAddress must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'address',
      );
    }
    if (typeof network !== 'string' || network.trim().length === 0) {
      throw new ValidationError('WalletAddress network required', 'network');
    }
    return new WalletAddressVO({
      address: trimmed,
      network: network.trim().toLowerCase(),
    });
  }

  static reconstitute(address: string, network: string): WalletAddressVO {
    return new WalletAddressVO({ address, network });
  }

  get address(): string { return this.value.address; }
  get network(): string { return this.value.network; }

  isMobileWallet(): boolean {
    return ['bkash', 'nagad', 'rocket', 'upay', 'surecash'].includes(this.network);
  }

  isCrypto(): boolean {
    return ['btc', 'eth', 'usdt', 'bsc'].includes(this.network);
  }

  mask(): string {
    if (this.address.length <= 6) return '******';
    return `${this.address.slice(0, 4)}***${this.address.slice(-2)}`;
  }
}
