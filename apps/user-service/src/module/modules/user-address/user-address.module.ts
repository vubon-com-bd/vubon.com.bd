import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserAddressController } from '../../interfaces/controllers/rest/user-address.controller';
import { AddressControllerMapper } from '../../interfaces/mappers/address.controller.mapper';
import { UserAddressService } from '../../application/services/impl/user-address.service';
import { AddAddressHandler } from '../../application/commands/address/add-address.handler';
import { UpdateAddressHandler } from '../../application/commands/address/update-address.handler';
import { DeleteAddressHandler } from '../../application/commands/address/delete-address.handler';
import { SetDefaultAddressHandler } from '../../application/commands/address/set-default-address.handler';
import { ListAddressesHandler } from '../../application/queries/address/list-addresses.handler';
import { GetAddressHandler } from '../../application/queries/address/get-address.handler';
import { GetDefaultAddressHandler } from '../../application/queries/address/get-default-address.handler';
import { UserAddressPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-address.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserAddressController],
  providers: [
    UserAddressPrismaRepository,
    UserAddressService,
    AddressControllerMapper,
    AddAddressHandler,
    UpdateAddressHandler,
    DeleteAddressHandler,
    SetDefaultAddressHandler,
    ListAddressesHandler,
    GetAddressHandler,
    GetDefaultAddressHandler,
  ],
  exports: [UserAddressService, UserAddressPrismaRepository],
})
export class UserAddressModule {}
