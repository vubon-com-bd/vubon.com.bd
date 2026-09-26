import { Module } from '@nestjs/common';

import {
  CommonModule,
  UserModule,
  UserProfileModule,
  UserSettingsModule,
  UserPreferencesModule,
  UserAddressModule,
  UserContactModule,
  UserKycModule,
  UserActivityModule,
  PublicProfileModule,
} from './module/modules';

@Module({
  imports: [
    // Global common (kernel modules aggregated)
    CommonModule,

    // Feature modules
    UserModule,
    UserProfileModule,
    UserSettingsModule,
    UserPreferencesModule,
    UserAddressModule,
    UserContactModule,
    UserKycModule,
    UserActivityModule,
    PublicProfileModule,
  ],
})
export class AppModule {}
