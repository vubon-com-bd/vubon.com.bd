export class ChatbotIntentClassifierService {
  classify(
    message: string,
    patterns: Readonly<Record<string, readonly string[]>>,
  ): string | null {
    const normalized = message.toLowerCase().trim();
    for (const [intent, keywords] of Object.entries(patterns)) {
      if (keywords.some((k) => normalized.includes(k.toLowerCase()))) {
        return intent;
      }
    }
    return null;
  }
}
