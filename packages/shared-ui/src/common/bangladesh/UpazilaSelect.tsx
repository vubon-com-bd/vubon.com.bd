import React, { useState, useEffect } from 'react';
import { Select, SelectProps } from '../components/Select';

export interface UpazilaSelectProps extends Omit<SelectProps, 'options'> {
  district?: string;
  division?: string;
  includeAll?: boolean;
  allLabel?: string;
  showBangla?: boolean;
}

// Mock data - in real app, this would come from an API
const mockUpazilas: Record<string, string[]> = {
  'dhaka': ['Dhaka Sadar', 'Keraniganj', 'Nawabganj', 'Savar', 'Dohar'],
  'chittagong': ['Chattogram Sadar', 'Mirsharai', 'Sitakunda', 'Sandwip', 'Hathazari'],
  'rajshahi': ['Rajshahi Sadar', 'Godagari', 'Tanore', 'Mohanpur', 'Puthia'],
  'khulna': ['Khulna Sadar', 'Paikgacha', 'Phultala', 'Dighalia', 'Rupsha'],
};

export const UpazilaSelect: React.FC<UpazilaSelectProps> = ({
  district,
  division,
  includeAll = false,
  allLabel = 'All Upazilas',
  showBangla = true,
  ...props
}) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!district) {
      setOptions([]);
      return;
    }

    // In real app, fetch from API
    const upazilas = mockUpazilas[district] || [];
    const formattedOptions = upazilas.map((upazila) => ({
      value: upazila.toLowerCase().replace(/\s+/g, '-'),
      label: showBangla ? upazila : upazila,
    }));

    if (includeAll) {
      formattedOptions.unshift({
        value: '',
        label: allLabel,
      });
    }

    setOptions(formattedOptions);
  }, [district, includeAll, allLabel, showBangla]);

  return <Select {...props} options={options} disabled={!district} />;
};
