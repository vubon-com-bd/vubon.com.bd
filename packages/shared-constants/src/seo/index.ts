/**
 * SEO Constants Index
 * Export all SEO constants and types for easy importing
 */

// SEO Main Constants
export {
  SEO,
  getSEOPriorityLabel,
  getSEOStatusLabel,
  getSEOScoreLabel,
  getSEOScoreColor,
  isSEOTitleValid,
  isSEODescriptionValid,
  getSEOOptimalTitleLength,
  getSEOOptimalDescriptionLength,
  getSEOErrorLabel,
  getSEORecommendationLabel,
  getSEOMetaTagName,
} from './seo.constants';

export type {
  SEOStrategyType as SEOStrategyMainType,
  SEOStatus,
  SEOPriority,
  SEOMetaTag,
  SEOOGTag,
  SEOTwitterCard,
  SEOSitemapType,
  SEOKeywordType as SEOKeywordMainType,
  SEOKeywordIntent as SEOKeywordMainIntent,
  SEOContentType,
  SEOTool,
  SEORecommendation,
  SEOErrorType,
} from './seo.constants';

// SEO Type Constants
export {
  SEO_TYPE,
  getSEOPageTypeLabel,
  getSEOSearchEngineLabel,
  getSEORichSnippetLabel,
  getSEOEcommerceTypeLabel,
  getSEOMobileTypeLabel,
} from './seo-type.constants';

export type {
  SEOTypeCategory,
  SEOTypePageType,
  SEOTypeContentType,
  SEOTypeLinkAttribute,
  SEOTypeMobileType,
  SEOTypeInternationalType,
  SEOTypeSearchEngine,
  SEOTypeAlgorithmUpdate,
  SEOTypeRichSnippet,
  SEOTypeLocalType,
  SEOTypeEcommerceType,
} from './seo-type.constants';

// SEO Status Constants
export {
  SEO_STATUS,
  getSEOTaskStatusLabel,
  getSEOPageStatusLabel,
  getSEOLinkStatusLabel,
  getSEOIndexStatusLabel,
  getSEOTaskPriorityLabel,
  getSEOStatusCategory,
  getSEOStatusColor,
  isSEOTaskComplete,
  isSEOTaskBlocked,
  isSEOPagePublished,
  isSEOIndexed,
} from './seo-status.constants';

export type {
  SEOTaskStatus,
  SEOPageStatus,
  SEOLinkStatus as SEOGeneralLinkStatus,
  SEOIndexStatus,
  SEOCrawlStatus,
  SEOTaskPriority,
  SEOStatusCategory,
  SEOStatusValue,
} from './seo-status.constants';

// SEO Priority Constants
export {
  SEO_PRIORITY,
  getSEOPriorityLevelLabel,
  getSEOPriorityScoreLabel,
  getSEOPriorityImpactLabel,
  getSEOPriorityEffortLabel,
  getSEOPriorityTimeFrameLabel,
  calculateSEOPriorityScore,
  getSEOPriorityLevelFromScore,
  getSEOPriorityValue,
  shouldSEOPrioritizeOver,
  getSEOPriorityColor,
} from './seo-priority.constants';

export type {
  SEOPriorityLevel,
  SEOPriorityScore,
  SEOPriorityImpact,
  SEOPriorityEffort,
  SEOPriorityTimeFrame,
} from './seo-priority.constants';

// SEO Strategy Constants
export {
  SEO_STRATEGY,
  getSEOStrategyTypeLabel,
  getSEOStrategyStatusLabel,
  getSEOStrategyPriorityLabel,
  getSEOStrategyGoalLabel,
  getSEOStrategyKPILabel,
  getSEOStrategyTimelineLabel,
  getSEOStrategyBudgetLabel,
  getSEOStrategyResourceLabel,
  getSEOStrategyPhaseLabel,
  getSEOStrategyRiskLabel,
  isSEOStrategyActive,
  isSEOStrategyComplete,
  getSEOStrategyStatusColor,
} from './seo-strategy/seo-strategy.constants';

export type {
  SEOStrategyType,
  SEOStrategyStatus,
  SEOStrategyPriority,
  SEOStrategyGoal,
  SEOStrategyKPI,
  SEOStrategyTimeline,
  SEOStrategyBudgetRange,
  SEOStrategyResource,
  SEOStrategyFrequency,
  SEOStrategyMetric,
  SEOStrategyRisk,
  SEOStrategyPhase,
} from './seo-strategy/seo-strategy.constants';

// SEO Strategy Type Constants
export {
  SEO_STRATEGY_TYPE,
  getSEOStrategyCategoryLabel,
  getSEOStrategySubTypeLabel,
  getSEOStrategyApproachLabel,
  getSEOStrategyFocusLabel,
  getSEOStrategyComplexityLabel,
  getSEOStrategyMaturityLabel,
  isWhiteHatApproach,
  isBlackHatApproach,
  getApproachRiskLevel,
} from './seo-strategy/seo-strategy-type.constants';

export type {
  SEOStrategyTypeCategory,
  SEOStrategyTypeSubType,
  SEOStrategyTypeApproach,
  SEOStrategyTypeFocus,
  SEOStrategyTypeComplexity,
  SEOStrategyTypeMaturity,
} from './seo-strategy/seo-strategy-type.constants';

// SEO Strategy Status Constants
export {
  SEO_STRATEGY_STATUS,
  getSEOStrategyLifecycleLabel,
  getSEOStrategyExecutionLabel,
  getSEOStrategyHealthLabel,
  getSEOStrategyProgressLabel,
  getSEOStrategyQualityLabel,
  getSEOStrategyStatusRiskLabel,
  getSEOStrategyStatusCategory,
  getSEOStrategyStatusColorCode,
  isStrategyActive,
  isStrategyComplete,
  getProgressPercentage,
} from './seo-strategy/seo-strategy-status.constants';

export type {
  SEOStrategyLifecycleStatus,
  SEOStrategyExecutionStatus,
  SEOStrategyHealthStatus,
  SEOStrategyProgressStatus,
  SEOStrategyQualityStatus,
  SEOStrategyRiskStatus,
  SEOStrategyStatusCategory,
} from './seo-strategy/seo-strategy-status.constants';

// SEO Keyword Constants
export {
  SEO_KEYWORD,
  getSEOKeywordTypeLabel,
  getSEOKeywordStatusLabel,
  getSEOKeywordDifficultyLabel,
  getSEOKeywordIntentLabel,
  getSEOKeywordCompetitionLabel,
  getSEOKeywordGroupLabel,
  getSEOKeywordSourceLabel,
  getSEOKeywordLengthCategory,
  getSEOKeywordDifficultyScore,
  getSEOKeywordPriority,
  isKeywordActive,
  isKeywordSuccessful,
  getKeywordStatusColor,
} from './seo-keyword/seo-keyword.constants';

export type {
  SEOKeywordType,
  SEOKeywordStatus,
  SEOKeywordDifficulty,
  SEOKeywordIntent,
  SEOKeywordVolumeRange,
  SEOKeywordCompetition,
  SEOKeywordPriorityScore,
  SEOKeywordGroup,
  SEOKeywordMatchType,
  SEOKeywordSource,
  SEOKeywordLengthCategory,
  SEOKeywordValueMetric,
  SEOKeywordPerformanceMetric,
} from './seo-keyword/seo-keyword.constants';

// SEO Keyword Type Constants
export {
  SEO_KEYWORD_TYPE,
  getSEOKeywordCategoryLabel,
  getSEOKeywordFormatLabel,
  getSEOKeywordModifierLabel,
  getSEOKeywordIntentTypeLabel,
  getSEOKeywordFunnelStageLabel,
  getSEOKeywordSeasonalityLabel,
  getSEOKeywordGeoScopeLabel,
} from './seo-keyword/seo-keyword-type.constants';

export type {
  SEOKeywordTypeCategory,
  SEOKeywordTypeFormat,
  SEOKeywordTypeModifier,
  SEOKeywordTypeIntent,
  SEOKeywordTypeScore,
  SEOKeywordTypeFunnelStage,
  SEOKeywordTypeSeasonality,
  SEOKeywordTypeGeoScope,
} from './seo-keyword/seo-keyword-type.constants';

// SEO Keyword Status Constants
export {
  SEO_KEYWORD_STATUS,
  getSEOKeywordLifecycleLabel,
  getSEOKeywordPriorityLabel,
  getSEOKeywordProgressLabel,
  getSEOKeywordQualityLabel,
  getSEOKeywordRankingLabel,
  getSEOKeywordStatusCategory,
  getSEOKeywordStatusColor,
  isKeywordActive as isSEOKeywordActive,
  isKeywordCompleted,
  getProgressPercentage as getKeywordProgressPercentage,
} from './seo-keyword/seo-keyword-status.constants';

export type {
  SEOKeywordLifecycleStatus,
  SEOKeywordPriorityStatus,
  SEOKeywordProgressStatus,
  SEOKeywordQualityStatus,
  SEOKeywordRankingStatus,
  SEOKeywordCategoryStatus,
} from './seo-keyword/seo-keyword-status.constants';

// SEO Keyword Difficulty Constants
export {
  SEO_KEYWORD_DIFFICULTY,
  getDifficultyLevel,
  getDifficultyLabel,
  getDifficultyColor,
  calculateDifficulty,
  getDifficultyRecommendation,
  getEaseOfRanking,
  getDifficultyCategory,
} from './seo-keyword/seo-keyword-difficulty.constants';

export type {
  SEOKeywordDifficultyLevel,
  SEOKeywordDifficultyRange,
  SEOKeywordDifficultyLabel,
  SEOKeywordDifficultyColor,
  SEOKeywordDifficultyFactor,
} from './seo-keyword/seo-keyword-difficulty.constants';

// SEO Keyword Intent Constants
export {
  SEO_KEYWORD_INTENT,
  getIntentTypeLabel,
  getIntentSubTypeLabel,
  getIntentScore,
  getIntentColor,
  detectIntent,
  getIntentRecommendation,
  getFunnelStage,
} from './seo-keyword/seo-keyword-intent.constants';

export type {
  SEOKeywordIntentType,
  SEOKeywordIntentSubType,
  SEOKeywordIntentSignal,
  SEOKeywordIntentScore,
  SEOKeywordIntentColor,
} from './seo-keyword/seo-keyword-intent.constants';

// SEO Content Constants
export {
  SEO_CONTENT,
  getSEOContentTypeLabel,
  getSEOContentStatusLabel,
  getSEOContentPriorityLabel,
  getSEOContentFormatLabel,
  getSEOContentLengthCategory,
  getSEOContentQualityLabel,
  getSEOContentToneLabel,
  getSEOContentPurposeLabel,
  getSEOContentPlatformLabel,
  getSEOContentErrorLabel,
  isContentPublished,
  isContentActive,
  getContentStatusColor,
} from './seo-content/seo-content.constants';

export type {
  SEOContentType as SEOContentMainType,
  SEOContentStatus as SEOContentMainStatus,
  SEOContentPriority,
  SEOContentFormat,
  SEOContentLengthCategory,
  SEOContentQualityLevel,
  SEOContentReadabilityLevel,
  SEOContentTone,
  SEOContentPurpose,
  SEOContentPlatform,
  SEOContentDistributionChannel,
  SEOContentMetric,
  SEOContentErrorType,
} from './seo-content/seo-content.constants';

// SEO Content Type Constants
export {
  SEO_CONTENT_TYPE,
  getSEOContentCategoryLabel,
  getSEOContentSubCategoryLabel,
  getSEOContentStyleLabel,
  getSEOContentComplexityLabel,
  getSEOContentAudienceLabel,
  getSEOContentFormatTypeLabel,
  getSEOContentSourceLabel,
} from './seo-content/seo-content-type.constants';

export type {
  SEOContentTypeCategory,
  SEOContentTypeSubCategory,
  SEOContentTypeStyle,
  SEOContentTypeComplexity,
  SEOContentTypeAudience,
  SEOContentTypeFormat as SEOContentTypeFormatType,
  SEOContentTypeSource,
} from './seo-content/seo-content-type.constants';

// SEO Content Status Constants
export {
  SEO_CONTENT_STATUS,
  getSEOContentLifecycleLabel,
  getSEOContentWorkflowLabel,
  getSEOContentPublishingLabel,
  getSEOContentApprovalLabel,
  getSEOContentQualityLabel as getSEOContentQualityStatusLabel,
  getSEOContentStatusCategory,
  getSEOContentStatusColor,
  isContentReadyToPublish,
  isContentPublished as isSEOContentPublished,
  getProgressPercentage as getSEOContentProgressPercentage,
} from './seo-content/seo-content-status.constants';

export type {
  SEOContentLifecycleStatus,
  SEOContentWorkflowStatus,
  SEOContentPublishingStatus,
  SEOContentQualityStatus as SEOContentQualityStatusType,
  SEOContentApprovalStatus,
  SEOContentStatusCategory as SEOContentStatusCategoryType,
} from './seo-content/seo-content-status.constants';

// SEO Content Optimization Constants
export {
  SEO_CONTENT_OPTIMIZATION,
  getSEOContentOptimizationTypeLabel,
  getSEOContentOptimizationStatusLabel,
  getSEOContentOptimizationTechniqueLabel,
  getSEOContentOptimizationPriorityLabel,
  getSEOContentOptimizationImpactLabel,
  getSEOContentOptimizationEffortLabel,
  getSEOContentOptimizationToolLabel,
} from './seo-content/seo-content-optimization.constants';

export type {
  SEOContentOptimizationType,
  SEOContentOptimizationStatus,
  SEOContentOptimizationTechnique,
  SEOContentOptimizationPriority,
  SEOContentOptimizationImpact,
  SEOContentOptimizationEffort,
  SEOContentOptimizationTool,
  SEOContentOptimizationMetric,
  SEOContentOptimizationRecommendation,
} from './seo-content/seo-content-optimization.constants';

// SEO Content Optimization Type Constants
export {
  SEO_CONTENT_OPTIMIZATION_TYPE,
  getSEOContentOptimizationCategoryLabel,
  getSEOContentOptimizationApproachLabel,
  getSEOContentOptimizationStrategyLabel,
  getSEOContentOptimizationPhaseLabel,
  getSEOContentOptimizationScopeLabel,
  getSEOContentOptimizationTriggerLabel,
} from './seo-content/seo-content-optimization-type.constants';

export type {
  SEOContentOptimizationTypeCategory,
  SEOContentOptimizationTypeApproach,
  SEOContentOptimizationTypeStrategy,
  SEOContentOptimizationTypePhase,
  SEOContentOptimizationTypeScope,
  SEOContentOptimizationTypeTrigger,
} from './seo-content/seo-content-optimization-type.constants';

// SEO Content Optimization Status Constants
export {
  SEO_CONTENT_OPTIMIZATION_STATUS,
  getSEOContentOptimizationProcessLabel,
  getSEOContentOptimizationResultLabel,
  getSEOContentOptimizationPerformanceLabel,
  getSEOContentOptimizationHealthLabel,
  getSEOContentOptimizationValidationLabel,
  getSEOContentOptimizationStatusCategory,
  getSEOContentOptimizationStatusColor,
  isOptimizationSuccessful,
  isOptimizationInProgress,
  getProgressPercentage as getSEOOptimizationProgressPercentage,
} from './seo-content/seo-content-optimization-status.constants';

export type {
  SEOContentOptimizationProcessStatus,
  SEOContentOptimizationResultStatus,
  SEOContentOptimizationPerformanceStatus,
  SEOContentOptimizationHealthStatus,
  SEOContentOptimizationValidationStatus,
  SEOContentOptimizationStatusCategory,
} from './seo-content/seo-content-optimization-status.constants';

// SEO Link Constants
export {
  SEO_LINK,
  getSEOLinkTypeLabel,
  getSEOLinkStatusLabel as getSEOLinkStatusMainLabel,
  getSEOLinkRelationLabel,
  getSEOLinkTargetLabel,
  getSEOLinkAuthorityLabel,
  getSEOLinkPlacementLabel,
  getSEOLinkSourceLabel,
  getSEOLinkAnchorTextTypeLabel,
  getSEOLinkErrorLabel,
  isLinkActive,
  isLinkProblematic,
  getLinkStatusColor,
} from './seo-link/seo-link.constants';

export type {
  SEOLinkType,
  SEOLinkStatus as SEOLinkMainStatus,
  SEOLinkAttribute,
  SEOLinkRelation,
  SEOLinkTarget,
  SEOLinkQualityScore,
  SEOLinkAuthorityLevel,
  SEOLinkPlacementType,
  SEOLinkSource,
  SEOLinkAnchorTextType,
  SEOLinkMetric,
  SEOLinkErrorType,
} from './seo-link/seo-link.constants';

// SEO Link Type Constants
export {
  SEO_LINK_TYPE,
  getSEOLinkCategoryLabel,
  getSEOLinkSubTypeLabel,
  getSEOLinkRelationshipLabel,
  getSEOLinkDirectionLabel,
  getSEOLinkValueLabel,
  getSEOLinkContextLabel,
  getSEOLinkPositionLabel,
} from './seo-link/seo-link-type.constants';

export type {
  SEOLinkTypeCategory,
  SEOLinkTypeSubType,
  SEOLinkTypeRelationship,
  SEOLinkTypeDirection,
  SEOLinkTypeValue,
  SEOLinkTypeContext,
  SEOLinkTypePosition,
} from './seo-link/seo-link-type.constants';

// SEO Link Status Constants
export {
  SEO_LINK_STATUS,
  getSEOLinkLifecycleLabel,
  getSEOLinkHealthLabel,
  getSEOLinkRiskLabel,
  getSEOLinkQualityLabel,
  getSEOLinkTrustLabel,
  getSEOLinkAuthorityStatusLabel,
  getSEOLinkStatusCategory,
  getSEOLinkStatusColor,
  isLinkHealthy,
  isLinkProblematic as isSEOLinkProblematic,
} from './seo-link/seo-link-status.constants';

export type {
  SEOLinkLifecycleStatus,
  SEOLinkHealthStatus,
  SEOLinkRiskStatus,
  SEOLinkQualityStatus,
  SEOLinkTrustStatus,
  SEOLinkAuthorityStatus,
  SEOLinkStatusCategory,
} from './seo-link/seo-link-status.constants';

// SEO Link Attribute Constants
export {
  SEO_LINK_ATTRIBUTE,
  getSEOLinkAttributeLabel,
  getSEOLinkRelLabel,
  getSEOLinkTargetLabel as getSEOLinkAttributeTargetLabel,
  getSEOLinkMediaLabel,
  getSEOLinkReferrerPolicyLabel,
  getLinkAttributeCombination,
  buildLinkAttributes,
  getSEOLinkTypeValueLabel,
} from './seo-link/seo-link-attribute.constants';

export type {
  SEOLinkAttributeType,
  SEOLinkAttributeRel,
  SEOLinkAttributeTarget,
  SEOLinkAttributeMedia,
  SEOLinkAttributeTypeValue,
  SEOLinkAttributeReferrerPolicy,
} from './seo-link/seo-link-attribute.constants';

// SEO Audit Constants
export {
  SEO_AUDIT,
  getSEOAuditTypeLabel,
  getSEOAuditStatusLabel,
  getSEOAuditSeverityLabel,
  getSEOAuditPriorityLabel,
  getSEOAuditCategoryLabel,
  getSEOAuditFrequencyLabel,
  getSEOAuditScopeLabel,
  getSEOAuditToolLabel,
  getSEOAuditFindingLabel,
  getAuditScoreLabel,
  getAuditScoreColor,
  getPriorityColor as getAuditPriorityColor,
  isAuditComplete,
  isAuditInProgress,
} from './seo-audit/seo-audit.constants';

export type {
  SEOAuditType,
  SEOAuditStatus,
  SEOAuditSeverity,
  SEOAuditPriority,
  SEOAuditCategory,
  SEOAuditFrequency,
  SEOAuditScope,
  SEOAuditTool,
  SEOAuditFinding,
  SEOAuditScoreRange,
  SEOAuditMetric,
} from './seo-audit/seo-audit.constants';

// SEO Audit Type Constants
export {
  SEO_AUDIT_TYPE,
  getSEOAuditCategoryTypeLabel,
  getSEOAuditMethodologyLabel,
  getSEOAuditApproachLabel,
  getSEOAuditComplexityLabel,
  getSEOAuditDeliverableLabel,
  getSEOAuditPhaseLabel,
  getSEOAuditDepthLabel,
  getSEOAuditFocusLabel,
} from './seo-audit/seo-audit-type.constants';

export type {
  SEOAuditTypeCategory,
  SEOAuditTypeMethodology,
  SEOAuditTypeApproach,
  SEOAuditTypeComplexity,
  SEOAuditTypeDeliverable,
  SEOAuditTypePhase,
  SEOAuditTypeDepth,
  SEOAuditTypeFocus,
} from './seo-audit/seo-audit-type.constants';

// SEO Audit Status Constants
export {
  SEO_AUDIT_STATUS,
  getSEOAuditLifecycleLabel,
  getSEOAuditExecutionLabel,
  getSEOAuditQualityLabel,
  getSEOAuditHealthLabel,
  getSEOAuditValidationLabel,
  getSEOAuditStatusCategory,
  getSEOAuditStatusColor,
  isAuditRunning,
  isAuditComplete as isAuditCompleted,
  getExecutionProgressPercentage,
} from './seo-audit/seo-audit-status.constants';

export type {
  SEOAuditLifecycleStatus,
  SEOAuditExecutionStatus,
  SEOAuditQualityStatus,
  SEOAuditHealthStatus,
  SEOAuditValidationStatus,
  SEOAuditStatusCategory,
} from './seo-audit/seo-audit-status.constants';

// SEO Audit Severity Constants
export {
  SEO_AUDIT_SEVERITY,
  getAuditSeverityLevelLabel,
  getAuditSeverityScore,
  getAuditSeverityColor,
  getAuditSeverityPriority,
  getAuditSeverityImpact,
  getAuditSeverityUrgency,
  getAuditSeverityCategory,
  getAuditSeverityWeight,
  isAuditSeverityActionable,
  getAuditSeverityRecommendation,
} from './seo-audit/seo-audit-severity.constants';

export type {
  SEOAuditSeverityLevel,
  SEOAuditSeverityScore,
  SEOAuditSeverityColor,
  SEOAuditSeverityPriority,
  SEOAuditSeverityImpact,
  SEOAuditSeverityUrgency,
  SEOAuditSeverityCategory,
} from './seo-audit/seo-audit-severity.constants';

// SEO Score Constants
export {
  SEO_SCORE,
  getSEOScoreTypeLabel,
  getSEOScoreStatusLabel,
  getSEOScoreLabel as getSEOScoreLabelMain,
  getSEOScoreColor as getSEOScoreColorMain,
  getSEOScoreRange,
  getSEOScoreWeightLabel,
  getSEOScoreFactorLabel,
  getSEOScoreTrendLabel,
  getSEOScoreComparisonLabel,
  getSEOScoreConfidenceLabel,
  calculateWeightedScore,
  getScoreCategory,
  isScoreGood,
  isScoreExcellent,
  isScoreOutstanding,
} from './seo-score/seo-score.constants';

export type {
  SEOScoreType,
  SEOScoreStatus,
  SEOScoreRange,
  SEOScoreLabel as SEOScoreLabelMain,
  SEOScoreColor as SEOScoreColorMain,
  SEOScoreWeightCategory,
  SEOScoreFactor,
  SEOScoreMetric,
  SEOScoreComparisonType,
  SEOScoreTrend,
  SEOScoreConfidence,
} from './seo-score/seo-score.constants';

// SEO Score Type Constants
export {
  SEO_SCORE_TYPE,
  getSEOScoreCategoryTypeLabel,
  getSEOScoreMethodologyLabel,
  getSEOScoreGranularityLabel,
  getSEOScoreContextLabel,
  getSEOScoreFormatLabel,
  getSEOScorePerspectiveLabel,
  getSEOScoreDimensionLabel,
} from './seo-score/seo-score-type.constants';

export type {
  SEOScoreTypeCategory,
  SEOScoreTypeMethodology,
  SEOScoreTypeGranularity,
  SEOScoreTypeContext,
  SEOScoreTypeFormat,
  SEOScoreTypePerspective,
  SEOScoreTypeDimension,
} from './seo-score/seo-score-type.constants';

// SEO Score Status Constants
export {
  SEO_SCORE_STATUS,
  getSEOScoreLifecycleLabel,
  getSEOScoreQualityStatusLabel,
  getSEOScoreAccuracyLabel,
  getSEOScoreReliabilityLabel,
  getSEOScoreFreshnessLabel,
  getSEOScoreValidationLabel,
  getSEOScoreStatusCategory,
  getSEOScoreStatusColor,
  isScoreCompleted,
  isScoreValid,
  isScoreOutdated,
} from './seo-score/seo-score-status.constants';

export type {
  SEOScoreLifecycleStatus,
  SEOScoreQualityStatus,
  SEOScoreAccuracyStatus,
  SEOScoreReliabilityStatus,
  SEOScoreFreshnessStatus,
  SEOScoreValidationStatus,
  SEOScoreStatusCategory,
} from './seo-score/seo-score-status.constants';

// SEO Ranking Constants
export {
  SEO_RANKING,
  getSEORankingTypeLabel,
  getSEORankingStatusLabel,
  getSEORankingPositionLabel,
  getSEORankingPositionCategory,
  getSEORankingDifficultyLabel,
  getSEORankingVelocityLabel,
  getSEORankingScoreLabel,
  getSEORankingScoreColor,
  getSEORankingSourceLabel,
  getSEORankingFrequencyLabel,
  getRankingStatusColor,
  isRankingImproving,
  isRankingDeclining,
  getPositionChange,
} from './seo-ranking/seo-ranking.constants';

export type {
  SEORankingType,
  SEORankingStatus,
  SEORankingPosition,
  SEORankingPositionCategory,
  SEORankingScoreRange,
  SEORankingFactor,
  SEORankingDifficulty,
  SEORankingVelocity,
  SEORankingMetric,
  SEORankingSource,
  SEORankingFrequency,
} from './seo-ranking/seo-ranking.constants';

// SEO Ranking Type Constants
export {
  SEO_RANKING_TYPE,
  getSEORankingCategoryLabel,
  getSEORankingSubTypeLabel,
  getSEORankingSERPFeatureLabel,
  getSEORankingDeviceLabel,
  getSEORankingAlgorithmLabel,
  getSEORankingQualityLabel,
  getSEORankingStabilityLabel,
} from './seo-ranking/seo-ranking-type.constants';

export type {
  SEORankingTypeCategory,
  SEORankingTypeSubType,
  SEORankingTypeSERPFeature,
  SEORankingTypeDevice,
  SEORankingTypeAlgorithm,
  SEORankingTypeQuality,
  SEORankingTypeStability,
} from './seo-ranking/seo-ranking-type.constants';

// SEO Ranking Status Constants
export {
  SEO_RANKING_STATUS,
  getSEORankingLifecycleLabel,
  getSEORankingHealthLabel,
  getSEORankingPerformanceLabel,
  getSEORankingRiskLabel,
  getSEORankingVisibilityLabel,
  getSEORankingTrackingLabel,
  getSEORankingStatusCategory,
  getSEORankingStatusColor,
  isSEORankingImproving,
  isSEORankingDeclining,
  isSEORankingStable,
  isSEORankingActive,
} from './seo-ranking/seo-ranking-status.constants';

export type {
  SEORankingLifecycleStatus,
  SEORankingHealthStatus,
  SEORankingPerformanceStatus,
  SEORankingRiskStatus,
  SEORankingVisibilityStatus,
  SEORankingTrackingStatus,
  SEORankingStatusCategory,
} from './seo-ranking/seo-ranking-status.constants';

// SEO Sitemap Constants
export {
  SEO_SITEMAP,
  getSEOSitemapTypeLabel,
  getSEOSitemapStatusLabel,
  getSEOSitemapPriorityLabel,
  getSEOSitemapChangeFrequencyLabel,
  getSEOSitemapFormatLabel,
  getSEOSitemapCompressionLabel,
  getSEOSitemapValidationLabel as getSEOSitemapValidationMainLabel,
  getSEOSitemapErrorLabel,
  getSEOSitemapSourceLabel,
  getSitemapStatusColor,
  isSitemapValid,
  isSitemapActive,
  getPriorityValue,
} from './seo-sitemap/seo-sitemap.constants';

export type {
  SEOSitemapStatus,
  SEOSitemapPriority,
  SEOSitemapChangeFrequency,
  SEOSitemapFormat,
  SEOSitemapSize,
  SEOSitemapProtocol,
  SEOSitemapCompression,
  SEOSitemapValidation,
  SEOSitemapErrorType,
  SEOSitemapMetric,
  SEOSitemapSource,
} from './seo-sitemap/seo-sitemap.constants';

// SEO Sitemap Type Constants
export {
  SEO_SITEMAP_TYPE,
  getSEOSitemapCategoryLabel,
  getSEOSitemapSubTypeLabel,
  getSEOSitemapGeneratorLabel,
  getSEOSitemapScopeLabel,
  getSEOSitemapStructureLabel,
  getSEOSitemapAudienceLabel,
} from './seo-sitemap/seo-sitemap-type.constants';

export type {
  SEOSitemapTypeCategory,
  SEOSitemapTypeSubType,
  SEOSitemapTypeGenerator,
  SEOSitemapTypeScope,
  SEOSitemapTypeStructure,
  SEOSitemapTypeAudience,
} from './seo-sitemap/seo-sitemap-type.constants';

// SEO Sitemap Status Constants
export {
  SEO_SITEMAP_STATUS,
  getSEOSitemapLifecycleLabel,
  getSEOSitemapHealthLabel,
  getSEOSitemapQualityLabel,
  getSEOSitemapValidationLabel as getSEOSitemapValidationStatusLabel,
  getSEOSitemapIndexingLabel,
  getSEOSitemapStatusCategory,
  getSEOSitemapStatusColor,
  isSitemapValid as isSitemapLifecycleValid,
  isSitemapProcessing,
} from './seo-sitemap/seo-sitemap-status.constants';

export type {
  SEOSitemapLifecycleStatus,
  SEOSitemapHealthStatus,
  SEOSitemapQualityStatus,
  SEOSitemapValidationStatus,
  SEOSitemapIndexingStatus,
  SEOSitemapStatusCategory,
} from './seo-sitemap/seo-sitemap-status.constants';

// SEO Robots Constants
export {
  SEO_ROBOTS,
  getSEORobotsTypeLabel,
  getSEORobotsStatusLabel,
  getSEORobotsDirectiveLabel,
  getSEORobotsUserAgentLabel,
  getSEORobotsErrorLabel,
  getRobotsStatusColor,
  isRobotsValid,
  isRobotsActive,
  getCombinedDirectives,
  formatRobotsDirective,
} from './seo-robots/seo-robots.constants';

export type {
  SEORobotsType,
  SEORobotsStatus,
  SEORobotsDirective as SEORobotsDirectiveMain,
  SEORobotsUserAgent,
  SEORobotsParameter,
  SEORobotsValidation,
  SEORobotsErrorType,
  SEORobotsMetric,
} from './seo-robots/seo-robots.constants';

// SEO Robots Type Constants
export {
  SEO_ROBOTS_TYPE,
  getSEORobotsCategoryLabel,
  getSEORobotsMetaSubTypeLabel,
  getSEORobotsXRobotsSubTypeLabel,
  getSEORobotsLinkSubTypeLabel,
  getSEORobotsScopeLabel,
  getSEORobotsPriorityLabel,
  getSEORobotsImplementationLabel,
} from './seo-robots/seo-robots-type.constants';

export type {
  SEORobotsTypeCategory,
  SEORobotsTypeMetaSubType,
  SEORobotsTypeXRobotsSubType,
  SEORobotsTypeLinkSubType,
  SEORobotsTypeScope,
  SEORobotsTypePriority,
  SEORobotsTypeImplementation,
} from './seo-robots/seo-robots-type.constants';

// SEO Robots Status Constants
export {
  SEO_ROBOTS_STATUS,
  getSEORobotsLifecycleLabel,
  getSEORobotsHealthLabel,
  getSEORobotsComplianceLabel,
  getSEORobotsPerformanceLabel,
  getSEORobotsValidationLabel,
  getSEORobotsStatusCategory,
  getSEORobotsStatusColor,
  isRobotsValid as isRobotsLifecycleValid,
  isRobotsProcessing,
} from './seo-robots/seo-robots-status.constants';

export type {
  SEORobotsLifecycleStatus,
  SEORobotsHealthStatus,
  SEORobotsComplianceStatus,
  SEORobotsPerformanceStatus,
  SEORobotsValidationStatus,
  SEORobotsStatusCategory,
} from './seo-robots/seo-robots-status.constants';

// SEO Schema Constants
export {
  SEO_SCHEMA,
  getSEOSchemaTypeLabel,
  getSEOSchemaStatusLabel,
  getSEOSchemaValidationLabel,
  getSEOSchemaFormatLabel,
  getSEOSchemaPriorityLabel,
  getSEOSchemaErrorLabel,
  getSEOSchemaToolLabel,
  getSchemaStatusColor,
  isSchemaValid,
  isSchemaActive,
  getSchemaCategory,
} from './seo-schema/seo-schema.constants';

export type {
  SEOSchemaStatus,
  SEOSchemaValidation,
  SEOSchemaFormat,
  SEOSchemaContext,
  SEOSchemaPriority,
  SEOSchemaErrorType,
  SEOSchemaMetric,
  SEOSchemaTool,
} from './seo-schema/seo-schema.constants';

// SEO Schema Type Constants
export {
  SEO_SCHEMA_TYPE,
  getSEOSchemaCategoryLabel,
  getSEOSchemaSubTypeLabel,
  getSEOSchemaPropertyLabel,
  getSEOSchemaPropertyGroupLabel,
  getSEOSchemaComplexityLabel,
  getSEOSchemaPurposeLabel,
} from './seo-schema/seo-schema-type.constants';

export type {
  SEOSchemaTypeCategory,
  SEOSchemaTypeSubType,
  SEOSchemaTypeProperty,
  SEOSchemaTypePropertyGroup,
  SEOSchemaTypeComplexity,
  SEOSchemaTypePurpose,
} from './seo-schema/seo-schema-type.constants';

// SEO Schema Status Constants
export {
  SEO_SCHEMA_STATUS,
  getSEOSchemaLifecycleLabel,
  getSEOSchemaHealthLabel,
  getSEOSchemaQualityLabel,
  getSEOSchemaComplianceLabel,
  getSEOSchemaPerformanceLabel,
  getSEOSchemaStatusCategory,
  getSEOSchemaStatusColor,
  isSchemaValid as isSchemaLifecycleValid,
  isSchemaProcessing,
} from './seo-schema/seo-schema-status.constants';

export type {
  SEOSchemaLifecycleStatus,
  SEOSchemaHealthStatus,
  SEOSchemaQualityStatus,
  SEOSchemaComplianceStatus,
  SEOSchemaPerformanceStatus,
  SEOSchemaStatusCategory,
} from './seo-schema/seo-schema-status.constants';

// SEO Open Graph Constants
export {
  SEO_OPEN_GRAPH,
  getSEOOpenGraphTypeLabel,
  getSEOOpenGraphStatusLabel,
  getSEOOpenGraphPropertyLabel,
  getSEOOpenGraphPlatformLabel,
  getSEOOpenGraphErrorLabel,
  getOGStatusColor,
  isOGValid,
  isOGActive,
  getOGImageRecommendation,
} from './seo-open-graph/seo-open-graph.constants';

export type {
  SEOOpenGraphType,
  SEOOpenGraphStatus,
  SEOOpenGraphProperty,
  SEOOpenGraphImageSize,
  SEOOpenGraphValidation,
  SEOOpenGraphPlatform,
  SEOOpenGraphErrorType,
  SEOOpenGraphMetric,
} from './seo-open-graph/seo-open-graph.constants';

// SEO Open Graph Type Constants
export {
  SEO_OPEN_GRAPH_TYPE,
  getSEOOpenGraphCategoryLabel,
  getSEOOpenGraphSubTypeLabel,
  getSEOOpenGraphContextLabel,
  getSEOOpenGraphPurposeLabel,
  getSEOOpenGraphComplexityLabel,
} from './seo-open-graph/seo-open-graph-type.constants';

export type {
  SEOOpenGraphTypeCategory,
  SEOOpenGraphTypeSubType,
  SEOOpenGraphTypeContext,
  SEOOpenGraphTypePurpose,
  SEOOpenGraphTypeComplexity,
} from './seo-open-graph/seo-open-graph-type.constants';

// SEO Open Graph Status Constants
export {
  SEO_OPEN_GRAPH_STATUS,
  getSEOOpenGraphLifecycleLabel,
  getSEOOpenGraphHealthLabel,
  getSEOOpenGraphQualityLabel,
  getSEOOpenGraphComplianceLabel,
  getSEOOpenGraphPerformanceLabel,
  getSEOOpenGraphStatusCategory,
  getSEOOpenGraphStatusColor,
  isOGValid as isOGLifecycleValid,
  isOGProcessing,
} from './seo-open-graph/seo-open-graph-status.constants';

export type {
  SEOOpenGraphLifecycleStatus,
  SEOOpenGraphHealthStatus,
  SEOOpenGraphQualityStatus,
  SEOOpenGraphComplianceStatus,
  SEOOpenGraphPerformanceStatus,
  SEOOpenGraphStatusCategory,
} from './seo-open-graph/seo-open-graph-status.constants';

// SEO Twitter Card Constants
export {
  SEO_TWITTER_CARD,
  getSEOTwitterCardTypeLabel,
  getSEOTwitterCardStatusLabel,
  getSEOTwitterCardPropertyLabel,
  getSEOTwitterCardPlatformLabel,
  getSEOTwitterCardErrorLabel,
  getTwitterCardStatusColor,
  isTwitterCardValid,
  isTwitterCardActive,
  getTwitterCardImageRecommendation,
} from './seo-twitter-card/seo-twitter-card.constants';

export type {
  SEOTwitterCardType,
  SEOTwitterCardStatus,
  SEOTwitterCardProperty,
  SEOTwitterCardImageSize,
  SEOTwitterCardValidation,
  SEOTwitterCardPlatform,
  SEOTwitterCardErrorType,
  SEOTwitterCardMetric,
} from './seo-twitter-card/seo-twitter-card.constants';

// SEO Twitter Card Type Constants
export {
  SEO_TWITTER_CARD_TYPE,
  getSEOTwitterCardCategoryLabel,
  getSEOTwitterCardSubTypeLabel,
  getSEOTwitterCardContextLabel,
  getSEOTwitterCardPurposeLabel,
  getSEOTwitterCardComplexityLabel,
  getSEOTwitterCardDisplayLabel,
} from './seo-twitter-card/seo-twitter-card-type.constants';

export type {
  SEOTwitterCardTypeCategory,
  SEOTwitterCardTypeSubType,
  SEOTwitterCardTypeContext,
  SEOTwitterCardTypePurpose,
  SEOTwitterCardTypeComplexity,
  SEOTwitterCardTypeDisplay,
} from './seo-twitter-card/seo-twitter-card-type.constants';

// SEO Twitter Card Status Constants
export {
  SEO_TWITTER_CARD_STATUS,
  getSEOTwitterCardLifecycleLabel,
  getSEOTwitterCardHealthLabel,
  getSEOTwitterCardQualityLabel,
  getSEOTwitterCardComplianceLabel,
  getSEOTwitterCardPerformanceLabel,
  getSEOTwitterCardStatusCategory,
  getSEOTwitterCardStatusColor,
  isTwitterCardValid as isTwitterCardLifecycleValid,
  isTwitterCardProcessing,
} from './seo-twitter-card/seo-twitter-card-status.constants';

export type {
  SEOTwitterCardLifecycleStatus,
  SEOTwitterCardHealthStatus,
  SEOTwitterCardQualityStatus,
  SEOTwitterCardComplianceStatus,
  SEOTwitterCardPerformanceStatus,
  SEOTwitterCardStatusCategory,
} from './seo-twitter-card/seo-twitter-card-status.constants';

// SEO Analytics Constants
export {
  SEO_ANALYTICS,
  getSEOAnalyticsTypeLabel,
  getSEOAnalyticsStatusLabel,
  getSEOAnalyticsTimeframeLabel,
  getSEOAnalyticsAggregationLabel,
  getSEOAnalyticsDimensionLabel,
  getSEOAnalyticsSourceLabel,
  getSEOAnalyticsFrequencyLabel,
  getSEOAnalyticsErrorLabel,
  getAnalyticsStatusColor,
  isSEOAnalyticsComplete,
  isSEOAnalyticsProcessing,
} from './seo-analytics/seo-analytics.constants';

export type {
  SEOAnalyticsType,
  SEOAnalyticsStatus,
  SEOAnalyticsTimeframe,
  SEOAnalyticsAggregation,
  SEOAnalyticsDimension,
  SEOAnalyticsSource,
  SEOAnalyticsFrequency,
  SEOAnalyticsErrorType,
} from './seo-analytics/seo-analytics.constants';

// SEO Analytics Type Constants
export {
  SEO_ANALYTICS_TYPE,
  getSEOAnalyticsCategoryLabel,
  getSEOAnalyticsSubTypeLabel,
  getSEOAnalyticsScopeLabel,
  getSEOAnalyticsGranularityLabel,
  getSEOAnalyticsContextLabel,
  getSEOAnalyticsPurposeLabel,
} from './seo-analytics/seo-analytics-type.constants';

export type {
  SEOAnalyticsTypeCategory,
  SEOAnalyticsTypeSubType,
  SEOAnalyticsTypeScope,
  SEOAnalyticsTypeGranularity,
  SEOAnalyticsTypeContext,
  SEOAnalyticsTypePurpose,
} from './seo-analytics/seo-analytics-type.constants';

// SEO Analytics Metric Constants
export {
  SEO_ANALYTICS_METRIC,
  getSEOAnalyticsMetricLabel,
  getSEOAnalyticsMetricCategory,
} from './seo-analytics/seo-analytics-metric.constants';

export type {
  SEOAnalyticsMetricTraffic,
  SEOAnalyticsMetricAcquisition,
  SEOAnalyticsMetricConversion,
  SEOAnalyticsMetricEngagement,
  SEOAnalyticsMetricTechnical,
  SEOAnalyticsMetricPerformance,
  SEOAnalyticsMetricBacklink,
  SEOAnalyticsMetricContent,
  SEOAnalyticsMetricMobile,
  SEOAnalyticsMetricSocial,
  SEOAnalyticsMetricRevenue,
} from './seo-analytics/seo-analytics-metric.constants';

// SEO Report Constants
export {
  SEO_REPORT,
  getSEOReportTypeLabel,
  getSEOReportStatusLabel,
  getSEOReportFormatLabel,
  getSEOReportFrequencyLabel,
  getSEOReportPriorityLabel,
  getSEOReportDeliveryLabel,
  getSEOReportSectionLabel,
  getSEOReportErrorLabel,
  seoReportGetStatusColor,
  isSEOReportComplete,
  isSEOReportProcessing,
} from './seo-report/seo-report.constants';

export type {
  SEOReportType,
  SEOReportStatus,
  SEOReportFormat,
  SEOReportFrequency,
  SEOReportPriority,
  SEOReportDelivery,
  SEOReportSection,
  SEOReportErrorType,
  SEOReportMetric,
} from './seo-report/seo-report.constants';

// SEO Report Type Constants
export {
  SEO_REPORT_TYPE,
  getSEOReportCategoryLabel,
  getSEOReportSubTypeLabel,
  getSEOReportScopeLabel,
  getSEOReportGranularityLabel,
  getSEOReportAudienceLabel,
  getSEOReportPurposeLabel,
} from './seo-report/seo-report-type.constants';

export type {
  SEOReportTypeCategory,
  SEOReportTypeSubType,
  SEOReportTypeScope,
  SEOReportTypeGranularity,
  SEOReportTypeAudience,
  SEOReportTypePurpose,
} from './seo-report/seo-report-type.constants';

// SEO Report Status Constants
export {
  SEO_REPORT_STATUS,
  getSEOReportLifecycleLabel,
  getSEOReportHealthLabel,
  getSEOReportQualityLabel,
  getSEOReportDeliveryLabel as getSEOReportDeliveryStatusLabel,
  getSEOReportValidationLabel,
  getSEOReportStatusCategory,
  getSEOReportStatusColor,
  isReportGenerated as isSEOReportGenerated,
  isReportProcessing as isSEOReportLifecycleProcessing,
} from './seo-report/seo-report-status.constants';

export type {
  SEOReportLifecycleStatus,
  SEOReportHealthStatus,
  SEOReportQualityStatus,
  SEOReportDeliveryStatus,
  SEOReportValidationStatus,
  SEOReportStatusCategory,
} from './seo-report/seo-report-status.constants';

// SEO Error Constants
export {
  SEO_ERROR,
  getSEOError,
  getSEOMessage,
  getSEODescription,
  isSEOError,
  getSEOErrorCategory,
} from './seo-error.constants';

export type { SEOErrorCode, SEOErrorMessage } from './seo-error.constants';
