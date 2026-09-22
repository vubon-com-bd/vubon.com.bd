import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CART_QUEUE, type CartExpiryJobPayload } from '../queues/cart.queue';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../persistence/prisma/prisma.service';

@Injectable()
export class CartCleanupWorker implements OnModuleInit {
  private readonly logger = new Logger(CartCleanupWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<CartExpiryJobPayload>(
      CART_QUEUE,
      async (payload) => {
        this.logger.log(`Cleaning up cart ${payload.cartId}`);
        void this.redis;
        void this.prisma;
      },
      2,
    );
  }
}
