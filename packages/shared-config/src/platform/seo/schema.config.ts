/**
 * Schema.org structured data configuration
 * @module shared-config/platform/seo
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const SCHEMA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SCHEMA_ENABLED', true),
  format: getOptionalEnv('SCHEMA_FORMAT', 'json_ld'),
  autoGenerate: getOptionalEnvBool('SCHEMA_AUTO_GENERATE', true),
  validate: getOptionalEnvBool('SCHEMA_VALIDATE', true),
  includeOrganization: getOptionalEnvBool('SCHEMA_ORGANIZATION', true),
  includeWebsite: getOptionalEnvBool('SCHEMA_WEBSITE', true),
  includeBreadcrumb: getOptionalEnvBool('SCHEMA_BREADCRUMB', true),
  organizationName: getOptionalEnv('SCHEMA_ORG_NAME', 'Vubon'),
});
