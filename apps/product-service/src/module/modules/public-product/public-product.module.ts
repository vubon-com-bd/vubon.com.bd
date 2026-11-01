/**
 * PublicProductModule — public product endpoints (no auth)
 * @module product-service/modules/public-product
 *
 * Note: PublicProductController is registered inside ProductModule,
 * so this module exists only as a placeholder for future public-only
 * endpoints (e.g., sitemap, feed).
 */
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
})
export class PublicProductModule {}
