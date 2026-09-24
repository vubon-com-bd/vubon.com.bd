import { SetMetadata } from '@nestjs/common';

export const ASSIGNED_AGENT_KEY = 'assignedAgent';
export const AssignedAgent = (): MethodDecorator & ClassDecorator =>
  SetMetadata(ASSIGNED_AGENT_KEY, true);
