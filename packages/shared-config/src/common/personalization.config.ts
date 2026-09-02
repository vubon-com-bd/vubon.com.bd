/**
 * Personalization Configuration
 * পার্সোনালাইজেশন কনফিগারেশন
 */
export interface PersonalizationConfig {
  enabled: boolean;
  features: {
    personalizedFeed: boolean;
    personalizedSearch: boolean;
    personalizedRecommendations: boolean;
    personalizedEmail: boolean;
  };
  data: {
    collectUserInteractions: boolean;
    collectUserPreferences: boolean;
    collectUserHistory: boolean;
    collectUserDemographics: boolean;
  };
  privacy: {
    anonymizeData: boolean;
    dataRetention: number;
    userOptOut: boolean;
  };
  algorithms: {
    preferenceLearning: boolean;
    behaviorAnalysis: boolean;
    segmentation: boolean;
  };
}

export const createPersonalizationConfig = (): PersonalizationConfig => ({
  enabled: true,
  features: {
    personalizedFeed: true,
    personalizedSearch: true,
    personalizedRecommendations: true,
    personalizedEmail: true,
  },
  data: {
    collectUserInteractions: true,
    collectUserPreferences: true,
    collectUserHistory: true,
    collectUserDemographics: true,
  },
  privacy: {
    anonymizeData: true,
    dataRetention: 90 * 24 * 60 * 60 * 1000, // 90 days
    userOptOut: true,
  },
  algorithms: {
    preferenceLearning: true,
    behaviorAnalysis: true,
    segmentation: true,
  },
});
