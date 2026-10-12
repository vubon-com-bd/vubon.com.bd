/**
 * User Contact Feature Module
 * @module identity-service/modules/user-contact
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserContactController } from '../../interfaces/controllers/rest/user-contact.controller.js';
import { USER_CONTACT_COMMAND_HANDLERS } from './commands/index.js';
import { USER_CONTACT_QUERY_HANDLERS } from './queries/index.js';

import { UserContactService } from '../../application/services/impl/user-contact.service.js';
import { USER_CONTACT_SERVICE } from '../../application/services/interfaces/user-contact.service.interface.js';

const SERVICES = [
  UserContactService,
  { provide: USER_CONTACT_SERVICE, useExisting: UserContactService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserContactController],
  providers: [
    ...SERVICES,
    ...(USER_CONTACT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(USER_CONTACT_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserContactModule {}
