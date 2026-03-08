'use client';

import React from 'react';
import { Select } from 'antd';
import { useHomestay } from '@/contexts/HomestayContext';

const SELECT_PLACEHOLDER = 'Select homestay';
const SELECT_STYLE = { minWidth: 160 };

export function HomestaySwitcher() {
  const { homestays, selectedHomestay, setSelectedHomestay } = useHomestay();

  const options = homestays.map((h) => ({
    value: h.id,
    label: h.name,
  }));

  return (
    <Select
      placeholder={SELECT_PLACEHOLDER}
      value={selectedHomestay?.id ?? undefined}
      options={options}
      onChange={(id) => {
        const homestay = homestays.find((h) => h.id === id) ?? null;
        setSelectedHomestay(homestay);
      }}
      style={SELECT_STYLE}
      allowClear={false}
    />
  );
}
