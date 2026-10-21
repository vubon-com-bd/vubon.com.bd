/**
 * PaymentMethodProvider Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Represents the concrete provider implementation (bkash, stripe, etc.)
 * and its environment.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import {
  PAYMENT_GATEWAY,
  PAYMENT_GATEWAY_ENV,
} from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ProviderValue = (typeof PAYMENT_GATEWAY)[keyof typeof PAYMENT_GATEWAY];
export type ProviderEnvValue =
  (typeof PAYMENT_GATEWAY_ENV)[keyof typeof PAYMENT_GATEWAY_ENV];

const VALID_PROVIDERS: readonly string[] = Object.values(PAYMENT_GATEWAY);
const VALID_ENVS: readonly string[] = Object.values(PAYMENT_GATEWAY_ENV);

export interface PaymentMethodProviderValue {
  readonly provider: ProviderValue;
  readonly env: ProviderEnvValue;
}

export class PaymentMethodProviderVO extends BaseVO<PaymentMethodProviderValue> {
  private constructor(value: PaymentMethodProviderValue) {
    super(value);
  }

  static create(provider: string, env: string): PaymentMethodProviderVO {
    if (typeof provider !== 'string') {
      throw new ValidationError('Provider must be a string', 'provider');
    }
    if (typeof env !== 'string') {
      throw new ValidationError('ProviderEnv must be a string', 'env');
    }
    const p = provider.trim().toLowerCase();
    const e = env.trim().toLowerCase();
    if (!VALID_PROVIDERS.includes(p)) {
      throw new ValidationError(
        `Invalid provider "${p}". Allowed: ${VALID_PROVIDERS.join(', ')}`,
        'provider',
      );
    }
    if (!VALID_ENVS.includes(e)) {
      throw new ValidationError(
        `Invalid provider env "${e}". Allowed: ${VALID_ENVS.join(', ')}`,
        'env',
      );
    }
    return new PaymentMethodProviderVO({
      provider: p as ProviderValue,
      env: e as ProviderEnvValue,
    });
  }

  static reconstitute(
    provider: ProviderValue,
    env: ProviderEnvValue,
  ): PaymentMethodProviderVO {
    return new PaymentMethodProviderVO({ provider, env });
  }

  get provider(): ProviderValue { return this.value.provider; }
  get env(): ProviderEnvValue { return this.value.env; }

  isSandbox(): boolean { return this.env === PAYMENT_GATEWAY_ENV.SANDBOX; }
  isProduction(): boolean { return this.env === PAYMENT_GATEWAY_ENV.PRODUCTION; }
  isBkash(): boolean { return this.provider === PAYMENT_GATEWAY.BKASH; }
  isNagad(): boolean { return this.provider === PAYMENT_GATEWAY.NAGAD; }
  isStripe(): boolean { return this.provider === PAYMENT_GATEWAY.STRIPE; }
  isManual(): boolean { return this.provider === PAYMENT_GATEWAY.MANUAL; }
}
