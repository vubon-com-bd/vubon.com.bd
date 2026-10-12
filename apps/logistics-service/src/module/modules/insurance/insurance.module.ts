/**
 * InsuranceModule — feature wiring for Insurance aggregate
 * @module logistics-service/modules/insurance
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { InsuranceController } from '../../interfaces/controllers/rest/insurance.controller.js';
import { InsuranceService } from '../../application/services/impl/insurance.service.js';
import { INSURANCE_SERVICE } from '../../application/services/interfaces/insurance.service.interface.js';
import { INSURANCE_COMMAND_HANDLERS } from '../../application/commands/insurance/index.js';
import { INSURANCE_QUERY_HANDLERS } from '../../application/queries/insurance/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [InsuranceController],
  providers: [
    InsuranceService,
    { provide: INSURANCE_SERVICE, useExisting: InsuranceService },
    ...INSURANCE_COMMAND_HANDLERS,
    ...INSURANCE_QUERY_HANDLERS,
  ],
  exports: [InsuranceService, INSURANCE_SERVICE],
})
export class InsuranceModule {}
