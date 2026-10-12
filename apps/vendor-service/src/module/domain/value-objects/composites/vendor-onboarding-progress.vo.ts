/**
 * VendorOnboardingProgressVO — step-by-step onboarding state
 * @module vendor-service/src/module/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export const ONBOARDING_STEP = {
  BASIC_INFO: 'basic_info',
  BUSINESS_INFO: 'business_info',
  CONTACT_INFO: 'contact_info',
  ADDRESS: 'address',
  BANK_ACCOUNT: 'bank_account',
  DOCUMENTS: 'documents',
  VERIFICATION: 'verification',
  APPROVAL: 'approval',
} as const;

export type OnboardingStep = (typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];

const ALL_STEPS: readonly OnboardingStep[] = Object.values(ONBOARDING_STEP);

export interface VendorOnboardingProgressVOProps {
  readonly completedSteps: readonly OnboardingStep[];
  readonly currentStep: OnboardingStep;
  readonly startedAt: string;
  readonly lastUpdatedAt: string;
  readonly abandoned: boolean;
}

export class VendorOnboardingProgressVO extends BaseVO<VendorOnboardingProgressVOProps> {
  private constructor(props: VendorOnboardingProgressVOProps) {
    super(props);
  }

  static create(props: VendorOnboardingProgressVOProps): VendorOnboardingProgressVO {
    if (!Array.isArray(props.completedSteps)) {
      throw new ValidationError('Completed steps must be an array', 'completedSteps');
    }
    // Validate each step
    for (const step of props.completedSteps) {
      if (!ALL_STEPS.includes(step)) {
        throw new ValidationError(`Invalid onboarding step "${step}"`, 'completedSteps');
      }
    }
    if (!ALL_STEPS.includes(props.currentStep)) {
      throw new ValidationError(`Invalid current step "${props.currentStep}"`, 'currentStep');
    }
    // Current step cannot be in completed list
    if (props.completedSteps.includes(props.currentStep)) {
      throw new ValidationError('Current step cannot be marked as completed', 'currentStep');
    }
    if (Number.isNaN(Date.parse(props.startedAt))) {
      throw new ValidationError('startedAt must be a valid ISO timestamp', 'startedAt');
    }
    return new VendorOnboardingProgressVO(props);
  }

  static reconstitute(props: VendorOnboardingProgressVOProps): VendorOnboardingProgressVO {
    return new VendorOnboardingProgressVO(props);
  }

  static initial(startedAt: string = new Date().toISOString()): VendorOnboardingProgressVO {
    return new VendorOnboardingProgressVO({
      completedSteps: [],
      currentStep: ONBOARDING_STEP.BASIC_INFO,
      startedAt,
      lastUpdatedAt: startedAt,
      abandoned: false,
    });
  }

  get currentStep(): OnboardingStep { return this.value.currentStep; }
  get completedSteps(): readonly OnboardingStep[] { return this.value.completedSteps; }
  get abandoned(): boolean { return this.value.abandoned; }

  isStepCompleted(step: OnboardingStep): boolean {
    return this.value.completedSteps.includes(step);
  }

  getCompletedCount(): number {
    return this.value.completedSteps.length;
  }

  getTotalSteps(): number {
    return ALL_STEPS.length;
  }

  getCompletionRatio(): number {
    return Math.round((this.getCompletedCount() / ALL_STEPS.length) * 100) / 100;
  }

  getCompletionPercent(): number {
    return Math.round(this.getCompletionRatio() * 100);
  }

  isComplete(): boolean {
    return this.getCompletedCount() === ALL_STEPS.length;
  }

  getRemainingSteps(): readonly OnboardingStep[] {
    return ALL_STEPS.filter((s) => !this.value.completedSteps.includes(s));
  }

  getNextStep(): OnboardingStep | null {
    const idx = ALL_STEPS.indexOf(this.value.currentStep);
    if (idx < 0 || idx >= ALL_STEPS.length - 1) return null;
    return ALL_STEPS[idx + 1] ?? null;
  }

  getPreviousStep(): OnboardingStep | null {
    const idx = ALL_STEPS.indexOf(this.value.currentStep);
    if (idx <= 0) return null;
    return ALL_STEPS[idx - 1] ?? null;
  }

  markStepComplete(step: OnboardingStep, at: string = new Date().toISOString()): VendorOnboardingProgressVO {
    if (this.isStepCompleted(step)) return this;
    const nextStep = this.getNextStep() ?? step;
    return new VendorOnboardingProgressVO({
      completedSteps: [...this.value.completedSteps, step],
      currentStep: nextStep,
      startedAt: this.value.startedAt,
      lastUpdatedAt: at,
      abandoned: this.value.abandoned,
    });
  }

  /** Number of days the vendor has been onboarding. */
  getAgeInDays(at: Date = new Date()): number {
    const started = Date.parse(this.value.startedAt);
    return Math.floor((at.getTime() - started) / (24 * 60 * 60 * 1000));
  }

  isStale(at: Date = new Date()): boolean {
    return this.getAgeInDays(at) > 14 && !this.isComplete();
  }
}
