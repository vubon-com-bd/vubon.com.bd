import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GuestCartController } from '../../interfaces/controllers/rest/guest-cart.controller';
import { GuestCartService } from '../../application/services/impl/guest-cart.service';
import { CreateGuestCartHandler } from '../../application/commands/guest/create-guest-cart.handler';
import { MergeGuestCartHandler } from '../../application/commands/guest/merge-guest-cart.handler';

@Module({
  imports: [CqrsModule],
  controllers: [GuestCartController],
  providers: [
    GuestCartService,
    CreateGuestCartHandler,
    MergeGuestCartHandler,
  ],
  exports: [GuestCartService],
})
export class GuestCartModule {}
