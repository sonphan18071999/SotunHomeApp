'use client';

import React from 'react';
import { Form, Input, Select } from 'antd';
import type { RoomDetailFormValues } from '@/types/room-detail';
import type { RoomType } from '@/types/entities';
import { ROOM_STATUSES } from '@/constants';

const FORM_LAYOUT = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
const ROOM_NAME_MAX_LENGTH = 100;
const ROOM_NAME_REQUIRED_MSG = 'Name is required';
const LABEL_CAPACITY = 'Capacity (max guests)';

interface RoomDetailFormProps {
  form: ReturnType<typeof Form.useForm<RoomDetailFormValues>>[0];
  onFinish?: (values: RoomDetailFormValues) => void;
  roomType?: RoomType;
  children?: React.ReactNode;
}

export function RoomDetailForm({ form, onFinish, roomType, children }: RoomDetailFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ marginBottom: 16 }}
      onFinish={onFinish}
      {...FORM_LAYOUT}
    >
      <Form.Item
        name="name"
        label="Room name"
        rules={[{ required: true, message: ROOM_NAME_REQUIRED_MSG }, { whitespace: true }]}
      >
        <Input placeholder="Room name" maxLength={ROOM_NAME_MAX_LENGTH} showCount />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select
          options={ROOM_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
          placeholder="Status"
        />
      </Form.Item>
      {roomType != null && (
        <Form.Item label={LABEL_CAPACITY}>
          <span>{roomType.capacity}</span>
        </Form.Item>
      )}
      <Form.Item name="mainImageUrl" label="Main image URL">
        <Input placeholder="https://..." type="url" />
      </Form.Item>
      {children}
    </Form>
  );
}
