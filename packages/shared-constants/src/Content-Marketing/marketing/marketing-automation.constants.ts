/**
 * মার্কেটিং অটোমেশন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * মার্কেটিং অটোমেশন মডিউলের নাম
 */
export const AUTOMATION_MODULE_NAME = 'Marketing Automation';

/**
 * অটোমেশনের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_AUTOMATION_STATUS = 'draft' as const;

/**
 * সর্বোচ্চ ওয়ার্কফ্লো স্টেপ সংখ্যা
 */
export const MAX_WORKFLOW_STEPS = 50;

/**
 * অটোমেশন স্ট্যাটাস টাইপ
 */
export type AutomationStatus = typeof DEFAULT_AUTOMATION_STATUS;

/**
 * অটোমেশন ট্রিগার টাইপ
 */
export type AutomationTrigger =
  | 'form-submission'
  | 'email-open'
  | 'email-click'
  | 'page-view'
  | 'purchase'
  | 'cart-abandon'
  | 'lead-score';

/**
 * অটোমেশন অ্যাকশন টাইপ
 */
export type AutomationAction =
  | 'send-email'
  | 'send-sms'
  | 'assign-lead'
  | 'update-score'
  | 'add-tag'
  | 'remove-tag'
  | 'add-to-campaign'
  | 'create-task'
  | 'send-push'
  | 'webhook';

/**
 * অটোমেশন ইন্টারফেস
 */
export interface AutomationInterface {
  id: string;
  name: string;
  description?: string;
  status: AutomationStatus;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  steps: WorkflowStep[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: AutomationMetadata;
}

/**
 * ওয়ার্কফ্লো স্টেপ ইন্টারফেস
 */
export interface WorkflowStep {
  id: string;
  order: number;
  type: AutomationAction;
  config: Record<string, unknown>;
  condition?: WorkflowCondition;
  delay?: number; // minutes
}

/**
 * ওয়ার্কফ্লো কন্ডিশন ইন্টারফেস
 */
export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
  value: unknown;
}

/**
 * অটোমেশন মেটাডেটা ইন্টারফেস
 */
export interface AutomationMetadata {
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
  version?: number;
  lastRunAt?: Date;
  runCount?: number;
}

/**
 * অটোমেশন তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateAutomationInput {
  name: string;
  description?: string;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  steps: WorkflowStep[];
  metadata?: AutomationMetadata;
  status?: AutomationStatus;
}

/**
 * অটোমেশন আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateAutomationInput {
  name?: string;
  description?: string;
  status?: AutomationStatus;
  trigger?: AutomationTrigger;
  actions?: AutomationAction[];
  steps?: WorkflowStep[];
  isActive?: boolean;
  metadata?: AutomationMetadata;
}

/**
 * অটোমেশন ফিল্টার ইন্টারফেস
 */
export interface AutomationFilter {
  search?: string;
  status?: AutomationStatus;
  trigger?: AutomationTrigger;
  isActive?: boolean;
  createdBy?: string;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * অটোমেশন ট্রিগারের লেবেল (বাংলা এবং ইংরেজি)
 */
export const AUTOMATION_TRIGGER_LABELS = {
  'form-submission': {
    en: 'Form Submission',
    bn: 'ফর্ম জমা দেওয়া',
  },
  'email-open': {
    en: 'Email Open',
    bn: 'ইমেইল খোলা',
  },
  'email-click': {
    en: 'Email Click',
    bn: 'ইমেইল ক্লিক',
  },
  'page-view': {
    en: 'Page View',
    bn: 'পেজ ভিউ',
  },
  purchase: {
    en: 'Purchase',
    bn: 'ক্রয়',
  },
  'cart-abandon': {
    en: 'Cart Abandonment',
    bn: 'কার্ট পরিত্যাগ',
  },
  'lead-score': {
    en: 'Lead Score Change',
    bn: 'লিড স্কোর পরিবর্তন',
  },
} as const satisfies Record<AutomationTrigger, { en: string; bn: string }>;

/**
 * অটোমেশন অ্যাকশনের লেবেল (বাংলা এবং ইংরেজি)
 */
export const AUTOMATION_ACTION_LABELS = {
  'send-email': {
    en: 'Send Email',
    bn: 'ইমেইল পাঠান',
  },
  'send-sms': {
    en: 'Send SMS',
    bn: 'এসএমএস পাঠান',
  },
  'assign-lead': {
    en: 'Assign Lead',
    bn: 'লিড অ্যাসাইন করুন',
  },
  'update-score': {
    en: 'Update Score',
    bn: 'স্কোর আপডেট করুন',
  },
  'add-tag': {
    en: 'Add Tag',
    bn: 'ট্যাগ যোগ করুন',
  },
  'remove-tag': {
    en: 'Remove Tag',
    bn: 'ট্যাগ সরান',
  },
  'add-to-campaign': {
    en: 'Add to Campaign',
    bn: 'ক্যাম্পেইনে যোগ করুন',
  },
  'create-task': {
    en: 'Create Task',
    bn: 'টাস্ক তৈরি করুন',
  },
  'send-push': {
    en: 'Send Push Notification',
    bn: 'পুশ বিজ্ঞপ্তি পাঠান',
  },
  webhook: {
    en: 'Webhook',
    bn: 'ওয়েবহুক',
  },
} as const satisfies Record<AutomationAction, { en: string; bn: string }>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * অটোমেশন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAutomationStatus(status: string): status is AutomationStatus {
  return status === 'draft';
}

/**
 * অটোমেশন ট্রিগার বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAutomationTrigger(trigger: string): trigger is AutomationTrigger {
  return [
    'form-submission',
    'email-open',
    'email-click',
    'page-view',
    'purchase',
    'cart-abandon',
    'lead-score',
  ].includes(trigger);
}

/**
 * অটোমেশন অ্যাকশন বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAutomationAction(action: string): action is AutomationAction {
  return [
    'send-email',
    'send-sms',
    'assign-lead',
    'update-score',
    'add-tag',
    'remove-tag',
    'add-to-campaign',
    'create-task',
    'send-push',
    'webhook',
  ].includes(action);
}

/**
 * অটোমেশন ট্রিগারের লেবেল পাওয়ার ফাংশন
 */
export function getAutomationTriggerLabel(
  trigger: AutomationTrigger,
  lang: Language = 'en'
): string {
  return AUTOMATION_TRIGGER_LABELS[trigger][lang];
}

/**
 * অটোমেশন অ্যাকশনের লেবেল পাওয়ার ফাংশন
 */
export function getAutomationActionLabel(action: AutomationAction, lang: Language = 'en'): string {
  return AUTOMATION_ACTION_LABELS[action][lang];
}

/**
 * সব অটোমেশন ট্রিগারের তালিকা পাওয়ার ফাংশন
 */
export function getAllAutomationTriggers(): AutomationTrigger[] {
  return [
    'form-submission',
    'email-open',
    'email-click',
    'page-view',
    'purchase',
    'cart-abandon',
    'lead-score',
  ];
}

/**
 * সব অটোমেশন অ্যাকশনের তালিকা পাওয়ার ফাংশন
 */
export function getAllAutomationActions(): AutomationAction[] {
  return [
    'send-email',
    'send-sms',
    'assign-lead',
    'update-score',
    'add-tag',
    'remove-tag',
    'add-to-campaign',
    'create-task',
    'send-push',
    'webhook',
  ];
}

/**
 * অটোমেশন সক্রিয় কিনা চেক করার ফাংশন
 */
export function isAutomationActive(automation: AutomationInterface): boolean {
  return automation.isActive && automation.status === 'draft';
}

/**
 * অটোমেশন এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isAutomationEditable(automation: AutomationInterface): boolean {
  return automation.status === 'draft';
}

/**
 * অটোমেশন সক্ষম করার ফাংশন
 */
export function enableAutomation(automation: AutomationInterface): AutomationInterface {
  return {
    ...automation,
    isActive: true,
  };
}

/**
 * অটোমেশন নিষ্ক্রিয় করার ফাংশন
 */
export function disableAutomation(automation: AutomationInterface): AutomationInterface {
  return {
    ...automation,
    isActive: false,
  };
}

/**
 * ডিফল্ট অটোমেশন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultAutomationStatus(): AutomationStatus {
  return DEFAULT_AUTOMATION_STATUS;
}

/**
 * অটোমেশন ট্রিগারের আইকন পাওয়ার ফাংশন
 */
export function getAutomationTriggerIcon(trigger: AutomationTrigger): string {
  const icons: Record<AutomationTrigger, string> = {
    'form-submission': '📝',
    'email-open': '📧',
    'email-click': '🖱️',
    'page-view': '👁️',
    purchase: '🛒',
    'cart-abandon': '🛍️',
    'lead-score': '📊',
  };
  return icons[trigger];
}

/**
 * অটোমেশন অ্যাকশনের আইকন পাওয়ার ফাংশন
 */
export function getAutomationActionIcon(action: AutomationAction): string {
  const icons: Record<AutomationAction, string> = {
    'send-email': '📧',
    'send-sms': '💬',
    'assign-lead': '👤',
    'update-score': '📈',
    'add-tag': '🏷️',
    'remove-tag': '🗑️',
    'add-to-campaign': '📢',
    'create-task': '📋',
    'send-push': '🔔',
    webhook: '🔌',
  };
  return icons[action];
}

/**
 * অটোমেশন ট্রিগারের রঙ পাওয়ার ফাংশন
 */
export function getAutomationTriggerColor(trigger: AutomationTrigger): string {
  const colors: Record<AutomationTrigger, string> = {
    'form-submission': '#3B82F6',
    'email-open': '#10B981',
    'email-click': '#8B5CF6',
    'page-view': '#F59E0B',
    purchase: '#EF4444',
    'cart-abandon': '#EC4899',
    'lead-score': '#06B6D4',
  };
  return colors[trigger];
}

/**
 * অটোমেশন অ্যাকশনের রঙ পাওয়ার ফাংশন
 */
export function getAutomationActionColor(action: AutomationAction): string {
  const colors: Record<AutomationAction, string> = {
    'send-email': '#3B82F6',
    'send-sms': '#10B981',
    'assign-lead': '#8B5CF6',
    'update-score': '#F59E0B',
    'add-tag': '#EC4899',
    'remove-tag': '#EF4444',
    'add-to-campaign': '#06B6D4',
    'create-task': '#F97316',
    'send-push': '#8B5CF6',
    webhook: '#6B7280',
  };
  return colors[action];
}

/**
 * অটোমেশন ট্রিগারের বিবরণ পাওয়ার ফাংশন
 */
export function getAutomationTriggerDescription(
  trigger: AutomationTrigger,
  lang: Language = 'en'
): string {
  const descriptions: Record<AutomationTrigger, { en: string; bn: string }> = {
    'form-submission': {
      en: 'Triggers when a form is submitted',
      bn: 'যখন একটি ফর্ম জমা দেওয়া হয় তখন ট্রিগার হয়',
    },
    'email-open': {
      en: 'Triggers when an email is opened',
      bn: 'যখন একটি ইমেইল খোলা হয় তখন ট্রিগার হয়',
    },
    'email-click': {
      en: 'Triggers when an email link is clicked',
      bn: 'যখন একটি ইমেইল লিঙ্ক ক্লিক করা হয় তখন ট্রিগার হয়',
    },
    'page-view': {
      en: 'Triggers when a specific page is viewed',
      bn: 'যখন একটি নির্দিষ্ট পেজ দেখা হয় তখন ট্রিগার হয়',
    },
    purchase: {
      en: 'Triggers when a purchase is made',
      bn: 'যখন একটি ক্রয় করা হয় তখন ট্রিগার হয়',
    },
    'cart-abandon': {
      en: 'Triggers when a cart is abandoned',
      bn: 'যখন একটি কার্ট পরিত্যাগ করা হয় তখন ট্রিগার হয়',
    },
    'lead-score': {
      en: 'Triggers when lead score changes',
      bn: 'যখন লিড স্কোর পরিবর্তন হয় তখন ট্রিগার হয়',
    },
  };
  return descriptions[trigger][lang];
}
