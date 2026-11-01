/**
 * OrderShippingModule Tests
 * @module order-service/test/unit/infrastructure/external/shipping
 */
import { Test } from '@nestjs/testing';
import { OrderShippingModule } from '@infrastructure/external/shipping/shipping.module.js';
import { ShippingService } from '@infrastructure/external/shipping/shipping.service.js';

describe('OrderShippingModule', () => {
  it('should be defined', () => {
    expect(OrderShippingModule).toBeDefined();
  });

  it('should provide ShippingService', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrderShippingModule],
    }).compile();

    const service = moduleRef.get(ShippingService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(ShippingService);

    await moduleRef.close();
  });
});
