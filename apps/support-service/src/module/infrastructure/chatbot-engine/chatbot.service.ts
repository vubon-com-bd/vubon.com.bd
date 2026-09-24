import { Injectable, Logger } from '@nestjs/common';
import { IntentClassifier } from './nlp/intent-classifier';
import { EntityExtractor } from './nlp/entity-extractor';
import { SentimentAnalyzer, type Sentiment } from './nlp/sentiment-analyzer';
import { LanguageDetector, type Language } from './nlp/language-detector';
import { ResponseSelector } from './response/response-selector';

export interface ProcessMessageInput {
  readonly chatbotId: string;
  readonly userId: string;
  readonly message: string;
}

export interface ProcessMessageResult {
  readonly response: string;
  readonly intent: string | null;
  readonly confidence: number;
  readonly entities: Readonly<Record<string, string>>;
  readonly sentiment: Sentiment;
  readonly language: Language;
}

@Injectable()
export class ChatbotEngineService {
  private readonly logger = new Logger(ChatbotEngineService.name);

  constructor(
    private readonly intentClassifier: IntentClassifier,
    private readonly entityExtractor: EntityExtractor,
    private readonly sentimentAnalyzer: SentimentAnalyzer,
    private readonly languageDetector: LanguageDetector,
    private readonly responseSelector: ResponseSelector,
  ) {}

  async process(input: ProcessMessageInput): Promise<ProcessMessageResult> {
    const intentResult = await this.intentClassifier.classify({
      message: input.message,
    });
    const entities = this.entityExtractor.extract(input.message);
    const sentiment = this.sentimentAnalyzer.analyze(input.message);
    const language = this.languageDetector.detect(input.message);

    const response = this.responseSelector.select(
      [
        { text: intentResult.intent ? 'How can I help you further?' : 'Sorry, I did not understand.' },
      ],
      {},
    );

    this.logger.debug(`Processed message for chatbot ${input.chatbotId}`);

    return {
      response,
      intent: intentResult.intent,
      confidence: intentResult.confidence,
      entities,
      sentiment,
      language,
    };
  }
}
