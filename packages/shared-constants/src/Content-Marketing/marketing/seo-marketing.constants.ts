/**
 * SEO মার্কেটিং সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * SEO মার্কেটিং মডিউলের নাম
 */
export const SEO_MARKETING_MODULE_NAME = 'SEO Marketing';

/**
 * SEO এর ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_SEO_STATUS = 'draft' as const;

/**
 * SEO টুলসমূহ
 */
export const SEO_TOOLS = [
  'google-analytics',
  'google-search-console',
  'semrush',
  'ahrefs',
] as const;

/**
 * SEO স্ট্যাটাস টাইপ
 */
export type SeoStatus = typeof DEFAULT_SEO_STATUS;

/**
 * SEO টুল টাইপ
 */
export type SeoTool = (typeof SEO_TOOLS)[number];

/**
 * SEO টাস্ক টাইপ
 */
export type SeoTaskType = 'keyword-research' | 'on-page' | 'off-page' | 'technical' | 'content';

/**
 * SEO টাস্ক প্রায়োরিটি
 */
export type SeoPriority = 'high' | 'medium' | 'low';

/**
 * SEO ইন্টারফেস
 */
export interface SeoInterface {
  id: string;
  title: string;
  description: string;
  status: SeoStatus;
  type: SeoTaskType;
  priority: SeoPriority;
  tools: SeoTool[];
  keywords: string[];
  targetUrl?: string;
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: SeoMetadata;
}

/**
 * SEO মেটাডেটা ইন্টারফেস
 */
export interface SeoMetadata {
  searchVolume?: number;
  keywordDifficulty?: number;
  competition?: 'low' | 'medium' | 'high';
  estimatedTraffic?: number;
  tags?: string[];
  notes?: string;
  attachments?: string[];
}

/**
 * SEO টাস্ক তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateSeoTaskInput {
  title: string;
  description: string;
  type: SeoTaskType;
  priority: SeoPriority;
  tools?: SeoTool[];
  keywords?: string[];
  targetUrl?: string;
  assignedTo?: string;
  dueDate?: Date;
  metadata?: SeoMetadata;
  status?: SeoStatus;
}

/**
 * SEO টাস্ক আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateSeoTaskInput {
  title?: string;
  description?: string;
  status?: SeoStatus;
  type?: SeoTaskType;
  priority?: SeoPriority;
  tools?: SeoTool[];
  keywords?: string[];
  targetUrl?: string;
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  metadata?: SeoMetadata;
}

/**
 * SEO ফিল্টার ইন্টারফেস
 */
export interface SeoFilter {
  search?: string;
  status?: SeoStatus;
  type?: SeoTaskType;
  priority?: SeoPriority;
  tool?: SeoTool;
  keyword?: string;
  assignedTo?: string;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * SEO টুলসমূহের লেবেল (বাংলা এবং ইংরেজি)
 */
export const SEO_TOOL_LABELS = {
  'google-analytics': {
    en: 'Google Analytics',
    bn: 'গুগল অ্যানালিটিক্স',
  },
  'google-search-console': {
    en: 'Google Search Console',
    bn: 'গুগল সার্চ কনসোল',
  },
  semrush: {
    en: 'SEMrush',
    bn: 'এসইএমরাশ',
  },
  ahrefs: {
    en: 'Ahrefs',
    bn: 'এহারেফস',
  },
} as const satisfies Record<SeoTool, { en: string; bn: string }>;

/**
 * SEO টাস্ক টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const SEO_TASK_TYPE_LABELS = {
  'keyword-research': {
    en: 'Keyword Research',
    bn: 'কীওয়ার্ড রিসার্চ',
  },
  'on-page': {
    en: 'On-Page SEO',
    bn: 'অন-পেজ এসইও',
  },
  'off-page': {
    en: 'Off-Page SEO',
    bn: 'অফ-পেজ এসইও',
  },
  technical: {
    en: 'Technical SEO',
    bn: 'টেকনিক্যাল এসইও',
  },
  content: {
    en: 'Content SEO',
    bn: 'কন্টেন্ট এসইও',
  },
} as const satisfies Record<SeoTaskType, { en: string; bn: string }>;

/**
 * SEO প্রায়োরিটির লেবেল (বাংলা এবং ইংরেজি)
 */
export const SEO_PRIORITY_LABELS = {
  high: {
    en: 'High',
    bn: 'উচ্চ',
  },
  medium: {
    en: 'Medium',
    bn: 'মাঝারি',
  },
  low: {
    en: 'Low',
    bn: 'নিম্ন',
  },
} as const satisfies Record<SeoPriority, { en: string; bn: string }>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * SEO স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoStatus(status: string): status is SeoStatus {
  return status === 'draft';
}

/**
 * SEO টুল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoTool(tool: string): tool is SeoTool {
  return SEO_TOOLS.includes(tool as SeoTool);
}

/**
 * SEO টাস্ক টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoTaskType(type: string): type is SeoTaskType {
  return ['keyword-research', 'on-page', 'off-page', 'technical', 'content'].includes(type);
}

/**
 * SEO প্রায়োরিটি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoPriority(priority: string): priority is SeoPriority {
  return ['high', 'medium', 'low'].includes(priority);
}

/**
 * SEO টুলের লেবেল পাওয়ার ফাংশন
 */
export function getSeoToolLabel(tool: SeoTool, lang: Language = 'en'): string {
  return SEO_TOOL_LABELS[tool][lang];
}

/**
 * SEO টাস্ক টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getSeoTaskTypeLabel(type: SeoTaskType, lang: Language = 'en'): string {
  return SEO_TASK_TYPE_LABELS[type][lang];
}

/**
 * SEO প্রায়োরিটির লেবেল পাওয়ার ফাংশন
 */
export function getSeoPriorityLabel(priority: SeoPriority, lang: Language = 'en'): string {
  return SEO_PRIORITY_LABELS[priority][lang];
}

/**
 * সব SEO টুলের তালিকা পাওয়ার ফাংশন
 */
export function getAllSeoTools(): readonly SeoTool[] {
  return SEO_TOOLS;
}

/**
 * সব SEO টাস্ক টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllSeoTaskTypes(): SeoTaskType[] {
  return ['keyword-research', 'on-page', 'off-page', 'technical', 'content'];
}

/**
 * সব SEO প্রায়োরিটির তালিকা পাওয়ার ফাংশন
 */
export function getAllSeoPriorities(): SeoPriority[] {
  return ['high', 'medium', 'low'];
}

/**
 * SEO টাস্ক সম্পন্ন হয়েছে কিনা চেক করার ফাংশন
 */
export function isSeoTaskCompleted(task: SeoInterface): boolean {
  return task.status === 'draft' && task.completedAt !== undefined;
}

/**
 * SEO টাস্ক ড্রাফট কিনা চেক করার ফাংশন
 */
export function isSeoTaskDraft(task: SeoInterface): boolean {
  return task.status === 'draft' && !task.completedAt;
}

/**
 * SEO টাস্কের অগ্রগতি শতাংশ গণনা করার ফাংশন
 */
export function calculateSeoProgress(task: SeoInterface): number {
  if (isSeoTaskCompleted(task)) return 100;
  if (isSeoTaskDraft(task)) return 0;
  // মিডিয়াম প্রগ্রেস (শিডিউল বা ইন-প্রোগ্রেস স্ট্যাটাস থাকলে)
  return 50;
}

/**
 * ডিফল্ট SEO স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSeoStatus(): SeoStatus {
  return DEFAULT_SEO_STATUS;
}

/**
 * SEO টুলের আইকন পাওয়ার ফাংশন
 */
export function getSeoToolIcon(tool: SeoTool): string {
  const icons: Record<SeoTool, string> = {
    'google-analytics': '📊',
    'google-search-console': '🔍',
    semrush: '🚀',
    ahrefs: '⚡',
  };
  return icons[tool];
}

/**
 * SEO টাস্ক টাইপের আইকন পাওয়ার ফাংশন
 */
export function getSeoTaskTypeIcon(type: SeoTaskType): string {
  const icons: Record<SeoTaskType, string> = {
    'keyword-research': '🔑',
    'on-page': '📄',
    'off-page': '🔗',
    technical: '⚙️',
    content: '✍️',
  };
  return icons[type];
}

/**
 * SEO প্রায়োরিটির রঙ পাওয়ার ফাংশন
 */
export function getSeoPriorityColor(priority: SeoPriority): string {
  const colors: Record<SeoPriority, string> = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };
  return colors[priority];
}
