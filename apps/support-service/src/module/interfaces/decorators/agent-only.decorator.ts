import { SetMetadata } from '@nestjs/common';

export const AGENT_ONLY_KEY = 'agentOnly';
export const AgentOnly = (): MethodDecorator & ClassDecorator =>
  SetMetadata(AGENT_ONLY_KEY, true);
