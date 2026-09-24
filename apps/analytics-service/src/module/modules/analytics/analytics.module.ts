import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserAnalyticsController } from '../../interfaces/controllers/rest/user-analytics.controller';
import { RealTimeAnalyticsController } from '../../interfaces/controllers/rest/real-time-analytics.controller';

import { GetUserAnalyticsHandler } from '../../application/queries/analytics/get-user-analytics.handler';
import { GetTrafficAnalyticsHandler } from '../../application/queries/analytics/get-traffic-analytics.handler';
import { GetRealTimeAnalyticsHandler } from '../../application/queries/analytics/get-real-time-analytics.handler';

import { EventPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/event.prisma.repository';
import { SessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/session.prisma.repository';
import { TrafficSourcePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/traffic-source.prisma.repository';

import { StatsCalculatorService } from '../../infrastructure/services/internal/stats-calculator.service';
import { AnomalyDetectorService } from '../../infrastructure/services/internal/anomaly-detector.service';
import { TrendDetectorService } from '../../infrastructure/services/internal/trend-detector.service';

const HANDLERS = [
  GetUserAnalyticsHandler,
  GetTrafficAnalyticsHandler,
  GetRealTimeAnalyticsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [UserAnalyticsController, RealTimeAnalyticsController],
  providers: [
    EventPrismaRepository,
    SessionPrismaRepository,
    TrafficSourcePrismaRepository,
    StatsCalculatorService,
    AnomalyDetectorService,
    TrendDetectorService,
    ...HANDLERS,
  ],
  exports: [
    StatsCalculatorService,
    AnomalyDetectorService,
    TrendDetectorService,
  ],
})
export class AnalyticsModule {}
