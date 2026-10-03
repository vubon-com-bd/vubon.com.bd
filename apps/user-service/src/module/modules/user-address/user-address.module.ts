/**
 * UserAddressModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAddressController } from '@interfaces/controllers/rest/user-address.controller';
import { UserAddressService } from '@application/services/impl/user-address.service';
import {
  AddAddressHandler,
  UpdateAddressHandler,
  DeleteAddressHandler,
  SetDefaultAddressHandler,
} from '@application/commands/address';
import {
  ListAddressesHandler,
  GetAddressHandler,
  GetDefaultAddressHandler,
} from '@application/queries/address';
import { UserAddressPrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, UserModule],
  controllers: [UserAddressController],
  providers: [
    UserAddressService,
    { provide: USER_ADDRESS_REPOSITORY, useClass: UserAddressPrismaRepository },
    AddAddressHandler,
    UpdateAddressHandler,
    DeleteAddressHandler,
    SetDefaultAddressHandler,
    ListAddressesHandler,
    GetAddressHandler,
    GetDefaultAddressHandler,
  ],
  exports: [UserAddressService, USER_ADDRESS_REPOSITORY],
})
export class UserAddressModule {}
