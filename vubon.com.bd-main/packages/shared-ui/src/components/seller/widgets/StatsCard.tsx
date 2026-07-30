/**
 * Stats Card Widget
 * Displays a single statistic with icon and optional trend
 */

import React from 'react';

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
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
        <span className="text-3xl">{icon}</span>
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

StatsCard.displayName = 'StatsCard';
