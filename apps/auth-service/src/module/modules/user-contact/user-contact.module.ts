import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserContactController } from '../../interfaces/controllers/rest/user-contact.controller';
import { UserContactService } from '../../application/services/impl/user-contact.service';
import { UserContactPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-contact.prisma.repository';
import { AddContactHandler } from '../../application/commands/user/add-contact.handler';
import { UpdateContactHandler } from '../../application/commands/user/update-contact.handler';
import { DeleteContactHandler } from '../../application/commands/user/delete-contact.handler';
import { ListUserContactsHandler } from '../../application/queries/user/list-user-contacts.handler';
import { GetUserContactHandler } from '../../application/queries/user/get-user-contact.handler';
import {
  USER_CONTACT_REPO,
  USER_CONTACT_SERVICE,
} from '../../application/services/tokens';

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
