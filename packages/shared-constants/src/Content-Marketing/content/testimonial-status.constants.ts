/**
 * টেস্টিমোনিয়ালের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * টেস্টিমোনিয়ালের সব স্ট্যাটাস
 */
export const TESTIMONIAL_STATUSES = ['pending', 'approved', 'rejected', 'featured'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const TESTIMONIAL_STATUS_COLORS = {
  pending: 'yellow',
  approved: 'green',
  rejected: 'red',
  featured: 'purple',
} as const satisfies Record<(typeof TESTIMONIAL_STATUSES)[number], string>;

/**
 * টেস্টিমোনিয়াল স্ট্যাটাস টাইপ
 */
export type TestimonialStatus = (typeof TESTIMONIAL_STATUSES)[number];

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getTestimonialStatusColor(status: TestimonialStatus): string {
  return TESTIMONIAL_STATUS_COLORS[status];
}

/**
 * সব টেস্টিমোনিয়াল স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllTestimonialStatuses(): readonly TestimonialStatus[] {
  return TESTIMONIAL_STATUSES;
}

/**
 * টেস্টিমোনিয়াল স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTestimonialStatus(status: string): status is TestimonialStatus {
  return TESTIMONIAL_STATUSES.includes(status as TestimonialStatus);
}

/**
 * টেস্টিমোনিয়াল পেন্ডিং কিনা চেক করার ফাংশন
 */
export function isTestimonialPending(status: TestimonialStatus): boolean {
  return status === 'pending';
}

/**
 * টেস্টিমোনিয়াল অনুমোদিত কিনা চেক করার ফাংশন
 */
export function isTestimonialApproved(status: TestimonialStatus): boolean {
  return status === 'approved';
}

/**
 * টেস্টিমোনিয়াল রিজেক্টেড কিনা চেক করার ফাংশন
 */
export function isTestimonialRejected(status: TestimonialStatus): boolean {
  return status === 'rejected';
}

/**
 * টেস্টিমোনিয়াল ফিচার্ড কিনা চেক করার ফাংশন
 */
export function isTestimonialFeatured(status: TestimonialStatus): boolean {
  return status === 'featured';
}

/**
 * টেস্টিমোনিয়াল প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isTestimonialPublishable(status: TestimonialStatus): boolean {
  return status === 'approved' || status === 'featured';
}

/**
 * টেস্টিমোনিয়াল এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isTestimonialEditable(status: TestimonialStatus): boolean {
  return status === 'pending' || status === 'approved' || status === 'featured';
}

/**
 * টেস্টিমোনিয়াল ফিচার্ড করা যায় কিনা চেক করার ফাংশন
 */
export function isTestimonialFeatureable(status: TestimonialStatus): boolean {
  return status === 'approved' || status === 'featured';
}

/**
 * টেস্টিমোনিয়াল রিজেক্ট করা যায় কিনা চেক করার ফাংশন
 */
export function isTestimonialRejectable(status: TestimonialStatus): boolean {
  return status === 'pending' || status === 'approved' || status === 'featured';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canTestimonialTransitionTo(
  currentStatus: TestimonialStatus,
  newStatus: TestimonialStatus
): boolean {
  const transitions: Record<TestimonialStatus, TestimonialStatus[]> = {
    pending: ['approved', 'rejected', 'featured'],
    approved: ['rejected', 'featured'],
    rejected: ['pending', 'approved'],
    featured: ['approved', 'rejected'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * টেস্টিমোনিয়াল স্ট্যাটাস লেবেল পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getTestimonialStatusLabel(status: TestimonialStatus): { en: string; bn: string } {
  const labels: Record<TestimonialStatus, { en: string; bn: string }> = {
    pending: {
      en: 'Pending Review',
      bn: 'পর্যালোচনার অপেক্ষায়',
    },
    approved: {
      en: 'Approved',
      bn: 'অনুমোদিত',
    },
    rejected: {
      en: 'Rejected',
      bn: 'প্রত্যাখ্যাত',
    },
    featured: {
      en: 'Featured',
      bn: 'ফিচার্ড',
    },
  };
  return labels[status];
}

/**
 * টেস্টিমোনিয়াল স্ট্যাটাসের বিবরণ পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getTestimonialStatusDescription(status: TestimonialStatus): {
  en: string;
  bn: string;
} {
  const descriptions: Record<TestimonialStatus, { en: string; bn: string }> = {
    pending: {
      en: 'Testimonial is waiting for review',
      bn: 'টেস্টিমোনিয়াল পর্যালোচনার অপেক্ষায়',
    },
    approved: {
      en: 'Testimonial has been approved for publishing',
      bn: 'টেস্টিমোনিয়াল প্রকাশের জন্য অনুমোদিত হয়েছে',
    },
    rejected: {
      en: 'Testimonial has been rejected',
      bn: 'টেস্টিমোনিয়াল প্রত্যাখ্যাত হয়েছে',
    },
    featured: {
      en: 'Testimonial is featured and highlighted',
      bn: 'টেস্টিমোনিয়াল ফিচার্ড এবং হাইলাইট করা হয়েছে',
    },
  };
  return descriptions[status];
}

/**
 * ডিফল্ট টেস্টিমোনিয়াল স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultTestimonialStatus(): TestimonialStatus {
  return 'pending';
}
