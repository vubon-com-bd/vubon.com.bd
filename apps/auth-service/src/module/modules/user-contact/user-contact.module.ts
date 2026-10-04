import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserContactController } from '../../interfaces/controllers/rest/user-contact.controller.js';
import { UserContactService } from '../../application/services/impl/user-contact.service.js';
import { UserContactPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-contact.prisma.repository.js';
import { AddContactHandler } from '../../application/commands/user/add-contact.handler.js';
import { UpdateContactHandler } from '../../application/commands/user/update-contact.handler.js';
import { DeleteContactHandler } from '../../application/commands/user/delete-contact.handler.js';
import { ListUserContactsHandler } from '../../application/queries/user/list-user-contacts.handler.js';
import { GetUserContactHandler } from '../../application/queries/user/get-user-contact.handler.js';
import {
  USER_CONTACT_REPO,
  USER_CONTACT_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: USER_CONTACT_REPO, useExisting: UserContactPrismaRepository },
  { provide: USER_CONTACT_SERVICE, useExisting: UserContactService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserContactController],
  providers: [
    UserContactService,
    UserContactPrismaRepository,
    AddContactHandler,
    UpdateContactHandler,
    DeleteContactHandler,
    ListUserContactsHandler,
    GetUserContactHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserContactService, UserContactPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserContactModule {}
