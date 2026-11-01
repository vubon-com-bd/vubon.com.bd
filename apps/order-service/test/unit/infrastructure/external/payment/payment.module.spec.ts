/**
 * OrderPaymentModule Tests
 * @module order-service/test/unit/infrastructure/external/payment
 */
import { Test } from '@nestjs/testing';
import { OrderPaymentModule } from '@infrastructure/external/payment/payment.module.js';
import { PaymentService } from '@infrastructure/external/payment/payment.service.js';

describe('OrderPaymentModule', () => {
  it('should be defined', () => {
    expect(OrderPaymentModule).toBeDefined();
  });

  it('should provide PaymentService', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrderPaymentModule],
    }).compile();

    const service = moduleRef.get(PaymentService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(PaymentService);

    await moduleRef.close();
  });
});
