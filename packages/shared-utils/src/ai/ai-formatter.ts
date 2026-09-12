/**
 * AI Formatter — AI-specific display formatting.
 * Note: Names are AI-scoped to avoid collision with common formatters.
 */
export interface AIFormatData {
  models: unknown[];
  status: string;
  type: string;
}

export interface AIModelFormatData {
  name: string;
  version: string;
  type: string;
  accuracy: number;
}

export const formatAINumber = (value: number): string =>
  new Intl.NumberFormat('en-US').format(value);

export const formatAIPercentage = (value: number): string => `${value.toFixed(1)}%`;

export const formatAISummary = (ai: AIFormatData): string =>
  `Models: ${ai.models.length} | Status: ${ai.status} | Type: ${ai.type}`;

export const formatAIModel = (model: AIModelFormatData): string =>
  `${model.name} v${model.version} | ${model.type} | Accuracy: ${formatAIPercentage(model.accuracy)}`;

export const formatAIStatus = (status: string): string =>
  status.charAt(0).toUpperCase() + status.slice(1);

export const formatAIAccuracy = (accuracy: number): string => formatAIPercentage(accuracy);
