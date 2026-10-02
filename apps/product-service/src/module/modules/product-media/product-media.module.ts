/**
 * ProductMediaModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { ProductMediaController } from '../../interfaces/controllers/rest/product-media.controller.js';
import { MediaService } from '../../application/services/impl/media.service.js';
import { MEDIA_SERVICE } from '../../application/services/interfaces/media.service.interface.js';
import { MEDIA_QUERY_HANDLERS } from '../../application/queries/media/index.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [ProductMediaController],
  providers: [
    MediaService,
    { provide: MEDIA_SERVICE, useExisting: MediaService },
    ...MEDIA_QUERY_HANDLERS],
  exports: [MediaService, MEDIA_SERVICE],
})
export class ProductMediaModule {}
