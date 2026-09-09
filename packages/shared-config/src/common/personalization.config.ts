export const personalizationConfig = {
  enabled: true,
  minUserActions: 10,
  model: 'deep_learning',
  updateInterval: 12 * 60 * 60, // 12 hours
  factors: ['user_history', 'user_preferences', 'user_demographics', 'user_behavior', 'context'],
  weights: {
    user_history: 0.3,
    user_preferences: 0.25,
    user_behavior: 0.2,
    context: 0.15,
    demographics: 0.1,
  },
};
