export interface ContextMessage {
  readonly role: 'system' | 'user' | 'assistant';
  readonly content: string;
  readonly tokenCount: number;
}

export interface TrimmedContext {
  readonly messages: readonly ContextMessage[];
  readonly totalTokens: number;
  readonly trimmed: boolean;
}

export class ContextWindowService {
  /**
   * Trim oldest messages (keeping system + newest) to fit maxTokens.
   */
  trim(
    messages: readonly ContextMessage[],
    maxTokens: number,
  ): TrimmedContext {
    const systemMessages = messages.filter((m) => m.role === 'system');
    const nonSystem = messages.filter((m) => m.role !== 'system');

    const systemTokens = systemMessages.reduce((s, m) => s + m.tokenCount, 0);
    const budget = maxTokens - systemTokens;

    if (budget <= 0) {
      return {
        messages: systemMessages,
        totalTokens: systemTokens,
        trimmed: true,
      };
    }

    const kept: ContextMessage[] = [];
    let used = 0;

    // Walk newest → oldest
    for (let i = nonSystem.length - 1; i >= 0; i--) {
      const msg = nonSystem[i];
      if (used + msg.tokenCount > budget) break;
      kept.unshift(msg);
      used += msg.tokenCount;
    }

    const totalTokens = systemTokens + used;
    return {
      messages: [...systemMessages, ...kept],
      totalTokens,
      trimmed: kept.length !== nonSystem.length,
    };
  }

  availableTokens(used: number, max: number): number {
    return Math.max(0, max - used);
  }
}
