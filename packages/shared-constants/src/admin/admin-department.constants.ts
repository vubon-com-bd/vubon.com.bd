/**
 * Admin Department Constants
 * অ্যাডমিন ডিপার্টমেন্ট সম্পর্কিত কনস্ট্যান্টস
 */

export const ADMIN_DEPARTMENT = {
  // Departments
  DEPARTMENTS: {
    IT: 'it',
    HR: 'hr',
    FINANCE: 'finance',
    MARKETING: 'marketing',
    SALES: 'sales',
    SUPPORT: 'support',
    OPERATIONS: 'operations',
    LEGAL: 'legal',
    COMPLIANCE: 'compliance',
    ADMIN: 'admin',
    CONTENT: 'content',
    PRODUCT: 'product',
    ENGINEERING: 'engineering',
    DESIGN: 'design',
  },

  // Department metadata
  METADATA: {
    it: {
      name: 'IT Department',
      nameBangla: 'আইটি বিভাগ',
      code: 'IT',
      description: 'Information Technology',
    },
    hr: {
      name: 'HR Department',
      nameBangla: 'এইচআর বিভাগ',
      code: 'HR',
      description: 'Human Resources',
    },
    finance: {
      name: 'Finance Department',
      nameBangla: 'ফাইন্যান্স বিভাগ',
      code: 'FIN',
      description: 'Finance and Accounting',
    },
    marketing: {
      name: 'Marketing Department',
      nameBangla: 'মার্কেটিং বিভাগ',
      code: 'MKT',
      description: 'Marketing and Communications',
    },
    sales: {
      name: 'Sales Department',
      nameBangla: 'সেলস বিভাগ',
      code: 'SAL',
      description: 'Sales and Business Development',
    },
    support: {
      name: 'Support Department',
      nameBangla: 'সাপোর্ট বিভাগ',
      code: 'SUP',
      description: 'Customer Support',
    },
    operations: {
      name: 'Operations Department',
      nameBangla: 'অপারেশনস বিভাগ',
      code: 'OPS',
      description: 'Operations Management',
    },
    legal: {
      name: 'Legal Department',
      nameBangla: 'লিগ্যাল বিভাগ',
      code: 'LEG',
      description: 'Legal Affairs',
    },
    compliance: {
      name: 'Compliance Department',
      nameBangla: 'কমপ্লায়েন্স বিভাগ',
      code: 'COM',
      description: 'Regulatory Compliance',
    },
    admin: {
      name: 'Administration',
      nameBangla: 'প্রশাসন',
      code: 'ADM',
      description: 'General Administration',
    },
    content: {
      name: 'Content Department',
      nameBangla: 'কন্টেন্ট বিভাগ',
      code: 'CNT',
      description: 'Content Management',
    },
    product: {
      name: 'Product Department',
      nameBangla: 'প্রোডাক্ট বিভাগ',
      code: 'PRD',
      description: 'Product Management',
    },
    engineering: {
      name: 'Engineering Department',
      nameBangla: 'ইঞ্জিনিয়ারিং বিভাগ',
      code: 'ENG',
      description: 'Software Engineering',
    },
    design: {
      name: 'Design Department',
      nameBangla: 'ডিজাইন বিভাগ',
      code: 'DSG',
      description: 'Design and UX',
    },
  },

  // Default values
  DEFAULTS: {
    DEPARTMENT: 'admin',
    AUTO_ASSIGN: false,
  },
} as const;

export type AdminDepartment =
  (typeof ADMIN_DEPARTMENT.DEPARTMENTS)[keyof typeof ADMIN_DEPARTMENT.DEPARTMENTS];
