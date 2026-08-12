/**
 * AI এম্বেডিং টাইপ এনাম
 */
export const AI_EMBEDDING_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  MULTIMODAL: 'multimodal',
  CODE: 'code',
  DOCUMENT: 'document',
  SENTENCE: 'sentence',
  WORD: 'word',
} as const;

/**
 * AI_EMBEDDING_TYPE থেকে টাইপ
 */
export type AIEmbeddingTypeType = (typeof AI_EMBEDDING_TYPE)[keyof typeof AI_EMBEDDING_TYPE];

/**
 * এম্বেডিং টাইপ লেবেল
 */
export const AI_EMBEDDING_TYPE_LABELS: Record<AIEmbeddingTypeType, string> = {
  [AI_EMBEDDING_TYPE.TEXT]: 'Text',
  [AI_EMBEDDING_TYPE.IMAGE]: 'Image',
  [AI_EMBEDDING_TYPE.AUDIO]: 'Audio',
  [AI_EMBEDDING_TYPE.VIDEO]: 'Video',
  [AI_EMBEDDING_TYPE.MULTIMODAL]: 'Multimodal',
  [AI_EMBEDDING_TYPE.CODE]: 'Code',
  [AI_EMBEDDING_TYPE.DOCUMENT]: 'Document',
  [AI_EMBEDDING_TYPE.SENTENCE]: 'Sentence',
  [AI_EMBEDDING_TYPE.WORD]: 'Word',
} as const;

/**
 * এম্বেডিং টাইপ বিবরণ
 */
export const AI_EMBEDDING_TYPE_DESCRIPTIONS: Record<AIEmbeddingTypeType, string> = {
  [AI_EMBEDDING_TYPE.TEXT]: 'Embeddings for text content and natural language',
  [AI_EMBEDDING_TYPE.IMAGE]: 'Embeddings for images and visual content',
  [AI_EMBEDDING_TYPE.AUDIO]: 'Embeddings for audio and speech content',
  [AI_EMBEDDING_TYPE.VIDEO]: 'Embeddings for video and multimedia content',
  [AI_EMBEDDING_TYPE.MULTIMODAL]: 'Embeddings combining multiple modalities',
  [AI_EMBEDDING_TYPE.CODE]: 'Embeddings for source code and programming languages',
  [AI_EMBEDDING_TYPE.DOCUMENT]: 'Embeddings for entire documents or long texts',
  [AI_EMBEDDING_TYPE.SENTENCE]: 'Embeddings for individual sentences',
  [AI_EMBEDDING_TYPE.WORD]: 'Embeddings for individual words and tokens',
} as const;

/**
 * এম্বেডিং টাইপ আইকন
 */
export const AI_EMBEDDING_TYPE_ICONS: Record<AIEmbeddingTypeType, string> = {
  [AI_EMBEDDING_TYPE.TEXT]: '📝',
  [AI_EMBEDDING_TYPE.IMAGE]: '🖼️',
  [AI_EMBEDDING_TYPE.AUDIO]: '🎵',
  [AI_EMBEDDING_TYPE.VIDEO]: '🎬',
  [AI_EMBEDDING_TYPE.MULTIMODAL]: '🔀',
  [AI_EMBEDDING_TYPE.CODE]: '💻',
  [AI_EMBEDDING_TYPE.DOCUMENT]: '📄',
  [AI_EMBEDDING_TYPE.SENTENCE]: '📖',
  [AI_EMBEDDING_TYPE.WORD]: '🔤',
} as const;

/**
 * এম্বেডিং টাইপ কালার (হেক্স কোড)
 */
export const AI_EMBEDDING_TYPE_COLORS: Record<AIEmbeddingTypeType, string> = {
  [AI_EMBEDDING_TYPE.TEXT]: '#3b82f6', // Blue-500
  [AI_EMBEDDING_TYPE.IMAGE]: '#8b5cf6', // Violet-500
  [AI_EMBEDDING_TYPE.AUDIO]: '#ec4899', // Pink-500
  [AI_EMBEDDING_TYPE.VIDEO]: '#f472b6', // Pink-400
  [AI_EMBEDDING_TYPE.MULTIMODAL]: '#f59e0b', // Amber-500
  [AI_EMBEDDING_TYPE.CODE]: '#22c55e', // Green-500
  [AI_EMBEDDING_TYPE.DOCUMENT]: '#06b6d4', // Cyan-500
  [AI_EMBEDDING_TYPE.SENTENCE]: '#a855f7', // Purple-500
  [AI_EMBEDDING_TYPE.WORD]: '#f97316', // Orange-500
} as const;

/**
 * এম্বেডিং টাইপ ডাইমেনশন রেঞ্জ
 */
export const AI_EMBEDDING_TYPE_DIMENSIONS: Record<
  AIEmbeddingTypeType,
  { min: number; max: number; default: number }
> = {
  [AI_EMBEDDING_TYPE.TEXT]: { min: 384, max: 3072, default: 768 },
  [AI_EMBEDDING_TYPE.IMAGE]: { min: 512, max: 2048, default: 1024 },
  [AI_EMBEDDING_TYPE.AUDIO]: { min: 256, max: 1024, default: 512 },
  [AI_EMBEDDING_TYPE.VIDEO]: { min: 512, max: 4096, default: 2048 },
  [AI_EMBEDDING_TYPE.MULTIMODAL]: { min: 512, max: 4096, default: 1536 },
  [AI_EMBEDDING_TYPE.CODE]: { min: 384, max: 2048, default: 768 },
  [AI_EMBEDDING_TYPE.DOCUMENT]: { min: 384, max: 4096, default: 1024 },
  [AI_EMBEDDING_TYPE.SENTENCE]: { min: 384, max: 1024, default: 768 },
  [AI_EMBEDDING_TYPE.WORD]: { min: 300, max: 1024, default: 300 },
} as const;

/**
 * এম্বেডিং টাইপ কনফিগারেশন
 */
export interface AIEmbeddingTypeConfig {
  type: AIEmbeddingTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  dimensions: { min: number; max: number; default: number };
  supportedModels: string[];
  avgInferenceTime: number;
  useCases: string[];
}

/**
 * এম্বেডিং টাইপ মেটাডেটা
 */
export const AI_EMBEDDING_TYPE_METADATA: Record<AIEmbeddingTypeType, AIEmbeddingTypeConfig> = {
  [AI_EMBEDDING_TYPE.TEXT]: {
    type: AI_EMBEDDING_TYPE.TEXT,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.TEXT],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.TEXT],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.TEXT],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.TEXT],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.TEXT],
    supportedModels: [
      'text-embedding-ada-002',
      'text-embedding-3-small',
      'text-embedding-3-large',
      'bert-base',
      'sbert-all-mpnet-base',
    ],
    avgInferenceTime: 50,
    useCases: ['Semantic Search', 'Text Classification', 'Clustering', 'Information Retrieval'],
  },
  [AI_EMBEDDING_TYPE.IMAGE]: {
    type: AI_EMBEDDING_TYPE.IMAGE,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.IMAGE],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.IMAGE],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.IMAGE],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.IMAGE],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.IMAGE],
    supportedModels: ['clip-vit-base', 'resnet-50', 'vgg-16', 'efficientnet'],
    avgInferenceTime: 150,
    useCases: ['Image Search', 'Visual Similarity', 'Object Recognition', 'Scene Understanding'],
  },
  [AI_EMBEDDING_TYPE.AUDIO]: {
    type: AI_EMBEDDING_TYPE.AUDIO,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.AUDIO],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.AUDIO],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.AUDIO],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.AUDIO],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.AUDIO],
    supportedModels: ['wav2vec2', 'whisper', 'hubert', 'speech-bert'],
    avgInferenceTime: 200,
    useCases: ['Speech Recognition', 'Audio Search', 'Sound Classification', 'Music Similarity'],
  },
  [AI_EMBEDDING_TYPE.VIDEO]: {
    type: AI_EMBEDDING_TYPE.VIDEO,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.VIDEO],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.VIDEO],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.VIDEO],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.VIDEO],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.VIDEO],
    supportedModels: ['videomae', 'timesformer', 'video-clip', 'videobert'],
    avgInferenceTime: 500,
    useCases: ['Video Search', 'Action Recognition', 'Video Understanding', 'Scene Detection'],
  },
  [AI_EMBEDDING_TYPE.MULTIMODAL]: {
    type: AI_EMBEDDING_TYPE.MULTIMODAL,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.MULTIMODAL],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.MULTIMODAL],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.MULTIMODAL],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.MULTIMODAL],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.MULTIMODAL],
    supportedModels: ['clip', 'flava', 'multimodal-bert', 'imagebind'],
    avgInferenceTime: 300,
    useCases: [
      'Cross-modal Search',
      'Multimodal Understanding',
      'Content Tagging',
      'Accessibility',
    ],
  },
  [AI_EMBEDDING_TYPE.CODE]: {
    type: AI_EMBEDDING_TYPE.CODE,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.CODE],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.CODE],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.CODE],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.CODE],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.CODE],
    supportedModels: ['codebert', 'graphcodebert', 'coder-embedding', 'plbart'],
    avgInferenceTime: 80,
    useCases: ['Code Search', 'Code Similarity', 'Code Completion', 'Bug Detection'],
  },
  [AI_EMBEDDING_TYPE.DOCUMENT]: {
    type: AI_EMBEDDING_TYPE.DOCUMENT,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.DOCUMENT],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.DOCUMENT],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.DOCUMENT],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.DOCUMENT],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.DOCUMENT],
    supportedModels: ['document-embedding', 'longformer', 'bigbird', 'bert-large'],
    avgInferenceTime: 200,
    useCases: [
      'Document Search',
      'Text Summarization',
      'Document Classification',
      'Similarity Analysis',
    ],
  },
  [AI_EMBEDDING_TYPE.SENTENCE]: {
    type: AI_EMBEDDING_TYPE.SENTENCE,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.SENTENCE],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.SENTENCE],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.SENTENCE],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.SENTENCE],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.SENTENCE],
    supportedModels: ['sbert-all-mpnet-base', 'sbert-all-minilm', 'sentence-transformers'],
    avgInferenceTime: 30,
    useCases: ['Semantic Search', 'Paraphrase Detection', 'Question Answering', 'Text Similarity'],
  },
  [AI_EMBEDDING_TYPE.WORD]: {
    type: AI_EMBEDDING_TYPE.WORD,
    label: AI_EMBEDDING_TYPE_LABELS[AI_EMBEDDING_TYPE.WORD],
    description: AI_EMBEDDING_TYPE_DESCRIPTIONS[AI_EMBEDDING_TYPE.WORD],
    icon: AI_EMBEDDING_TYPE_ICONS[AI_EMBEDDING_TYPE.WORD],
    color: AI_EMBEDDING_TYPE_COLORS[AI_EMBEDDING_TYPE.WORD],
    dimensions: AI_EMBEDDING_TYPE_DIMENSIONS[AI_EMBEDDING_TYPE.WORD],
    supportedModels: ['word2vec', 'glove', 'fasttext', 'bert-token'],
    avgInferenceTime: 10,
    useCases: ['Word Similarity', 'NLP Tasks', 'Word Sense Disambiguation', 'Feature Extraction'],
  },
} as const;

/**
 * এম্বেডিং টাইপ গ্রুপ
 */
export const AI_EMBEDDING_TYPE_GROUPS = {
  UNIMODAL: [
    AI_EMBEDDING_TYPE.TEXT,
    AI_EMBEDDING_TYPE.IMAGE,
    AI_EMBEDDING_TYPE.AUDIO,
    AI_EMBEDDING_TYPE.VIDEO,
  ] as const,
  MULTIMODAL: [AI_EMBEDDING_TYPE.MULTIMODAL] as const,
  SPECIALIZED: [
    AI_EMBEDDING_TYPE.CODE,
    AI_EMBEDDING_TYPE.DOCUMENT,
    AI_EMBEDDING_TYPE.SENTENCE,
    AI_EMBEDDING_TYPE.WORD,
  ] as const,
} as const;

/**
 * এম্বেডিং টাইপ গ্রুপ লেবেল
 */
export const AI_EMBEDDING_TYPE_GROUP_LABELS = {
  UNIMODAL: 'Unimodal',
  MULTIMODAL: 'Multimodal',
  SPECIALIZED: 'Specialized',
} as const;

/**
 * এম্বেডিং টাইপ স্কেল (১-৫)
 */
export const AI_EMBEDDING_TYPE_SCALE: Record<AIEmbeddingTypeType, number> = {
  [AI_EMBEDDING_TYPE.WORD]: 1,
  [AI_EMBEDDING_TYPE.SENTENCE]: 2,
  [AI_EMBEDDING_TYPE.TEXT]: 3,
  [AI_EMBEDDING_TYPE.CODE]: 3,
  [AI_EMBEDDING_TYPE.IMAGE]: 3,
  [AI_EMBEDDING_TYPE.DOCUMENT]: 4,
  [AI_EMBEDDING_TYPE.AUDIO]: 4,
  [AI_EMBEDDING_TYPE.VIDEO]: 5,
  [AI_EMBEDDING_TYPE.MULTIMODAL]: 5,
} as const;
