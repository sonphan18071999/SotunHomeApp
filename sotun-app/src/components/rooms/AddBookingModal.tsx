'use client';

import React, { useCallback, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space } from 'antd';
import { DatePickerField } from '@/components/common/DatePickerField';
import { useBooking } from '@/contexts/BookingContext';
import { sanitizeText } from '@/lib/validation';
import type { Booking } from '@/types/entities';
import type { AddManualBookingFormValues } from '@/types/room-detail';
import {
  MANUAL_BOOKING_STATUSES,
  ADD_BOOKING_MODAL_TITLE,
  LABEL_BOOKING_STATUS,
  LABEL_GUEST_NAME,
  LABEL_CHECK_IN,
  LABEL_CHECK_OUT,
  LABEL_ADDITIONAL_NOTE,
  PLACEHOLDER_GUEST_NAME,
  PLACEHOLDER_NOTE,
  GUEST_NAME_REQUIRED,
  CHECK_IN_REQUIRED,
  CHECK_OUT_REQUIRED,
  CHECK_OUT_AFTER_CHECK_IN,
  MANUAL_BOOKING_CHANNEL,
  MANUAL_BOOKING_PAYOUT_STATUS,
} from '@/constants/booking';
import dayjs from 'dayjs';

const FORM_LAYOUT = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
const GUEST_NAME_MAX_LENGTH = 200;
const NOTES_MAX_LENGTH = 500;

function generateBookingId(): string {
  return `manual-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export interface AddBookingModalProps {
  open: boolean;
  onCancel: () => void;
  roomId: string;
  homestayId: string;
}

export function AddBookingModal({
  open,
  onCancel,
  roomId,
  homestayId,
}: AddBookingModalProps) {
  const [form] = Form.useForm<AddManualBookingFormValues>();
  const { addBooking } = useBooking();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleFinish = useCallback(
    (values: AddManualBookingFormValues) => {
      const guestName = sanitizeText(values.guestName) || values.guestName;
      const notes = sanitizeText(values.notes);
      const booking: Booking = {
        id: generateBookingId(),
        homestayId,
        roomId,
        guestName,
        channel: MANUAL_BOOKING_CHANNEL,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
        status: values.status,
        payoutStatus: MANUAL_BOOKING_PAYOUT_STATUS,
        notes: notes !== '' ? notes : undefined,
      };
      addBooking(booking);
      form.resetFields();
      onCancel();
    },
    [homestayId, roomId, addBooking, form, onCancel]
  );

  return (
    <Modal
      title={ADD_BOOKING_MODAL_TITLE}
      open={open}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={480}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        {...FORM_LAYOUT}
      >
        <Form.Item
          name="status"
          label={LABEL_BOOKING_STATUS}
          rules={[{ required: true, message: 'Status is required' }]}
          initialValue={MANUAL_BOOKING_STATUSES[0].value}
        >
          <Select
            options={MANUAL_BOOKING_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
            placeholder={LABEL_BOOKING_STATUS}
          />
        </Form.Item>
        <Form.Item
          name="guestName"
          label={LABEL_GUEST_NAME}
          rules={[
            { required: true, message: GUEST_NAME_REQUIRED },
            { whitespace: true },
          ]}
        >
          <Input
            placeholder={PLACEHOLDER_GUEST_NAME}
            maxLength={GUEST_NAME_MAX_LENGTH}
            showCount
          />
        </Form.Item>
        <Form.Item
          name="checkInDate"
          label={LABEL_CHECK_IN}
          rules={[
            { required: true, message: CHECK_IN_REQUIRED },
            () => ({
              validator(_, value) {
                const checkOut = form.getFieldValue('checkOutDate') as string | undefined;
                if (!value || !checkOut) return Promise.resolve();
                if (dayjs(value).isBefore(dayjs(checkOut), 'day')) return Promise.resolve();
                return Promise.reject(new Error(CHECK_OUT_AFTER_CHECK_IN));
              },
            }),
          ]}
        >
          <DatePickerField placeholder={LABEL_CHECK_IN} />
        </Form.Item>
        <Form.Item
          name="checkOutDate"
          label={LABEL_CHECK_OUT}
          rules={[
            { required: true, message: CHECK_OUT_REQUIRED },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkIn = getFieldValue('checkInDate') as string | undefined;
                if (!value || !checkIn) return Promise.resolve();
                if (dayjs(value).isAfter(dayjs(checkIn), 'day')) return Promise.resolve();
                return Promise.reject(new Error(CHECK_OUT_AFTER_CHECK_IN));
              },
            }),
          ]}
        >
          <DatePickerField placeholder={LABEL_CHECK_OUT} />
        </Form.Item>
        <Form.Item name="notes" label={LABEL_ADDITIONAL_NOTE}>
          <Input.TextArea
            placeholder={PLACEHOLDER_NOTE}
            rows={2}
            maxLength={NOTES_MAX_LENGTH}
            showCount
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
