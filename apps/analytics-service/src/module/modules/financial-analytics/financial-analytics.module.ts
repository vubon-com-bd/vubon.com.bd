/**
 * Financial Analytics Module
 */
import { Module } from '@nestjs/common';
import { FinancialAnalyticsController } from '../../interfaces/controllers/rest/financial-analytics.controller.js';
import { FINANCIAL_ANALYTICS_QUERY_HANDLERS } from './queries/index.js';

@Module({
  controllers: [FinancialAnalyticsController],
  providers: [
    ...FINANCIAL_ANALYTICS_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
})
export class FinancialAnalyticsModule {}
