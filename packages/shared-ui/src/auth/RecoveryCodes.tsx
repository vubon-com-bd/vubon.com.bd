/**
 * Auth RecoveryCodes Component
 * প্রমীকরণ রিকোভারি কোড কম্পোনেন্ট
 */

import React from 'react';
import { useRecoveryCodes, useGenerateRecoveryCodes } from '@vubon/shared-hooks';
import { AuthRecoveryCodeEndpoints } from '@vubon/shared-api';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthRecoveryCodesProps {
  className?: string;
}

export const AuthRecoveryCodes: React.FC<AuthRecoveryCodesProps> = ({
  className = '',
}) => {
  const recoveryEndpoints = new AuthRecoveryCodeEndpoints({} as any);
  const { codes, count, refetch } = useRecoveryCodes(recoveryEndpoints);
  const generateMutation = useGenerateRecoveryCodes(recoveryEndpoints);

  const handleGenerate = async () => {
    await generateMutation.mutateAsync();
    refetch();
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Recovery Codes</h2>
          <p className="text-sm text-gray-500">
            {count > 0
              ? `You have ${count} recovery codes available.`
              : 'No recovery codes generated yet.'}
          </p>
        </div>

        {codes.length > 0 && (
          <div className="rounded-md bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-2">
              {codes.map((code, index) => (
                <code key={index} className="text-sm font-mono text-gray-700">
                  {code}
                </code>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="primary"
          fullWidth
          onClick={handleGenerate}
          loading={generateMutation.isPending}
        >
          {count > 0 ? 'Regenerate Codes' : 'Generate Codes'}
        </Button>

        {generateMutation.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {generateMutation.error.message}
          </div>
        )}
      </div>
    </Card>
  );
};
