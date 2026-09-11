export interface AIFeatureData {
  featureId: string;
  aiId: string;
  type: string;
  name: string;
  description?: string;
  status: string;
  requirements: string[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const extractFeatures = (data: unknown): AIFeatureData[] => {
  void data;
  return [];
};

export const getFeatureRequirements = (featureType: string): string[] => {
  const requirements: Record<string, string[]> = {
    ai_recommendation: ['user_history', 'product_data'],
    ai_personalization: ['user_preferences', 'behavior_data'],
    ai_search: ['search_index', 'embedding_model'],
  };
  return requirements[featureType] || [];
};
