/**
 * PublicOrderModule — public read-only order access
 * @module order-service/modules/public-order
 *
 * Currently empty — public endpoints live in TrackingController with @Public().
 * Reserved for future public order-view endpoints.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
})
export class PublicOrderModule {}
