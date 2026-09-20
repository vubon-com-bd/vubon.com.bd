import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserContactController } from '../../interfaces/controllers/rest/user-contact.controller';
import { UserContactService } from '../../application/services/impl/user-contact.service';
import { AddContactHandler } from '../../application/commands/user/add-contact.handler';
import { UpdateContactHandler } from '../../application/commands/user/update-contact.handler';
import { DeleteContactHandler } from '../../application/commands/user/delete-contact.handler';
import { ListUserContactsHandler } from '../../application/queries/user/list-user-contacts.handler';
import { GetUserContactHandler } from '../../application/queries/user/get-user-contact.handler';
import { UserContactPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-contact.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserContactController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserContactRepository', useExisting: UserContactPrismaRepository },
    { provide: 'UserContactService', useExisting: UserContactService },

    UserContactPrismaRepository,
    UserContactService,
    AddContactHandler,
    UpdateContactHandler,
    DeleteContactHandler,
    ListUserContactsHandler,
    GetUserContactHandler,
  ],
  exports: [UserContactService, UserContactPrismaRepository],
})
export class UserContactModule {}
