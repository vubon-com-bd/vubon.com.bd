/**
 * অ্যাডমিন অডিটের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// অডিট টাইপ
export const AUDIT_TYPES = {
  ACCESS_CONTROL: 'access_control',
  DATA_CHANGE: 'data_change',
  PERMISSION_CHANGE: 'permission_change',
  SYSTEM_CONFIG: 'system_config',
  USER_MANAGEMENT: 'user_management',
  SECURITY_INCIDENT: 'security_incident',
  COMPLIANCE: 'compliance',
  FINANCIAL: 'financial',
} as const;

// টাইপের আইকন
export const AUDIT_TYPE_ICONS = {
  ACCESS_CONTROL: '🔐',
  DATA_CHANGE: '📝',
  PERMISSION_CHANGE: '🔄',
  SYSTEM_CONFIG: '⚙️',
  USER_MANAGEMENT: '👥',
  SECURITY_INCIDENT: '🚨',
  COMPLIANCE: '📋',
  FINANCIAL: '💰',
} as const;

// টাইপের কালার কোড
export const AUDIT_TYPE_COLORS = {
  ACCESS_CONTROL: '#3B82F6',
  DATA_CHANGE: '#F59E0B',
  PERMISSION_CHANGE: '#8B5CF6',
  SYSTEM_CONFIG: '#6366F1',
  USER_MANAGEMENT: '#22C55E',
  SECURITY_INCIDENT: '#EF4444',
  COMPLIANCE: '#EC4899',
  FINANCIAL: '#14B8A6',
} as const;

// টাইপের ডেসক্রিপশন
export const AUDIT_TYPE_DESCRIPTIONS = {
  ACCESS_CONTROL: 'Access control and authentication events',
  DATA_CHANGE: 'Data modification and manipulation events',
  PERMISSION_CHANGE: 'Permission and role assignment changes',
  SYSTEM_CONFIG: 'System configuration and setting changes',
  USER_MANAGEMENT: 'User creation, update, and deletion events',
  SECURITY_INCIDENT: 'Security breaches and incident events',
  COMPLIANCE: 'Compliance and regulatory events',
  FINANCIAL: 'Financial transactions and accounting events',
} as const;

// টাইপের প্রায়োরিটি (১ = সর্বোচ্চ)
export const AUDIT_TYPE_PRIORITY = {
  ACCESS_CONTROL: 2,
  DATA_CHANGE: 3,
  PERMISSION_CHANGE: 1,
  SYSTEM_CONFIG: 2,
  USER_MANAGEMENT: 3,
  SECURITY_INCIDENT: 1,
  COMPLIANCE: 2,
  FINANCIAL: 1,
} as const;

// টাইপের রিপোর্ট ক্যাটাগরি
export const AUDIT_TYPE_REPORT_CATEGORIES = {
  ACCESS_CONTROL: 'security',
  DATA_CHANGE: 'operations',
  PERMISSION_CHANGE: 'security',
  SYSTEM_CONFIG: 'system',
  USER_MANAGEMENT: 'operations',
  SECURITY_INCIDENT: 'security',
  COMPLIANCE: 'compliance',
  FINANCIAL: 'financial',
} as const;

// টাইপ গ্রুপ
export const AUDIT_TYPE_GROUPS = {
  SECURITY: ['access_control', 'permission_change', 'security_incident'],
  OPERATIONS: ['data_change', 'user_management', 'system_config'],
  COMPLIANCE: ['compliance', 'financial'],
} as const;

// টাইপের ডিফল্ট সেভিরিটি
export const AUDIT_TYPE_DEFAULT_SEVERITY = {
  ACCESS_CONTROL: 'medium',
  DATA_CHANGE: 'medium',
  PERMISSION_CHANGE: 'high',
  SYSTEM_CONFIG: 'high',
  USER_MANAGEMENT: 'medium',
  SECURITY_INCIDENT: 'critical',
  COMPLIANCE: 'high',
  FINANCIAL: 'critical',
} as const;

// টাইপের লেবেল (বাংলা)
export const AUDIT_TYPE_LABELS_BN = {
  ACCESS_CONTROL: 'অ্যাক্সেস কন্ট্রোল',
  DATA_CHANGE: 'ডেটা পরিবর্তন',
  PERMISSION_CHANGE: 'পারমিশন পরিবর্তন',
  SYSTEM_CONFIG: 'সিস্টেম কনফিগারেশন',
  USER_MANAGEMENT: 'ইউজার ম্যানেজমেন্ট',
  SECURITY_INCIDENT: 'নিরাপত্তা ঘটনা',
  COMPLIANCE: 'কমপ্লায়েন্স',
  FINANCIAL: 'আর্থিক',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const AUDIT_TYPE_LABELS_EN = {
  ACCESS_CONTROL: 'Access Control',
  DATA_CHANGE: 'Data Change',
  PERMISSION_CHANGE: 'Permission Change',
  SYSTEM_CONFIG: 'System Config',
  USER_MANAGEMENT: 'User Management',
  SECURITY_INCIDENT: 'Security Incident',
  COMPLIANCE: 'Compliance',
  FINANCIAL: 'Financial',
} as const;

// টাইপের CSS ক্লাস
export const AUDIT_TYPE_CSS_CLASSES = {
  ACCESS_CONTROL: 'audit-access-control',
  DATA_CHANGE: 'audit-data-change',
  PERMISSION_CHANGE: 'audit-permission-change',
  SYSTEM_CONFIG: 'audit-system-config',
  USER_MANAGEMENT: 'audit-user-management',
  SECURITY_INCIDENT: 'audit-security-incident',
  COMPLIANCE: 'audit-compliance',
  FINANCIAL: 'audit-financial',
} as const;

// টাইপের জন্য ইমোজি
export const AUDIT_TYPE_EMOJIS = {
  ACCESS_CONTROL: '🛂',
  DATA_CHANGE: '📊',
  PERMISSION_CHANGE: '🔑',
  SYSTEM_CONFIG: '🛠️',
  USER_MANAGEMENT: '👤',
  SECURITY_INCIDENT: '⚠️',
  COMPLIANCE: '✅',
  FINANCIAL: '💵',
} as const;

// টাইপের রিটেনশন পিরিয়ড (দিনে)
export const AUDIT_TYPE_RETENTION = {
  ACCESS_CONTROL: 180,
  DATA_CHANGE: 365,
  PERMISSION_CHANGE: 365,
  SYSTEM_CONFIG: 90,
  USER_MANAGEMENT: 365,
  SECURITY_INCIDENT: 730,
  COMPLIANCE: 730,
  FINANCIAL: 730,
} as const;

// টাইপের ডিফল্ট ফিল্টার
export const AUDIT_TYPE_DEFAULT_FILTER = {
  ACCESS_CONTROL: { include: true },
  DATA_CHANGE: { include: true },
  PERMISSION_CHANGE: { include: true },
  SYSTEM_CONFIG: { include: true },
  USER_MANAGEMENT: { include: true },
  SECURITY_INCIDENT: { include: true },
  COMPLIANCE: { include: true },
  FINANCIAL: { include: false },
} as const;
