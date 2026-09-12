import { BaseEntity } from '../../common/base.types';
import { PAYMENT_METHOD } from '@vubon/shared-constants/src/business/payment/payment-method.constants';

export interface PaymentMethodConfig {
  apiKey?: string;
  apiSecret?: string;
  merchantId?: string;
  returnUrl: string;
  cancelUrl: string;
  webhookUrl: string;
  timeout: number;
  retryAttempts: number;
}

export interface PaymentMethod extends BaseEntity {
  methodId: string;
  type: keyof typeof PAYMENT_METHOD.TYPES | string;
  category: keyof typeof PAYMENT_METHOD.CATEGORIES | string;
  name: string;
  code: string;
  icon?: string;
  isActive: boolean;
  isDefault: boolean;
  config: PaymentMethodConfig;
  metadata: Record<string, unknown>;
}
