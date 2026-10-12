/**
 * AppModule — vendor-service root module
 * @module vendor-service/modules
 *
 * Wires:
 *  - ConfigModule.forRoot (global env)
 *  - CqrsModule.forRoot (global buses)
 *  - CommonModule (kernel + vendor infrastructure, global)
 *  - Feature modules (per domain)
 *  - HealthModule
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { CommonModule } from './common/index.js';
import { VendorCoreModule } from './vendor-core/index.js';
import { VendorOnboardingModule } from './vendor-onboarding/index.js';
import { VendorTeamModule } from './vendor-team/index.js';
import { VendorPayoutModule } from './vendor-payout/index.js';
import { VendorSubscriptionModule } from './vendor-subscription/index.js';
import { VendorFeedbackModule } from './vendor-feedback/index.js';
import { VendorOperationalModule } from './vendor-operational/index.js';
import { HealthModule } from './health/index.js';

@Module({
  imports: [
    // Root config
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // Common (global) — kernel globals + vendor infrastructure
    CommonModule,

    // Feature modules
    VendorCoreModule,
    VendorOnboardingModule,
    VendorTeamModule,
    VendorPayoutModule,
    VendorSubscriptionModule,
    VendorFeedbackModule,
    VendorOperationalModule,

    // Health
    HealthModule,
  ],
})
export class AppModule {}
