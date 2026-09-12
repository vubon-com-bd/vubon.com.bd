import { KNOWLEDGE_BASE } from '@vubon/shared-constants/src/support/knowledge-base.constants';

export interface KnowledgeBaseInput {
  name: string;
  status: string;
}

export const validateKnowledgeBase = (
  kb: Partial<KnowledgeBaseInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!kb.name) errors.push('Knowledge base name is required');
  if (kb.status && !Object.keys(KNOWLEDGE_BASE.STATUS).includes(kb.status)) {
    errors.push('Invalid knowledge base status');
  }
  return { isValid: errors.length === 0, errors };
};
