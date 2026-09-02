import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../components/Input';

export interface BengaliDatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
}

const banglaMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const banglaDays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'];

const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const convertToBanglaNumber = (num: number): string => {
  return num.toString().split('').map(d => banglaDigits[parseInt(d)]).join('');
};

export const BengaliDatePicker: React.FC<BengaliDatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  placeholder = 'তারিখ নির্বাচন করুন',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value ? new Date(value) : new Date());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    onChange?.(date.toISOString());
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const today = new Date();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
      
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-10 w-10 rounded-full transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isToday
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {convertToBanglaNumber(day)}
        </button>
      );
    }

    return days;
  };

  const formatDisplayDate = () => {
    const day = selectedDate.getDate();
    const month = banglaMonths[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();
    return `${convertToBanglaNumber(day)} ${month} ${convertToBanglaNumber(year)}`;
  };

  return (
    <div ref={pickerRef} className={`relative ${className}`}>
      <Input
        label={label}
        value={value ? formatDisplayDate() : ''}
        placeholder={placeholder}
        error={error}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      />
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="rounded p-1 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-medium">
              {banglaMonths[currentMonth]} {convertToBanglaNumber(currentYear)}
            </span>
            <button
              onClick={handleNextMonth}
              className="rounded p-1 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
            {banglaDays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};
