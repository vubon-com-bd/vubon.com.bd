/**
 * Recent Activity Widget
 * Displays a list of recent activities with type-based colors
 */

import React from 'react';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'order' | 'review' | 'product' | 'payment';
}

export interface RecentActivityProps {
  activities?: ActivityItem[];
  maxItems?: number;
  className?: string;
}

const defaultActivities: ActivityItem[] = [
  {
    id: '1',
    title: 'New Order #1234',
    description: 'Order placed by John Doe for $45.00',
    time: '2 minutes ago',
    type: 'order',
  },
  {
    id: '2',
    title: 'Product Review',
    description: '⭐ 5-star review for "Premium Widget"',
    time: '15 minutes ago',
    type: 'review',
  },
  {
    id: '3',
    title: 'Product Added',
    description: 'New product "Super Gadget" added to inventory',
    time: '1 hour ago',
    type: 'product',
  },
  {
    id: '4',
    title: 'Payment Received',
    description: 'Payment of $120.00 received from Sarah Lee',
    time: '3 hours ago',
    type: 'payment',
  },
];

const typeColors: Record<ActivityItem['type'], string> = {
  order: 'bg-blue-50 text-blue-700',
  review: 'bg-yellow-50 text-yellow-700',
  product: 'bg-green-50 text-green-700',
  payment: 'bg-purple-50 text-purple-700',
};

const typeLabels: Record<ActivityItem['type'], string> = {
  order: 'Order',
  review: 'Review',
  product: 'Product',
  payment: 'Payment',
};

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = defaultActivities,
  maxItems = 5,
  className = '',
}) => {
  const displayActivities = activities.slice(0, maxItems);

  if (displayActivities.length === 0) {
    return (
      <div className={`rounded-lg bg-white p-6 text-center shadow-sm ${className}`}>
        <p className="text-gray-500">No recent activities</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-white p-6 shadow-sm ${className}`}>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
      <div className="space-y-4">
        {displayActivities.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium ${typeColors[item.type]}`}
            >
              {typeLabels[item.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

RecentActivity.displayName = 'RecentActivity';
