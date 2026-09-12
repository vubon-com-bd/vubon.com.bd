export interface AdminTeam {
  name: string;
  description: string;
  leadId: string;
  status: string;
  department: string;
  metadata: Record<string, unknown>;
}

export const validateTeam = (team: Partial<AdminTeam>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!team.name) errors.push('Team name is required');
  if (!team.leadId) errors.push('Team lead is required');
  // status validation removed - will be handled by domain-specific validation
  return { isValid: errors.length === 0, errors };
};
