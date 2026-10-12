/**
 * Analytics Access Decorator
 * @module analytics-service/interfaces/decorators
 *
 * Marks a route requiring an analytics permission।
 * Consumed by AnalyticsAccessGuard.
 */
import { SetMetadata } from '@nestjs/common';
import { ANALYTICS_PERMISSION } from '@vubon/shared-constants/platform/analytics';

export type AnalyticsPermissionValue =
  (typeof ANALYTICS_PERMISSION)[keyof typeof ANALYTICS_PERMISSION];

export const ANALYTICS_ACCESS_META_KEY = 'analytics_required_permissions';

/**
 * @AnalyticsAccess('analytics:report:view', 'analytics:data:view')
 * → requires ALL listed permissions
 */
export const AnalyticsAccess = (
  ...permissions: readonly AnalyticsPermissionValue[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(ANALYTICS_ACCESS_META_KEY, permissions);

/**
 * Convenience: dashboard management access
 */
export const DashboardAccess = (): MethodDecorator & ClassDecorator =>
  AnalyticsAccess(
    ANALYTICS_PERMISSION.DASHBOARD_VIEW,
    ANALYTICS_PERMISSION.DASHBOARD_MANAGE
  );

/**
 * Convenience: report creation access
 */
export const ReportCreateAccess = (): MethodDecorator & ClassDecorator =>
  AnalyticsAccess(ANALYTICS_PERMISSION.REPORT_CREATE);

/**
 * Convenience: data export access
 */
export const DataExportAccess = (): MethodDecorator & ClassDecorator =>
  AnalyticsAccess(ANALYTICS_PERMISSION.DATA_EXPORT);
