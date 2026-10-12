CREATE TABLE IF NOT EXISTS "analytics_events" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "source" TEXT NOT NULL,
  "sessionId" TEXT, "userId" TEXT, "payloadKeys" INTEGER NOT NULL DEFAULT 0,
  "occurredAt" TIMESTAMP(3) NOT NULL, "status" TEXT NOT NULL DEFAULT 'received',
  "processedAt" TIMESTAMP(3), "failureReason" TEXT, "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);
CREATE INDEX IF NOT EXISTS "analytics_events_occurredAt_idx" ON "analytics_events"("occurredAt");
CREATE INDEX IF NOT EXISTS "analytics_events_sessionId_idx" ON "analytics_events"("sessionId");
CREATE INDEX IF NOT EXISTS "analytics_events_userId_idx" ON "analytics_events"("userId");
CREATE INDEX IF NOT EXISTS "analytics_events_name_idx" ON "analytics_events"("name");
CREATE INDEX IF NOT EXISTS "analytics_events_status_idx" ON "analytics_events"("status");

CREATE TABLE IF NOT EXISTS "analytics_event_payloads" (
  "id" TEXT PRIMARY KEY, "eventId" TEXT NOT NULL UNIQUE, "payload" JSONB NOT NULL,
  "sizeBytes" INTEGER NOT NULL DEFAULT 0, "keyCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("eventId") REFERENCES "analytics_events"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "analytics_metrics" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "unit" TEXT NOT NULL, "type" TEXT NOT NULL,
  "seriesKey" TEXT NOT NULL UNIQUE, "currentValue" DECIMAL(20,6) NOT NULL,
  "sampleCount" INTEGER NOT NULL DEFAULT 0, "minValue" DECIMAL(20,6), "maxValue" DECIMAL(20,6),
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);
CREATE INDEX IF NOT EXISTS "analytics_metrics_name_idx" ON "analytics_metrics"("name");
CREATE INDEX IF NOT EXISTS "analytics_metrics_type_idx" ON "analytics_metrics"("type");

CREATE TABLE IF NOT EXISTS "analytics_metric_aggregations" (
  "id" TEXT PRIMARY KEY, "aggregationKey" TEXT NOT NULL UNIQUE, "metricName" TEXT NOT NULL,
  "aggregation" TEXT NOT NULL, "value" DECIMAL(20,6) NOT NULL, "sampleCount" INTEGER,
  "granularity" TEXT, "rangeStart" TIMESTAMP(3) NOT NULL, "rangeEnd" TIMESTAMP(3) NOT NULL,
  "dimensions" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX IF NOT EXISTS "analytics_metric_aggregations_metricName_idx" ON "analytics_metric_aggregations"("metricName");
CREATE INDEX IF NOT EXISTS "analytics_metric_aggregations_rangeStart_rangeEnd_idx" ON "analytics_metric_aggregations"("rangeStart", "rangeEnd");

CREATE TABLE IF NOT EXISTS "analytics_dimensions" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL UNIQUE, "description" TEXT,
  "isCustom" BOOLEAN NOT NULL DEFAULT false, "isActive" BOOLEAN NOT NULL DEFAULT true,
  "usageCount" INTEGER NOT NULL DEFAULT 0, "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS "analytics_dimension_values" (
  "id" TEXT PRIMARY KEY, "dimensionId" TEXT NOT NULL, "value" TEXT NOT NULL,
  "occurrenceCount" INTEGER NOT NULL DEFAULT 1, "firstSeenAt" TIMESTAMP(3) NOT NULL,
  "lastSeenAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, UNIQUE ("dimensionId", "value"),
  FOREIGN KEY ("dimensionId") REFERENCES "analytics_dimensions"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "analytics_kpis" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "metric" TEXT NOT NULL,
  "target" DECIMAL(20,6) NOT NULL, "thresholdPercent" DECIMAL(5,2) NOT NULL,
  "higherIsBetter" BOOLEAN NOT NULL DEFAULT true, "isActive" BOOLEAN NOT NULL DEFAULT true,
  "lastActualValue" DECIMAL(20,6), "lastEvaluatedAt" TIMESTAMP(3),
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS "analytics_kpi_results" (
  "id" TEXT PRIMARY KEY, "kpiId" TEXT NOT NULL, "actual" DECIMAL(20,6) NOT NULL,
  "target" DECIMAL(20,6) NOT NULL, "achievementPercent" DECIMAL(5,2) NOT NULL,
  "status" TEXT NOT NULL, "evaluatedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("kpiId") REFERENCES "analytics_kpis"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "analytics_dashboards" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "layout" TEXT NOT NULL,
  "ownerId" TEXT NOT NULL, "isPublic" BOOLEAN NOT NULL DEFAULT false,
  "isArchived" BOOLEAN NOT NULL DEFAULT false, "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);
CREATE INDEX IF NOT EXISTS "analytics_dashboards_ownerId_idx" ON "analytics_dashboards"("ownerId");

CREATE TABLE IF NOT EXISTS "analytics_widgets" (
  "id" TEXT PRIMARY KEY, "dashboardId" TEXT NOT NULL, "type" TEXT NOT NULL,
  "title" TEXT NOT NULL, "config" JSONB NOT NULL, "posX" INTEGER NOT NULL,
  "posY" INTEGER NOT NULL, "posW" INTEGER NOT NULL, "posH" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("dashboardId") REFERENCES "analytics_dashboards"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "analytics_reports" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "type" TEXT NOT NULL, "format" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending', "frequency" TEXT NOT NULL, "ownerId" TEXT NOT NULL,
  "nextRunAt" TIMESTAMP(3), "lastRunAt" TIMESTAMP(3), "outputUrl" TEXT, "rowCount" INTEGER,
  "failureReason" TEXT, "rangeStart" TIMESTAMP(3) NOT NULL, "rangeEnd" TIMESTAMP(3) NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);
CREATE INDEX IF NOT EXISTS "analytics_reports_ownerId_idx" ON "analytics_reports"("ownerId");
CREATE INDEX IF NOT EXISTS "analytics_reports_status_idx" ON "analytics_reports"("status");

CREATE TABLE IF NOT EXISTS "analytics_report_filters" (
  "id" TEXT PRIMARY KEY, "reportId" TEXT NOT NULL, "logic" TEXT NOT NULL,
  "conditions" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("reportId") REFERENCES "analytics_reports"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "analytics_cohorts" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "period" TEXT NOT NULL, "description" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true, "rangeStart" TIMESTAMP(3) NOT NULL,
  "rangeEnd" TIMESTAMP(3) NOT NULL, "lastAnalyzedAt" TIMESTAMP(3),
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS "analytics_cohort_analyses" (
  "id" TEXT PRIMARY KEY, "cohortId" TEXT NOT NULL, "cohortSize" INTEGER NOT NULL,
  "periodCount" INTEGER NOT NULL, "rates" JSONB NOT NULL, "analyzedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("cohortId") REFERENCES "analytics_cohorts"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "analytics_funnels" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "stepCount" INTEGER NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true, "stage" TEXT,
  "rangeStart" TIMESTAMP(3) NOT NULL, "rangeEnd" TIMESTAMP(3) NOT NULL,
  "lastAnalyzedAt" TIMESTAMP(3), "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS "analytics_funnel_analyses" (
  "id" TEXT PRIMARY KEY, "funnelId" TEXT NOT NULL, "stepCounts" JSONB NOT NULL,
  "entryCount" INTEGER NOT NULL, "finalCount" INTEGER NOT NULL,
  "conversionRate" DECIMAL(6,4) NOT NULL, "analyzedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("funnelId") REFERENCES "analytics_funnels"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "analytics_sessions" (
  "id" TEXT PRIMARY KEY, "userId" TEXT, "device" TEXT, "trafficSource" JSONB,
  "startedAt" TIMESTAMP(3) NOT NULL, "endedAt" TIMESTAMP(3), "durationSec" INTEGER,
  "eventCount" INTEGER NOT NULL DEFAULT 0, "pageViewCount" INTEGER NOT NULL DEFAULT 0,
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, "deletedAt" TIMESTAMP(3)
);
CREATE INDEX IF NOT EXISTS "analytics_sessions_userId_idx" ON "analytics_sessions"("userId");
CREATE INDEX IF NOT EXISTS "analytics_sessions_startedAt_idx" ON "analytics_sessions"("startedAt");

CREATE TABLE IF NOT EXISTS "analytics_page_views" (
  "id" TEXT PRIMARY KEY, "sessionId" TEXT NOT NULL, "userId" TEXT, "path" TEXT NOT NULL,
  "referrer" TEXT, "userAgent" TEXT, "device" TEXT, "country" TEXT,
  "occurredAt" TIMESTAMP(3) NOT NULL, "durationMs" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("sessionId") REFERENCES "analytics_sessions"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "analytics_page_views_path_idx" ON "analytics_page_views"("path");
CREATE INDEX IF NOT EXISTS "analytics_page_views_occurredAt_idx" ON "analytics_page_views"("occurredAt");

CREATE TABLE IF NOT EXISTS "analytics_traffic_sources" (
  "id" TEXT PRIMARY KEY, "channelKey" TEXT NOT NULL UNIQUE, "source" TEXT NOT NULL,
  "medium" TEXT, "campaign" TEXT, "referrer" TEXT,
  "occurrenceCount" INTEGER NOT NULL DEFAULT 1, "lastSeenAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "analytics_attributions" (
  "id" TEXT PRIMARY KEY, "conversionId" TEXT NOT NULL UNIQUE, "model" TEXT NOT NULL,
  "conversionValue" DECIMAL(20,6) NOT NULL, "touchpointCount" INTEGER NOT NULL,
  "touchpoints" JSONB NOT NULL, "creditByChannel" JSONB NOT NULL,
  "computedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
