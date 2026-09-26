import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SavedForLaterController } from '../../interfaces/controllers/rest/saved-for-later.controller';
import { SavedForLaterService } from '../../application/services/impl/saved-for-later.service';
import { SaveForLaterHandler } from '../../application/commands/saved/save-for-later.handler';
import { MoveToCartHandler } from '../../application/commands/saved/move-to-cart.handler';
import { RemoveSavedHandler } from '../../application/commands/saved/remove-saved.handler';
import { ListSavedHandler } from '../../application/queries/saved/list-saved.handler';

@Module({
  imports: [CqrsModule],
  controllers: [SavedForLaterController],
  providers: [
    SavedForLaterService,
    SaveForLaterHandler,
    MoveToCartHandler,
    RemoveSavedHandler,
    ListSavedHandler,
  ],
  exports: [SavedForLaterService],
})
export class SavedForLaterModule {}
