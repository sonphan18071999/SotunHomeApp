'use client';

import React, { useCallback } from 'react';
import { DatePicker } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { isValidDateString } from '@/lib/validation';

const DATE_FORMAT = 'YYYY-MM-DD';

export interface DatePickerFieldProps {
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  id?: string;
  minDate?: string;
  maxDate?: string;
}

function toDayjs(value: string | null | undefined): Dayjs | null {
  if (value == null || value === '') return null;
  if (!isValidDateString(value)) return null;
  const d = dayjs(value, DATE_FORMAT);
  return d.isValid() ? d : null;
}

function fromDayjs(d: Dayjs | null): string {
  return d != null && d.isValid() ? d.format(DATE_FORMAT) : '';
}

export function DatePickerField({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  allowClear = true,
  className,
  id,
  minDate,
  maxDate,
}: DatePickerFieldProps) {
  const dayjsValue = toDayjs(value ?? null);
  const minDayjs = toDayjs(minDate ?? null);
  const maxDayjs = toDayjs(maxDate ?? null);

  const handleChange = useCallback(
    (d: Dayjs | null) => {
      onChange?.(fromDayjs(d));
    },
    [onChange]
  );

  const disabledDate = useCallback(
    (current: Dayjs) => {
      if (minDayjs != null && current.isBefore(minDayjs, 'day')) return true;
      if (maxDayjs != null && current.isAfter(maxDayjs, 'day')) return true;
      return false;
    },
    [minDayjs, maxDayjs]
  );

  return (
    <DatePicker
      id={id}
      className={className}
      value={dayjsValue ?? undefined}
      onChange={handleChange}
      format={DATE_FORMAT}
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
      disabledDate={minDayjs != null || maxDayjs != null ? disabledDate : undefined}
      style={{ width: '100%' }}
    />
  );
}
