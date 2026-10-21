/**
 * PaymentModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { PaymentModule } from '@modules/payment/payment.module';
import { PaymentController } from '@interfaces/controllers/rest/payment.controller';
import { PAYMENT_COMMAND_HANDLERS } from '@modules/payment/commands';
import { PAYMENT_QUERY_HANDLERS } from '@modules/payment/queries';
import { PAYMENT_SAGAS } from '@modules/payment/sagas';
import { PAYMENT_SERVICE } from '@application/services/interfaces/payment.service.interface';

describe('PaymentModule', () => {
  it('is defined', () => {
    expect(PaymentModule).toBeDefined();
  });

  it('registers PaymentController', () => {
    const controllers = Reflect.getMetadata('controllers', PaymentModule);
    expect(controllers).toContain(PaymentController);
  });

  it('has 5 command handlers', () => {
    expect(PAYMENT_COMMAND_HANDLERS).toHaveLength(5);
  });

  it('has 4 query handlers', () => {
    expect(PAYMENT_QUERY_HANDLERS).toHaveLength(4);
  });

  it('has 1 saga', () => {
    expect(PAYMENT_SAGAS).toHaveLength(1);
  });

  it('exports PAYMENT_SERVICE token', () => {
    const exports = Reflect.getMetadata('exports', PaymentModule);
    expect(exports).toContain(PAYMENT_SERVICE);
  });
});
