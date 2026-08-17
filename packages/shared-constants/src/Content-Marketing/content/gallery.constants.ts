/**
 * গ্যালারি ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * গ্যালারি ম্যানেজমেন্ট মডিউলের নাম
 */
export const GALLERY_MODULE_NAME = 'Gallery Management';

/**
 * সর্বোচ্চ গ্যালারি আইটেম সংখ্যা
 */
export const MAX_GALLERY_ITEMS = 100;

/**
 * ডিফল্ট গ্যালারি লেআউট
 */
export const DEFAULT_GALLERY_LAYOUT = 'grid' as const;

/**
 * গ্যালারি সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const GALLERY_SORT_FIELDS = ['createdAt', 'title', 'order'] as const;

/**
 * গ্যালারি লেআউট টাইপ
 */
export type GalleryLayout = 'grid' | 'masonry' | 'carousel' | 'list';

/**
 * গ্যালারি সাজানোর ফিল্ড টাইপ
 */
export type GallerySortField = (typeof GALLERY_SORT_FIELDS)[number];

/**
 * গ্যালারি আইটেম ইন্টারফেস
 */
export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  thumbnail?: string;
  order: number;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: GalleryItemMetadata;
}

/**
 * গ্যালারি আইটেম মেটাডেটা ইন্টারফেস
 */
export interface GalleryItemMetadata {
  alt?: string;
  caption?: string;
  tags?: string[];
  width?: number;
  height?: number;
  size?: number;
  credit?: string;
}

/**
 * গ্যালারি ইন্টারফেস
 */
export interface Gallery {
  id: string;
  title: string;
  description?: string;
  layout: GalleryLayout;
  items: GalleryItem[];
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: GalleryMetadata;
}

/**
 * গ্যালারি মেটাডেটা ইন্টারফেস
 */
export interface GalleryMetadata {
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  isPublic?: boolean;
  password?: string;
}

/**
 * গ্যালারি তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateGalleryInput {
  title: string;
  description?: string;
  layout?: GalleryLayout;
  items?: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>[];
  coverImage?: string;
  metadata?: GalleryMetadata;
}

/**
 * গ্যালারি আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateGalleryInput {
  title?: string;
  description?: string;
  layout?: GalleryLayout;
  items?: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>[];
  coverImage?: string;
  metadata?: GalleryMetadata;
}

/**
 * গ্যালারি ফিল্টার ইন্টারফেস
 */
export interface GalleryFilter {
  search?: string;
  layout?: GalleryLayout;
  isPublic?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: GallerySortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * গ্যালারি লেআউট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGalleryLayout(layout: string): layout is GalleryLayout {
  const validLayouts: GalleryLayout[] = ['grid', 'masonry', 'carousel', 'list'];
  return validLayouts.includes(layout as GalleryLayout);
}

/**
 * গ্যালারি সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGallerySortField(field: string): field is GallerySortField {
  return GALLERY_SORT_FIELDS.includes(field as GallerySortField);
}

/**
 * গ্যালারি আইটেম অর্ডার জেনারেট করার ফাংশন
 */
export function generateGalleryItemOrder(index: number): number {
  return (index + 1) * 10;
}

/**
 * গ্যালারি আইটেম যোগ করার ফাংশন
 */
export function addGalleryItem(
  gallery: Gallery,
  item: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>
): Gallery {
  const newItem: GalleryItem = {
    ...item,
    id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: gallery.items.length + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return {
    ...gallery,
    items: [...gallery.items, newItem],
    updatedAt: new Date(),
  };
}

/**
 * গ্যালারি আইটেম রিমুভ করার ফাংশন
 */
export function removeGalleryItem(gallery: Gallery, itemId: string): Gallery {
  return {
    ...gallery,
    items: gallery.items.filter((item) => item.id !== itemId),
    updatedAt: new Date(),
  };
}

/**
 * গ্যালারি আইটেম আপডেট করার ফাংশন
 */
export function updateGalleryItem(
  gallery: Gallery,
  itemId: string,
  updates: Partial<Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>>
): Gallery {
  const updatedItems = gallery.items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        ...updates,
        updatedAt: new Date(),
      };
    }
    return item;
  });

  return {
    ...gallery,
    items: updatedItems,
    updatedAt: new Date(),
  };
}

/**
 * গ্যালারি আইটেম রিঅর্ডার করার ফাংশন
 */
export function reorderGalleryItems(gallery: Gallery, itemIds: string[]): Gallery {
  const reorderedItems = itemIds
    .map((id, index) => {
      const item = gallery.items.find((i) => i.id === id);
      if (!item) return null;
      return {
        ...item,
        order: (index + 1) * 10,
      };
    })
    .filter((item): item is GalleryItem => item !== null);

  // Add any items that weren't in the reorder list
  const remainingItems = gallery.items.filter((item) => !itemIds.includes(item.id));

  return {
    ...gallery,
    items: [...reorderedItems, ...remainingItems],
    updatedAt: new Date(),
  };
}

/**
 * ডিফল্ট গ্যালারি লেআউট পাওয়ার ফাংশন
 */
export function getDefaultGalleryLayout(): GalleryLayout {
  return DEFAULT_GALLERY_LAYOUT;
}

/**
 * সব গ্যালারি লেআউটের তালিকা পাওয়ার ফাংশন
 */
export function getAllGalleryLayouts(): GalleryLayout[] {
  return ['grid', 'masonry', 'carousel', 'list'];
}

/**
 * গ্যালারি কভার ইমেজ আপডেট করার ফাংশন
 */
export function updateGalleryCoverImage(gallery: Gallery, imageUrl: string): Gallery {
  return {
    ...gallery,
    coverImage: imageUrl,
    updatedAt: new Date(),
  };
}

/**
 * গ্যালারি পাবলিক কিনা চেক করার ফাংশন
 */
export function isGalleryPublic(gallery: Gallery): boolean {
  return gallery.metadata?.isPublic !== false;
}

/**
 * গ্যালারির আইটেম কাউন্ট পাওয়ার ফাংশন
 */
export function getGalleryItemCount(gallery: Gallery): number {
  return gallery.items.length;
}

/**
 * গ্যালারির কভার ইমেজ বা প্রথম আইটেমের ইমেজ পাওয়ার ফাংশন
 */
export function getGalleryCoverImage(gallery: Gallery): string {
  if (gallery.coverImage) {
    return gallery.coverImage;
  }
  if (gallery.items.length > 0) {
    return gallery.items[0].image;
  }
  return '';
}

/**
 * গ্যালারি আইটেম থাম্বনেইল পাওয়ার ফাংশন
 */
export function getGalleryItemThumbnail(item: GalleryItem): string {
  return item.thumbnail || item.image;
}
