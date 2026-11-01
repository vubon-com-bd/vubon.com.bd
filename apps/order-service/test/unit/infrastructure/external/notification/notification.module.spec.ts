/**
 * OrderNotificationModule Tests
 * @module order-service/test/unit/infrastructure/external/notification
 */
import { Test } from '@nestjs/testing';
import { OrderNotificationModule } from '@infrastructure/external/notification/notification.module.js';
import { NotificationService } from '@infrastructure/external/notification/notification.service.js';

describe('OrderNotificationModule', () => {
  it('should be defined', () => {
    expect(OrderNotificationModule).toBeDefined();
  });

  it('should provide NotificationService', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrderNotificationModule],
    }).compile();

    const service = moduleRef.get(NotificationService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(NotificationService);

    await moduleRef.close();
  });
});
