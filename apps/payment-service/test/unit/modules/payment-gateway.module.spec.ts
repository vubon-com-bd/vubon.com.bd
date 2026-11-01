/**
 * PaymentGatewayModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { PaymentGatewayModule } from '@modules/payment-gateway/payment-gateway.module';
import { PaymentGatewayController } from '@interfaces/controllers/rest/payment-gateway.controller';
import { PAYMENT_GATEWAY_QUERY_HANDLERS } from '@modules/payment-gateway/queries';

describe('PaymentGatewayModule', () => {
  it('is defined', () => {
    expect(PaymentGatewayModule).toBeDefined();
  });

  it('registers PaymentGatewayController', () => {
    const controllers = Reflect.getMetadata('controllers', PaymentGatewayModule);
    expect(controllers).toContain(PaymentGatewayController);
  });

  it('has 2 query handlers', () => {
    expect(PAYMENT_GATEWAY_QUERY_HANDLERS).toHaveLength(2);
  });
});
