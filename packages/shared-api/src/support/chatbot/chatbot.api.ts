import { httpClient } from '../../common/client/client.factory';
import { CHATBOT_ENDPOINTS } from './chatbot.endpoints';
import type { ChatbotMessageRequest, ChatbotMessageResponse } from './chatbot.types';

export const chatbotApi = {
  sendMessage: async (
    input: ChatbotMessageRequest,
    signal?: AbortSignal
  ): Promise<ChatbotMessageResponse> => {
    const res = await httpClient.post<ChatbotMessageResponse>(CHATBOT_ENDPOINTS.message, input, {
      signal,
      timeout: 30_000,
    });
    return res.data;
  },
} as const;
