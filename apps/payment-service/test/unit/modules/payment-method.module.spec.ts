/**
 * PaymentMethodModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { PaymentMethodModule } from '@modules/payment-method/payment-method.module';
import { PaymentMethodController } from '@interfaces/controllers/rest/payment-method.controller';
import { PAYMENT_METHOD_COMMAND_HANDLERS } from '@modules/payment-method/commands';
import { PAYMENT_METHOD_QUERY_HANDLERS } from '@modules/payment-method/queries';
import { PAYMENT_METHOD_SERVICE } from '@application/services/interfaces/payment-method.service.interface';

describe('PaymentMethodModule', () => {
  it('is defined', () => {
    expect(PaymentMethodModule).toBeDefined();
  });

  it('registers PaymentMethodController', () => {
    const controllers = Reflect.getMetadata('controllers', PaymentMethodModule);
    expect(controllers).toContain(PaymentMethodController);
  });

  it('has 4 command handlers', () => {
    expect(PAYMENT_METHOD_COMMAND_HANDLERS).toHaveLength(4);
  });

  it('has 2 query handlers', () => {
    expect(PAYMENT_METHOD_QUERY_HANDLERS).toHaveLength(2);
  });

  it('exports PAYMENT_METHOD_SERVICE token', () => {
    const exports = Reflect.getMetadata('exports', PaymentMethodModule);
    expect(exports).toContain(PAYMENT_METHOD_SERVICE);
  });
});
