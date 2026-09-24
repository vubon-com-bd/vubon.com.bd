export const CHATBOT_CONFIG = Object.freeze({
  defaultProvider: 'custom' as 'custom' | 'dialogflow' | 'rasa' | 'openai',
  confidenceThreshold: 0.6,
  maxTrainingPatterns: 100,
  fallbackResponse: 'Sorry, I did not understand. Let me connect you with an agent.',
  escalationThreshold: 0.3,
  enableSentimentAnalysis: true,
} as const);
