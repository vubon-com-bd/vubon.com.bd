export interface AIPersonalizationData {
  personalizationId: string;
  aiId: string;
  userId: string;
  user: { id: string };
  type: string;
  algorithm: string;
  factors: string[];
  preferences: string;
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class AIPersonalizationBuilder {
  private userId = '';
  private user: { id: string } | null = null;
  private type = 'hybrid';
  private algorithm = 'collaborative';
  private factors: string[] = [];
  private preferences = 'user_preferences';
  private score = 0;

  setUser(userId: string, user: { id: string }): this {
    this.userId = userId;
    this.user = user;
    return this;
  }

  setType(type: string): this {
    this.type = type;
    return this;
  }

  setAlgorithm(algorithm: string): this {
    this.algorithm = algorithm;
    return this;
  }

  addFactor(factor: string): this {
    this.factors.push(factor);
    return this;
  }

  setPreferences(preferences: string): this {
    this.preferences = preferences;
    return this;
  }

  setScore(score: number): this {
    this.score = score;
    return this;
  }

  build(): AIPersonalizationData {
    return {
      personalizationId: crypto.randomUUID(),
      aiId: '',
      userId: this.userId,
      user: this.user!,
      type: this.type,
      algorithm: this.algorithm,
      factors: this.factors,
      preferences: this.preferences,
      score: this.score,
      isActive: true,
      metadata: {},
    };
  }
}
