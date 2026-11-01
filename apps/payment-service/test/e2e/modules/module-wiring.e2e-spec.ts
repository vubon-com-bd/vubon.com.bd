/**
 * Module wiring — E2E (all feature modules valid)
 * @module test/e2e/modules
 */
import 'reflect-metadata';
import { PaymentModule } from '@modules/payment';
import { PaymentMethodModule } from '@modules/payment-method';
import { PaymentGatewayModule } from '@modules/payment-gateway';
import { TransactionModule } from '@modules/transaction';
import { RefundModule } from '@modules/refund';
import { SplitPaymentModule } from '@modules/split-payment';
import { RecurringPaymentModule } from '@modules/recurring-payment';
import { SubscriptionModule } from '@modules/subscription';
import { InvoiceModule } from '@modules/invoice';
import { WebhookModule } from '@modules/webhook';
import { GatewayModule } from '@modules/gateway';
import { HealthModule } from '@modules/health';
import { PaymentCommonModule } from '@modules/common';

describe('Module Wiring (E2E)', () => {
  it.each([
    ['PaymentModule', PaymentModule],
    ['PaymentMethodModule', PaymentMethodModule],
    ['PaymentGatewayModule', PaymentGatewayModule],
    ['TransactionModule', TransactionModule],
    ['RefundModule', RefundModule],
    ['SplitPaymentModule', SplitPaymentModule],
    ['RecurringPaymentModule', RecurringPaymentModule],
    ['SubscriptionModule', SubscriptionModule],
    ['InvoiceModule', InvoiceModule],
    ['WebhookModule', WebhookModule],
    ['GatewayModule', GatewayModule],
    ['HealthModule', HealthModule],
    ['PaymentCommonModule', PaymentCommonModule],
  ])('%s is a valid NestJS module', (_name, mod) => {
    expect(mod).toBeDefined();
    const imports = Reflect.getMetadata('imports', mod);
    const providers = Reflect.getMetadata('providers', mod);
    const controllers = Reflect.getMetadata('controllers', mod);
    const exports = Reflect.getMetadata('exports', mod);
    // at least one of these metadata keys exists
    expect(imports || providers || controllers || exports).toBeDefined();
  });
});
