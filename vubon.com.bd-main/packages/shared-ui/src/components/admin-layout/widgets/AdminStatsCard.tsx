/**
 * Admin Stats Card Widget
 * Displays statistics with color variants and trend indicators
 */

import React from 'react';

export type StatsColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: StatsColor;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const colorClasses: Record<StatsColor, string> = {
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  trend,
  className = '',
}) => {
  return (
    <div
      className={`rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${colorClasses[color]}`}
        >
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-sm text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

AdminStatsCard.displayName = 'AdminStatsCard';
