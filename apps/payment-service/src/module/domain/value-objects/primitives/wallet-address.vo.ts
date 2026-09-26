import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class WalletAddressVO extends BaseCodeVO {
  static create(value: string): WalletAddressVO {
    if (!value || value.trim().length < 8) {
      throw new Error('Invalid wallet address');
    }
    if (value.length > 255) {
      throw new Error('Wallet address too long');
    }
    return new WalletAddressVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
