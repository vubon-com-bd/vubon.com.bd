import React, { ReactNode } from 'react';

export interface Step {
  id: string | number;
  label: string;
  labelBangla?: string;
  description?: string;
  icon?: ReactNode;
  status?: 'completed' | 'active' | 'pending' | 'error';
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  showNumbers?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  showLabels = true,
  showNumbers = true,
  className = '',
}) => {
  const getStepStatus = (index: number): Step['status'] => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (status: Step['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'active':
        return 'bg-blue-600 text-white ring-4 ring-blue-200';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  const getLineColor = (status: Step['status']): string => {
    return status === 'completed' ? 'bg-green-500' : 'bg-gray-300';
  };

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const color = getStepColor(status);
          const isActive = index === currentStep;

          return (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors ${color}`}
                  onClick={() => onStepClick?.(index)}
                >
                  {showNumbers ? index + 1 : step.icon || index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-12 w-0.5 ${getLineColor(status)}`} />
                )}
              </div>
              <div className="flex-1 pt-1">
                {showLabels && (
                  <>
                    <div
                      className={`cursor-pointer text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
                      onClick={() => onStepClick?.(index)}
                    >
                      {step.labelBangla || step.label}
                    </div>
                    {step.description && (
                      <div className="text-xs text-gray-500">{step.description}</div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const color = getStepColor(status);
        const isActive = index === currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors ${color}`}
                onClick={() => onStepClick?.(index)}
              >
                {showNumbers ? index + 1 : step.icon || index + 1}
              </div>
              {showLabels && (
                <div
                  className={`mt-2 cursor-pointer text-xs ${isActive ? 'font-semibold text-blue-600' : 'text-gray-500'}`}
                  onClick={() => onStepClick?.(index)}
                >
                  {step.labelBangla || step.label}
                </div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${getLineColor(status)}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
