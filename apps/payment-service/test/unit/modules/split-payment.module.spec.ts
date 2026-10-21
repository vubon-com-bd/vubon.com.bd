/**
 * SplitPaymentModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { SplitPaymentModule } from '@modules/split-payment/split-payment.module';
import { SplitPaymentController } from '@interfaces/controllers/rest/split-payment.controller';
import { SPLIT_PAYMENT_COMMAND_HANDLERS } from '@modules/split-payment/commands';

describe('SplitPaymentModule', () => {
  it('is defined', () => {
    expect(SplitPaymentModule).toBeDefined();
  });

  it('registers SplitPaymentController', () => {
    const controllers = Reflect.getMetadata('controllers', SplitPaymentModule);
    expect(controllers).toContain(SplitPaymentController);
  });

  it('has 1 command handler', () => {
    expect(SPLIT_PAYMENT_COMMAND_HANDLERS).toHaveLength(1);
  });
});
