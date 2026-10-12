/**
 * User Address Feature Module
 * @module identity-service/modules/user-address
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserAddressController } from '../../interfaces/controllers/rest/user-address.controller.js';
import { USER_ADDRESS_COMMAND_HANDLERS } from './commands/index.js';
import { USER_ADDRESS_QUERY_HANDLERS } from './queries/index.js';

import { UserAddressService } from '../../application/services/impl/user-address.service.js';
import { USER_ADDRESS_SERVICE } from '../../application/services/interfaces/user-address.service.interface.js';

const SERVICES = [
  UserAddressService,
  { provide: USER_ADDRESS_SERVICE, useExisting: UserAddressService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserAddressController],
  providers: [
    ...SERVICES,
    ...(USER_ADDRESS_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(USER_ADDRESS_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserAddressModule {}
