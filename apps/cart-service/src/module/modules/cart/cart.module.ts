import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Controllers
import { CartController } from '../../interfaces/controllers/rest/cart.controller';
import { CartTotalsController } from '../../interfaces/controllers/rest/cart-totals.controller';

// Command handlers
import { CreateCartHandler } from '../../application/commands/cart/create-cart.handler';
import { UpdateCartHandler } from '../../application/commands/cart/update-cart.handler';
import { ClearCartHandler } from '../../application/commands/cart/clear-cart.handler';
import { DeleteCartHandler } from '../../application/commands/cart/delete-cart.handler';
import { RecoverCartHandler } from '../../application/commands/cart/recover-cart.handler';

// Query handlers
import { GetCartHandler } from '../../application/queries/cart/get-cart.handler';
import { GetCartByUserHandler } from '../../application/queries/cart/get-cart-by-user.handler';
import { GetCartSummaryHandler } from '../../application/queries/cart/get-cart-summary.handler';
import { GetCartCountHandler } from '../../application/queries/cart/get-cart-count.handler';
import { GetTotalsHandler } from '../../application/queries/totals/get-totals.handler';

// Services
import { CartService } from '../../application/services/impl/cart.service';

// Mappers
import { CartControllerMapper } from '../../interfaces/mappers/cart.controller.mapper';
import { TotalsControllerMapper } from '../../interfaces/mappers/totals.controller.mapper';

// Guards
import { OwnCartGuard } from '../../interfaces/guards/own-cart.guard';

// Health
import { CartHealthIndicator } from './health/cart.health';

@Module({
  imports: [CqrsModule],
  controllers: [CartController, CartTotalsController],
  providers: [
    CartService,
    CartControllerMapper,
    TotalsControllerMapper,
    OwnCartGuard,
    CreateCartHandler,
    UpdateCartHandler,
    ClearCartHandler,
    DeleteCartHandler,
    RecoverCartHandler,
    GetCartHandler,
    GetCartByUserHandler,
    GetCartSummaryHandler,
    GetCartCountHandler,
    GetTotalsHandler,
    CartHealthIndicator,
  ],
  exports: [CartService],
})
export class CartModule {}
