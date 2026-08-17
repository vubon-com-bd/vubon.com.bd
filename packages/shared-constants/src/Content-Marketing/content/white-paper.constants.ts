/**
 * হোয়াইট পেপার ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * হোয়াইট পেপার ম্যানেজমেন্ট মডিউলের নাম
 */
export const WHITE_PAPER_MODULE_NAME = 'White Paper Management';

/**
 * হোয়াইট পেপারের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_WHITE_PAPER_STATUS = 'draft' as const;

/**
 * হোয়াইট পেপার স্ট্যাটাস টাইপ
 */
export type WhitePaperStatus = typeof DEFAULT_WHITE_PAPER_STATUS | 'published' | 'archived';

/**
 * হোয়াইট পেপার টাইপ টাইপ
 */
export type WhitePaperType = 'industry-research' | 'technical' | 'solution-brief' | 'case-study';

/**
 * হোয়াইট পেপার ইন্টারফেস
 */
export interface WhitePaper {
  id: string;
  title: string;
  slug: string;
  status: WhitePaperStatus;
  type: WhitePaperType;
  abstract: string;
  body: string;
  authorId: string;
  coverImage?: string;
  fileUrl?: string;
  fileSize?: number;
  downloadCount: number;
  pages?: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: WhitePaperMetadata;
}

/**
 * হোয়াইট পেপার মেটাডেটা ইন্টারফেস
 */
export interface WhitePaperMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  relatedWhitePapers?: string[];
  industry?: string;
  audience?: string[];
}

/**
 * হোয়াইট পেপার তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateWhitePaperInput {
  title: string;
  slug: string;
  type: WhitePaperType;
  abstract: string;
  body: string;
  authorId: string;
  coverImage?: string;
  fileUrl?: string;
  fileSize?: number;
  pages?: number;
  metadata?: WhitePaperMetadata;
  status?: WhitePaperStatus;
}

/**
 * হোয়াইট পেপার আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateWhitePaperInput {
  title?: string;
  slug?: string;
  type?: WhitePaperType;
  abstract?: string;
  body?: string;
  coverImage?: string;
  fileUrl?: string;
  fileSize?: number;
  pages?: number;
  status?: WhitePaperStatus;
  metadata?: WhitePaperMetadata;
}

/**
 * হোয়াইট পেপার ফিল্টার ইন্টারফেস
 */
export interface WhitePaperFilter {
  search?: string;
  status?: WhitePaperStatus;
  type?: WhitePaperType;
  authorId?: string;
  industry?: string;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'publishedAt' | 'downloadCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * হোয়াইট পেপার স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWhitePaperStatus(status: string): status is WhitePaperStatus {
  const validStatuses: WhitePaperStatus[] = ['draft', 'published', 'archived'];
  return validStatuses.includes(status as WhitePaperStatus);
}

/**
 * হোয়াইট পেপার টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWhitePaperType(type: string): type is WhitePaperType {
  const validTypes: WhitePaperType[] = [
    'industry-research',
    'technical',
    'solution-brief',
    'case-study',
  ];
  return validTypes.includes(type as WhitePaperType);
}

/**
 * হোয়াইট পেপার ড্রাফট কিনা চেক করার ফাংশন
 */
export function isWhitePaperDraft(status: WhitePaperStatus): boolean {
  return status === 'draft';
}

/**
 * হোয়াইট পেপার প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isWhitePaperPublished(status: WhitePaperStatus): boolean {
  return status === 'published';
}

/**
 * হোয়াইট পেপার আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isWhitePaperArchived(status: WhitePaperStatus): boolean {
  return status === 'archived';
}

/**
 * হোয়াইট পেপার প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isWhitePaperPublishable(status: WhitePaperStatus): boolean {
  return status === 'draft';
}

/**
 * হোয়াইট পেপার এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isWhitePaperEditable(status: WhitePaperStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * হোয়াইট পেপার স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getWhitePaperStatusLabel(status: WhitePaperStatus): { en: string; bn: string } {
  const labels: Record<WhitePaperStatus, { en: string; bn: string }> = {
    draft: {
      en: 'Draft',
      bn: 'খসড়া',
    },
    published: {
      en: 'Published',
      bn: 'প্রকাশিত',
    },
    archived: {
      en: 'Archived',
      bn: 'আর্কাইভড',
    },
  };
  return labels[status];
}

/**
 * হোয়াইট পেপার স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getWhitePaperStatusColor(status: WhitePaperStatus): string {
  const colors: Record<WhitePaperStatus, string> = {
    draft: 'gray',
    published: 'green',
    archived: 'orange',
  };
  return colors[status];
}

/**
 * হোয়াইট পেপার টাইপ লেবেল পাওয়ার ফাংশন
 */
export function getWhitePaperTypeLabel(type: WhitePaperType): { en: string; bn: string } {
  const labels: Record<WhitePaperType, { en: string; bn: string }> = {
    'industry-research': {
      en: 'Industry Research',
      bn: 'শিল্প গবেষণা',
    },
    technical: {
      en: 'Technical White Paper',
      bn: 'টেকনিক্যাল হোয়াইট পেপার',
    },
    'solution-brief': {
      en: 'Solution Brief',
      bn: 'সমাধান সংক্ষিপ্ত',
    },
    'case-study': {
      en: 'Case Study',
      bn: 'কেস স্টাডি',
    },
  };
  return labels[type];
}

/**
 * হোয়াইট পেপার টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getWhitePaperTypeDescription(type: WhitePaperType): { en: string; bn: string } {
  const descriptions: Record<WhitePaperType, { en: string; bn: string }> = {
    'industry-research': {
      en: 'In-depth research on industry trends and challenges',
      bn: 'শিল্প প্রবণতা এবং চ্যালেঞ্জের উপর গভীর গবেষণা',
    },
    technical: {
      en: 'Technical documentation and specifications',
      bn: 'টেকনিক্যাল ডকুমেন্টেশন এবং স্পেসিফিকেশন',
    },
    'solution-brief': {
      en: 'Overview of solutions and their benefits',
      bn: 'সমাধান এবং তাদের সুবিধার সংক্ষিপ্ত বিবরণ',
    },
    'case-study': {
      en: 'Real-world implementation and results',
      bn: 'বাস্তব-বিশ্ব বাস্তবায়ন এবং ফলাফল',
    },
  };
  return descriptions[type];
}

/**
 * ডিফল্ট হোয়াইট পেপার স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultWhitePaperStatus(): WhitePaperStatus {
  return DEFAULT_WHITE_PAPER_STATUS;
}

/**
 * ডিফল্ট হোয়াইট পেপার টাইপ পাওয়ার ফাংশন
 */
export function getDefaultWhitePaperType(): WhitePaperType {
  return 'industry-research';
}

/**
 * হোয়াইট পেপার স্লাগ তৈরির ফাংশন
 */
export function generateWhitePaperSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
