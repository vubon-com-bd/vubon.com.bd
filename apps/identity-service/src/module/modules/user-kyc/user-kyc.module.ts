/**
 * User KYC Feature Module
 * @module identity-service/modules/user-kyc
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserKycController } from '../../interfaces/controllers/rest/user-kyc.controller.js';
import { USER_KYC_COMMAND_HANDLERS } from './commands/index.js';
import { USER_KYC_QUERY_HANDLERS } from './queries/index.js';

import { UserKycService } from '../../application/services/impl/user-kyc.service.js';
import { USER_KYC_SERVICE } from '../../application/services/interfaces/user-kyc.service.interface.js';

const SERVICES = [
  UserKycService,
  { provide: USER_KYC_SERVICE, useExisting: UserKycService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserKycController],
  providers: [
    ...SERVICES,
    ...(USER_KYC_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(USER_KYC_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserKycModule {}
