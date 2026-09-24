import { SetMetadata } from '@nestjs/common';

export const OWN_TICKET_KEY = 'ownTicket';
export const OwnTicket = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_TICKET_KEY, true);
