/**
 * SharedServicesModule — shared services across features
 * @module support-service/modules/common
 */
import { Global, Module } from '@nestjs/common';
import { UserClient } from '../../infrastructure/services/external/user.client';
import { NotificationClient } from '../../infrastructure/services/external/notification.client';
import { TicketNumberGeneratorService } from '../../infrastructure/services/internal/ticket-number-generator.service';

@Global()
@Module({
  providers: [UserClient, NotificationClient, TicketNumberGeneratorService],
  exports: [UserClient, NotificationClient, TicketNumberGeneratorService],
})
export class SharedServicesModule {}
