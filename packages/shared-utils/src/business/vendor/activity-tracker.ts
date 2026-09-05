/**
 * Vendor Activity Tracker
 * ভেন্ডর অ্যাক্টিভিটি ট্র্যাকার
 */

import { formatDate } from '../../common/formatter';
import { VENDOR_ACTIVITY } from '@vubon/shared-constants';
import type { VendorActivity } from '@vubon/shared-types';

export interface VendorTrackedActivity {
  id: string;
  type: string;
  description: string;
  status: string;
  priority: string;
  timestamp: string;
}

export const trackVendorActivity = (activity: VendorActivity): VendorTrackedActivity => {
  // VENDOR_ACTIVITY ব্যবহার করে টাইপ চেক
  const activityType = activity.type as keyof typeof VENDOR_ACTIVITY.TYPES;
  const isValidType = Object.keys(VENDOR_ACTIVITY.TYPES).includes(activityType);

  return {
    id: activity.id,
    type: isValidType ? activity.type : VENDOR_ACTIVITY.TYPES.LOGIN,
    description: activity.description,
    status: activity.status,
    priority: activity.priority,
    timestamp: formatDate(activity.createdAt, 'DD-MM-YYYY HH:mm:ss'),
  };
};

export const trackVendorActivityBatch = (activities: VendorActivity[]): VendorTrackedActivity[] => {
  return activities.map((activity) => trackVendorActivity(activity));
};

export const getVendorActivityStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    success: 'green',
    failed: 'red',
    pending: 'yellow',
    processing: 'blue',
  };
  return colors[status] || 'gray';
};

export const getVendorActivityPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: 'gray',
    medium: 'blue',
    high: 'orange',
    critical: 'red',
  };
  return colors[priority] || 'gray';
};

export const filterVendorActivitiesByType = (
  activities: VendorActivity[],
  type: string
): VendorActivity[] => {
  return activities.filter((activity) => activity.type === type);
};

export const filterVendorActivitiesByDateRange = (
  activities: VendorActivity[],
  startDate: Date,
  endDate: Date
): VendorActivity[] => {
  return activities.filter((activity) => {
    const date = new Date(activity.createdAt);
    return date >= startDate && date <= endDate;
  });
};

// VENDOR_ACTIVITY থেকে হেল্পার ফাংশন
export const getVendorActivityTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    login: 'Login',
    logout: 'Logout',
    product_create: 'Product Created',
    product_update: 'Product Updated',
    product_delete: 'Product Deleted',
    order_create: 'Order Created',
    order_update: 'Order Updated',
    order_cancel: 'Order Cancelled',
    payment_request: 'Payment Requested',
    payment_receive: 'Payment Received',
    settings_update: 'Settings Updated',
    profile_update: 'Profile Updated',
    document_upload: 'Document Uploaded',
    document_delete: 'Document Deleted',
    team_add: 'Team Member Added',
    team_remove: 'Team Member Removed',
    team_update: 'Team Updated',
  };
  return labels[type] || type;
};

export const getVendorActivityStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    success: 'Success',
    failed: 'Failed',
    pending: 'Pending',
    processing: 'Processing',
  };
  return labels[status] || status;
};
