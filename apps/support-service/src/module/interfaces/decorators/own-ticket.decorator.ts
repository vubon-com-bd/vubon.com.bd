/**
 * OwnTicket decorator — marks handler as requiring ownership
 * @module support-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const OWN_TICKET_KEY = 'own_ticket';
export const OwnTicket = (): MethodDecorator =>
  SetMetadata(OWN_TICKET_KEY, true);
