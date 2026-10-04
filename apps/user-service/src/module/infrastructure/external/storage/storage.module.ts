/**
 * User Storage Module
 */
import { Global, Module } from '@nestjs/common';
import { UserStorageService } from './storage.service.js';
import { AvatarService } from './avatar.service.js';

@Global()
@Module({
  providers: [UserStorageService, AvatarService],
  exports: [UserStorageService, AvatarService],
})
export class UserStorageModule {}
