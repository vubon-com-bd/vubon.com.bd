/**
 * টেস্টিমোনিয়ালের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * টেস্টিমোনিয়ালের ধরনসমূহ
 */
export const TESTIMONIAL_TYPES = ['customer', 'partner', 'employee', 'expert'] as const;

/**
 * প্রতিটি টেস্টিমোনিয়াল টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const TESTIMONIAL_TYPE_LABELS = {
  customer: {
    en: 'Customer',
    bn: 'গ্রাহক',
  },
  partner: {
    en: 'Partner',
    bn: 'অংশীদার',
  },
  employee: {
    en: 'Employee',
    bn: 'কর্মচারী',
  },
  expert: {
    en: 'Expert',
    bn: 'বিশেষজ্ঞ',
  },
} as const satisfies Record<(typeof TESTIMONIAL_TYPES)[number], { en: string; bn: string }>;

/**
 * টেস্টিমোনিয়াল টাইপ টাইপ
 */
export type TestimonialType = (typeof TESTIMONIAL_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টেস্টিমোনিয়াল টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getTestimonialTypeLabel(type: TestimonialType, lang: Language = 'en'): string {
  return TESTIMONIAL_TYPE_LABELS[type][lang];
}

/**
 * সব টেস্টিমোনিয়াল টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllTestimonialTypes(): readonly TestimonialType[] {
  return TESTIMONIAL_TYPES;
}

/**
 * টেস্টিমোনিয়াল টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTestimonialType(type: string): type is TestimonialType {
  return TESTIMONIAL_TYPES.includes(type as TestimonialType);
}

/**
 * টেস্টিমোনিয়াল টাইপ গ্রাহক কিনা চেক করার ফাংশন
 */
export function isCustomerTestimonial(type: TestimonialType): boolean {
  return type === 'customer';
}

/**
 * টেস্টিমোনিয়াল টাইপ অংশীদার কিনা চেক করার ফাংশন
 */
export function isPartnerTestimonial(type: TestimonialType): boolean {
  return type === 'partner';
}

/**
 * টেস্টিমোনিয়াল টাইপ কর্মচারী কিনা চেক করার ফাংশন
 */
export function isEmployeeTestimonial(type: TestimonialType): boolean {
  return type === 'employee';
}

/**
 * টেস্টিমোনিয়াল টাইপ বিশেষজ্ঞ কিনা চেক করার ফাংশন
 */
export function isExpertTestimonial(type: TestimonialType): boolean {
  return type === 'expert';
}

/**
 * টেস্টিমোনিয়াল টাইপের বিবরণ পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getTestimonialTypeDescription(type: TestimonialType): { en: string; bn: string } {
  const descriptions: Record<TestimonialType, { en: string; bn: string }> = {
    customer: {
      en: 'Testimonial from a customer or client',
      bn: 'গ্রাহক বা ক্লায়েন্টের টেস্টিমোনিয়াল',
    },
    partner: {
      en: 'Testimonial from a business partner',
      bn: 'ব্যবসায়িক অংশীদারের টেস্টিমোনিয়াল',
    },
    employee: {
      en: 'Testimonial from an employee',
      bn: 'কর্মচারীর টেস্টিমোনিয়াল',
    },
    expert: {
      en: 'Testimonial from an industry expert',
      bn: 'শিল্প বিশেষজ্ঞের টেস্টিমোনিয়াল',
    },
  };
  return descriptions[type];
}

/**
 * টেস্টিমোনিয়াল টাইপের আইকন পাওয়ার ফাংশন
 */
export function getTestimonialTypeIcon(type: TestimonialType): string {
  const icons: Record<TestimonialType, string> = {
    customer: '👤',
    partner: '🤝',
    employee: '💼',
    expert: '🎓',
  };
  return icons[type];
}

/**
 * টেস্টিমোনিয়াল টাইপের কালার পাওয়ার ফাংশন
 */
export function getTestimonialTypeColor(type: TestimonialType): string {
  const colors: Record<TestimonialType, string> = {
    customer: 'blue',
    partner: 'green',
    employee: 'orange',
    expert: 'purple',
  };
  return colors[type];
}

/**
 * ডিফল্ট টেস্টিমোনিয়াল টাইপ পাওয়ার ফাংশন
 */
export function getDefaultTestimonialType(): TestimonialType {
  return 'customer';
}
