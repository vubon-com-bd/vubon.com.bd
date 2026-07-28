/**
 * Root App Module
 * Imports all feature modules
 * This is the entry point of the application
 */

import { Module } from '@nestjs/common';
import { AuthModule } from './module/modules/auth/auth.module.js';
import { SharedModule } from './module/modules/shared/shared.module.js';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
