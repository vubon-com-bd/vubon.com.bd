/**
 * AdminAnalytics Component
 * অ্যাডমিন অ্যানালিটিক্স কম্পোনেন্ট
 */

import React from 'react';
import { Card } from '../../common/components/Card';

export interface AdminAnalyticsProps {
  data: {
    totalAdmins: number;
    activeAdmins: number;
    newAdmins: number;
    loginCount: number;
    activityCount: number;
    performanceScore: number;
    securityScore: number;
  };
  className?: string;
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({
  data,
  className = '',
}) => {
  const stats = [
    { label: 'Total Admins', value: data.totalAdmins, color: 'bg-blue-500' },
    { label: 'Active Admins', value: data.activeAdmins, color: 'bg-green-500' },
    { label: 'New Admins', value: data.newAdmins, color: 'bg-purple-500' },
    { label: 'Login Count', value: data.loginCount, color: 'bg-indigo-500' },
    { label: 'Activity Count', value: data.activityCount, color: 'bg-yellow-500' },
    { label: 'Performance Score', value: `${data.performanceScore}%`, color: 'bg-emerald-500' },
    { label: 'Security Score', value: `${data.securityScore}%`, color: 'bg-red-500' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.slice(0, 4).map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${stat.color} opacity-75`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.slice(4).map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${stat.color} opacity-75`} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
