import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserContactController } from '../../interfaces/controllers/rest/user-contact.controller';
import { ContactControllerMapper } from '../../interfaces/mappers/contact.controller.mapper';
import { UserContactService } from '../../application/services/impl/user-contact.service';
import { AddContactHandler } from '../../application/commands/contact/add-contact.handler';
import { UpdateContactHandler } from '../../application/commands/contact/update-contact.handler';
import { DeleteContactHandler } from '../../application/commands/contact/delete-contact.handler';
import { VerifyContactHandler } from '../../application/commands/contact/verify-contact.handler';
import { ListContactsHandler } from '../../application/queries/contact/list-contacts.handler';
import { GetContactHandler } from '../../application/queries/contact/get-contact.handler';
import { UserContactPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-contact.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserContactController],
  providers: [
    UserContactPrismaRepository,
    UserContactService,
    ContactControllerMapper,
    AddContactHandler,
    UpdateContactHandler,
    DeleteContactHandler,
    VerifyContactHandler,
    ListContactsHandler,
    GetContactHandler,
  ],
  exports: [UserContactService, UserContactPrismaRepository],
})
export class UserContactModule {}
