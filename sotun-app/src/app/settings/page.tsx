'use client';

import React from 'react';
import { Card, Form, Input, Select } from 'antd';
import { PageHeader } from '@/components/common/PageHeader';
import { useHomestay } from '@/contexts/HomestayContext';

const CURRENCIES = [
  { value: 'VND', label: 'VND' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

const TIMEZONES = [
  { value: 'Asia/Bangkok', label: 'Asia/Bangkok' },
  { value: 'UTC', label: 'UTC' },
];

export default function SettingsPage() {
  const { selectedHomestay } = useHomestay();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (selectedHomestay) {
      form.setFieldsValue({
        currency: selectedHomestay.currency,
        timezone: selectedHomestay.timezone,
        checkInTime: '14:00',
        checkOutTime: '11:00',
      });
    }
  }, [selectedHomestay, form]);

  return (
    <>
      <PageHeader title="Settings" subtitle="Currency, taxes, default prices, check-in/out times" />
      <Card title="General" size="small" style={{ maxWidth: 480 }}>
        <Form form={form} layout="vertical" disabled={!selectedHomestay}>
          <Form.Item name="currency" label="Currency">
            <Select options={CURRENCIES} placeholder="Select currency" />
          </Form.Item>
          <Form.Item name="timezone" label="Timezone">
            <Select options={TIMEZONES} placeholder="Select timezone" />
          </Form.Item>
          <Form.Item name="checkInTime" label="Default check-in time">
            <Input placeholder="14:00" />
          </Form.Item>
          <Form.Item name="checkOutTime" label="Default check-out time">
            <Input placeholder="11:00" />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
