export class EmailDeliverabilityService {
  calculateSpamScore(subject: string, body: string): number {
    let score = 0;
    const spamWords = ['free', 'winner', 'urgent', 'click here', 'act now'];
    const text = `${subject} ${body}`.toLowerCase();
    for (const word of spamWords) {
      if (text.includes(word)) score += 10;
    }
    return Math.min(score, 100);
  }
}
