import { Module } from '@nestjs/common';
import { ChatbotEngineService } from './chatbot.service';
import { IntentClassifier } from './nlp/intent-classifier';
import { EntityExtractor } from './nlp/entity-extractor';
import { SentimentAnalyzer } from './nlp/sentiment-analyzer';
import { LanguageDetector } from './nlp/language-detector';
import { TemplateEngine } from './response/template-engine';
import { ResponseSelector } from './response/response-selector';
import { CustomProvider } from './providers/custom.provider';
import { DialogflowProvider } from './providers/dialogflow.provider';
import { RasaProvider } from './providers/rasa.provider';
import { OpenAIProvider } from './providers/openai.provider';

@Module({
  providers: [
    ChatbotEngineService,
    IntentClassifier,
    EntityExtractor,
    SentimentAnalyzer,
    LanguageDetector,
    TemplateEngine,
    ResponseSelector,
    CustomProvider,
    DialogflowProvider,
    RasaProvider,
    OpenAIProvider,
  ],
  exports: [ChatbotEngineService],
})
export class ChatbotEngineModule {}
