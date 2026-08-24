/**
 * Admin Team Constants
 * Admin team and group definitions
 */

export const ADMIN_TEAM = {
  CORE: 'core',
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DEVOPS: 'devops',
  QA: 'qa',
  DESIGN: 'design',
  PRODUCT: 'product',
  DATA: 'data',
  SECURITY: 'security',
  INFRASTRUCTURE: 'infrastructure',
  MOBILE: 'mobile',
  AI: 'ai',
  ML: 'ml',
  CLOUD: 'cloud',
  DATABASE: 'database',
  API: 'api',
  MICROSERVICES: 'microservices',
  MONITORING: 'monitoring',
  AUTOMATION: 'automation',
  RELEASE: 'release',
  TRAINING: 'training',
  DOCUMENTATION: 'documentation',
  COMMUNITY: 'community',
  ADVOCACY: 'advocacy',
} as const;

export type AdminTeamType = (typeof ADMIN_TEAM)[keyof typeof ADMIN_TEAM];

export const ADMIN_TEAM_LABELS: Record<AdminTeamType, string> = {
  [ADMIN_TEAM.CORE]: 'Core Team',
  [ADMIN_TEAM.FRONTEND]: 'Frontend Team',
  [ADMIN_TEAM.BACKEND]: 'Backend Team',
  [ADMIN_TEAM.DEVOPS]: 'DevOps Team',
  [ADMIN_TEAM.QA]: 'Quality Assurance Team',
  [ADMIN_TEAM.DESIGN]: 'Design Team',
  [ADMIN_TEAM.PRODUCT]: 'Product Team',
  [ADMIN_TEAM.DATA]: 'Data Team',
  [ADMIN_TEAM.SECURITY]: 'Security Team',
  [ADMIN_TEAM.INFRASTRUCTURE]: 'Infrastructure Team',
  [ADMIN_TEAM.MOBILE]: 'Mobile Development Team',
  [ADMIN_TEAM.AI]: 'AI Development Team',
  [ADMIN_TEAM.ML]: 'Machine Learning Team',
  [ADMIN_TEAM.CLOUD]: 'Cloud Architecture Team',
  [ADMIN_TEAM.DATABASE]: 'Database Management Team',
  [ADMIN_TEAM.API]: 'API Development Team',
  [ADMIN_TEAM.MICROSERVICES]: 'Microservices Team',
  [ADMIN_TEAM.MONITORING]: 'Monitoring Team',
  [ADMIN_TEAM.AUTOMATION]: 'Automation Team',
  [ADMIN_TEAM.RELEASE]: 'Release Management Team',
  [ADMIN_TEAM.TRAINING]: 'Training Team',
  [ADMIN_TEAM.DOCUMENTATION]: 'Documentation Team',
  [ADMIN_TEAM.COMMUNITY]: 'Community Management Team',
  [ADMIN_TEAM.ADVOCACY]: 'Developer Advocacy Team',
};

export type AdminTeamLabel = (typeof ADMIN_TEAM_LABELS)[keyof typeof ADMIN_TEAM_LABELS];

export const ADMIN_TEAM_DESCRIPTIONS: Record<AdminTeamType, string> = {
  [ADMIN_TEAM.CORE]: 'Core platform and architecture',
  [ADMIN_TEAM.FRONTEND]: 'User interface and experience',
  [ADMIN_TEAM.BACKEND]: 'Server-side logic and APIs',
  [ADMIN_TEAM.DEVOPS]: 'Development operations and CI/CD',
  [ADMIN_TEAM.QA]: 'Testing and quality assurance',
  [ADMIN_TEAM.DESIGN]: 'User experience and visual design',
  [ADMIN_TEAM.PRODUCT]: 'Product strategy and roadmap',
  [ADMIN_TEAM.DATA]: 'Data management and analytics',
  [ADMIN_TEAM.SECURITY]: 'Security monitoring and incident response',
  [ADMIN_TEAM.INFRASTRUCTURE]: 'Infrastructure and networking',
  [ADMIN_TEAM.MOBILE]: 'Mobile application development',
  [ADMIN_TEAM.AI]: 'Artificial intelligence solutions',
  [ADMIN_TEAM.ML]: 'Machine learning models and research',
  [ADMIN_TEAM.CLOUD]: 'Cloud architecture and services',
  [ADMIN_TEAM.DATABASE]: 'Database design and optimization',
  [ADMIN_TEAM.API]: 'API design and integration',
  [ADMIN_TEAM.MICROSERVICES]: 'Microservices architecture',
  [ADMIN_TEAM.MONITORING]: 'System and application monitoring',
  [ADMIN_TEAM.AUTOMATION]: 'Process automation and tools',
  [ADMIN_TEAM.RELEASE]: 'Release coordination and deployment',
  [ADMIN_TEAM.TRAINING]: 'Training and knowledge management',
  [ADMIN_TEAM.DOCUMENTATION]: 'Technical documentation and guides',
  [ADMIN_TEAM.COMMUNITY]: 'Community engagement and support',
  [ADMIN_TEAM.ADVOCACY]: 'Developer relations and advocacy',
};

export type AdminTeamDescription =
  (typeof ADMIN_TEAM_DESCRIPTIONS)[keyof typeof ADMIN_TEAM_DESCRIPTIONS];

export const ADMIN_TEAM_MEMBERS: Record<AdminTeamType, number> = {
  [ADMIN_TEAM.CORE]: 12,
  [ADMIN_TEAM.FRONTEND]: 8,
  [ADMIN_TEAM.BACKEND]: 10,
  [ADMIN_TEAM.DEVOPS]: 6,
  [ADMIN_TEAM.QA]: 5,
  [ADMIN_TEAM.DESIGN]: 4,
  [ADMIN_TEAM.PRODUCT]: 3,
  [ADMIN_TEAM.DATA]: 5,
  [ADMIN_TEAM.SECURITY]: 4,
  [ADMIN_TEAM.INFRASTRUCTURE]: 6,
  [ADMIN_TEAM.MOBILE]: 4,
  [ADMIN_TEAM.AI]: 3,
  [ADMIN_TEAM.ML]: 3,
  [ADMIN_TEAM.CLOUD]: 4,
  [ADMIN_TEAM.DATABASE]: 3,
  [ADMIN_TEAM.API]: 4,
  [ADMIN_TEAM.MICROSERVICES]: 3,
  [ADMIN_TEAM.MONITORING]: 3,
  [ADMIN_TEAM.AUTOMATION]: 3,
  [ADMIN_TEAM.RELEASE]: 2,
  [ADMIN_TEAM.TRAINING]: 2,
  [ADMIN_TEAM.DOCUMENTATION]: 2,
  [ADMIN_TEAM.COMMUNITY]: 3,
  [ADMIN_TEAM.ADVOCACY]: 2,
};

export type AdminTeamMembers = (typeof ADMIN_TEAM_MEMBERS)[keyof typeof ADMIN_TEAM_MEMBERS];

export const ADMIN_TEAM_SKILLS: Record<AdminTeamType, string[]> = {
  [ADMIN_TEAM.CORE]: ['architecture', 'leadership', 'strategy'],
  [ADMIN_TEAM.FRONTEND]: ['react', 'vue', 'html', 'css', 'javascript'],
  [ADMIN_TEAM.BACKEND]: ['nodejs', 'python', 'java', 'sql'],
  [ADMIN_TEAM.DEVOPS]: ['docker', 'kubernetes', 'cicd', 'terraform'],
  [ADMIN_TEAM.QA]: ['testing', 'automation', 'selenium', 'cypress'],
  [ADMIN_TEAM.DESIGN]: ['ui', 'ux', 'figma', 'adobe', 'prototyping'],
  [ADMIN_TEAM.PRODUCT]: ['product_management', 'agile', 'scrum', 'analytics'],
  [ADMIN_TEAM.DATA]: ['sql', 'python', 'etl', 'data_warehousing'],
  [ADMIN_TEAM.SECURITY]: ['cybersecurity', 'penetration_testing', 'security_audit'],
  [ADMIN_TEAM.INFRASTRUCTURE]: ['networking', 'servers', 'linux', 'monitoring'],
  [ADMIN_TEAM.MOBILE]: ['react_native', 'flutter', 'android', 'ios'],
  [ADMIN_TEAM.AI]: ['python', 'tensorflow', 'pytorch', 'nlp'],
  [ADMIN_TEAM.ML]: ['machine_learning', 'data_science', 'model_training'],
  [ADMIN_TEAM.CLOUD]: ['aws', 'azure', 'gcp', 'cloud_architecture'],
  [ADMIN_TEAM.DATABASE]: ['sql', 'nosql', 'mongodb', 'postgres'],
  [ADMIN_TEAM.API]: ['rest', 'graphql', 'api_design', 'openapi'],
  [ADMIN_TEAM.MICROSERVICES]: ['microservices', 'docker', 'kubernetes', 'grpc'],
  [ADMIN_TEAM.MONITORING]: ['prometheus', 'grafana', 'elk', 'monitoring'],
  [ADMIN_TEAM.AUTOMATION]: ['python', 'bash', 'automation_tools'],
  [ADMIN_TEAM.RELEASE]: ['release_management', 'ci_cd', 'versioning'],
  [ADMIN_TEAM.TRAINING]: ['training', 'facilitation', 'materials'],
  [ADMIN_TEAM.DOCUMENTATION]: ['technical_writing', 'documentation_tools'],
  [ADMIN_TEAM.COMMUNITY]: ['community_management', 'communication'],
  [ADMIN_TEAM.ADVOCACY]: ['developer_relations', 'public_speaking'],
};

export type AdminTeamSkills = (typeof ADMIN_TEAM_SKILLS)[keyof typeof ADMIN_TEAM_SKILLS];

export const ADMIN_ENGINEERING_TEAMS: AdminTeamType[] = [
  ADMIN_TEAM.FRONTEND,
  ADMIN_TEAM.BACKEND,
  ADMIN_TEAM.MOBILE,
  ADMIN_TEAM.DEVOPS,
  ADMIN_TEAM.QA,
];

export const ADMIN_DATA_TEAMS: AdminTeamType[] = [ADMIN_TEAM.DATA, ADMIN_TEAM.AI, ADMIN_TEAM.ML];

export const ADMIN_INFRASTRUCTURE_TEAMS: AdminTeamType[] = [
  ADMIN_TEAM.INFRASTRUCTURE,
  ADMIN_TEAM.CLOUD,
  ADMIN_TEAM.DATABASE,
  ADMIN_TEAM.SECURITY,
];

export function getAdminTeamLabel(team: AdminTeamType): string {
  return ADMIN_TEAM_LABELS[team] || 'Unknown Team';
}

export function getAdminTeamDescription(team: AdminTeamType): string {
  return ADMIN_TEAM_DESCRIPTIONS[team] || 'No description available';
}

export function getAdminTeamMembers(team: AdminTeamType): number {
  return ADMIN_TEAM_MEMBERS[team] || 0;
}

export function getAdminTeamSkills(team: AdminTeamType): string[] {
  return ADMIN_TEAM_SKILLS[team] || [];
}

export function isAdminEngineeringTeam(team: AdminTeamType): boolean {
  return ADMIN_ENGINEERING_TEAMS.includes(team);
}

export function isAdminDataTeam(team: AdminTeamType): boolean {
  return ADMIN_DATA_TEAMS.includes(team);
}

export function isAdminInfrastructureTeam(team: AdminTeamType): boolean {
  return ADMIN_INFRASTRUCTURE_TEAMS.includes(team);
}

export function getAdminTeams(): AdminTeamType[] {
  return Object.values(ADMIN_TEAM);
}

export function getAdminTeamSkillsList(teams: AdminTeamType[]): string[] {
  const allSkills = teams.flatMap((team) => getAdminTeamSkills(team));
  return Array.from(new Set(allSkills));
}
