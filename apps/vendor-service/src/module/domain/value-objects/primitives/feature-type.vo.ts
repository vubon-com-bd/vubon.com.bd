/**
 * FeatureType Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Feature categories: analytics, ai, storage, api, etc.
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export const FEATURE_TYPE = {
  ANALYTICS: 'analytics',
  AI: 'ai',
  STORAGE: 'storage',
  API: 'api',
  CUSTOMIZATION: 'customization',
  MARKETING: 'marketing',
  SUPPORT: 'support',
  INTEGRATION: 'integration',
  AUTOMATION: 'automation',
  REPORTING: 'reporting',
} as const;

export type FeatureTypeValue = (typeof FEATURE_TYPE)[keyof typeof FEATURE_TYPE];

const VALID_TYPES = new Set<string>(Object.values(FEATURE_TYPE));

export class FeatureTypeVO extends BaseTypeVO<FeatureTypeValue> {
  private constructor(value: FeatureTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): FeatureTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('FeatureType must be a string', 'featureType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid FeatureType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'featureType',
      );
    }
    return new FeatureTypeVO(normalized as FeatureTypeValue);
  }

  static reconstitute(raw: string): FeatureTypeVO {
    return new FeatureTypeVO(raw as FeatureTypeValue);
  }

  // ─── Predicates ───
  isAnalytics(): boolean { return this.value === 'analytics'; }
  isAi(): boolean { return this.value === 'ai'; }
  isStorage(): boolean { return this.value === 'storage'; }
  isApi(): boolean { return this.value === 'api'; }
  isCustomization(): boolean { return this.value === 'customization'; }
  isMarketing(): boolean { return this.value === 'marketing'; }
  isSupport(): boolean { return this.value === 'support'; }
  isIntegration(): boolean { return this.value === 'integration'; }
  isAutomation(): boolean { return this.value === 'automation'; }
  isReporting(): boolean { return this.value === 'reporting'; }

  /** Type is premium only */
  isPremium(): boolean {
    return this.isAi() || this.isAutomation() || this.isIntegration();
  }
}
