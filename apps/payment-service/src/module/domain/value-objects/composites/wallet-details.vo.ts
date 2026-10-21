/**
 * WalletDetails Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WalletAddressVO } from '@domain/primitives/wallet-address.vo';

export interface WalletDetailsVOProps {
  readonly wallet: WalletAddressVO;
  readonly holderName?: string;
  readonly provider: string;
  readonly isVerified: boolean;
}

export class WalletDetailsVO extends BaseVO<WalletDetailsVOProps> {
  private constructor(props: WalletDetailsVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: WalletDetailsVOProps): WalletDetailsVO {
    const vo = new WalletDetailsVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: WalletDetailsVOProps): WalletDetailsVO {
    return new WalletDetailsVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.provider || v.provider.trim().length === 0) {
      throw new ValidationError('Wallet provider required', 'provider');
    }
    if (v.holderName !== undefined && v.holderName.trim().length === 0) {
      throw new ValidationError('Wallet holderName cannot be blank', 'holderName');
    }
  }

  get wallet(): WalletAddressVO { return this.value.wallet; }
  get holderName(): string | undefined { return this.value.holderName; }
  get provider(): string { return this.value.provider; }
  get isVerified(): boolean { return this.value.isVerified; }

  display(): string {
    return `${this.provider.toUpperCase()} ${this.wallet.mask()}`;
  }
}
