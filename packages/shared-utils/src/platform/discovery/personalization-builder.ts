export interface PersonalizationData {
  personalizationId: string;
  userId: string;
  user: { id: string };
  type: string;
  factors: string[];
  preferences: string;
  score: number;
  status: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class PersonalizationBuilder {
  private userId = '';
  private user: { id: string } | null = null;
  private type = 'explicit';
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

  build(): PersonalizationData {
    return {
      personalizationId: crypto.randomUUID(),
      userId: this.userId,
      user: this.user!,
      type: this.type,
      factors: this.factors,
      preferences: this.preferences,
      score: this.score,
      status: 'active',
      isActive: true,
      metadata: {},
    };
  }
}
