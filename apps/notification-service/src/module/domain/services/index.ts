// ═══════════════════════════════════════════════════════
// Domain Services — Barrel Export
// ═══════════════════════════════════════════════════════

export { NotificationBuilderService, type BuildNotificationInput } from './notification-builder.service';
export { ChannelSelectorService, type SelectChannelsInput } from './channel-selector.service';
export { PriorityCalculatorService, type PriorityInput } from './priority-calculator.service';
export { RecipientResolverService, type RecipientData } from './recipient-resolver.service';
export { TemplateRendererService, type RenderContext } from './template-renderer.service';
export { TemplateValidatorService, type TemplateValidationResult } from './template-validator.service';
export { VariableInterpolatorService } from './variable-interpolator.service';
export { PersonalizationService, type PersonalizationContext } from './personalization.service';
export { ScheduleCalculatorService } from './schedule-calculator.service';
export { ScheduleMatcherService } from './schedule-matcher.service';
export { DigestBuilderService, type BuildDigestInput } from './digest-builder.service';
export { DigestSchedulerService } from './digest-scheduler.service';
export { PreferenceCheckerService } from './preference-checker.service';
export { RateLimiterService, type RateLimitWindow } from './rate-limiter.service';
export { QuietHoursService, type QuietHoursWindow } from './quiet-hours.service';
export { RetryPolicyService, type RetryPolicyInput, type RetryDecision } from './retry-policy.service';
export { BounceHandlerService, type BounceInfo } from './bounce-handler.service';
export { UnsubscribeService } from './unsubscribe.service';
export { ContentSplitterService, type SmsSegment } from './content-splitter.service';
export { DeliveryTrackerService } from './delivery-tracker.service';
