import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductMediaController } from '../../interfaces/controllers/rest/product-media.controller';
import { ProductMediaService } from '../../application/services/impl/product-media.service';
import { ProductMediaPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-media.prisma.repository';
import { MediaProcessorService } from '../../infrastructure/services/internal/media-processor.service';
import { StorageService } from '../../infrastructure/services/external/storage.service';

@Module({
  imports: [CqrsModule],
  controllers: [ProductMediaController],
  providers: [
    ProductMediaPrismaRepository,
    MediaProcessorService,
    StorageService,
    ProductMediaService,
  ],
  exports: [ProductMediaService, ProductMediaPrismaRepository],
})
export class ProductMediaModule {}
