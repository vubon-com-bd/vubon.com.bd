/**
 * Analytics Validator
 * অ্যানালিটিক্স ভ্যালিডেটর
 */
export type MetricType = 'count' | 'sum' | 'average' | 'percentage' | 'rate';
export type IntervalType = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export type PropertyType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';
export type CohortType = 'weekly' | 'monthly' | 'yearly';

export interface DateRangeValidation {
  isValid: boolean;
  errors: string[];
  start: Date;
  end: Date;
}

export interface MetricValidation {
  isValid: boolean;
  type: MetricType | 'unknown';
}

export interface IntervalValidation {
  isValid: boolean;
  type: IntervalType | 'unknown';
}

export interface EventValidation {
  isValid: boolean;
  normalized: string;
}

export interface PropertyValidation {
  isValid: boolean;
  type: PropertyType;
}

export interface FunnelValidation {
  isValid: boolean;
  errors: string[];
  normalizedSteps: string[];
}

export interface CohortValidation {
  isValid: boolean;
  errors: string[];
}

export const analyticsValidator = {
  /**
   * Validate date range
   * ডেট রেঞ্জ ভ্যালিডেট করা
   */
  validateDateRange: (startDate: Date | string, endDate: Date | string): DateRangeValidation => {
    const errors: string[] = [];

    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

    if (isNaN(start.getTime())) {
      errors.push('Invalid start date');
    }
    if (isNaN(end.getTime())) {
      errors.push('Invalid end date');
    }
    if (start > end) {
      errors.push('Start date cannot be after end date');
    }

    // Check if date range is within reasonable limits (max 1 year)
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 365) {
      errors.push('Date range cannot exceed 1 year');
    }

    return {
      isValid: errors.length === 0,
      errors,
      start,
      end,
    };
  },

  /**
   * Validate metric type
   * মেট্রিক টাইপ ভ্যালিডেট করা
   */
  validateMetric: (metric: string): MetricValidation => {
    const validMetrics: MetricType[] = ['count', 'sum', 'average', 'percentage', 'rate'];
    const isValid = validMetrics.includes(metric as MetricType);

    return {
      isValid,
      type: isValid ? (metric as MetricType) : 'unknown',
    };
  },

  /**
   * Validate time interval
   * টাইম ইন্টারভ্যাল ভ্যালিডেট করা
   */
  validateInterval: (interval: string): IntervalValidation => {
    const validIntervals: IntervalType[] = ['hourly', 'daily', 'weekly', 'monthly', 'yearly'];
    const isValid = validIntervals.includes(interval as IntervalType);

    return {
      isValid,
      type: isValid ? (interval as IntervalType) : 'unknown',
    };
  },

  /**
   * Validate event name
   * ইভেন্ট নাম ভ্যালিডেট করা
   */
  validateEventName: (eventName: string): EventValidation => {
    // Check if event name is valid (alphanumeric, underscore, dot)
    const pattern = /^[a-zA-Z0-9_.]+$/;
    const isValid = pattern.test(eventName);

    // Normalize: lowercase, replace spaces with underscore
    const normalized = eventName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_.]/g, '');

    return {
      isValid,
      normalized,
    };
  },

  /**
   * Validate property value
   * প্রপার্টি ভ্যালু ভ্যালিডেট করা
   */
  validateProperty: (value: unknown): PropertyValidation => {
    let type: PropertyType = 'null';

    if (value === null || value === undefined) {
      type = 'null';
    } else if (Array.isArray(value)) {
      type = 'array';
    } else {
      type = typeof value as PropertyType;
    }

    return {
      isValid: type !== 'null',
      type,
    };
  },

  /**
   * Validate funnel steps
   * ফানেল স্টেপস ভ্যালিডেট করা
   */
  validateFunnelSteps: (steps: string[]): FunnelValidation => {
    const errors: string[] = [];
    const normalizedSteps: string[] = [];

    if (!steps || steps.length === 0) {
      errors.push('Funnel must have at least one step');
    }

    if (steps) {
      for (let i = 0; i < steps.length; i++) {
        const validation = analyticsValidator.validateEventName(steps[i]);
        if (!validation.isValid) {
          errors.push(`Step ${i + 1} has invalid format: ${steps[i]}`);
        }
        normalizedSteps.push(validation.normalized);
      }
    }

    // Check for duplicate steps
    if (normalizedSteps.length !== new Set(normalizedSteps).size) {
      errors.push('Funnel steps must be unique');
    }

    return {
      isValid: errors.length === 0,
      errors,
      normalizedSteps,
    };
  },

  /**
   * Validate cohort analysis parameters
   * কোহর্ট বিশ্লেষণ প্যারামিটার ভ্যালিডেট করা
   */
  validateCohortParams: (params: {
    cohortType: CohortType;
    periods: number;
    metric: string;
  }): CohortValidation => {
    const errors: string[] = [];

    if (!['weekly', 'monthly', 'yearly'].includes(params.cohortType)) {
      errors.push('Invalid cohort type');
    }

    if (params.periods < 1 || params.periods > 52) {
      errors.push('Periods must be between 1 and 52');
    }

    const metricValidation = analyticsValidator.validateMetric(params.metric);
    if (!metricValidation.isValid) {
      errors.push('Invalid metric type');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};
