export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

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

export const formatAISummary = (ai: AIFormatData): string => {
  return `Models: ${ai.models.length} | Status: ${ai.status} | Type: ${ai.type}`;
};

export const formatAIModel = (model: AIModelFormatData): string => {
  return `${model.name} v${model.version} | ${model.type} | Accuracy: ${formatPercentage(model.accuracy * 100)}`;
};

export const formatAIStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatAIAccuracy = (accuracy: number): string => {
  return formatPercentage(accuracy * 100);
};
