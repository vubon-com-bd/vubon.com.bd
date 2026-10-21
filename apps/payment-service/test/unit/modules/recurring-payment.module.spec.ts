/**
 * RecurringPaymentModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { RecurringPaymentModule } from '@modules/recurring-payment/recurring-payment.module';
import { RecurringPaymentController } from '@interfaces/controllers/rest/recurring-payment.controller';
import { RECURRING_PAYMENT_COMMAND_HANDLERS } from '@modules/recurring-payment/commands';

describe('RecurringPaymentModule', () => {
  it('is defined', () => {
    expect(RecurringPaymentModule).toBeDefined();
  });

  it('registers RecurringPaymentController', () => {
    const controllers = Reflect.getMetadata('controllers', RecurringPaymentModule);
    expect(controllers).toContain(RecurringPaymentController);
  });

  it('has 3 command handlers', () => {
    expect(RECURRING_PAYMENT_COMMAND_HANDLERS).toHaveLength(3);
  });
});
