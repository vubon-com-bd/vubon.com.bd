/**
 * ই-বুক ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ই-বুক ম্যানেজমেন্ট মডিউলের নাম
 */
export const EBOOK_MODULE_NAME = 'E-Book Management';

/**
 * ই-বুকের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_EBOOK_STATUS = 'draft' as const;

/**
 * ই-বুক স্ট্যাটাস টাইপ
 */
export type EbookStatus = typeof DEFAULT_EBOOK_STATUS | 'published' | 'archived';

/**
 * ই-বুক ফরম্যাট টাইপ
 */
export type EbookFormat = 'pdf' | 'epub' | 'mobi' | 'azw3';

/**
 * ই-বুক ইন্টারফেস
 */
export interface Ebook {
  id: string;
  title: string;
  slug: string;
  status: EbookStatus;
  format: EbookFormat;
  description: string;
  body: string;
  authorId: string;
  coverImage?: string;
  fileUrl?: string;
  fileSize?: number;
  pages?: number;
  isbn?: string;
  publishedAt?: Date;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: EbookMetadata;
}

/**
 * ই-বুক মেটাডেটা ইন্টারফেস
 */
export interface EbookMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  relatedEbooks?: string[];
  language?: string;
  publisher?: string;
  edition?: string;
}

/**
 * ই-বুক তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateEbookInput {
  title: string;
  slug: string;
  format: EbookFormat;
  description: string;
  body: string;
  authorId: string;
  coverImage?: string;
  fileUrl?: string;
  fileSize?: number;
  pages?: number;
  isbn?: string;
  metadata?: EbookMetadata;
  status?: EbookStatus;
}

/**
 * ই-বুক আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateEbookInput {
  title?: string;
  slug?: string;
  format?: EbookFormat;
  description?: string;
  body?: string;
  coverImage?: string;
  fileUrl?: string;
  fileSize?: number;
  pages?: number;
  isbn?: string;
  status?: EbookStatus;
  metadata?: EbookMetadata;
}

/**
 * ই-বুক ফিল্টার ইন্টারফেস
 */
export interface EbookFilter {
  search?: string;
  status?: EbookStatus;
  format?: EbookFormat;
  authorId?: string;
  category?: string;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'publishedAt' | 'downloadCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * ই-বুক স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEbookStatus(status: string): status is EbookStatus {
  const validStatuses: EbookStatus[] = ['draft', 'published', 'archived'];
  return validStatuses.includes(status as EbookStatus);
}

/**
 * ই-বুক ফরম্যাট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEbookFormat(format: string): format is EbookFormat {
  const validFormats: EbookFormat[] = ['pdf', 'epub', 'mobi', 'azw3'];
  return validFormats.includes(format as EbookFormat);
}

/**
 * ই-বুক ড্রাফট কিনা চেক করার ফাংশন
 */
export function isEbookDraft(status: EbookStatus): boolean {
  return status === 'draft';
}

/**
 * ই-বুক প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isEbookPublished(status: EbookStatus): boolean {
  return status === 'published';
}

/**
 * ই-বুক আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isEbookArchived(status: EbookStatus): boolean {
  return status === 'archived';
}

/**
 * ই-বুক প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isEbookPublishable(status: EbookStatus): boolean {
  return status === 'draft';
}

/**
 * ই-বুক এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEbookEditable(status: EbookStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * ই-বুক স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getEbookStatusLabel(status: EbookStatus): { en: string; bn: string } {
  const labels: Record<EbookStatus, { en: string; bn: string }> = {
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
 * ই-বুক স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getEbookStatusColor(status: EbookStatus): string {
  const colors: Record<EbookStatus, string> = {
    draft: 'gray',
    published: 'green',
    archived: 'orange',
  };
  return colors[status];
}

/**
 * ই-বুক ফরম্যাট লেবেল পাওয়ার ফাংশন
 */
export function getEbookFormatLabel(format: EbookFormat): { en: string; bn: string } {
  const labels: Record<EbookFormat, { en: string; bn: string }> = {
    pdf: {
      en: 'PDF',
      bn: 'পিডিএফ',
    },
    epub: {
      en: 'EPUB',
      bn: 'ইপাব',
    },
    mobi: {
      en: 'MOBI',
      bn: 'মোবি',
    },
    azw3: {
      en: 'AZW3',
      bn: 'এজেডাব্লিউ৩',
    },
  };
  return labels[format];
}

/**
 * ই-বুক ফরম্যাটের বিবরণ পাওয়ার ফাংশন
 */
export function getEbookFormatDescription(format: EbookFormat): { en: string; bn: string } {
  const descriptions: Record<EbookFormat, { en: string; bn: string }> = {
    pdf: {
      en: 'Portable Document Format - Universal format for documents',
      bn: 'পোর্টেবল ডকুমেন্ট ফরম্যাট - ডকুমেন্টের জন্য ইউনিভার্সাল ফরম্যাট',
    },
    epub: {
      en: 'Electronic Publication - Standard format for e-books',
      bn: 'ইলেকট্রনিক পাবলিকেশন - ই-বুকের জন্য স্ট্যান্ডার্ড ফরম্যাট',
    },
    mobi: {
      en: 'Mobipocket - Format for Amazon Kindle devices',
      bn: 'মোবিপকেট - অ্যামাজন কিন্ডল ডিভাইসের জন্য ফরম্যাট',
    },
    azw3: {
      en: 'Amazon Kindle Format 8 - Enhanced format for Kindle',
      bn: 'অ্যামাজন কিন্ডল ফরম্যাট ৮ - কিন্ডলের জন্য এনহ্যান্সড ফরম্যাট',
    },
  };
  return descriptions[format];
}

/**
 * ডিফল্ট ই-বুক স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultEbookStatus(): EbookStatus {
  return DEFAULT_EBOOK_STATUS;
}

/**
 * ডিফল্ট ই-বুক ফরম্যাট পাওয়ার ফাংশন
 */
export function getDefaultEbookFormat(): EbookFormat {
  return 'pdf';
}

/**
 * ই-বুক স্লাগ তৈরির ফাংশন
 */
export function generateEbookSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
