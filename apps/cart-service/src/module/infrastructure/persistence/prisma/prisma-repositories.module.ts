/**
 * PrismaRepositoriesModule — binds Prisma repos to domain tokens
 * @module cart-service/infrastructure/persistence/prisma
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/prisma';

import { SavedForLaterPrismaRepository } from './repositories/saved-for-later.prisma.repository.js';
import { AbandonedCartPrismaRepository } from './repositories/abandoned-cart.prisma.repository.js';
import { CartMergerPrismaRepository } from './repositories/cart-merger.prisma.repository.js';

import { SAVED_FOR_LATER_REPOSITORY } from '../../../domain/repositories/saved-for-later.repository.interface.js';
import { ABANDONED_CART_REPOSITORY } from '../../../domain/repositories/abandoned-cart.repository.interface.js';
import { CART_MERGER_REPOSITORY } from '../../../domain/repositories/cart-merger.repository.interface.js';

const PROVIDERS = [
  { provide: SAVED_FOR_LATER_REPOSITORY, useClass: SavedForLaterPrismaRepository },
  { provide: ABANDONED_CART_REPOSITORY, useClass: AbandonedCartPrismaRepository },
  { provide: CART_MERGER_REPOSITORY, useClass: CartMergerPrismaRepository },
];

@Module({
  imports: [PrismaModule],
  providers: [...PROVIDERS, SavedForLaterPrismaRepository, AbandonedCartPrismaRepository, CartMergerPrismaRepository],
  exports: [...PROVIDERS, PrismaModule],
})
export class PrismaRepositoriesModule {}
