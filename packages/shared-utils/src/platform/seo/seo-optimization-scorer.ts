export const scoreSEOTitle = (title: string): number => {
  if (!title) return 0;
  const length = title.length;
  if (length >= 50 && length <= 60) return 100;
  if (length >= 40 && length <= 70) return 80;
  return 60;
};

export const scoreSEODescription = (description: string): number => {
  if (!description) return 0;
  const length = description.length;
  if (length >= 150 && length <= 160) return 100;
  if (length >= 120 && length <= 170) return 80;
  return 60;
};

export const scoreSEOKeywords = (keywords: string[], content: string): number => {
  if (keywords.length === 0) return 0;
  let score = 0;
  for (const keyword of keywords) {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      score += 20;
    }
  }
  return Math.min(score, 100);
};

export const scoreSEOReadability = (content: string): number => {
  const words = content.split(' ');
  const sentences = content.split(/[.!?]+/).length;
  if (sentences === 0) return 60;
  const avgWordsPerSentence = words.length / sentences;
  if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) return 100;
  if (avgWordsPerSentence >= 12 && avgWordsPerSentence <= 25) return 80;
  return 60;
};
