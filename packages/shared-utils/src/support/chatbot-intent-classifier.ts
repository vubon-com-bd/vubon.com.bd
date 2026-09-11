export interface IntentData {
  trainingPhrases: string[];
}

export const classifyIntent = <T extends IntentData>(message: string, intents: T[]): T | null => {
  const words = message.toLowerCase().split(' ');
  let bestIntent: T | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const phrase of intent.trainingPhrases) {
      const phraseWords = phrase.toLowerCase().split(' ');
      const matches = phraseWords.filter((w) => words.includes(w));
      score += (matches.length / phraseWords.length) * 100;
    }
    score /= intent.trainingPhrases.length;
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }
  return bestScore > 50 ? bestIntent : null;
};
