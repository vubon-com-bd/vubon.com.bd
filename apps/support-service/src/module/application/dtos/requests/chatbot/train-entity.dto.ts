/**
 * TrainEntityRequestDTO
 * @module support-service/application/dtos/requests/chatbot
 */
export interface TrainEntityRequestDTO {
  readonly chatbotId: string;
  readonly name: string;
  readonly entityType: 'text' | 'number' | 'date' | 'email' | 'phone' | 'enum';
  readonly required?: boolean;
  readonly enumValues?: readonly string[];
}
