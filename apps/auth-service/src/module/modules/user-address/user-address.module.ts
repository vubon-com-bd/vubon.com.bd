import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserAddressController } from '../../interfaces/controllers/rest/user-address.controller';
import { UserAddressService } from '../../application/services/impl/user-address.service';
import { AddAddressHandler } from '../../application/commands/user/add-address.handler';
import { UpdateAddressHandler } from '../../application/commands/user/update-address.handler';
import { DeleteAddressHandler } from '../../application/commands/user/delete-address.handler';
import { ListUserAddressesHandler } from '../../application/queries/user/list-user-addresses.handler';
import { GetUserAddressHandler } from '../../application/queries/user/get-user-address.handler';
import { UserAddressPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-address.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserAddressController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserAddressRepository', useExisting: UserAddressPrismaRepository },
    { provide: 'UserAddressService', useExisting: UserAddressService },

    UserAddressPrismaRepository,
    UserAddressService,
    AddAddressHandler,
    UpdateAddressHandler,
    DeleteAddressHandler,
    ListUserAddressesHandler,
    GetUserAddressHandler,
  ],
  exports: [UserAddressService, UserAddressPrismaRepository],
})
export class UserAddressModule {}
