export interface AIModelData {
  modelId: string;
  name: string;
  version: string;
  status: string;
  type: string;
  provider: string;
  isActive: boolean;
  isDeployed: boolean;
}

export class AIModelLoader {
  private models: Map<string, AIModelData> = new Map();

  loadModel(model: AIModelData): void {
    this.models.set(model.modelId, model);
  }

  getModel(modelId: string): AIModelData | undefined {
    return this.models.get(modelId);
  }

  getActiveModels(): AIModelData[] {
    return Array.from(this.models.values()).filter((m) => m.isActive && m.isDeployed);
  }

  getModelsByType(type: string): AIModelData[] {
    return Array.from(this.models.values()).filter((m) => m.type === type);
  }

  getModelsByProvider(provider: string): AIModelData[] {
    return Array.from(this.models.values()).filter((m) => m.provider === provider);
  }

  unloadModel(modelId: string): void {
    this.models.delete(modelId);
  }

  clear(): void {
    this.models.clear();
  }
}
