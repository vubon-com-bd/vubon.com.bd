/**
 * কেস স্টাডির ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কেস স্টাডির ধরনসমূহ
 */
export const CASE_STUDY_TYPES = [
  'success-story',
  'failure-analysis',
  'research',
  'implementation',
] as const;

/**
 * কেস স্টাডি টাইপ টাইপ
 */
export type CaseStudyType = (typeof CASE_STUDY_TYPES)[number];

/**
 * কেস স্টাডি টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const CASE_STUDY_TYPE_LABELS = {
  'success-story': {
    en: 'Success Story',
    bn: 'সাফল্যের গল্প',
  },
  'failure-analysis': {
    en: 'Failure Analysis',
    bn: 'ব্যর্থতা বিশ্লেষণ',
  },
  research: {
    en: 'Research',
    bn: 'গবেষণা',
  },
  implementation: {
    en: 'Implementation',
    bn: 'বাস্তবায়ন',
  },
} as const satisfies Record<CaseStudyType, { en: string; bn: string }>;

/**
 * কেস স্টাডি টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const CASE_STUDY_TYPE_DESCRIPTIONS = {
  'success-story': {
    en: 'A case study showcasing successful outcomes and achievements',
    bn: 'সফল ফলাফল এবং অর্জন প্রদর্শনকারী কেস স্টাডি',
  },
  'failure-analysis': {
    en: 'A case study analyzing failures and lessons learned',
    bn: 'ব্যর্থতা এবং শেখা পাঠ বিশ্লেষণকারী কেস স্টাডি',
  },
  research: {
    en: 'A case study presenting research findings and insights',
    bn: 'গবেষণা ফলাফল এবং অন্তর্দৃষ্টি উপস্থাপনকারী কেস স্টাডি',
  },
  implementation: {
    en: 'A case study detailing implementation processes and strategies',
    bn: 'বাস্তবায়ন প্রক্রিয়া এবং কৌশল বিস্তারিত বর্ণনাকারী কেস স্টাডি',
  },
} as const satisfies Record<CaseStudyType, { en: string; bn: string }>;

/**
 * কেস স্টাডি টাইপের আইকন
 */
export const CASE_STUDY_TYPE_ICONS = {
  'success-story': '🏆',
  'failure-analysis': '🔍',
  research: '📊',
  implementation: '⚙️',
} as const satisfies Record<CaseStudyType, string>;

/**
 * কেস স্টাডি টাইপের কালার
 */
export const CASE_STUDY_TYPE_COLORS = {
  'success-story': 'green',
  'failure-analysis': 'red',
  research: 'blue',
  implementation: 'orange',
} as const satisfies Record<CaseStudyType, string>;

/**
 * নির্দিষ্ট কেস স্টাডি টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getCaseStudyTypeLabel(type: CaseStudyType, lang: 'en' | 'bn' = 'en'): string {
  return CASE_STUDY_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট কেস স্টাডি টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getCaseStudyTypeDescription(type: CaseStudyType, lang: 'en' | 'bn' = 'en'): string {
  return CASE_STUDY_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট কেস স্টাডি টাইপের আইকন পাওয়ার ফাংশন
 */
export function getCaseStudyTypeIcon(type: CaseStudyType): string {
  return CASE_STUDY_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট কেস স্টাডি টাইপের কালার পাওয়ার ফাংশন
 */
export function getCaseStudyTypeColor(type: CaseStudyType): string {
  return CASE_STUDY_TYPE_COLORS[type];
}

/**
 * সব কেস স্টাডি টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllCaseStudyTypes(): readonly CaseStudyType[] {
  return CASE_STUDY_TYPES;
}

/**
 * কেস স্টাডি টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCaseStudyType(type: string): type is CaseStudyType {
  return CASE_STUDY_TYPES.includes(type as CaseStudyType);
}

/**
 * কেস স্টাডি টাইপ সাফল্যের গল্প কিনা চেক করার ফাংশন
 */
export function isSuccessStory(type: CaseStudyType): boolean {
  return type === 'success-story';
}

/**
 * কেস স্টাডি টাইপ ব্যর্থতা বিশ্লেষণ কিনা চেক করার ফাংশন
 */
export function isFailureAnalysis(type: CaseStudyType): boolean {
  return type === 'failure-analysis';
}

/**
 * কেস স্টাডি টাইপ গবেষণা কিনা চেক করার ফাংশন
 */
export function isResearch(type: CaseStudyType): boolean {
  return type === 'research';
}

/**
 * কেস স্টাডি টাইপ বাস্তবায়ন কিনা চেক করার ফাংশন
 */
export function isImplementation(type: CaseStudyType): boolean {
  return type === 'implementation';
}

/**
 * ডিফল্ট কেস স্টাডি টাইপ পাওয়ার ফাংশন
 */
export function getDefaultCaseStudyType(): CaseStudyType {
  return 'success-story';
}
