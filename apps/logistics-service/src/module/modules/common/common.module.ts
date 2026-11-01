/**
 * CommonModule — global shared providers
 * @module logistics-service/modules/common
 *
 * ⚠️ @Global() — re-exports InfrastructureModule (already global) + Kernel
 * ⚠️ Provides common utility services to all feature modules
 */
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [],
  exports: [CqrsModule],
})
export class CommonModule {}
