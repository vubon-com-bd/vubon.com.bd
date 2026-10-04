/**
 * UserContactModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserContactController } from '@interfaces/controllers/rest/user-contact.controller';
import { UserContactService } from '@application/services/impl/user-contact.service';
import {
  AddContactHandler,
  UpdateContactHandler,
  DeleteContactHandler,
  VerifyContactHandler,
} from '@application/commands/contact';
import {
  ListContactsHandler,
  GetContactHandler,
} from '@application/queries/contact';
import { UserContactPrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { USER_CONTACT_REPOSITORY } from '@domain/repositories/user-contact.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, UserModule],
  controllers: [UserContactController],
  providers: [
    UserContactService,
    { provide: USER_CONTACT_REPOSITORY, useClass: UserContactPrismaRepository },
    AddContactHandler,
    UpdateContactHandler,
    DeleteContactHandler,
    VerifyContactHandler,
    ListContactsHandler,
    GetContactHandler,
  ],
  exports: [UserContactService, USER_CONTACT_REPOSITORY],
})
export class UserContactModule {}
