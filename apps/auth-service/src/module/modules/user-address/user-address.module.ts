import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAddressController } from '../../interfaces/controllers/rest/user-address.controller.js';
import { UserAddressService } from '../../application/services/impl/user-address.service.js';
import { UserAddressPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-address.prisma.repository.js';
import { AddAddressHandler } from '../../application/commands/user/add-address.handler.js';
import { UpdateAddressHandler } from '../../application/commands/user/update-address.handler.js';
import { DeleteAddressHandler } from '../../application/commands/user/delete-address.handler.js';
import { ListUserAddressesHandler } from '../../application/queries/user/list-user-addresses.handler.js';
import { GetUserAddressHandler } from '../../application/queries/user/get-user-address.handler.js';
import {
  USER_ADDRESS_REPO,
  USER_ADDRESS_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: USER_ADDRESS_REPO, useExisting: UserAddressPrismaRepository },
  { provide: USER_ADDRESS_SERVICE, useExisting: UserAddressService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserAddressController],
  providers: [
    UserAddressService,
    UserAddressPrismaRepository,
    AddAddressHandler,
    UpdateAddressHandler,
    DeleteAddressHandler,
    ListUserAddressesHandler,
    GetUserAddressHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserAddressService, UserAddressPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserAddressModule {}
