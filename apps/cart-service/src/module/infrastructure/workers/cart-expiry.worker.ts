import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService, RedisService } from '@vubon/shared-kernel/infrastructure';
import { CART_QUEUE, type CartExpiryJobPayload } from '../queues/cart.queue';
import { CART_EXPIRY_CONFIG } from '../config/cart-expiry.config';

@Injectable()
export class CartExpiryWorker implements OnModuleInit {
  private readonly logger = new Logger(CartExpiryWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly redis: RedisService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<CartExpiryJobPayload>(
      CART_QUEUE,
      async (payload) => {
        this.logger.log(`Expiring cart ${payload.cartId}`);
        const key = `cart:${payload.cartId}`;
        await this.redis.del(key);
        void CART_EXPIRY_CONFIG;
      },
      5,
    );
  }
}
