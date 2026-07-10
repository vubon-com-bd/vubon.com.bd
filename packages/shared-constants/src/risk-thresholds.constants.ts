/**
 * Risk Thresholds Constants - Enterprise Grade
 * @module shared-constants/risk-thresholds.constants
 * 
 * @description
 * Centralized risk threshold configuration for the entire enterprise.
 * Used for login attempts, fraud detection, security scoring, and ML-based risk assessment.
 * 
 * Enterprise Rules:
 * ✅ SINGLE SOURCE OF TRUTH - All risk threshold configurations
 * ✅ Cross-service consistency (Auth, Payment, Order, User services)
 * ✅ ML-ready scoring system with configurable weights
 * ✅ Environment-aware defaults
 * ✅ Bangladesh specific - Local risk factors
 * ✅ Type-safe exports with const assertions
 * ✅ Framework-free, no external dependencies
 * ✅ Real-time risk assessment ready
 * ✅ Adaptive scoring with feedback loop support
 * 
 * @example
 * import { RISK_THRESHOLDS, RISK_WEIGHTS } from '@vubon/shared-constants';
 * 
 * // Calculate risk score for a login attempt
 * const riskScore = calculateRiskScore({
 *   isNewDevice: true,
 *   isVPN: false,
 *   failedAttempts: 2,
 *   timeOfDay: 14,
 * });
 * 
 * if (riskScore >= RISK_THRESHOLDS.CRITICAL_RISK_THRESHOLD) {
 *   // Block or challenge the login
 * }
 */

// ============================================================
// Risk Thresholds - Core Configuration
// ============================================================
export const RISK_THRESHOLDS = {
  // ============================================================
  // Basic Risk Score Ranges
  // ============================================================
  
  /** Minimum risk score (0 - no risk, completely safe) */
  MIN_RISK_SCORE: 0,
  
  /** Maximum risk score (100 - highest risk, immediate action required) */
  MAX_RISK_SCORE: 100,
  
  /** Low risk threshold (0-30 - normal activity) */
  LOW_RISK_THRESHOLD: 30,
  
  /** Medium risk threshold (30-50 - suspicious but acceptable) */
  MEDIUM_RISK_THRESHOLD: 30,
  
  /** High risk threshold (50-70 - requires additional verification) */
  HIGH_RISK_THRESHOLD: 50,
  
  /** Critical risk threshold (70-100 - immediate action required) */
  CRITICAL_RISK_THRESHOLD: 70,
  
  /** Very critical risk threshold (85-100 - automatic block) */
  VERY_CRITICAL_RISK_THRESHOLD: 85,
  
  // ============================================================
  // Individual Risk Scores - Authentication
  // ============================================================
  
  /** Risk score for new device login (unfamiliar device) */
  NEW_DEVICE_RISK: 30,
  
  /** Risk score for new location login (different city/country) */
  NEW_LOCATION_RISK: 25,
  
  /** Risk score for new IP address (unfamiliar IP) */
  NEW_IP_RISK: 15,
  
  /** Risk score for old/outdated browser */
  OLD_BROWSER_RISK: 20,
  
  /** Risk score for VPN detection */
  VPN_RISK: 40,
  
  /** Risk score for proxy detection */
  PROXY_RISK: 35,
  
  /** Risk score for Tor network detection */
  TOR_RISK: 60,
  
  /** Risk score for suspicious hour (10 PM - 6 AM) */
  SUSPICIOUS_HOUR_RISK: 20,
  
  /** Risk score for weekend login (Saturday/Sunday in Bangladesh) */
  WEEKEND_RISK: 10,
  
  /** Risk score for multiple failed attempts (per attempt) */
  FAILED_ATTEMPT_RISK: 15,
  
  /** Risk score for password reuse attempt */
  PASSWORD_REUSE_RISK: 25,
  
  /** Risk score for session replay attack */
  SESSION_REPLAY_RISK: 50,
  
  /** Risk score for login from different timezone (6+ hours difference) */
  DIFFERENT_TIMEZONE_RISK: 25,
  
  /** Risk score for device fingerprint mismatch */
  FINGERPRINT_MISMATCH_RISK: 45,
  
  /** Risk score for suspicious pattern detected (ML-based) */
  SUSPICIOUS_PATTERN_RISK: 60,
  
  // ============================================================
  // Individual Risk Scores - Account Security
  // ============================================================
  
  /** Risk score for SIM swap detected (Bangladesh specific) */
  SIM_SWAP_RISK: 80,
  
  /** Risk score for multiple accounts from same device */
  MULTI_ACCOUNT_RISK: 50,
  
  /** Risk score for account takeover attempt */
  ACCOUNT_TAKEOVER_RISK: 70,
  
  /** Risk score for brute force detection */
  BRUTE_FORCE_RISK: 75,
  
  /** Risk score for credential stuffing */
  CREDENTIAL_STUFFING_RISK: 65,
  
  /** Risk score for password spray attack */
  PASSWORD_SPRAY_RISK: 60,
  
  /** Risk score for distributed attack (multiple IPs) */
  DISTRIBUTED_ATTACK_RISK: 55,
  
  /** Risk score for unusual amount transaction (payment) */
  UNUSUAL_AMOUNT_RISK: 25,
  
  /** Risk score for rapid login attempts (5+ per minute) */
  RAPID_LOGIN_RISK: 35,
  
  /** Risk score for rapid IP changes (3+ per minute) */
  RAPID_IP_CHANGE_RISK: 40,
  
  // ============================================================
  // Individual Risk Scores - Device & Environment
  // ============================================================
  
  /** Risk score for headless browser detection */
  HEADLESS_BROWSER_RISK: 50,
  
  /** Risk score for automation tool detection */
  AUTOMATION_TOOL_RISK: 45,
  
  /** Risk score for bot detection */
  BOT_RISK: 70,
  
  /** Risk score for mobile device with data saver enabled */
  DATA_SAVER_RISK: 10,
  
  /** Risk score for feature phone (limited security) */
  FEATURE_PHONE_RISK: 15,
  
  /** Risk score for public wifi (unsecured network) */
  PUBLIC_WIFI_RISK: 20,
  
  /** Risk score for 2G/3G network (slow/old) */
  OLD_NETWORK_RISK: 15,
  
  // ============================================================
  // Risk Score Thresholds for Decision Making
  // ============================================================
  
  /** Score below this level = no action needed (0-20) */
  SAFE_ACTION_THRESHOLD: 20,
  
  /** Score between this range = require MFA (20-50) */
  MFA_REQUIRED_THRESHOLD: 20,
  
  /** Score between this range = require additional verification (50-70) */
  ADDITIONAL_VERIFICATION_THRESHOLD: 50,
  
  /** Score above this = automatic block (70-100) */
  AUTOMATIC_BLOCK_THRESHOLD: 70,
  
  /** Score above this = require admin review (85-100) */
  ADMIN_REVIEW_THRESHOLD: 85,
  
  /** Score above this = permanent account lock (95-100) */
  PERMANENT_LOCK_THRESHOLD: 95,
  
  // ============================================================
  // Risk Weight Configuration (for ML/Scoring)
  // ============================================================
  
  /** Device trust weight (0-1) */
  DEVICE_WEIGHT: 0.25,
  
  /** Location trust weight (0-1) */
  LOCATION_WEIGHT: 0.20,
  
  /** Behavior trust weight (0-1) */
  BEHAVIOR_WEIGHT: 0.30,
  
  /** Network trust weight (0-1) */
  NETWORK_WEIGHT: 0.15,
  
  /** Time-based weight (0-1) */
  TIME_WEIGHT: 0.10,
  
  // ============================================================
  // Adaptive Risk Configuration
  // ============================================================
  
  /** Enable adaptive risk scoring based on user history */
  ADAPTIVE_RISK_ENABLED: true,
  
  /** User history window for adaptive scoring (days) */
  ADAPTIVE_HISTORY_DAYS: 30,
  
  /** Base risk for new user (unknown history) */
  NEW_USER_BASE_RISK: 20,
  
  /** Trusted user risk reduction (percentage) */
  TRUSTED_USER_REDUCTION: 0.30,
  
  /** Premium user risk reduction (percentage) */
  PREMIUM_USER_REDUCTION: 0.20,
  
  /** Feature phone user risk addition (percentage) */
  FEATURE_PHONE_RISK_ADDITION: 0.10,
  
  // ============================================================
  // Bangladesh Specific Risk Factors
  // ============================================================
  
  /** Bangladesh public holiday risk increase */
  BD_HOLIDAY_RISK_INCREASE: 10,
  
  /** Bangladesh bandh/strike risk increase */
  BD_BANDH_RISK_INCREASE: 15,
  
  /** Bangladesh natural disaster risk increase (flood, cyclone) */
  BD_DISASTER_RISK_INCREASE: 20,
  
  /** Bangladesh mobile operator specific risk */
  BD_OPERATOR_RISK_MAP: {
    gp: 5,        // Grameenphone - most reliable
    robi: 8,      // Robi - reliable
    banglalink: 10,
    teletalk: 15, // Teletalk - sometimes unreliable
    unknown: 20,
  } as const,
  
  /** Bangladesh district specific risk (higher risk for some districts) */
  BD_DISTRICT_RISK_MAP: {
    dhaka: 5,
    chattogram: 8,
    rajshahi: 10,
    khulna: 10,
    sylhet: 12,
    rangpur: 12,
    mymensingh: 12,
    barishal: 15,
    unknown: 20,
  } as const,
  
  // ============================================================
  // Risk Trend Configuration
  // ============================================================
  
  /** Risk trend window for detection (hours) */
  TREND_WINDOW_HOURS: 24,
  
  /** Risk trend threshold for alert (increase percentage) */
  TREND_ALERT_THRESHOLD: 0.50, // 50% increase
  
  /** Risk trend critical threshold (increase percentage) */
  TREND_CRITICAL_THRESHOLD: 1.00, // 100% increase
  
  /** Enable risk trend analysis */
  ENABLE_RISK_TREND_ANALYSIS: true,
  
  /** Maximum risk trend history entries */
  MAX_TREND_HISTORY: 1000,
  
  // ============================================================
  // Risk Scoring Configuration
  // ============================================================
  
  /** Risk scoring algorithm version */
  RISK_ALGORITHM_VERSION: '2.0.0',
  
  /** Enable ML-based risk scoring */
  ENABLE_ML_RISK_SCORING: true,
  
  /** ML model confidence threshold (0-1) */
  ML_CONFIDENCE_THRESHOLD: 0.70,
  
  /** Risk score cache TTL (seconds) */
  RISK_CACHE_TTL_SECONDS: 300,
  
  /** Max risk score cache size */
  RISK_CACHE_MAX_SIZE: 10000,
  
  /** Enable batch risk scoring (for performance) */
  ENABLE_BATCH_RISK_SCORING: true,
  
  /** Batch size for risk scoring */
  RISK_BATCH_SIZE: 100,
  
  /** Risk scoring timeout (milliseconds) */
  RISK_SCORING_TIMEOUT_MS: 500,
  
  // ============================================================
  // Risk Mitigation Configuration
  // ============================================================
  
  /** Automatic mitigation enabled */
  AUTO_MITIGATION_ENABLED: true,
  
  /** Mitigation actions by risk level */
  MITIGATION_ACTIONS: {
    // Safe risk (0-20): No action needed
    SAFE: {
      action: 'none',
      requiresChallenge: false,
    },
    // Low risk (20-30): Log only
    LOW: {
      action: 'log',
      requiresChallenge: false,
    },
    // Medium risk (30-50): Require MFA
    MEDIUM: {
      action: 'mfa',
      requiresChallenge: true,
      challengeType: 'mfa',
    },
    // High risk (50-70): Require additional verification
    HIGH: {
      action: 'additional_verification',
      requiresChallenge: true,
      challengeType: 'email_otp',
    },
    // Critical risk (70-85): Block and notify admin
    CRITICAL: {
      action: 'block_notify',
      requiresChallenge: false,
      adminNotification: true,
    },
    // Very critical (85-100): Block and require admin review
    VERY_CRITICAL: {
      action: 'block_review',
      requiresChallenge: false,
      adminReview: true,
      permanentLock: false,
    },
    // Extremely critical (95-100): Permanent lock
    EXTREME: {
      action: 'permanent_lock',
      requiresChallenge: false,
      adminReview: true,
      permanentLock: true,
    },
  } as const,
  
  // ============================================================
  // Risk Analytics Configuration
  // ============================================================
  
  /** Enable risk analytics */
  ENABLE_RISK_ANALYTICS: true,
  
  /** Risk analytics retention days */
  ANALYTICS_RETENTION_DAYS: 90,
  
  /** Risk analytics aggregation interval (minutes) */
  ANALYTICS_AGGREGATION_INTERVAL_MINUTES: 5,
  
  /** Risk analytics export format */
  ANALYTICS_EXPORT_FORMAT: 'json',
  
  /** Enable risk heatmap generation */
  ENABLE_RISK_HEATMAP: true,
  
  /** Risk heatmap time window (hours) */
  HEATMAP_TIME_WINDOW_HOURS: 24,
} as const;

// ============================================================
// Risk Weights - Advanced Configuration
// ============================================================
export const RISK_WEIGHTS = {
  // ============================================================
  // Factor Weights (0-1)
  // ============================================================
  
  /** Weight for device factor */
  DEVICE_FACTOR: 0.25,
  
  /** Weight for location factor */
  LOCATION_FACTOR: 0.20,
  
  /** Weight for behavior factor */
  BEHAVIOR_FACTOR: 0.30,
  
  /** Weight for network factor */
  NETWORK_FACTOR: 0.15,
  
  /** Weight for time factor */
  TIME_FACTOR: 0.10,
  
  // ============================================================
  // Sub-factor Weights (0-1)
  // ============================================================
  
  /** Weight for new device sub-factor */
  NEW_DEVICE_WEIGHT: 0.40,
  
  /** Weight for trusted device sub-factor */
  TRUSTED_DEVICE_WEIGHT: 0.60,
  
  /** Weight for new location sub-factor */
  NEW_LOCATION_WEIGHT: 0.50,
  
  /** Weight for trusted location sub-factor */
  TRUSTED_LOCATION_WEIGHT: 0.50,
  
  /** Weight for failed attempts sub-factor */
  FAILED_ATTEMPTS_WEIGHT: 0.50,
  
  /** Weight for successful attempts sub-factor */
  SUCCESSFUL_ATTEMPTS_WEIGHT: 0.50,
  
  // ============================================================
  // Custom Weights for Bangladesh
  // ============================================================
  
  /** Weight for Bangladesh operator factor */
  BD_OPERATOR_WEIGHT: 0.10,
  
  /** Weight for Bangladesh district factor */
  BD_DISTRICT_WEIGHT: 0.15,
  
  /** Weight for Bangladesh holiday factor */
  BD_HOLIDAY_WEIGHT: 0.05,
  
  /** Weight for SIM swap factor */
  SIM_SWAP_WEIGHT: 0.30,
  
  /** Weight for MFS (Mobile Financial Service) factor */
  MFS_WEIGHT: 0.20,
} as const;

// ============================================================
// Risk Level Configuration
// ============================================================
export const RISK_LEVELS = {
  SAFE: {
    id: 'safe',
    label: 'Safe',
    labelBn: 'নিরাপদ',
    minScore: 0,
    maxScore: 20,
    color: '#22c55e', // Green
    requiresAction: false,
    severity: 'info' as const,
  },
  LOW: {
    id: 'low',
    label: 'Low Risk',
    labelBn: 'নিম্ন ঝুঁকি',
    minScore: 20,
    maxScore: 30,
    color: '#eab308', // Yellow
    requiresAction: false,
    severity: 'info' as const,
  },
  MEDIUM: {
    id: 'medium',
    label: 'Medium Risk',
    labelBn: 'মাঝারি ঝুঁকি',
    minScore: 30,
    maxScore: 50,
    color: '#f97316', // Orange
    requiresAction: true,
    severity: 'warning' as const,
  },
  HIGH: {
    id: 'high',
    label: 'High Risk',
    labelBn: 'উচ্চ ঝুঁকি',
    minScore: 50,
    maxScore: 70,
    color: '#ef4444', // Red
    requiresAction: true,
    severity: 'error' as const,
  },
  CRITICAL: {
    id: 'critical',
    label: 'Critical Risk',
    labelBn: 'গুরুতর ঝুঁকি',
    minScore: 70,
    maxScore: 85,
    color: '#dc2626', // Dark Red
    requiresAction: true,
    severity: 'critical' as const,
  },
  VERY_CRITICAL: {
    id: 'very_critical',
    label: 'Very Critical',
    labelBn: 'অত্যন্ত গুরুতর',
    minScore: 85,
    maxScore: 95,
    color: '#b91c1c', // Darkest Red
    requiresAction: true,
    severity: 'critical' as const,
  },
  EXTREME: {
    id: 'extreme',
    label: 'Extreme Risk',
    labelBn: 'চরম ঝুঁকি',
    minScore: 95,
    maxScore: 100,
    color: '#991b1b', // Black-Red
    requiresAction: true,
    severity: 'critical' as const,
  },
} as const;

// ============================================================
// Risk Severity Types
// ============================================================
export type RiskSeverity = 'info' | 'warning' | 'error' | 'critical';

export type RiskLevelKey = keyof typeof RISK_LEVELS;

// ============================================================
// Type Exports
// ============================================================
export type RiskThresholdsType = typeof RISK_THRESHOLDS;
export type RiskWeightsType = typeof RISK_WEIGHTS;
export type RiskLevelType = typeof RISK_LEVELS;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get risk level for a given score
 * @param score - Risk score (0-100)
 * @returns Risk level object
 */
export const getRiskLevelForScore = (score: number) => {
  // ✅ EXTREME এবং VERY_CRITICAL RISK_LEVELS থেকে নেওয়া হয়েছে
  if (score >= RISK_LEVELS.EXTREME.minScore) return RISK_LEVELS.EXTREME;
  if (score >= RISK_LEVELS.VERY_CRITICAL.minScore) return RISK_LEVELS.VERY_CRITICAL;
  if (score >= RISK_THRESHOLDS.CRITICAL_RISK_THRESHOLD) return RISK_LEVELS.CRITICAL;
  if (score >= RISK_THRESHOLDS.HIGH_RISK_THRESHOLD) return RISK_LEVELS.HIGH;
  if (score >= RISK_THRESHOLDS.MEDIUM_RISK_THRESHOLD) return RISK_LEVELS.MEDIUM;
  if (score >= RISK_THRESHOLDS.LOW_RISK_THRESHOLD) return RISK_LEVELS.LOW;
  return RISK_LEVELS.SAFE;
};

/**
 * Get risk level name by ID
 * @param levelId - Risk level ID
 * @param language - Language ('en' or 'bn')
 * @returns Risk level name
 */
export const getRiskLevelName = (levelId: RiskLevelKey, language: 'en' | 'bn' = 'en') => {
  const level = RISK_LEVELS[levelId];
  if (!level) return levelId;
  return language === 'bn' ? level.labelBn : level.label;
};

/**
 * Get color for risk level
 * @param score - Risk score
 * @returns Hex color code
 */
export const getRiskColor = (score: number): string => {
  if (score >= RISK_THRESHOLDS.VERY_CRITICAL_RISK_THRESHOLD) return '#dc2626';
  if (score >= RISK_THRESHOLDS.CRITICAL_RISK_THRESHOLD) return '#ef4444';
  if (score >= RISK_THRESHOLDS.HIGH_RISK_THRESHOLD) return '#f97316';
  if (score >= RISK_THRESHOLDS.MEDIUM_RISK_THRESHOLD) return '#eab308';
  return '#22c55e';
};

/**
 * Get mitigation action for risk score
 * @param score - Risk score
 * @returns Mitigation action object
 */
export const getMitigationAction = (score: number) => {
  if (score >= RISK_THRESHOLDS.PERMANENT_LOCK_THRESHOLD) {
    return RISK_THRESHOLDS.MITIGATION_ACTIONS.EXTREME;
  }
  if (score >= RISK_THRESHOLDS.ADMIN_REVIEW_THRESHOLD) {
    return RISK_THRESHOLDS.MITIGATION_ACTIONS.VERY_CRITICAL;
  }
  if (score >= RISK_THRESHOLDS.AUTOMATIC_BLOCK_THRESHOLD) {
    return RISK_THRESHOLDS.MITIGATION_ACTIONS.CRITICAL;
  }
  if (score >= RISK_THRESHOLDS.ADDITIONAL_VERIFICATION_THRESHOLD) {
    return RISK_THRESHOLDS.MITIGATION_ACTIONS.HIGH;
  }
  if (score >= RISK_THRESHOLDS.MFA_REQUIRED_THRESHOLD) {
    return RISK_THRESHOLDS.MITIGATION_ACTIONS.MEDIUM;
  }
  if (score >= RISK_THRESHOLDS.LOW_RISK_THRESHOLD) {
    return RISK_THRESHOLDS.MITIGATION_ACTIONS.LOW;
  }
  return RISK_THRESHOLDS.MITIGATION_ACTIONS.SAFE;
};

/**
 * Check if action requires challenge
 * @param score - Risk score
 * @returns True if challenge required
 */
export const requiresChallenge = (score: number): boolean => {
  const action = getMitigationAction(score);
  return action.requiresChallenge || false;
};

/**
 * Check if admin notification required
 * @param score - Risk score
 * @returns True if admin notification required
 */
export const requiresAdminNotification = (score: number): boolean => {
  const action = getMitigationAction(score);
  return 'adminNotification' in action && action.adminNotification === true;
};

/**
 * Check if admin review required
 * @param score - Risk score
 * @returns True if admin review required
 */
export const requiresAdminReview = (score: number): boolean => {
  const action = getMitigationAction(score);
  return 'adminReview' in action && action.adminReview === true;
};

/**
 * Check if permanent lock required
 * @param score - Risk score
 * @returns True if permanent lock required
 */
export const requiresPermanentLock = (score: number): boolean => {
  const action = getMitigationAction(score);
  return 'permanentLock' in action && action.permanentLock === true;
};

/**
 * Get Bangladesh mobile operator risk
 * @param operator - Mobile operator code
 * @returns Risk score for operator
 */
export const getBDOperatorRisk = (operator: keyof typeof RISK_THRESHOLDS.BD_OPERATOR_RISK_MAP): number => {
  return RISK_THRESHOLDS.BD_OPERATOR_RISK_MAP[operator] || 20;
};

/**
 * Get Bangladesh district risk
 * @param district - District name
 * @returns Risk score for district
 */
export const getBDDistrictRisk = (district: keyof typeof RISK_THRESHOLDS.BD_DISTRICT_RISK_MAP): number => {
  return RISK_THRESHOLDS.BD_DISTRICT_RISK_MAP[district] || 20;
};

// ============================================================
// Default Export
// ============================================================
export default {
  RISK_THRESHOLDS,
  RISK_WEIGHTS,
  RISK_LEVELS,
  getRiskLevelForScore,
  getRiskLevelName,
  getRiskColor,
  getMitigationAction,
  requiresChallenge,
  requiresAdminNotification,
  requiresAdminReview,
  requiresPermanentLock,
  getBDOperatorRisk,
  getBDDistrictRisk,
};
